// app/timeline/page.js
"use client";
import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ExternalLink, ChevronDown } from "lucide-react";
import timelineData from "@/data/timeline.json";
import { useReducedMotion } from "@/lib/useReducedMotion";

function formatDateLabel(dateStr) {
    // Handles both single dates ("2024-06-05") and ranges ("2024-06-06/2024-06-30")
    const opts = { month: "long", day: "numeric", year: "numeric" };
    if (dateStr.includes("/")) {
        const [start, end] = dateStr.split("/");
        const s = new Date(start + "T00:00:00");
        const e = new Date(end + "T00:00:00");
        return `${s.toLocaleDateString("en-US", { month: "long", day: "numeric" })} – ${e.toLocaleDateString("en-US", opts)}`;
    }
    return new Date(dateStr + "T00:00:00").toLocaleDateString("en-US", opts);
}

function TimelineEntry({ node, index, reduced }) {
    const [open, setOpen] = useState(false);
    const sources = [
        node.source_1_name && { name: node.source_1_name, url: node.source_1_url },
        node.source_2_name && { name: node.source_2_name, url: node.source_2_url },
    ].filter(Boolean);

    return (
        <motion.div
            initial={reduced ? {} : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: reduced ? 0 : 0.5, ease: "easeOut" }}
            className="relative pl-10 sm:pl-16 pb-12 last:pb-0"
        >
            {/* Timeline line */}
            <div
                aria-hidden="true"
                className="absolute left-3 sm:left-5 top-1 bottom-0 w-px"
                style={{ backgroundColor: "var(--color-timeline-line)", opacity: 0.35 }}
            />
            {/* Node dot */}
            <div
                aria-hidden="true"
                className="absolute left-[7px] sm:left-[13px] top-1.5 w-2.5 h-2.5 rounded-full"
                style={{ backgroundColor: "var(--color-timeline-current)" }}
            />

            <span
                className="font-heading text-[11px] tracking-[0.16em] uppercase"
                style={{ color: "var(--color-accent)" }}
            >
                {formatDateLabel(node.date)}
            </span>

            <h3 className="font-display text-2xl sm:text-3xl font-semibold mt-1 mb-3 leading-tight">
                {node.day_label}
            </h3>

            <p
                className="font-body text-sm sm:text-base leading-relaxed max-w-2xl"
                style={{ color: "var(--color-text-secondary)" }}
            >
                {node.historical_event}
            </p>

            {sources.length > 0 && (
                <div className="mt-4">
                    <button
                        onClick={() => setOpen((o) => !o)}
                        className="inline-flex items-center gap-1.5 font-heading text-xs tracking-wide uppercase transition-colors"
                        style={{ color: "var(--color-text-secondary)" }}
                    >
                        Sources &amp; citations
                        <ChevronDown
                            className="w-3.5 h-3.5 transition-transform duration-300"
                            style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
                        />
                    </button>

                    <AnimatePresence initial={false}>
                        {open && (
                            <motion.div
                                initial={reduced ? {} : { height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={reduced ? {} : { height: 0, opacity: 0 }}
                                transition={{ duration: reduced ? 0 : 0.25 }}
                                className="overflow-hidden"
                            >
                                <ul className="mt-3 space-y-2">
                                    {sources.map((s) => (
                                        <li key={s.url}>
                                            <a
                                                href={s.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center gap-1.5 text-sm rounded-card px-3 py-1.5 border transition-colors"
                                                style={{ borderColor: "var(--color-border)" }}
                                            >
                                                {s.name}
                                                <ExternalLink className="w-3 h-3" />
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            )}
        </motion.div>
    );
}

export default function TimelinePage() {
    const reduced = useReducedMotion();

    return (
        <main className="min-h-screen px-6 py-16 sm:py-20">
            <div className="max-w-3xl mx-auto">
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 mb-10 font-heading text-sm tracking-wide"
                    style={{ color: "var(--color-text-secondary)" }}
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back
                </Link>

                <p
                    className="font-heading text-[11px] tracking-[0.18em] uppercase mb-3"
                    style={{ color: "var(--color-accent)" }}
                >
                    June 5 – August 5, 2024
                </p>
                <h1 className="font-display text-4xl sm:text-5xl font-semibold mb-4 leading-tight">
                    The Timeline
                </h1>
                <p
                    className="font-body text-sm sm:text-base max-w-xl mb-16"
                    style={{ color: "var(--color-text-secondary)" }}
                >
                    Every date below is real, sourced, and unchangeable. This is the
                    fixed spine the narrative is built around — the same history,
                    however differently each character lived through it.
                </p>

                <div>
                    {timelineData.map((node, i) => (
                        <TimelineEntry key={node.node_id} node={node} index={i} reduced={reduced} />
                    ))}
                </div>
            </div>
        </main>
    );
}