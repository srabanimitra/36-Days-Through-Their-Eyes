// app/characters/page.js
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, GraduationCap, Camera, Bike, Check } from "lucide-react";
import characters from "@/data/characters.json";
import { setCharacter } from "@/lib/character";
import { useReducedMotion } from "@/lib/useReducedMotion";

const ICONS = { GraduationCap, Camera, Bike };

export default function Characters() {
  const router = useRouter();
  const reduced = useReducedMotion();
  const [selectedId, setSelectedId] = useState(null);

  const fadeUp = (delay = 0) => ({
    initial: reduced ? {} : { opacity: 0, y: 14 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: reduced ? 0 : 0.45, delay: reduced ? 0 : delay, ease: "easeOut" },
  });

  function choose(id) {
    if (selectedId) return;
    setSelectedId(id);
    setCharacter(id);
    const delay = reduced ? 0 : 380;
    setTimeout(() => router.push("/chapters/0"), delay);
  }

  return (
    <main className="min-h-screen px-6 py-16 flex flex-col items-center">
      <motion.div {...fadeUp(0)} className="text-center max-w-xl mb-12">
        <p className="font-heading text-[11px] tracking-[0.2em] uppercase mb-3" style={{ color: "var(--color-accent)" }}>
          Choose Your Perspective
        </p>
        <h1 className="font-display text-3xl sm:text-4xl font-semibold mb-3">
          Whose eyes will you see through?
        </h1>
        <p className="font-body text-sm sm:text-base" style={{ color: "var(--color-text-secondary)" }}>
          The 36 days are the same for everyone. What differs is how they&apos;re lived.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 w-full max-w-5xl">
        {characters.map((c, i) => {
          const Icon = ICONS[c.icon] ?? GraduationCap;
          const isSelected = selectedId === c.id;
          const isDimmed = selectedId && !isSelected;

          return (
            <motion.button
              key={c.id}
              {...fadeUp(0.08 + i * 0.08)}
              onClick={() => choose(c.id)}
              disabled={!!selectedId}
              animate={{
                opacity: isDimmed ? 0.4 : 1,
                y: 0,
                scale: isSelected ? 1.02 : 1,
              }}
              className="text-left rounded-card border p-6 flex flex-col h-full transition-colors duration-300 cursor-pointer disabled:cursor-default"
              style={{
                backgroundColor: isSelected ? "var(--color-choice-selected-bg)" : "var(--color-surface)",
                borderColor: isSelected ? "var(--color-success)" : "var(--color-border)",
                boxShadow: "var(--shadow-soft)",
              }}
              onMouseEnter={(e) => {
                if (!selectedId) e.currentTarget.style.borderColor = "var(--color-accent)";
              }}
              onMouseLeave={(e) => {
                if (!selectedId) e.currentTarget.style.borderColor = "var(--color-border)";
              }}
            >
              <div className="flex items-start justify-between mb-5">
                <div
                  className="w-11 h-11 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: "var(--color-bg-secondary)" }}
                >
                  <Icon className="w-5 h-5" style={{ color: "var(--color-accent)" }} strokeWidth={1.75} />
                </div>
                {isSelected && (
                  <div
                    className="w-6 h-6 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: "var(--color-success)" }}
                  >
                    <Check className="w-3.5 h-3.5 text-white" strokeWidth={2.5} />
                  </div>
                )}
              </div>

              <h2 className="font-heading text-lg font-bold mb-1">{c.name}</h2>
              <p
                className="font-body text-[11px] tracking-[0.12em] uppercase mb-3"
                style={{ color: "var(--color-text-secondary)" }}
              >
                {c.tagline}
              </p>
              <p className="font-body text-sm leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>
                {c.description}
              </p>
            </motion.button>
          );
        })}
      </div>

      <motion.div {...fadeUp(0.5)} className="mt-12">
        <Link
          href="/prologue"
          className="inline-flex items-center gap-1.5 font-body text-sm"
          style={{ color: "var(--color-text-secondary)" }}
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Back
        </Link>
      </motion.div>
    </main>
  );
}
