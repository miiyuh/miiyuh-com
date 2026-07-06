"use client";

import {
  GraduationCapIcon,
  BriefcaseIcon,
  HandHeartIcon,
  FileTextIcon,
  ArrowDownIcon,
} from "@phosphor-icons/react";
import { EntryCard } from "@/components/ui/entry-card";
import { Button } from "@/components/ui/button";
import type { AboutEntry } from "@/types/about";
import { useStuckObserver } from "@/hooks/use-stuck-observer";

function SectionStickyHeader({ children }: { children: React.ReactNode }) {
  const { sentinelRef, isStuck } = useStuckObserver()
  return (
    <>
      <div ref={sentinelRef} className="pointer-events-none" />
      <div className={`sticky md:static top-19 z-40 -mx-8 px-8 py-2 bg-bg-primary/80 backdrop-blur-xl border-b md:border-b-0 mb-6 flex items-center gap-3 transition-[border-color] ${isStuck ? 'border-white/8' : 'border-transparent'}`}>
        {children}
      </div>
    </>
  )
}

function formatFileSize(bytes?: number): string {
  if (!bytes || bytes <= 0) return ''
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

interface HomeDetailsProps {
  education: AboutEntry[];
  experience: AboutEntry[];
  volunteering: AboutEntry[];
  resumePdfUrl?: string;
  resumeFilename?: string;
  resumeFilesize?: number;
}

export default function HomeDetails({
  education,
  experience,
  volunteering,
  resumePdfUrl,
  resumeFilename,
  resumeFilesize,
}: HomeDetailsProps) {
  return (
    <>
      {/* Experience Section */}
      {experience.length > 0 && (
        <section className="animate-in fade-in slide-in-from-bottom-4 duration-700">
          <SectionStickyHeader>
            <BriefcaseIcon className="w-6 h-6 text-text-primary" aria-hidden="true" />
            <h2 className="text-3xl font-serif text-text-primary">
              Experience
            </h2>
          </SectionStickyHeader>
          <div className="flex flex-col gap-4">
            {experience.map((entry, index) => (
              <div
                key={entry.id}
                className="animate-stagger-item"
                style={{ "--i": Math.min(index, 9) } as React.CSSProperties}
              >
                <EntryCard
                  entry={entry}
                  fallbackIcon={
                    <BriefcaseIcon className="w-6 h-6 text-text-muted" />
                  }
                />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education Section */}
      {education.length > 0 && (
        <section className="animate-in fade-in slide-in-from-bottom-4 duration-700">
          <SectionStickyHeader>
            <GraduationCapIcon className="w-6 h-6 text-text-primary" aria-hidden="true" />
            <h2 className="text-3xl font-serif text-text-primary">
              Education
            </h2>
          </SectionStickyHeader>
          <div className="flex flex-col gap-4">
            {education.map((entry, index) => (
              <div
                key={entry.id}
                className="animate-stagger-item"
                style={{ "--i": Math.min(index, 9) } as React.CSSProperties}
              >
                <EntryCard
                  entry={entry}
                  fallbackIcon={
                    <GraduationCapIcon className="w-6 h-6 text-text-muted" />
                  }
                />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Volunteering Section */}
      {volunteering.length > 0 && (
        <section className="animate-in fade-in slide-in-from-bottom-4 duration-700">
          <SectionStickyHeader>
            <HandHeartIcon className="w-6 h-6 text-text-primary" aria-hidden="true" />
            <h2 className="text-3xl font-serif text-text-primary">
              Volunteering
            </h2>
          </SectionStickyHeader>
          <div className="flex flex-col gap-4">
            {volunteering.map((entry, index) => (
              <div
                key={entry.id}
                className="animate-stagger-item"
                style={{ "--i": Math.min(index, 9) } as React.CSSProperties}
              >
                <EntryCard
                  entry={entry}
                  fallbackIcon={
                    <HandHeartIcon className="w-6 h-6 text-text-muted" />
                  }
                />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Resume Section */}
      <section className="animate-in fade-in slide-in-from-bottom-4 duration-700">
        <SectionStickyHeader>
          <FileTextIcon className="w-6 h-6 text-text-primary" aria-hidden="true" />
          <h2 className="text-3xl font-serif text-text-primary">
            Resume
          </h2>
        </SectionStickyHeader>

        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6 sm:gap-12">
          <p className="text-md text-text-secondary leading-relaxed">
            Here is a copy of my resume for recruiters that stumbled upon my website. Reach out to me through my email at azri@miiyuh.com
          </p>
          <div className="flex flex-col items-start sm:items-end gap-3 shrink-0">

            {resumePdfUrl ? (
              <Button variant="default" size="lg" asChild>
                <a href={resumePdfUrl} download>
                  <ArrowDownIcon className="size-5" />
                  Download Resume
                </a>
              </Button>
            ) : (
              <p className="text-xs text-text-muted">Oops, the resume may not be available yet.</p>
            )}
            <span className="text-xs text-text-muted select-none whitespace-nowrap">
              {resumeFilename || 'resume.pdf'}{resumeFilesize ? ` · ${formatFileSize(resumeFilesize)}` : ''}
            </span>
          </div>
        </div>
      </section>
    </>
  );
}
