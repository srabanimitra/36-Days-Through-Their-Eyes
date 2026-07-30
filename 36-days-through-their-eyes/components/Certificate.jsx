"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Award, Share2, Check } from "lucide-react";
import charactersData from "@/data/characters.json";
import { useReducedMotion } from "@/lib/useReducedMotion";

export default function Certificate({ completed }) {
    const reduced = useReducedMotion();
    const [copied, setCopied] = useState(false);

    const completedChars = charactersData.filter((c) => completed.includes(c.id));

    async function handleShare() {
        const shareText =
            "I lived through 36 Days Through Their Eyes — from every perspective the project offers. History cannot be changed. Only the way you live it can.";
        const shareUrl = typeof window !== "undefined" ? window.location.origin : "";

        if (typeof navigator !== "undefined" && navigator.share) {
            try {
                await navigator.share({ title: "36 Days Through Their Eyes", text: shareText, url: shareUrl });
                return;
            } catch {
                // user cancelled — fall through to clipboard
            }
        }
        try {
            await navigator.clipboard.writeText(`${shareText} ${shareUrl}`);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch {
            // clipboard unavailable — nothing more to do silently
        }
    }

    return (
        <motion.div
            initial={reduced ? {} : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduced ? 0 : 0.6, ease: "easeOut" }}
            className="max-w-xl mx-auto rounded-card border p-8 sm:p-10 text-center"
            style={{
                backgroundColor: "var(--color-surface)",
                borderColor: "var(--color-accent)",
                boxShadow: "var(--shadow-soft)",
            }}
        >
            <div
                className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-5"
                style={{ backgroundColor: "var(--color-bg-secondary)" }}
            >
                <Award className="w-6 h-6" style={{ color: "var(--color-accent)" }} strokeWidth={1.5} />
            </div>

            <p
                className="font-heading text-[11px] tracking-[0.2em] uppercase mb-3"
                style={{ color: "var(--color-accent)" }}
            >
                Every Vantage Point
            </p>

            <h2 className="font-display text-2xl sm:text-3xl font-semibold mb-4 leading-tight">
                You&apos;ve walked through these 36 days as {completedChars.length} different people.
            </h2>

            <p className="font-body text-sm mb-6" style={{ color: "var(--color-text-secondary)" }}>
                {completedChars.map((c) => c.name).join(" · ")}
            </p>

            <p className="font-body text-sm leading-relaxed mb-8" style={{ color: "var(--color-text-secondary)" }}>
                The same fixed history looked different from each side of it. That
                difference — not the history itself — was always the point.
            </p>

            <button
                onClick={handleShare}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-card font-heading text-sm tracking-wide cursor-pointer transition-colors duration-300"
                style={{ backgroundColor: "var(--color-btn-primary)", color: "#FFFFFF" }}
            >
                {copied ? <Check className="w-4 h-4" /> : <Share2 className="w-4 h-4" />}
                {copied ? "Copied" : "Share this project"}
            </button>
        </motion.div>
    );
}