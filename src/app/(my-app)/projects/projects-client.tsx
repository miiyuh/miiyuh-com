"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { animate, remove, set, stagger } from "animejs";
import { SimpleBreadcrumb } from "@/components/ui/simple-breadcrumb";
import { breadcrumbs } from "@/config/breadcrumbs";
import { useWebHaptics } from "web-haptics/react";
import { Dialog, DialogPopup } from "@/components/ui/dialog";
import {
  ArrowUpRight,
  Rocket,
  GraduationCap,
  GithubLogo,
  ArrowSquareOut,
  CaretLeft,
  CaretRight,
  X,
} from "@phosphor-icons/react";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface Project {
  id: string;
  name: string;
  slug: string;
  category: "side-project" | "university-project";
  description: string;
  icon?: { id: string; url?: string; alt?: string };
  image?: { url?: string; alt?: string };
  order: number;
  externalLink?: string;
  projectDetails?: {
    techStack?: { tech: string }[];
    status?: "active" | "in-development" | "archived";
    githubUrl?: string;
    liveUrl?: string;
  };
  universityDetails?: {
    course?: string;
    semester?: string;
    grade?: string;
  };
}

interface ProjectsClientProps {
  projects: Project[];
}

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function getSubtitle(project: Project): string | null {
  if (project.category === "university-project")
    return project.universityDetails?.course || null;
  return null;
}

function getCategoryIcon(category: Project["category"]) {
  switch (category) {
    case "side-project":
      return Rocket;
    case "university-project":
      return GraduationCap;
  }
}

const CATEGORY_LABELS: Record<Project["category"], string> = {
  "side-project": "Side Project",
  "university-project": "University",
};

// ---------------------------------------------------------------------------
// Entry (typographic list item)
// ---------------------------------------------------------------------------

function ProjectEntry({
  project,
  onSelect,
  entryRef,
}: {
  project: Project;
  onSelect: () => void;
  entryRef?: (el: HTMLDivElement | null) => void;
}) {
  const haptic = useWebHaptics();
  const isSide = project.category === "side-project";

  return (
    <div ref={entryRef}>
      <article
        className="group cursor-pointer"
        onClick={() => {
          haptic.trigger("medium");
          onSelect();
        }}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            haptic.trigger("medium");
            onSelect();
          }
        }}
        aria-label={`View details for ${project.name}`}
      >
        <div className="flex items-start justify-between gap-6">
          <div className="min-w-0 flex-1">
            {/* Name + optional icon */}
            <div className="flex items-center gap-3">
              {project.icon?.url && (
                <div className="w-8 h-8 rounded-lg overflow-hidden shrink-0 border border-white/8 bg-white/5 -mt-0.5">
                  <Image
                    src={project.icon.url}
                    alt={project.icon.alt || `${project.name} icon`}
                    width={32}
                    height={32}
                    className="w-8 h-8 object-cover"
                    quality={75}
                    sizes="32px"
                  />
                </div>
              )}
              <h3 className="text-2xl sm:text-3xl font-serif text-text-primary leading-tight group-hover:text-white transition-colors duration-200">
                {project.name}
              </h3>
            </div>

            {/* Course subtitle */}
            {getSubtitle(project) && (
              <p className="text-sm font-mono text-text-muted/80 mt-1.5">
                {getSubtitle(project)}
              </p>
            )}

            {/* Description */}
            <p className="text-base text-text-secondary/80 leading-relaxed mt-4 max-w-prose line-clamp-2">
              {project.description}
            </p>

            {/* Tags (matching entry-card style) */}
            {(isSide
              ? project.projectDetails?.techStack?.slice(0, 4)
              : undefined
            )?.length ? (
              <div className="flex flex-wrap gap-1.5 mt-5">
                {project.projectDetails!.techStack!.slice(0, 4).map((t, i) => (
                  <span
                    key={i}
                    className="text-[11px] px-2 py-0.5 text-text-muted/50 rounded-full bg-white/4"
                  >
                    {t.tech}
                  </span>
                ))}
              </div>
            ) : !isSide &&
              (project.universityDetails?.semester ||
                project.universityDetails?.grade) ? (
              <div className="flex flex-wrap gap-1.5 mt-5">
                {project.universityDetails?.semester && (
                  <span className="text-[11px] px-2 py-0.5 text-text-muted/50 rounded-full bg-white/4">
                    {project.universityDetails.semester}
                  </span>
                )}
                {project.universityDetails?.grade && (
                  <span className="text-[11px] px-2 py-0.5 text-text-muted/50 rounded-full bg-white/4">
                    {project.universityDetails.grade}
                  </span>
                )}
              </div>
            ) : null}
          </div>

          {/* Arrow */}
          <ArrowUpRight className="w-6 h-6 shrink-0 mt-2 text-text-muted/30 group-hover:text-text-primary/60 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" />
        </div>
      </article>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Separator
// ---------------------------------------------------------------------------

function EntrySeparator() {
  return <hr className="border-0 border-t border-white/[0.04] my-0" />;
}

// ---------------------------------------------------------------------------
// Main page component
// ---------------------------------------------------------------------------

export default function ProjectsClient({ projects }: ProjectsClientProps) {
  const [selected, setSelected] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalShellRef = useRef<HTMLDivElement | null>(null);
  const isClosingRef = useRef(false);
  const isNavigatingRef = useRef(false);
  const listRef = useRef<HTMLDivElement | null>(null);
  const animRan = useRef(false);

  useEffect(() => {
    return () => {
      isClosingRef.current = false;
    };
  }, []);

  // Staggered entrance
  useEffect(() => {
    if (animRan.current || !listRef.current) return;
    animRan.current = true;

    const items = listRef.current.querySelectorAll("[data-stagger]");
    if (!items.length) return;

    set(items, { opacity: 0, translateY: 12 });

    animate(items, {
      opacity: 1,
      translateY: 0,
      duration: 400,
      easing: "easeOutQuad",
      delay: stagger(60),
    });
  }, []);

  useEffect(() => {
    if (!isModalOpen || !selected) return;
    if (isNavigatingRef.current) {
      isNavigatingRef.current = false;
      return;
    }

    const shell = modalShellRef.current;
    if (!shell) return;

    isClosingRef.current = false;
    remove(shell);
    set(shell, { opacity: 0, scale: 0.965 });

    animate(shell, {
      opacity: 1,
      scale: 1,
      duration: 170,
      easing: "easeOutQuad",
    });
  }, [isModalOpen, selected]);

  // Projects are already sorted by `order` from the DB query
  const allProjects = projects;
  const currentIndex = selected
    ? allProjects.findIndex((p) => p.id === selected.id)
    : -1;

  const navigateProject = (direction: 1 | -1) => {
    if (!selected || allProjects.length <= 1) return;
    const idx = allProjects.findIndex((p) => p.id === selected.id);
    if (idx === -1) return;
    const nextIdx = (idx + direction + allProjects.length) % allProjects.length;
    const next = allProjects[nextIdx];
    if (!next) return;
    isNavigatingRef.current = true;
    setSelected(next);
  };

  useEffect(() => {
    if (!isModalOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") navigateProject(-1);
      if (e.key === "ArrowRight") navigateProject(1);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  });

  const openProjectModal = (project: Project) => {
    isClosingRef.current = false;
    setSelected(project);
    setIsModalOpen(true);
  };

  const closeProjectModal = () => {
    if (isClosingRef.current) return;

    const shell = modalShellRef.current;

    if (!shell) {
      setIsModalOpen(false);
      setSelected(null);
      return;
    }

    isClosingRef.current = true;
    remove(shell);

    animate(shell, {
      opacity: 0,
      scale: 0.965,
      duration: 140,
      easing: "easeInQuad",
    })
      .then(() => {
        setIsModalOpen(false);
        setSelected(null);
        isClosingRef.current = false;
      })
      .catch(() => {
        setIsModalOpen(false);
        setSelected(null);
        isClosingRef.current = false;
      });
  };

  const handleModalOpenChange = ({ open }: { open: boolean }) => {
    if (open) {
      setIsModalOpen(true);
      return;
    }

    closeProjectModal();
  };

  return (
    <main className="flex flex-col bg-transparent text-text-primary font-sans relative min-h-screen">
      <section className="relative grow pt-6 pb-24">
        {/* Breadcrumb + heading */}
        <div className="px-8 md:px-32 lg:px-56 xl:px-80">
          <SimpleBreadcrumb items={breadcrumbs.projects()} />

          <div className="mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <h1 className="text-5xl md:text-6xl font-serif tracking-tight mb-4 text-text-primary text-balance">
              projects
            </h1>
            <p className="text-lg md:text-xl text-text-secondary text-pretty max-w-prose">
              side projects, university work, and research papers — the
              collection
            </p>
          </div>
        </div>

        {/* Typographic list */}
        <div className="px-8 md:px-32 lg:px-56 xl:px-80">
          {allProjects.length > 0 ? (
            <div ref={listRef}>
              {allProjects.map((project, idx) => (
                <div key={project.id}>
                  {idx > 0 && <EntrySeparator />}
                  <div className="py-10 first:pt-0" data-stagger>
                    <ProjectEntry
                      project={project}
                      onSelect={() => openProjectModal(project)}
                    />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-white/8 px-6 py-12 text-center">
              <p className="text-sm text-text-muted/60">
                tray is still in the developer — nothing developed yet
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Detail popup */}
      <Dialog open={isModalOpen} onOpenChange={handleModalOpenChange}>
        <DialogPopup
          className="sm:max-w-5xl p-0 border border-white/10 bg-bg-primary max-h-[90vh] [clip-path:inset(0_round_1rem)]"
          showCloseButton={false}
        >
          {selected &&
            (() => {
              const Icon = getCategoryIcon(selected.category);
              return (
                <div
                  ref={modalShellRef}
                  className="grid grid-cols-1 lg:grid-cols-[1.05fr_1fr] overflow-hidden will-change-transform"
                >
                  {/* Left: Image */}
                  <div key={selected.id} className="relative min-h-55 sm:min-h-65 lg:min-h-0 lg:aspect-4/3 bg-[#faf3e0] border-b border-white/10 lg:border-b-0 lg:border-r lg:border-white/10 animate-smooth-fade-in">
                    {selected.image?.url ? (
                      <Image
                        src={selected.image.url}
                        alt={selected.image.alt || selected.name}
                        fill
                        className="object-cover"
                        quality={85}
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        priority
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-[#faf3e0] text-bg-primary/20">
                        <Icon className="w-24 h-24" />
                      </div>
                    )}
                  </div>

                  {/* Right: Content */}
                  <div className="relative bg-bg-primary p-4 sm:p-5 lg:p-6 xl:p-7 flex flex-col gap-5 sm:gap-6 overflow-y-auto">
                    {/* Top bar: nav + close */}
                    <div className="absolute right-0 left-0 top-0 flex items-center justify-between px-3 pt-3 sm:px-4 sm:pt-4 z-10 pointer-events-none">
                      {allProjects.length > 1 && (
                        <div className="flex items-center gap-2 pointer-events-auto">
                          <button
                            onClick={() => navigateProject(-1)}
                            className="p-3 text-text-muted hover:text-text-primary transition-all duration-200 hover:-translate-y-0.5"
                            aria-label="Previous project"
                          >
                            <CaretLeft className="w-5 h-5" />
                          </button>
                          <span
                            className="text-xs font-mono text-text-muted/40 tabular-nums min-w-[4ch] text-center select-none"
                            aria-live="polite"
                          >
                            {currentIndex + 1}/{allProjects.length}
                          </span>
                          <button
                            onClick={() => navigateProject(1)}
                            className="p-3 text-text-muted hover:text-text-primary transition-all duration-200 hover:-translate-y-0.5"
                            aria-label="Next project"
                          >
                            <CaretRight className="w-5 h-5" />
                          </button>
                        </div>
                      )}
                      <div className="pointer-events-auto ml-auto">
                        <button
                          onClick={closeProjectModal}
                          className="p-3 text-text-primary hover:text-text-primary/60 transition-all duration-200 hover:-translate-y-0.5"
                          aria-label="Close dialog"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </div>
                    </div>

                    {/* Animated content */}
                    <div key={selected.id} className="animate-smooth-fade-in pt-10 sm:pt-11">
                      {/* Icon + Title */}
                      <div className="pr-10">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl overflow-hidden shrink-0 bg-[#faf3e0] flex items-center justify-center mb-4 sm:mb-5">
                          {selected.icon?.url ? (
                            <Image
                              src={selected.icon.url}
                              alt={selected.icon.alt || `${selected.name} icon`}
                              width={48}
                              height={48}
                              className="w-12 h-12 object-cover"
                              sizes="48px"
                              quality={75}
                            />
                          ) : (
                            <Icon className="w-6 h-6 text-bg-primary" />
                          )}
                        </div>

                        {/* Title */}
                        <h2 className="text-3xl sm:text-4xl font-serif text-text-primary mb-3 sm:mb-4 leading-tight">
                          {selected.name}
                        </h2>

                        {/* Label */}
                        <span className="text-[10px] font-mono text-text-muted uppercase tracking-widest mb-3 block">
                          {CATEGORY_LABELS[selected.category]}
                        </span>

                        {/* Description */}
                        <p className="text-sm sm:text-base text-text-primary/80 leading-relaxed">
                          {selected.description}
                        </p>
                      </div>

                      {/* Tech Stack / Details section */}
                      {selected.category === "side-project" &&
                        selected.projectDetails?.techStack &&
                        selected.projectDetails.techStack.length > 0 && (
                          <div className="pr-10">
                            <p className="text-[10px] font-mono text-text-muted uppercase tracking-widest mb-2 block">
                              Tech
                            </p>
                            <div className="flex flex-wrap gap-2">
                              {selected.projectDetails.techStack
                                .slice(0, 4)
                                .map((t, i) => (
                                  <span
                                    key={i}
                                    className="px-2.5 sm:px-3 py-1 border border-text-primary/30 text-text-primary/70 text-xs rounded-full font-mono"
                                  >
                                    {t.tech}
                                  </span>
                                ))}
                            </div>
                          </div>
                        )}

                      {/* Action buttons */}
                      <div className="flex items-center gap-2 pr-10 pt-1 sm:pt-2">
                        {selected.projectDetails?.githubUrl && (
                          <a
                            href={selected.projectDetails.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-3 text-text-primary hover:text-text-primary/60 transition-all duration-200 hover:-translate-y-0.5"
                            aria-label="View on GitHub"
                          >
                            <GithubLogo weight="fill" className="w-5 h-5" />
                          </a>
                        )}
                        {selected.projectDetails?.liveUrl && (
                          <a
                            href={selected.projectDetails.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-3 text-text-primary hover:text-text-primary/60 transition-all duration-200 hover:-translate-y-0.5"
                            aria-label="View live project"
                          >
                            <ArrowSquareOut className="w-5 h-5" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })()}
        </DialogPopup>
      </Dialog>
    </main>
  );
}
