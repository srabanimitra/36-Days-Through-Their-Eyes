// app/memory-wall/page.js
"use client";
import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, User, ExternalLink } from "lucide-react";
import memoryWall from "@/data/memoryWall.json";
import { useReducedMotion } from "@/lib/useReducedMotion";

export default function MemoryWallPage() {
  const reduced = useReducedMotion();

  const fadeUp = (delay = 0) => ({
    initial: reduced ? {} : { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: reduced ? 0 : 0.5, delay: reduced ? 0 : delay, ease: "easeOut" },
  });

  return (
    <main className="min-h-screen px-6 py-16">
      <motion.div {...fadeUp(0)} className="max-w-2xl mx-auto text-center mb-12">
        <p
          className="font-heading text-[11px] tracking-[0.2em] uppercase mb-3"
          style={{ color: "var(--color-accent)" }}
        >
          Memory Wall
        </p>
        <h1 className="font-display text-3xl sm:text-4xl font-semibold mb-4">Real People, Real Names</h1>
        <p className="font-body text-sm sm:text-base" style={{ color: "var(--color-text-secondary)" }}>
          The characters you played were composites. The people on this page were not — they were
          real, they had names, and what happened to them is a matter of public record.
        </p>
      </motion.div>

      <div className="max-w-2xl mx-auto flex flex-col gap-6">
        {memoryWall.map((person, i) => (
          <MemoryCard key={person.id} person={person} delay={0.1 + i * 0.08} reduced={reduced} />
        ))}
      </div>

      <motion.div {...fadeUp(0.4)} className="max-w-2xl mx-auto text-center mt-10">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 font-body text-sm"
          style={{ color: "var(--color-text-secondary)" }}
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Back home
        </Link>
      </motion.div>
    </main>
  );
}

function MemoryCard({ person, delay, reduced }) {
  const [imgError, setImgError] = useState(false);
  const hasPhoto = person.photo && !imgError;

  const fadeUp = {
    initial: reduced ? {} : { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: reduced ? 0 : 0.5, delay: reduced ? 0 : delay, ease: "easeOut" },
  };

  return (
    <motion.article
      {...fadeUp}
      className="rounded-card border overflow-hidden"
      style={{
        backgroundColor: "var(--color-surface)",
        borderColor: "var(--color-border)",
        boxShadow: "var(--shadow-soft)",
      }}
    >
      <div className="flex flex-col sm:flex-row">
        <div
          className="sm:w-40 h-48 sm:h-auto shrink-0 flex items-center justify-center"
          style={{ backgroundColor: "var(--color-bg-secondary)" }}
        >
          {hasPhoto ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={person.photo}
              alt={person.name}
              onError={() => setImgError(true)}
              className="w-full h-full object-cover"
            />
          ) : (
            <User className="w-10 h-10" style={{ color: "var(--color-text-secondary)" }} strokeWidth={1.5} />
          )}
        </div>

        <div className="p-6 flex-1">
          <h2 className="font-display text-xl font-semibold mb-1">{person.name}</h2>
          <p
            className="font-heading text-[11px] tracking-[0.14em] uppercase mb-4"
            style={{ color: "var(--color-text-secondary)" }}
          >
            {[person.occupation, person.university].filter(Boolean).join(" · ")}
            {person.age ? ` · Age ${person.age}` : ""}
          </p>
          <p className="font-body text-sm leading-relaxed mb-4" style={{ color: "var(--color-text)" }}>
            {person.story}
          </p>

          {person.sourceLinks?.length > 0 && (
            <div className="flex flex-wrap gap-x-4 gap-y-1.5 pt-3" style={{ borderTop: "1px solid var(--color-divider)" }}>
              {person.sourceLinks.map((src) => (
                <a
                  key={src.url}
                  href={src.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 font-body text-xs"
                  style={{ color: "var(--color-accent)" }}
                >
                  {src.name}
                  <ExternalLink className="w-3 h-3" />
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </motion.article>
  );
}
