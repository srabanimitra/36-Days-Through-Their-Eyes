// components/ThenNowEpilogue.jsx
"use client";
import { motion } from "framer-motion";
import { ExternalLink, Landmark, Scale, FileText, Users } from "lucide-react";
import epilogueData from "@/data/epilogue.json";
import { useReducedMotion } from "@/lib/useReducedMotion";

const ICONS = {
    government: Landmark,
    accountability: Scale,
    reform: FileText,
    politics: Users,
};

export default function ThenNowEpilogue() {
    const reduced = useReducedMotion();

    return (
        <section className="max-w-2xl mx-auto px-6 py-16">
            <p
                className="font-heading text-[11px] tracking-[0.18em] uppercase mb-3 text-center"
                style={{ color: "var(--color-accent)" }}
            >
                The Story Didn&apos;t End on August 5
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-semibold mb-4 text-center leading-tight">
                Then &amp; Now
            </h2>
            <p
                className="font-body text-sm sm:text-base text-center max-w-lg mx-auto mb-12"
                style={{ color: "var(--color-text-secondary)" }}
            >
                The character you followed only knew what happened up to Hasina&apos;s
                resignation. Here is what came after — cited, and still unfolding.
            </p>

            <div className="space-y-10">
                {epilogueData.map((item, i) => {
                    const Icon = ICONS[item.id] ?? Landmark;
                    return (
                        <motion.div
                            key={item.id}
                            initial={reduced ? {} : { opacity: 0, y: 16 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-60px" }}
                            transition={{ duration: reduced ? 0 : 0.5, delay: reduced ? 0 : i * 0.05 }}
                            className="rounded-card p-6 border"
                            style={{ borderColor: "var(--color-border)", backgroundColor: "var(--color-surface)" }}
                        >
                            <div className="flex items-center gap-2.5 mb-4">
                                <div
                                    className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
                                    style={{ backgroundColor: "var(--color-bg-secondary)" }}
                                >
                                    <Icon className="w-4 h-4" style={{ color: "var(--color-accent)" }} strokeWidth={1.75} />
                                </div>
                                <h3 className="font-heading text-sm tracking-wide uppercase" style={{ color: "var(--color-accent)" }}>
                                    {item.topic}
                                </h3>
                            </div>

                            <div className="grid sm:grid-cols-2 gap-5">
                                <div>
                                    <span
                                        className="font-heading text-[10px] tracking-[0.14em] uppercase block mb-1.5"
                                        style={{ color: "var(--color-text-secondary)" }}
                                    >
                                        Then — August 2024
                                    </span>
                                    <p className="font-body text-sm leading-relaxed">{item.then}</p>
                                </div>
                                <div
                                    className="sm:pl-5"
                                    style={{ borderLeft: "1px solid var(--color-divider)" }}
                                >
                                    <span
                                        className="font-heading text-[10px] tracking-[0.14em] uppercase block mb-1.5"
                                        style={{ color: "var(--color-success)" }}
                                    >
                                        Now
                                    </span>
                                    <p className="font-body text-sm leading-relaxed">{item.now}</p>
                                </div>
                            </div>

                            <a
                                href={item.source_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1.5 mt-4 text-xs"
                                style={{ color: "var(--color-text-secondary)" }}
                            >
                                {item.source_name}
                                <ExternalLink className="w-3 h-3" />
                            </a>
                        </motion.div>
                    );
                })}
            </div>

            <p
                className="font-body text-xs text-center mt-12 max-w-md mx-auto"
                style={{ color: "var(--color-text-secondary)" }}
            >
                Some of this — especially the tribunal verdict and its fairness — is
                actively disputed inside and outside Bangladesh. We&apos;ve tried to
                represent that dispute rather than flatten it.
            </p>
        </section>
    );
}