// app/chapters/[id]/page.js
"use client";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ChevronDown, ScrollText } from "lucide-react";
import chapters from "@/data/chapters.json";
import { useCharacter } from "@/lib/character";
import { useReducedMotion } from "@/lib/useReducedMotion";

const CHAPTER_IDS = Object.keys(chapters)
  .map(Number)
  .sort((a, b) => a - b);
const TOTAL_CHAPTERS = CHAPTER_IDS.length;
const LAST_CHAPTER_INDEX = CHAPTER_IDS[TOTAL_CHAPTERS - 1];

export default function ChapterPage() {
  const router = useRouter();
  const params = useParams();
  const character = useCharacter();
  const chapterIndex = Number(params.id);

  useEffect(() => {
    if (character === null) router.replace("/characters");
  }, [character, router]);

  if (character === null) {
    return (
      <main className="min-h-screen flex items-center justify-center px-6">
        <p className="font-body text-sm" style={{ color: "var(--color-text-secondary)" }}>
          Loading…
        </p>
      </main>
    );
  }

  const chapter = chapters[String(chapterIndex)]?.[character];

  if (!Number.isInteger(chapterIndex) || !chapter) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center px-6 text-center gap-4">
        <p className="font-heading text-sm uppercase tracking-[0.15em]" style={{ color: "var(--color-accent)" }}>
          This day isn&apos;t available
        </p>
        <p className="font-body text-sm max-w-sm" style={{ color: "var(--color-text-secondary)" }}>
          We couldn&apos;t find that chapter for your chosen perspective.
        </p>
        <Link
          href="/characters"
          className="font-body text-sm inline-flex items-center gap-1.5 mt-2"
          style={{ color: "var(--color-accent)" }}
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Back to character select
        </Link>
      </main>
    );
  }

  return (
    <main className="min-h-screen px-6 py-14 flex flex-col items-center">
      <ProgressBar chapterIndex={chapterIndex} character={character} />
      <ChapterScene key={chapterIndex} chapter={chapter} chapterIndex={chapterIndex} />
    </main>
  );
}

function ProgressBar({ chapterIndex, character }) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      initial={reduced ? {} : { opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: reduced ? 0 : 0.45, ease: "easeOut" }}
      className="w-full max-w-2xl mb-10"
    >
      <div className="flex items-center justify-between mb-2">
        <p
          className="font-heading text-[11px] tracking-[0.2em] uppercase"
          style={{ color: "var(--color-text-secondary)" }}
        >
          Day {chapterIndex + 1} of {TOTAL_CHAPTERS}
        </p>
        <p className="font-heading text-[11px] tracking-[0.2em] uppercase" style={{ color: "var(--color-accent)" }}>
          {character.replace("-", " ")}
        </p>
      </div>
      <div className="flex gap-1.5">
        {CHAPTER_IDS.map((idx) => {
          let color = "var(--color-timeline-upcoming)";
          if (idx < chapterIndex) color = "var(--color-timeline-done)";
          if (idx === chapterIndex) color = "var(--color-timeline-current)";
          return (
            <div
              key={idx}
              className="h-1 flex-1 rounded-full transition-colors duration-300"
              style={{ backgroundColor: color }}
            />
          );
        })}
      </div>
    </motion.div>
  );
}

function ChapterScene({ chapter, chapterIndex }) {
  const router = useRouter();
  const reduced = useReducedMotion();
  const [selectedChoice, setSelectedChoice] = useState(null);
  // Historical reality is shown by default now — no click required to see it.
  // The toggle stays available for anyone who wants to collapse it out of the way.
  const [revealOpen, setRevealOpen] = useState(true);

  const fadeUp = (delay = 0) => ({
    initial: reduced ? {} : { opacity: 0, y: 14 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: reduced ? 0 : 0.45, delay: reduced ? 0 : delay, ease: "easeOut" },
  });

  function handleChoice(index) {
    if (selectedChoice !== null) return;
    setSelectedChoice(index);
    const delay = reduced ? 150 : 650;
    setTimeout(() => {
      if (chapterIndex >= LAST_CHAPTER_INDEX) {
        router.push("/ending");
      } else {
        router.push(`/chapters/${chapterIndex + 1}`);
      }
    }, delay);
  }

  return (
    <>
      <motion.div
        {...fadeUp(0.08)}
        className="w-full max-w-2xl rounded-card border p-7 sm:p-9"
        style={{
          backgroundColor: "var(--color-surface)",
          borderColor: "var(--color-border)",
          boxShadow: "var(--shadow-soft)",
        }}
      >
        <p
          className="font-heading text-[11px] tracking-[0.2em] uppercase mb-2"
          style={{ color: "var(--color-accent)" }}
        >
          {chapter.date}
        </p>
        <h1 className="font-display text-2xl sm:text-3xl font-semibold mb-5">{chapter.dayLabel}</h1>
        <p className="font-body text-sm sm:text-base leading-relaxed" style={{ color: "var(--color-text)" }}>
          {chapter.narrative}
        </p>
      </motion.div>

      {/* Historical Reality now sits right after the narrative and above the
          choices, open by default — everyone sees the real history whether
          or not they ever click anything. The toggle is just there for
          anyone who wants to tuck it away while they read the scene again. */}
      <motion.div {...fadeUp(0.14)} className="w-full max-w-2xl mt-4">
        <button
          onClick={() => setRevealOpen((v) => !v)}
          className="w-full flex items-center justify-between gap-3 rounded-card border px-5 py-4 font-body text-sm cursor-pointer"
          style={{ backgroundColor: "var(--color-bg-secondary)", borderColor: "var(--color-border)" }}
        >
          <span className="flex items-center gap-2">
            <ScrollText className="w-4 h-4" style={{ color: "var(--color-accent)" }} />
            <span
              className="font-heading text-[11px] tracking-[0.16em] uppercase"
              style={{ color: "var(--color-text)" }}
            >
              Historical Reality
            </span>
          </span>
          <motion.span animate={{ rotate: revealOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
            <ChevronDown className="w-4 h-4" style={{ color: "var(--color-text-secondary)" }} />
          </motion.span>
        </button>

        <AnimatePresence initial={false}>
          {revealOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: reduced ? 0 : 0.25, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <div
                className="rounded-card border px-5 py-4 mt-2 font-body text-sm leading-relaxed italic"
                style={{
                  backgroundColor: "var(--color-surface)",
                  borderColor: "var(--color-border)",
                  color: "var(--color-text-secondary)",
                }}
              >
                {chapter.reveal}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      <motion.div {...fadeUp(0.22)} className="w-full max-w-2xl mt-4">
        <div className="flex flex-col gap-3">
          {chapter.choices.map((choice, i) => {
            const isSelected = selectedChoice === i;
            const isDimmed = selectedChoice !== null && !isSelected;
            return (
              <button
                key={i}
                onClick={() => handleChoice(i)}
                disabled={selectedChoice !== null}
                className="text-left rounded-card border px-5 py-4 font-body text-sm transition-all duration-300 cursor-pointer disabled:cursor-default"
                style={{
                  backgroundColor: isSelected ? "var(--color-choice-selected-bg)" : "var(--color-bg-secondary)",
                  borderColor: isSelected ? "var(--color-success)" : "var(--color-border)",
                  opacity: isDimmed ? 0.45 : 1,
                }}
                onMouseEnter={(e) => {
                  if (selectedChoice === null) e.currentTarget.style.borderColor = "var(--color-accent)";
                }}
                onMouseLeave={(e) => {
                  if (selectedChoice === null) e.currentTarget.style.borderColor = "var(--color-border)";
                }}
              >
                <span
                  className="block font-heading text-[10px] tracking-[0.14em] uppercase mb-1"
                  style={{ color: "var(--color-text-secondary)" }}
                >
                  {choice.label}
                </span>
                <span>{choice.text}</span>
              </button>
            );
          })}
        </div>
      </motion.div>

      <motion.div {...fadeUp(0.3)} className="mt-10">
        <Link
          href="/characters"
          className="inline-flex items-center gap-1.5 font-body text-sm"
          style={{ color: "var(--color-text-secondary)" }}
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Choose a different perspective
        </Link>
      </motion.div>
    </>
  );
}