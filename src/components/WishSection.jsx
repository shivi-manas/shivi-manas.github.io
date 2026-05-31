import React from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

export default function WishSection() {
  return (
    <section className="relative min-h-[70vh] w-full flex flex-col items-center justify-center bg-[#050507] text-white px-6 overflow-hidden select-none py-20">
      {/* Background visual detail */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-gold-400/[0.03] blur-[120px] pointer-events-none" />

      {/* Decorative lines */}
      <div className="absolute left-1/2 -translate-x-1/2 top-0 w-[1px] h-24 bg-gradient-to-b from-zinc-800 to-transparent pointer-events-none" />
      <div className="absolute left-1/2 -translate-x-1/2 bottom-0 w-[1px] h-24 bg-gradient-to-t from-zinc-800 to-transparent pointer-events-none" />

      <div className="relative z-10 text-center max-w-3xl flex flex-col items-center">
        {/* Soft Sparkle Indicator */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 0.7 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="mb-8 p-3 rounded-full bg-gold-400/5 border border-gold-400/10 text-gold-400 flex items-center justify-center"
        >
          <Sparkles className="w-5 h-5 animate-pulse" />
        </motion.div>

        {/* Section title */}
        <motion.span
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 0.6, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-xs font-sans font-semibold tracking-[0.4em] text-zinc-500 uppercase mb-4"
        >
          MY ONLY RESOLUTION
        </motion.span>

        {/* The Wish - Massive luxury typography */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="font-serif text-3xl md:text-5xl font-light italic leading-relaxed text-zinc-200 dark:text-zinc-200"
        >
          "My only wish is to spend all of my tomorrows{" "}
          <span className="text-gold-gradient font-normal not-italic drop-shadow-[0_0_12px_rgba(208,171,104,0.15)]">
            cherishing
          </span>{" "}
          the beautiful heart you hold."
        </motion.h2>
      </div>
    </section>
  );
}
