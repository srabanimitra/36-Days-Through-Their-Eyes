// components/HumanCostStrip.jsx
"use client";
import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Info } from "lucide-react";
import costData from "@/data/human-cost.json";

/**
 * A quiet, persistent strip showing the human cost of the uprising,
 * stepping forward only at real, reported checkpoints as the player
 * moves through the timeline. Never interpolates fake daily numbers —
 * it always reflects what was actually reported as of that point.
 *
 * Props:
 *   currentDate: string (e.g. "2024-07-18") — the date currently being viewed
 */
export default function HumanCostStrip({ currentDate }) {
    const [expanded, setExpanded] = useState(false);

    const active = useMemo(() => {
        // Find the most recent checkpoint at or before currentDate
        const sorted = [...costData].sort((a, b) => (a.date < b.date ? -1 : 1));
        let match = sorted[0];
        for (const c of sorted) {
            if (c.date <= currentDate) match = c;
            else break;
        }
        return match;
    }, [currentDate]);

    const isFinal = active.node_id === "n26";

    return (
        <div
            className="w-full border-t"
            style={{ borderColor: "var(--color-divider)", backgroundColor: "var(--color-bg-secondary)" }}
        >
            <div className="max-w-3xl mx-auto px-6 py-3">
                <div className="flex items-center justify-between gap-4 flex-wrap">
                    <div className="flex items-center gap-5 sm:gap-8">
                        <Stat label="Killed" value={active.killed} />
                        <Stat label="Injured" value={active.injured} />
                        <Stat label="Arrested" value={active.arrested} />
                    </div>

                    {active.source_name && (
                        <button
                            onClick={() => setExpanded((e) => !e)}
                            className="inline-flex items-center gap-1 font-heading text-[10px] tracking-wide uppercase"
                            style={{ color: "var(--color-text-secondary)" }}
                            aria-label="Show source for these figures"
                        >
                            <Info className="w-3 h-3" />
                            Source
                        </button>
                    )}
                </div>

                <AnimatePresence initial={false}>
                    {expanded && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="overflow-hidden"
                        >
                            <p
                                className="font-body text-xs leading-relaxed pt-2 max-w-xl"
                                style={{ color: "var(--color-text-secondary)" }}
                            >
                                {active.label}
                                {active.note ? ` ${active.note}` : ""}{" "}
                                {isFinal && (
                                    <span className="italic">
                                        {" "}
                                        Figures are contested and vary by source — this is not a single
                                        confirmed count.
                                    </span>
                                )}
                                {active.source_url && (
                                    <>
                                        {" — "}
                                        <a
                                            href={active.source_url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="underline"
                                            style={{ color: "var(--color-accent)" }}
                                        >
                                            {active.source_name}
                                        </a>
                                    </>
                                )}
                            </p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}

function Stat({ label, value }) {
    return (
        <div className="flex items-baseline gap-1.5">
            <AnimatePresence mode="wait">
                <motion.span
                    key={value}
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 4 }}
                    transition={{ duration: 0.2 }}
                    className="font-heading text-sm sm:text-base font-bold tabular-nums"
                    style={{ color: "var(--color-accent)" }}
                >
                    {value.toLocaleString()}
                    {value >= 1000 ? "+" : ""}
                </motion.span>
            </AnimatePresence>
            <span
                className="font-body text-[10px] sm:text-xs uppercase tracking-wide"
                style={{ color: "var(--color-text-secondary)" }}
            >
                {label}
            </span>
        </div>
    );
}