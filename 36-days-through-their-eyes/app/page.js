// app/page.js
"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { ShieldCheck, ArrowRight, ScrollText } from "lucide-react";
import { useReducedMotion } from "@/lib/useReducedMotion";

export default function Home() {
  const reduced = useReducedMotion();

  const fadeUp = (delay = 0) => ({
    initial: reduced ? {} : { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: reduced ? 0 : 0.5, delay: reduced ? 0 : delay, ease: "easeOut" },
  });

  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center px-6 py-20 overflow-hidden">
      <div
        aria-hidden="true"
        className="hidden md:block absolute left-10 top-0 bottom-0 w-px"
        style={{ backgroundColor: "var(--color-divider)" }}
      />

      <div className="relative w-full max-w-2xl text-center">
        <motion.div
          {...fadeUp(0)}
          className="inline-flex items-center gap-2 mb-8 px-4 py-1.5 rounded-card border -rotate-2"
          style={{ borderColor: "var(--color-accent)", color: "var(--color-accent)" }}
        >
          <ShieldCheck className="w-3.5 h-3.5" strokeWidth={2} />
          <span className="font-heading text-[11px] tracking-[0.18em] uppercase">
            Sourced &amp; Verified
          </span>
        </motion.div>

        <motion.h1
          {...fadeUp(0.1)}
          className="font-display text-5xl sm:text-6xl md:text-7xl font-semibold leading-[1.05] tracking-tight mb-6"
        >
          36 Days Through
          <br />
          Their Eyes
        </motion.h1>

        <motion.p
          {...fadeUp(0.2)}
          className="font-display italic text-xl sm:text-2xl mb-3"
          style={{ color: "var(--color-text-secondary)" }}
        >
          History cannot be changed.
          <br className="sm:hidden" /> Only the way you live it can.
        </motion.p>

        <motion.p
          {...fadeUp(0.28)}
          className="font-body text-sm sm:text-base max-w-md mx-auto mb-10"
          style={{ color: "var(--color-text-secondary)" }}
        >
          Live through the July 2024 uprising in Bangladesh as ordinary
          people. Every choice changes how a moment is experienced — never
          what actually happened.
        </motion.p>

        <motion.div
          {...fadeUp(0.36)}
          className="flex flex-col sm:flex-row gap-3 justify-center items-center"
        >
          <Link
            href="/prologue"
            className="group inline-flex items-center gap-2 px-7 py-3 rounded-card font-heading text-sm tracking-wide transition-colors duration-300"
            style={{ backgroundColor: "var(--color-btn-primary)", color: "#FFFFFF" }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "var(--color-btn-primary-hover)")}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "var(--color-btn-primary)")}
          >
            Begin
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5" />
          </Link>

          <Link
            href="/timeline"
            className="inline-flex items-center gap-2 px-7 py-3 rounded-card border font-heading text-sm tracking-wide transition-colors duration-300"
            style={{ borderColor: "var(--color-border)", color: "var(--color-text)" }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "var(--color-btn-secondary-hover)")}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
          >
            <ScrollText className="w-4 h-4" />
            Explore the Timeline
          </Link>
        </motion.div>
      </div>

      <motion.div
        {...fadeUp(0.5)}
        className="relative mt-20 pt-6 max-w-md w-full text-center"
        style={{ borderTop: "1px solid var(--color-divider)" }}
      >
        <p className="font-body text-xs" style={{ color: "var(--color-text-secondary)" }}>
          Every account is grounded in public record — OHCHR, The Daily Star,
          and the July 36 Memorial Museum chronology.
        </p>
      </motion.div>
    </main>
  );
}