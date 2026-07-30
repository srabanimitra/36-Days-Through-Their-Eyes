// app/ending/page.js
"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, RotateCcw, ScrollText, GraduationCap, Camera, Bike } from "lucide-react";
import { useCharacter, clearCharacter } from "@/lib/character";
import { useReducedMotion } from "@/lib/useReducedMotion";
import ThenNowEpilogue from "@/components/ThenNowEpilogue";
import charactersData from "@/data/characters.json";

const ICONS = { GraduationCap, Camera, Bike };

export default function EndingPage() {
  const reduced = useReducedMotion();
  const characterId = useCharacter();
  const character = charactersData.find((c) => c.id === characterId);
  const Icon = ICONS[character?.icon] ?? GraduationCap;

  const fadeUp = (delay = 0) => ({
    initial: reduced ? {} : { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: reduced ? 0 : 0.6, delay: reduced ? 0 : delay, ease: "easeOut" },
  });

  return (
    <main className="min-h-screen">
      {/* Memorial reveal block */}
      <section
        className="px-6 py-20 sm:py-28 text-center"
        style={{ backgroundColor: "var(--color-memorial-bg)", color: "var(--color-memorial-text)" }}
      >
        <div className="max-w-xl mx-auto">
          <motion.div
            {...fadeUp(0)}
            className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-6"
            style={{ backgroundColor: "rgba(248,246,242,0.08)" }}
          >
            <Icon className="w-6 h-6" strokeWidth={1.5} />
          </motion.div>

          <motion.p
            {...fadeUp(0.05)}
            className="font-heading text-[11px] tracking-[0.2em] uppercase mb-4 opacity-70"
          >
            This Was Fiction
          </motion.p>

          <motion.h1
            {...fadeUp(0.1)}
            className="font-display text-3xl sm:text-4xl font-semibold mb-6 leading-tight"
          >
            {character ? `${character.name} was never a real person.` : "The person you followed was never a real person."}
          </motion.h1>

          <motion.p
            {...fadeUp(0.2)}
            className="font-body text-sm sm:text-base leading-relaxed opacity-85"
          >
            {character
              ? `They were a composite, built from publicly reported patterns of how a ${character.tagline.toLowerCase()} lived through these thirty-six days — not any single person's private testimony.`
              : "They were a composite, built from publicly reported patterns of ordinary life during these thirty-six days — not any single person's private testimony."}
            {" "}What follows really happened, to real people, and is drawn
            entirely from public record.
          </motion.p>
        </div>
      </section>

      {/* Then & Now */}
      <ThenNowEpilogue />

      {/* Actions */}
      <section className="px-6 pb-24 text-center">
        <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
          <Link
            href="/characters"
            onClick={() => clearCharacter()}
            className="inline-flex items-center gap-2 px-7 py-3 rounded-card font-heading text-sm tracking-wide"
            style={{ backgroundColor: "var(--color-btn-primary)", color: "#FFFFFF" }}
          >
            <RotateCcw className="w-4 h-4" />
            Live It Again, Differently
          </Link>

          <Link
            href="/timeline"
            className="inline-flex items-center gap-2 px-7 py-3 rounded-card border font-heading text-sm tracking-wide"
            style={{ borderColor: "var(--color-border)", color: "var(--color-text)" }}
          >
            <ScrollText className="w-4 h-4" />
            Revisit the Full Timeline
          </Link>
        </div>

        <Link
          href="/characters"
          onClick={() => clearCharacter()}
          className="inline-flex items-center gap-1.5 font-body text-sm mt-8"
          style={{ color: "var(--color-text-secondary)" }}
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Choose a different perspective
        </Link>
      </section>
    </main>
  );
}