"use client";

import { motion, AnimatePresence } from "framer-motion";

export default function LoadingScreen() {
  return (
    <AnimatePresence>
      <motion.div
        className="loading-screen"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1.2 }}
      >
        <div className="loading-overlay" />

        <div className="loading-content">
          <motion.h1
            className="loading-title"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 1.2,
            }}
          >
            36 Days
          </motion.h1>

          <motion.h2
            className="loading-subtitle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              delay: 1.4,
              duration: 1,
            }}
          >
            Through Their Eyes
          </motion.h2>

          <motion.p
            className="loading-quote"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              delay: 2.7,
              duration: 1,
            }}
          >
            &ldquo;History is not only remembered.
            <br />
            It is lived.&rdquo;
          </motion.p>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}