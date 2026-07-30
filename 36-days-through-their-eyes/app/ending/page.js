// app/ending/page.js
"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  RotateCcw,
  ScrollText,
  GraduationCap,
  Camera,
  Bike,
  PenLine,
  Check,
} from "lucide-react";
import { useCharacter, clearCharacter } from "@/lib/character";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { markCharacterCompleted, useCompletedCharacters } from "@/lib/completion";
import ThenNowEpilogue from "@/components/ThenNowEpilogue";
import Certificate from "@/components/Certificate";
import charactersData from "@/data/characters.json";

const ICONS = { GraduationCap, Camera, Bike };
const REFLECTION_KEY = "36days:reflection";

export default function EndingPage() {
  const reduced = useReducedMotion();
  const characterId = useCharacter();
  const character = charactersData.find((c) => c.id === characterId);
  const completed = useCompletedCharacters();
  const Icon = ICONS[character?.icon] ?? GraduationCap;

  useEffect(() => {
    if (characterId) markCharacterCompleted(characterId);
  }, [characterId]);

  const allComplete =
    charactersData.length > 0 && completed.length >= charactersData.length;

  const fadeUp = (delay = 0) => ({
    initial: reduced ? {} : { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0 },
    transition: {
      duration: reduced ? 0 : 0.6,
      delay: reduced ? 0 : delay,
      ease: "easeOut",
    },
  });

  return (
    <main className="min-h-screen">
      {/* Memorial reveal block */}
      <section
        className="px-6 py-20 sm:py-28 text-center"
        style={{
          backgroundColor: "var(--color-memorial-bg)",
          color: "var(--color-memorial-text)",
        }}
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
            {character
              ? `${character.name} was never a real person.`
              : "The person you followed was never a real person."}
          </motion.h1>

          <motion.p
            {...fadeUp(0.2)}
            className="font-body text-sm sm:text-base leading-relaxed opacity-85"
          >
            {character
              ? `They were a composite, built from publicly reported patterns of how a ${character.tagline.toLowerCase()} lived through these thirty-six days — not any single person's private testimony.`
              : "They were a composite, built from publicly reported patterns of ordinary life during these thirty-six days — not any single person's private testimony."}{" "}
            What follows really happened, to real people, and is drawn entirely
            from public record.
          </motion.p>
        </div>
      </section>

      {/* Personal reflection — saved locally only, never sent anywhere */}
      <ReflectionBox reduced={reduced} />

      {/* Then & Now */}
      <ThenNowEpilogue />

      {/* Completion certificate — shown once every character has been completed */}
      {allComplete && (
        <section className="px-6 py-16">
          <Certificate completed={completed} />
        </section>
      )}

      {/* Actions */}
      <section className="px-6 pb-24 text-center">
        <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
          <Link
            href="/characters"
            onClick={() => clearCharacter()}
            className="inline-flex items-center gap-2 px-7 py-3 rounded-card font-heading text-sm tracking-wide"
            style={{
              backgroundColor: "var(--color-btn-primary)",
              color: "#FFFFFF",
            }}
          >
            <RotateCcw className="w-4 h-4" />
            Live It Again, Differently
          </Link>

          <Link
            href="/timeline"
            className="inline-flex items-center gap-2 px-7 py-3 rounded-card border font-heading text-sm tracking-wide"
            style={{
              borderColor: "var(--color-border)",
              color: "var(--color-text)",
            }}
          >
            <ScrollText className="w-4 h-4" />
            Revisit the Full Timeline
          </Link>
        </div>

        <div className="flex flex-col items-center gap-3 mt-8">
          <Link
            href="/characters"
            onClick={() => clearCharacter()}
            className="inline-flex items-center gap-1.5 font-body text-sm"
            style={{ color: "var(--color-text-secondary)" }}
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Choose a different perspective
          </Link>

          <Link
            href="/memory-wall"
            className="inline-flex items-center gap-1.5 font-body text-sm underline underline-offset-4"
            style={{ color: "var(--color-accent)" }}
          >
            See the real people behind this
          </Link>

          <Link
            href="/sources"
            className="inline-flex items-center gap-1.5 font-body text-sm"
            style={{ color: "var(--color-text-secondary)" }}
          >
            View all sources
          </Link>
        </div>
      </section>
    </main>
  );
}

function ReflectionBox({ reduced }) {
  // Read any previously saved reflection directly in the initializer instead
  // of in an effect — avoids the extra render and the react-hooks lint rule
  // against calling setState from inside useEffect.
  const [value, setValue] = useState(() => {
    if (typeof window === "undefined") return "";
    try {
      return window.localStorage.getItem(REFLECTION_KEY) ?? "";
    } catch {
      return "";
    }
  });
  const [saved, setSaved] = useState(() => {
    if (typeof window === "undefined") return false;
    try {
      return Boolean(window.localStorage.getItem(REFLECTION_KEY));
    } catch {
      return false;
    }
  });

  function handleSave() {
    try {
      window.localStorage.setItem(REFLECTION_KEY, value);
    } catch {
      // Ignore — saving is best-effort only.
    }
    setSaved(true);
  }

  const fadeUp = (delay = 0) => ({
    initial: reduced ? {} : { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0 },
    transition: {
      duration: reduced ? 0 : 0.5,
      delay: reduced ? 0 : delay,
      ease: "easeOut",
    },
  });

  return (
    <section
      className="px-6 py-16"
      style={{ backgroundColor: "var(--color-bg-secondary)" }}
    >
      <motion.div {...fadeUp(0)} className="max-w-xl mx-auto text-center">
        <div className="flex items-center justify-center gap-2 mb-3">
          <PenLine
            className="w-4 h-4"
            style={{ color: "var(--color-accent)" }}
          />
          <p
            className="font-heading text-[11px] tracking-[0.2em] uppercase"
            style={{ color: "var(--color-text-secondary)" }}
          >
            Before You Go
          </p>
        </div>
        <h2 className="font-display text-2xl sm:text-3xl font-semibold mb-3">
          What would you have done?
        </h2>
        <p
          className="font-body text-sm mb-6"
          style={{ color: "var(--color-text-secondary)" }}
        >
          Write a few lines if you want. This stays only on your device —
          nothing is sent anywhere.
        </p>

        <textarea
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            setSaved(false);
          }}
          rows={4}
          placeholder="I think I would have..."
          className="w-full rounded-card border px-4 py-3 font-body text-sm resize-none focus:outline-none"
          style={{
            backgroundColor: "var(--color-surface)",
            borderColor: "var(--color-border)",
            color: "var(--color-text)",
          }}
        />

        <div className="flex items-center justify-center gap-3 mt-4">
          <button
            onClick={handleSave}
            disabled={!value.trim()}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-card font-heading text-sm tracking-wide disabled:opacity-40 disabled:cursor-default cursor-pointer"
            style={{
              backgroundColor: "var(--color-btn-primary)",
              color: "#FFFFFF",
            }}
          >
            {saved ? <Check className="w-4 h-4" /> : null}
            {saved ? "Saved" : "Save on this device"}
          </button>
        </div>
      </motion.div>
    </section>
  );
}