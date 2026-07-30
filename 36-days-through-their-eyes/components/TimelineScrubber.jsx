"use client";
import { motion } from "framer-motion";

function formatTooltipDate(dateStr) {
    // Handles both single dates ("2024-06-05") and ranges ("2024-06-06/2024-06-30")
    const opts = { month: "short", day: "numeric", year: "numeric" };
    if (dateStr.includes("/")) {
        const [start, end] = dateStr.split("/");
        const s = new Date(start + "T00:00:00");
        const e = new Date(end + "T00:00:00");
        return `${s.toLocaleDateString("en-US", { month: "short", day: "numeric" })} – ${e.toLocaleDateString("en-US", opts)}`;
    }
    return new Date(dateStr + "T00:00:00").toLocaleDateString("en-US", opts);
}

export default function TimelineScrubber({ nodes, activeDate }) {
    function jumpTo(nodeId) {
        const el = document.getElementById(`node-${nodeId}`);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }

    return (
        <div
            className="sticky top-0 z-20 border-b backdrop-blur-sm"
            style={{
                backgroundColor: "color-mix(in srgb, var(--color-bg) 88%, transparent)",
                borderColor: "var(--color-border)",
            }}
        >
            <div className="max-w-3xl mx-auto px-6 py-3 overflow-x-auto">
                <div className="flex items-center gap-2 min-w-max">
                    {nodes.map((node) => {
                        const isActive = node.date === activeDate;
                        return (
                            <button
                                key={node.node_id}
                                onClick={() => jumpTo(node.node_id)}
                                title={`${formatTooltipDate(node.date)} — ${node.day_label}`}
                                aria-label={`Jump to ${node.day_label}`}
                                className="group relative flex flex-col items-center shrink-0 py-1 cursor-pointer"
                            >
                                <motion.span
                                    animate={{
                                        scale: isActive ? 1.35 : 1,
                                        backgroundColor: isActive
                                            ? "var(--color-timeline-current)"
                                            : "var(--color-timeline-upcoming)",
                                    }}
                                    transition={{ duration: 0.25 }}
                                    className="block w-2 h-2 rounded-full"
                                />
                                <span
                                    className="pointer-events-none absolute top-6 left-1/2 -translate-x-1/2 flex flex-col items-center whitespace-nowrap rounded-card border px-2.5 py-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-30"
                                    style={{
                                        backgroundColor: "var(--color-surface)",
                                        borderColor: "var(--color-border)",
                                        color: "var(--color-text)",
                                    }}
                                >
                                    <span
                                        className="font-heading text-[9px] tracking-[0.1em] uppercase"
                                        style={{ color: "var(--color-accent)" }}
                                    >
                                        {formatTooltipDate(node.date)}
                                    </span>
                                    <span className="text-[10px] font-body">{node.day_label}</span>
                                </span>
                            </button>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}