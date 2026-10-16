"use client";

import Link from "next/link";
import { useWebHaptics } from "web-haptics/react";
import { ArrowUpRightIcon } from "@phosphor-icons/react";


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

interface ProjectsListProps {
  projects: Project[];
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function getSubtitle(project: Project): string | null {
  if (project.category === "university-project")
    return project.universityDetails?.course || null;
  return null;
}

// ---------------------------------------------------------------------------
// Entry (typographic list item)
// ---------------------------------------------------------------------------

function ProjectEntry({ project }: { project: Project }) {
  const haptic = useWebHaptics();
  const isSide = project.category === "side-project";

  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group block w-full text-left"
      onClick={() => haptic.trigger("medium")}
    >
      <article>
        <div className="flex items-start justify-between gap-6">
          <div className="min-w-0 flex-1">
            {/* Name + optional icon */}
            <div className="flex items-center gap-3">
              <h3 className="text-2xl sm:text-3xl font-serif text-text-primary leading-tight transition-colors duration-200">
                <span className="text-highlight">{project.name}</span>
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
          <ArrowUpRightIcon className="w-6 h-6 shrink-0 mt-2 text-text-muted/30 group-hover:text-text-primary/60 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" />
        </div>
      </article>
    </Link>
  );
}

// ---------------------------------------------------------------------------
// Separator
// ---------------------------------------------------------------------------

function EntrySeparator() {
  return <hr className="border-0 border-t border-white/4 my-0" />;
}

// ---------------------------------------------------------------------------
// Main list component
// ---------------------------------------------------------------------------

export default function ProjectsList({ projects }: ProjectsListProps) {
  // Projects arrive already sorted by `_order` from the DB query
  if (projects.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-white/8 px-6 py-12 text-center">
        <p className="text-sm text-text-muted/60">
          tray is still in the developer — nothing developed yet
        </p>
      </div>
    );
  }

  return (
    <div>
      {projects.map((project, idx) => (
        <div key={project.id}>
          {idx > 0 && <EntrySeparator />}
          <div
            className="py-10 first:pt-0 animate-stagger-item"
            style={{ "--i": Math.min(idx, 9) } as React.CSSProperties}
          >
            <ProjectEntry project={project} />
          </div>
        </div>
      ))}
    </div>
  );
}
