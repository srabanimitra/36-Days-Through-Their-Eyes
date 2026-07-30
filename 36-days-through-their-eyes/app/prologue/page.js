// app/prologue/page.js
"use client";
import { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useInView } from "framer-motion";
import { ArrowRight, ArrowLeft, Users, ScrollText, GitBranch, ChevronDown } from "lucide-react";
import { useReducedMotion } from "@/lib/useReducedMotion";

const BEATS = [
  {
    icon: Users,
    kicker: "Every character is a composite",
    title: "Not a real person. A pattern of one.",
    body: "Built from publicly reported patterns of experience — not a real named person, and not anyone's private testimony.",
  },
  {
    icon: ScrollText,
    kicker: "Every beat is real, and cited",
    title: "100% of the history here is sourced",
    body: "Dates, events, and outcomes are drawn from public sources: the OHCHR fact-finding report, The Daily Star, and the July 36 Memorial Museum chronology.",
  },
  {
    icon: GitBranch,
    kicker: "The history itself never changes",
    title: "June 5 → August 5, 2024",
    body: "No matter what you choose, the story leads back to the same events. Your choices change how a day is lived — never what actually happened.",
    stamp: true,
  },
];

function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  return (
    <motion.div
      style={{ scaleX: scrollYProgress, backgroundColor: "var(--color-accent)" }}
      className="fixed top-0 left-0 right-0 h-[3px] origin-left z-40"
    />
  );
}

function Beat({ beat, reduced }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-25% 0px -25% 0px" });
  const Icon = beat.icon;

  return (
    <div ref={ref} className="min-h-[70vh] flex items-center justify-center px-6">
      <motion.div
        initial={reduced ? {} : { opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: reduced ? 0 : 0.6, ease: "easeOut" }}
        className="max-w-lg text-center"
      >
        <motion.div
          initial={reduced ? {} : { scale: 0.6, opacity: 0 }}
          animate={inView ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: reduced ? 0 : 0.5, delay: reduced ? 0 : 0.1 }}
          className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-6"
          style={{ backgroundColor: "var(--color-bg-secondary)" }}
        >
          <Icon className="w-5 h-5" style={{ color: "var(--color-accent)" }} strokeWidth={1.75} />
        </motion.div>

        <p
          className="font-heading text-[11px] tracking-[0.2em] uppercase mb-4"
          style={{ color: "var(--color-text-secondary)" }}
        >
          {beat.kicker}
        </p>

        {beat.stamp ? (
          <motion.div
            initial={reduced ? {} : { opacity: 0, rotate: -8, scale: 0.85 }}
            animate={inView ? { opacity: 1, rotate: -2, scale: 1 } : {}}
            transition={{ duration: reduced ? 0 : 0.5, delay: reduced ? 0 : 0.15 }}
            className="inline-block mb-6 px-5 py-2 rounded-card border-2"
            style={{ borderColor: "var(--color-accent)", color: "var(--color-accent)" }}
          >
            <span className="font-heading text-lg sm:text-xl tracking-wide">{beat.title}</span>
          </motion.div>
        ) : (
          <h2 className="font-display text-2xl sm:text-3xl font-semibold mb-5 leading-tight">
            {beat.title}
          </h2>
        )}

        <p
          className="font-body text-sm sm:text-base leading-relaxed"
          style={{ color: "var(--color-text-secondary)" }}
        >
          {beat.body}
        </p>
      </motion.div>
    </div>
  );
}

export default function Prologue() {
  const reduced = useReducedMotion();

  const fadeUp = (delay = 0) => ({
    initial: reduced ? {} : { opacity: 0, y: 14 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: reduced ? 0 : 0.5, delay: reduced ? 0 : delay, ease: "easeOut" },
  });

  return (
    <main className="min-h-screen">
      {!reduced && <ScrollProgressBar />}

      <section className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
        <motion.p
          {...fadeUp(0)}
          className="font-heading text-[11px] tracking-[0.2em] uppercase mb-4"
          style={{ color: "var(--color-accent)" }}
        >
          Before You Begin
        </motion.p>
        <motion.h1
          {...fadeUp(0.1)}
          className="font-display text-4xl sm:text-5xl font-semibold mb-6 leading-tight max-w-xl"
        >
          A note on how this is told
        </motion.h1>
        <motion.p
          {...fadeUp(0.2)}
          className="font-body text-sm sm:text-base max-w-md"
          style={{ color: "var(--color-text-secondary)" }}
        >
          Three things worth knowing before you choose a perspective.
        </motion.p>

        <motion.div
          initial={reduced ? {} : { opacity: 0 }}
          animate={reduced ? { opacity: 1 } : { opacity: 1, y: [0, 8, 0] }}
          transition={{ y: { duration: 1.6, repeat: Infinity, ease: "easeInOut" }, opacity: { delay: 0.4 } }}
          className="mt-16"
        >
          <ChevronDown className="w-5 h-5" style={{ color: "var(--color-text-secondary)" }} />
        </motion.div>
      </section>

      {BEATS.map((beat) => (
        <Beat key={beat.kicker} beat={beat} reduced={reduced} />
      ))}

      <section className="min-h-[70vh] flex flex-col items-center justify-center px-6 text-center">
        <motion.blockquote
          initial={reduced ? {} : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: reduced ? 0 : 0.6, ease: "easeOut" }}
          className="font-display italic text-xl sm:text-2xl max-w-xl mb-12"
          style={{ color: "var(--color-text-secondary)" }}
        >
          &quot;The goal isn&apos;t to invent an alternate history — it&apos;s to make a
          well-documented one easier to feel and remember.&quot;
        </motion.blockquote>

        <motion.div
          initial={reduced ? {} : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: reduced ? 0 : 0.6, delay: reduced ? 0 : 0.15, ease: "easeOut" }}
          className="flex flex-col sm:flex-row gap-3 items-center"
        >
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
            className="group inline-flex items-center gap-2 px-7 py-3 rounded-card font-heading text-sm tracking-wide transition-colors duration-300"
            style={{ backgroundColor: "var(--color-btn-primary)", color: "#FFFFFF" }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "var(--color-btn-primary-hover)")}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "var(--color-btn-primary)")}
          >
            Choose Your Perspective
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5" />
          </Link>
        </motion.div>
      </section>
    </main>
  );
}