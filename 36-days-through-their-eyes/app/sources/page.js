// app/sources/page.js
"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, ExternalLink, ShieldCheck } from "lucide-react";
import timeline from "@/data/timeline.json";
import humanCost from "@/data/human-cost.json";
import epilogue from "@/data/epilogue.json";
import { useReducedMotion } from "@/lib/useReducedMotion";

function collectSources() {
  const map = new Map();

  function add(name, url, context) {
    if (!name || !url) return;
    if (!map.has(url)) {
      map.set(url, { name, url, contexts: new Set() });
    }
    if (context) map.get(url).contexts.add(context);
  }

  timeline.forEach((node) => {
    add(node.source_1_name, node.source_1_url, node.day_label);
    add(node.source_2_name, node.source_2_url, node.day_label);
  });

  humanCost.forEach((entry) => {
    add(entry.source_name, entry.source_url, entry.label);
  });

  epilogue.forEach((entry) => {
    add(entry.source_name, entry.source_url, entry.topic);
  });

  return Array.from(map.values())
    .map((s) => ({ ...s, contexts: Array.from(s.contexts) }))
    .sort((a, b) => a.name.localeCompare(b.name));
}

export default function SourcesPage() {
  const reduced = useReducedMotion();
  const sources = collectSources();

  const fadeUp = (delay = 0) => ({
    initial: reduced ? {} : { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: reduced ? 0 : 0.5, delay: reduced ? 0 : delay, ease: "easeOut" },
  });

  return (
    <main className="min-h-screen px-6 py-16">
      <motion.div {...fadeUp(0)} className="max-w-2xl mx-auto text-center mb-12">
        <div className="inline-flex items-center gap-2 mb-4">
          <ShieldCheck className="w-4 h-4" style={{ color: "var(--color-success)" }} />
          <p
            className="font-heading text-[11px] tracking-[0.2em] uppercase"
            style={{ color: "var(--color-success)" }}
          >
            {sources.length} Sources Cited
          </p>
        </div>
        <h1 className="font-display text-3xl sm:text-4xl font-semibold mb-4">Sources &amp; Methodology</h1>
        <p className="font-body text-sm sm:text-base" style={{ color: "var(--color-text-secondary)" }}>
          Every historical beat, casualty figure, and post-uprising development in this project is
          drawn from public reporting — cross-checked against at least two independent sources where
          possible. Nothing here is invented.
        </p>
      </motion.div>

      <div className="max-w-2xl mx-auto flex flex-col gap-3">
        {sources.map((source, i) => (
          <motion.a
            key={source.url}
            {...fadeUp(0.05 + Math.min(i, 12) * 0.03)}
            href={source.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-start justify-between gap-4 rounded-card border px-5 py-4 font-body text-sm transition-colors duration-300"
            style={{ backgroundColor: "var(--color-surface)", borderColor: "var(--color-border)" }}
            onMouseEnter={(e) => (e.currentTarget.style.borderColor = "var(--color-accent)")}
            onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--color-border)")}
          >
            <div>
              <p className="font-heading text-sm font-bold mb-1">{source.name}</p>
              {source.contexts.length > 0 && (
                <p className="text-xs" style={{ color: "var(--color-text-secondary)" }}>
                  Referenced for: {source.contexts.slice(0, 3).join(", ")}
                  {source.contexts.length > 3 ? ` +${source.contexts.length - 3} more` : ""}
                </p>
              )}
            </div>
            <ExternalLink
              className="w-4 h-4 shrink-0 mt-0.5"
              style={{ color: "var(--color-text-secondary)" }}
            />
          </motion.a>
        ))}
      </div>

      <motion.div {...fadeUp(0.3)} className="max-w-2xl mx-auto text-center mt-10">
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