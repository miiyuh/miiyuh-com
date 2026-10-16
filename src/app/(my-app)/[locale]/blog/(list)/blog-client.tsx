"use client";

import Image from "next/image";
import Link from "@/components/locale-link";
import NextLink from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { ArrowUpRightIcon, MagnifyingGlassIcon } from "@phosphor-icons/react";
import type { BlogPostCard } from "@/types/blog";
import { getBlogPostPath } from "@/utils/blog-path";
import { formatPostDate } from "@/utils/format-date";
import { useLocale } from "@/lib/locale-context";
import { useWebHaptics } from "web-haptics/react";

interface TagOption {
  value: string;
  label: string;
}

interface BlogClientProps {
  posts: BlogPostCard[];
  availableTags: TagOption[];
  selectedTags: string[];
  searchQuery: string;
  pagination: {
    page: number;
    totalPages: number;
    totalDocs: number;
    pageSize: number;
  };
}

// Published posts always have a date; "/blog" is only a safe fallback
const getPostUrl = (post: BlogPostCard) =>
  post.publishedAt ? getBlogPostPath(post.slug, post.publishedAt) : "/blog";

export default function BlogClient({
  posts,
  availableTags,
  selectedTags,
  searchQuery,
  pagination,
}: BlogClientProps) {
  const searchDebounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [searchValue, setSearchValue] = useState(searchQuery);
  const [syncedQuery, setSyncedQuery] = useState(searchQuery);

  // Keep the input in sync when the query changes outside of typing
  // (back/forward navigation, cleared filters), without clobbering in-flight
  // input. Adjusting during render avoids the extra pass an effect would cost.
  if (syncedQuery !== searchQuery) {
    setSyncedQuery(searchQuery);
    if (searchValue.trim() !== searchQuery.trim()) {
      setSearchValue(searchQuery);
    }
  }
  const haptic = useWebHaptics();

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const searchParamsString = searchParams?.toString() ?? "";

  const updateRoute = useCallback(
    (updates: { search?: string; tags?: string[]; page?: number }) => {
      const params = new URLSearchParams(searchParamsString);

      if (updates.search !== undefined) {
        const trimmed = updates.search.trim();
        if (trimmed) {
          params.set("search", trimmed);
        } else {
          params.delete("search");
        }
      }

      if (updates.tags !== undefined) {
        params.delete("tag");
        updates.tags.forEach((tag) => {
          if (tag.trim()) {
            params.append("tag", tag);
          }
        });
      }

      if (updates.page !== undefined) {
        if (updates.page > 1) {
          params.set("page", String(updates.page));
        } else {
          params.delete("page");
        }
      }

      const queryString = params.toString();
      const target = queryString ? `${pathname}?${queryString}` : pathname;

      router.replace(target, { scroll: false });
    },
    [pathname, router, searchParamsString],
  );

  const handleSearchInputChange = useCallback(
    (value: string) => {
      setSearchValue(value);

      if (searchDebounceRef.current) {
        clearTimeout(searchDebounceRef.current);
      }

      searchDebounceRef.current = setTimeout(() => {
        const trimmed = value.trim();
        if (trimmed === searchQuery.trim()) {
          return;
        }
        updateRoute({ search: trimmed, page: 1 });
      }, 300);
    },
    [searchQuery, updateRoute],
  );

  useEffect(() => {
    return () => {
      if (searchDebounceRef.current) {
        clearTimeout(searchDebounceRef.current);
      }
    };
  }, []);

  // availableTags is already sorted alphabetically by the server
  const allTopics = availableTags;

  const toggleTopic = (topicValue: string) => {
    haptic.trigger("selection");
    const exists = selectedTags.includes(topicValue);
    const next = exists
      ? selectedTags.filter((t) => t !== topicValue)
      : [...selectedTags, topicValue];
    updateRoute({ tags: next, page: 1 });
  };

  const clearFilters = () => {
    if (searchDebounceRef.current) {
      clearTimeout(searchDebounceRef.current);
    }
    setSearchValue("");
    updateRoute({ search: "", tags: [], page: 1 });
  };

  // Same URL with only the page changed (page 1 drops the param)
  const pageHref = (page: number) => {
    const params = new URLSearchParams(searchParamsString);
    if (page > 1) params.set("page", String(page));
    else params.delete("page");
    const query = params.toString();
    return query ? `${pathname}?${query}` : pathname;
  };

  const locale = useLocale();
  const formatDate = (dateString?: string) =>
    dateString ? formatPostDate(dateString, locale) : "";

  // 1 … 4 5 6 … 12 — first, last, and the current page's neighbours
  const pageItems = useMemo(() => {
    const { page, totalPages } = pagination;
    const items: Array<number | "gap"> = [];
    for (let n = 1; n <= totalPages; n++) {
      if (n === 1 || n === totalPages || Math.abs(n - page) <= 1) {
        items.push(n);
      } else if (items[items.length - 1] !== "gap") {
        items.push("gap");
      }
    }
    return items;
  }, [pagination]);

  return (
    <div>
      <div className="pb-8">
        <div className="space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <label htmlFor="blog-search" className="sr-only">
              Search posts
            </label>
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MagnifyingGlassIcon className="h-4 w-4 text-text-muted" aria-hidden="true" />
            </div>
            <input
              id="blog-search"
              type="search"
              placeholder="Search posts"
              value={searchValue}
              onChange={(e) => handleSearchInputChange(e.target.value)}
              className="w-full font-sans bg-white/2 border border-white/8 rounded-lg py-2.5 pl-9 pr-3 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-white/15 transition duration-200"
            />
          </div>

          {/* Topic Tags */}
          {allTopics.length > 0 && (
            <fieldset className="min-w-0 space-y-2">
              <legend className="block p-0 text-xs uppercase tracking-widest text-text-muted/60 font-light">
                Topics
              </legend>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => {
                    haptic.trigger("selection");
                    clearFilters();
                  }}
                  aria-pressed={selectedTags.length === 0}
                  className={`min-h-11 px-3 text-xs rounded-full transition duration-200 ${
                    selectedTags.length === 0
                      ? "bg-accent-primary/20 text-accent-hover border border-accent-primary/30"
                      : "bg-white/4 text-text-muted hover:text-text-secondary hover:bg-white/6 border border-transparent"
                  }`}
                >
                  all
                </button>
                {allTopics.map((topic) => (
                  <button
                    key={topic.value}
                    onClick={() => toggleTopic(topic.value)}
                    aria-pressed={selectedTags.includes(topic.value)}
                    className={`min-h-11 px-3 text-xs rounded-full transition duration-200 ${
                      selectedTags.includes(topic.value)
                        ? "bg-accent-primary/20 text-accent-hover border border-accent-primary/30"
                        : "bg-white/4 text-text-muted hover:text-text-secondary hover:bg-white/6 border border-transparent"
                    }`}
                  >
                    {topic.label.toLowerCase()}
                  </button>
                ))}
              </div>
            </fieldset>
          )}
        </div>
      </div>

      <div>
        {posts.length > 0 ? (
          <div className="space-y-6">
            {posts.map((post, index) => {
              const coverSrc = post.coverImage?.url;

              return (
                <Link
                  key={post.id}
                  href={getPostUrl(post)}
                  className="group block content-auto-sm animate-stagger-item"
                  style={{ "--i": Math.min(index, 9) } as React.CSSProperties}
                  onClick={() => haptic.trigger("medium")}
                >
                  <div className="relative flex flex-col sm:flex-row gap-5 p-5 rounded-lg border border-white/8 bg-white/2 hover:bg-white/5 hover:border-white/12 transition duration-300">
                    <div className="absolute top-5 right-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <ArrowUpRightIcon
                        className="w-5 h-5 text-text-muted"
                        weight="bold"
                      />
                    </div>
                    {coverSrc && (
                      <div className="relative w-full sm:w-48 shrink-0 aspect-video rounded-md overflow-hidden">
                        <div className="absolute inset-0 bg-linear-to-r from-white/2 via-white/[0.07] to-white/2 bg-size-[200%_100%] animate-skeleton" />
                        <Image
                          src={coverSrc}
                          alt={post.coverImage?.alt || post.title}
                          fill
                          className="object-cover"
                          sizes="(max-width: 640px) 100vw, 192px"
                          quality={75}
                          loading="lazy"
                        />
                      </div>
                    )}
                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                      <div>
                        <div className="flex flex-wrap items-center gap-2 mb-3">
                          <time dateTime={post.publishedAt ?? undefined} className="text-xs text-text-muted/60">
                            {post.publishedAt && formatDate(post.publishedAt)}
                          </time>
                          {post.tags && post.tags.length > 0 && (
                            <>
                              {post.tags
                                .slice(0, 2)
                                .map((tagItem, tagIndex) => (
                                  <span
                                    key={tagIndex}
                                    className="text-[11px] text-text-muted/50 rounded-full bg-white/4 px-2 py-0.5"
                                  >
                                    {tagItem?.tag}
                                  </span>
                                ))}
                            </>
                          )}
                        </div>
                        <h2 className="text-lg font-medium text-text-primary transition-colors duration-200 mb-2">
                          <span className="text-highlight">{post.title}</span>
                        </h2>
                        <p className="text-sm text-text-secondary/70 line-clamp-2 leading-relaxed">
                          {post.excerpt}
                        </p>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="border border-dashed border-white/8 rounded-lg py-20 text-center">
            <p className="text-text-muted mb-4">
              nothing in the tray — try a different filter
            </p>
            <button
              onClick={() => {
                haptic.trigger("light");
                clearFilters();
              }}
              className="text-sm text-accent-hover hover:underline underline-offset-4"
            >
              Clear all filters
            </button>
          </div>
        )}

        {pagination.totalPages > 1 && (
          <nav
            className="mt-10 flex items-center justify-center gap-2"
            aria-label="Pagination"
          >
            {/* Real links (crawlable, open-in-new-tab) that keep the current filters */}
            {pagination.page > 1 ? (
              <NextLink
                href={pageHref(pagination.page - 1)}
                scroll={false}
                onClick={() => haptic.trigger("selection")}
                aria-label="Previous page"
                className="min-h-11 min-w-11 flex items-center justify-center text-sm rounded-lg transition-colors duration-200 text-text-muted hover:text-text-primary bg-white/4 border border-white/8 hover:bg-white/6"
              >
                <span aria-hidden="true">←</span>
              </NextLink>
            ) : (
              <span
                aria-hidden="true"
                className="min-h-11 min-w-11 flex items-center justify-center text-sm rounded-lg text-text-muted/40"
              >
                ←
              </span>
            )}
            {pageItems.map((item, index) =>
              item === "gap" ? (
                <span key={`gap-${index}`} aria-hidden="true" className="w-11 h-11 flex items-center justify-center text-sm text-text-muted/60">
                  …
                </span>
              ) : (
                <NextLink
                  key={item}
                  href={pageHref(item)}
                  scroll={false}
                  onClick={() => haptic.trigger("selection")}
                  aria-label={`Page ${item}`}
                  aria-current={item === pagination.page ? "page" : undefined}
                  className={`w-11 h-11 flex items-center justify-center text-sm rounded-lg transition-colors duration-200 ${
                    item === pagination.page
                      ? "bg-accent-primary/20 text-accent-hover border border-accent-primary/30"
                      : "text-text-muted bg-white/4 border border-white/8 hover:text-text-primary hover:bg-white/6"
                  }`}
                >
                  {item}
                </NextLink>
              ),
            )}
            {pagination.page < pagination.totalPages ? (
              <NextLink
                href={pageHref(pagination.page + 1)}
                scroll={false}
                onClick={() => haptic.trigger("selection")}
                aria-label="Next page"
                className="min-h-11 min-w-11 flex items-center justify-center text-sm rounded-lg transition-colors duration-200 text-text-muted hover:text-text-primary bg-white/4 border border-white/8 hover:bg-white/6"
              >
                <span aria-hidden="true">→</span>
              </NextLink>
            ) : (
              <span
                aria-hidden="true"
                className="min-h-11 min-w-11 flex items-center justify-center text-sm rounded-lg text-text-muted/40"
              >
                →
              </span>
            )}
          </nav>
        )}
      </div>
    </div>
  );
}
