// app/ending/page.js
// TEMPORARY placeholder — Person B will build out the full memorial/ending screen.
// This exists only so the /chapters -> /ending navigation doesn't 404 during testing.
"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { useCharacter, clearCharacter } from "@/lib/character";
import { useReducedMotion } from "@/lib/useReducedMotion";

export default function EndingPage() {
  const reduced = useReducedMotion();
  const character = useCharacter();

  const fadeUp = (delay = 0) => ({
    initial: reduced ? {} : { opacity: 0, y: 14 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: reduced ? 0 : 0.45, delay: reduced ? 0 : delay, ease: "easeOut" },
  });

  return (
    <main className="min-h-screen px-6 py-16 flex flex-col items-center justify-center text-center">
      <motion.div {...fadeUp(0)} className="max-w-xl">
        <p className="font-heading text-[11px] tracking-[0.2em] uppercase mb-3" style={{ color: "var(--color-accent)" }}>
          36 Days Later
        </p>
        <h1 className="font-display text-3xl sm:text-4xl font-semibold mb-4">
          You reached the end of the road.
        </h1>
        <p className="font-body text-sm sm:text-base mb-2" style={{ color: "var(--color-text-secondary)" }}>
          {character
            ? `You walked through the uprising as the ${character.replace("-", " ")}.`
            : "You walked through the uprising."}
        </p>
        <p className="font-body text-sm" style={{ color: "var(--color-text-secondary)" }}>
          (Placeholder — the real memorial reveal, sourced accounts, and replay flow go here.)
        </p>

        <div className="flex items-center justify-center gap-6 mt-10">
          <Link
            href="/characters"
            className="inline-flex items-center gap-1.5 font-body text-sm"
            style={{ color: "var(--color-text-secondary)" }}
            onClick={() => clearCharacter()}
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Replay as someone else
          </Link>
        </div>
      </motion.div>
    </main>
  );
}
