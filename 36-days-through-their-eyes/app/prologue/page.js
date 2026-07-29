// app/prologue/page.js
"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ArrowLeft, Users, ScrollText, GitBranch } from "lucide-react";
import { useReducedMotion } from "@/lib/useReducedMotion";

const PRINCIPLES = [
  {
    icon: Users,
    title: "Every character is a composite.",
    body: "Built from publicly reported patterns of experience — not a real named person, and not anyone's private testimony.",
  },
  {
    icon: ScrollText,
    title: "Every historical beat is real and cited.",
    body: "Dates, events, and outcomes are drawn from public sources: the OHCHR fact-finding report, The Daily Star, and the July 36 Memorial Museum chronology.",
  },
  {
    icon: GitBranch,
    title: "History itself never changes.",
    body: "No matter what you choose, the story leads back to the same events. Your choices change how a day is lived — never what actually happened.",
  },
];

export default function Prologue() {
  const reduced = useReducedMotion();

  const fadeUp = (delay = 0) => ({
    initial: reduced ? {} : { opacity: 0, y: 14 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: reduced ? 0 : 0.45, delay: reduced ? 0 : delay, ease: "easeOut" },
  });

  return (
    <main className="min-h-screen flex items-center justify-center px-6 py-16">
      <motion.div
        {...fadeUp(0)}
        className="w-full max-w-xl rounded-card border p-8 sm:p-10"
        style={{
          backgroundColor: "var(--color-surface)",
          borderColor: "var(--color-border)",
          boxShadow: "var(--shadow-soft)",
        }}
      >
        <p
          className="font-heading text-[11px] tracking-[0.2em] uppercase mb-3"
          style={{ color: "var(--color-accent)" }}
        >
          Before You Begin
        </p>

        <h1 className="font-display text-3xl sm:text-4xl font-semibold mb-6 leading-tight">
          A note on how this is told
        </h1>

        <div className="space-y-6 mb-8">
          {PRINCIPLES.map((p, i) => (
            <motion.div
              key={p.title}
              {...fadeUp(0.1 + i * 0.08)}
              className="flex gap-4 pb-6 last:pb-0"
              style={{
                borderBottom:
                  i < PRINCIPLES.length - 1 ? "1px solid var(--color-divider)" : "none",
              }}
            >
              <div
                className="shrink-0 w-9 h-9 rounded-full flex items-center justify-center"
                style={{ backgroundColor: "var(--color-bg-secondary)" }}
              >
                <p.icon className="w-4 h-4" style={{ color: "var(--color-accent)" }} strokeWidth={1.75} />
              </div>
              <div>
                <h2 className="font-heading text-base font-bold mb-1">{p.title}</h2>
                <p className="font-body text-sm leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>
                  {p.body}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.blockquote
          {...fadeUp(0.4)}
          className="font-display italic text-lg text-center mb-9 px-4"
          style={{ color: "var(--color-text-secondary)" }}
        >
          &quot;The goal isn&apos;t to invent an alternate history — it&apos;s to make a
          well-documented one easier to feel and remember.&quot;
        </motion.blockquote>

        <motion.div {...fadeUp(0.48)} className="flex flex-col sm:flex-row gap-3 justify-between items-center">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 font-body text-sm"
            style={{ color: "var(--color-text-secondary)" }}
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back
          </Link>

          <Link
            href="/characters"
            className="group inline-flex items-center gap-2 px-6 py-3 rounded-card font-heading text-sm tracking-wide w-full sm:w-auto justify-center transition-colors duration-300"
            style={{ backgroundColor: "var(--color-btn-primary)", color: "#FFFFFF" }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "var(--color-btn-primary-hover)")}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "var(--color-btn-primary)")}
          >
            Choose Your Perspective
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5" />
          </Link>
        </motion.div>
      </motion.div>
    </main>
  );
}