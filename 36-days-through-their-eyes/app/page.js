// src/app/page.js
'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="relative min-h-screen bg-neutral-950 text-neutral-100 flex flex-col items-center justify-center px-6 overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-center max-w-2xl"
      >
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
          36 Days Through Their Eyes
        </h1>
        <p className="text-neutral-400 text-lg italic mb-10">
          History cannot be changed.<br />Only the way you experience it can be.

        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/prologue" className="px-6 py-3 bg-neutral-100 text-neutral-950 rounded-full font-medium hover:bg-neutral-300 transition">
            Start
          </Link>
          <Link href="/timeline" className="px-6 py-3 border border-neutral-700 rounded-full font-medium hover:border-neutral-400 transition">
            Explore Timeline
          </Link>
        </div>
      </motion.div>
    </main>
  );
}