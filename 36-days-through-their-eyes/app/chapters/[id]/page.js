// app/chapters/[id]/page.js
"use client";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ScrollText, SplitSquareVertical, ArrowRight } from "lucide-react";
import chapters from "@/data/chapters.json";
import { useCharacter } from "@/lib/character";
import { useReducedMotion } from "@/lib/useReducedMotion";

const CHAPTER_IDS = Object.keys(chapters)
  .map(Number)
  .sort((a, b) => a - b);
const TOTAL_CHAPTERS = CHAPTER_IDS.length;
const LAST_CHAPTER_INDEX = CHAPTER_IDS[TOTAL_CHAPTERS - 1];

// Real photos for the Historical Reality reveal, keyed by chapterIndex.
// Not every chapter needs an entry -- chapters not listed here just render
// the text-only archive card. `position` controls CSS object-position
// (defaults to "center top" so faces/heads near the top of a photo don't
// get cropped out by the fixed-height box) -- tweak per-photo if a
// specific image still looks off. `credit` is only needed for
// externally-sourced photos (Commons etc), not your own memory-wall photos.
const REVEAL_PHOTOS = {
  5: [{ src: "/timeline/july-15-gathering.jpg", name: "July 15", position: "center 40%" }],
  6: [
    { src: "/memory-wall/abu-sayed.jpg", name: "Abu Sayed", position: "center 15%" },
    { src: "/memory-wall/wasim-akram.jpg", name: "Wasim Akram" },
  ],
  8: [
    { src: "/memory-wall/mir-mugdho.jpg", name: "Mir Mugdho" },
    { src: "/memory-wall/jahiduzzaman-tanvin.jpg", name: "Tanvin" },
    { src: "/memory-wall/shaykh-yamin.jpg", name: "Sheikh Ashabul Yamin" },
  ],
  13: [{ src: "/timeline/august-3-shaheed-minar.jpg", name: "August 3, Shaheed Minar" }],
  15: [{ src: "/timeline/aug5-victory-march.jpg", name: "Victory march, August 5", credit: "CC BY-SA 4.0, Wikimedia Commons", position: "center 42%" }],
};

// Needed for the choice banner's background color below.
function tensionColor(chapterIndex) {
  const t = TOTAL_CHAPTERS > 1 ? chapterIndex / (TOTAL_CHAPTERS - 1) : 1;
  const pct = Math.round(20 + t * 70);
  return `color-mix(in srgb, var(--color-accent) ${pct}%, var(--color-timeline-upcoming))`;
}

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

function RevealPhoto({ photo }) {
  const [broken, setBroken] = useState(false);
  if (broken) return null;
  return (
    <figure className="m-0">
      <img
        src={photo.src}
        alt={photo.name}
        onError={() => setBroken(true)}
        className="w-full h-56 object-cover rounded-card border block"
        style={{
          borderColor: "var(--color-border)",
          objectPosition: photo.position || "center top",
        }}
      />
      <figcaption
        className="font-body text-[11px] mt-1.5"
        style={{ color: "var(--color-text-secondary)" }}
      >
        {photo.name}
        {photo.credit ? ` — ${photo.credit}` : ""}
      </figcaption>
    </figure>
  );
}

function ChapterScene({ chapter, chapterIndex }) {
  const router = useRouter();
  const reduced = useReducedMotion();
  const [selectedChoice, setSelectedChoice] = useState(null);
  // Reveal is no longer shown by default -- it now appears as the
  // *consequence* of picking a choice, not a spoiler sitting next to it.
  const [revealShown, setRevealShown] = useState(false);
  const photos = REVEAL_PHOTOS[chapterIndex];

  const fadeUp = (delay = 0) => ({
    initial: reduced ? {} : { opacity: 0, y: 14 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: reduced ? 0 : 0.45, delay: reduced ? 0 : delay, ease: "easeOut" },
  });

  function handleChoice(index) {
    if (selectedChoice !== null) return;
    setSelectedChoice(index);
    // Small pause so the selected/dimmed state registers, then reveal
    // what actually happened -- no more silent auto-redirect.
    const delay = reduced ? 0 : 500;
    setTimeout(() => setRevealShown(true), delay);
  }

  function handleContinue() {
    if (chapterIndex >= LAST_CHAPTER_INDEX) {
      router.push("/ending");
    } else {
      router.push(`/chapters/${chapterIndex + 1}`);
    }
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

      {/* Choices come right after the narrative, with nothing else
          in between -- the decision stands on its own. */}
      <motion.div {...fadeUp(0.16)} className="w-full max-w-2xl mt-6">
        <div
          className="flex items-center gap-2 px-5 py-2.5 rounded-t-card"
          style={{ backgroundColor: tensionColor(chapterIndex) }}
        >
          <SplitSquareVertical className="w-4 h-4" style={{ color: "#FFFFFF" }} />
          <p className="font-heading text-[11px] tracking-[0.22em] uppercase" style={{ color: "#FFFFFF" }}>
            What do you do?
          </p>
        </div>
        <div
          className="flex flex-col gap-3 p-4 rounded-b-card border border-t-0"
          style={{ backgroundColor: "var(--color-bg-secondary)", borderColor: "var(--color-border)" }}
        >
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
                  backgroundColor: isSelected ? "var(--color-choice-selected-bg)" : "var(--color-surface)",
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

      {/* Historical Reality only appears after a choice is made -- framed
          as consequence, not spoiler. Includes real photo(s) when sourced
          for this chapter (see REVEAL_PHOTOS above). */}
      <AnimatePresence>
        {revealShown && (
          <motion.div
            initial={reduced ? {} : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduced ? 0 : 0.45, ease: "easeOut" }}
            className="w-full max-w-2xl mt-6"
          >
            <div
              className="flex items-center gap-2 px-5 py-2.5 rounded-t-card"
              style={{
                backgroundColor: "var(--color-bg-secondary)",
                borderTop: "1px solid var(--color-border)",
                borderLeft: "1px solid var(--color-border)",
                borderRight: "1px solid var(--color-border)",
              }}
            >
              <ScrollText className="w-4 h-4" style={{ color: "var(--color-accent)" }} />
              <p className="font-heading text-[11px] tracking-[0.22em] uppercase" style={{ color: "var(--color-text)" }}>
                Here&apos;s what really happened
              </p>
            </div>

            <div
              className="rounded-b-card border border-t-0 px-5 py-5"
              style={{ backgroundColor: "var(--color-surface)", borderColor: "var(--color-border)" }}
            >
              <p
                className="font-body text-sm leading-relaxed italic mb-4"
                style={{ color: "var(--color-text-secondary)" }}
              >
                {chapter.reveal}
              </p>

              {photos && photos.length > 0 && (
                <div className={`grid gap-3 ${photos.length > 1 ? "grid-cols-3" : "grid-cols-1"}`}>
                  {photos.map((photo) => (
                    <RevealPhoto key={photo.src} photo={photo} />
                  ))}
                </div>
              )}

              <button
                onClick={handleContinue}
                className="mt-5 inline-flex items-center gap-2 px-6 py-2.5 rounded-card font-heading text-sm tracking-wide transition-all duration-300 hover:-translate-y-0.5 cursor-pointer"
                style={{ backgroundColor: "var(--color-btn-primary)", color: "#fff" }}
              >
                Continue
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

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