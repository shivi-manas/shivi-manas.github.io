import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { config } from "../config";

export default function SpecialQualities() {
  const shouldReduceMotion = useReducedMotion();

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <section id="special" className="relative py-24 md:py-36 w-full max-w-7xl mx-auto px-6 overflow-hidden select-none">
      {/* Background glowing circle */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-amber-500/5 blur-[150px] pointer-events-none" />

      {/* Section Header */}
      <div className="text-center mb-20">
        <motion.span
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 0.7, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-xs font-sans font-semibold tracking-[0.35em] text-gold-400 uppercase"
        >
          THE GRACE YOU CARRY
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="text-4xl md:text-6xl font-serif font-bold text-zinc-100 dark:text-zinc-100 light:text-zinc-900 mt-3"
        >
          The Qualities I Cherish
        </motion.h2>
        <div className="w-16 h-[1px] bg-gold-400/30 mx-auto mt-6" />
      </div>

      {/* Grid of Qualities */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
      >
        {config.qualities.map((item, index) => (
          <motion.div
            key={item.title}
            variants={cardVariants}
            whileHover={{
              y: shouldReduceMotion ? 0 : -8,
              borderColor: "rgba(208, 171, 104, 0.35)",
              boxShadow: "0 20px 40px -15px rgba(208, 171, 104, 0.15)",
            }}
            tabIndex="0"
            role="article"
            aria-label={`Quality: ${item.title}`}
            className="glass-panel p-8 rounded-2xl border gold-border transition-all duration-300 relative group flex flex-col items-start"
          >
            {/* Soft decorative glow background in card on hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-gold-400/0 via-gold-400/0 to-gold-400/[0.02] opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity duration-500" />

            {/* Icon representation */}
            <div className="mb-6 p-3 rounded-xl bg-gold-400/10 text-gold-400 border border-gold-400/15 group-hover:bg-gold-400/20 group-hover:text-gold-300 transition-all duration-300">
              <Sparkles className="w-5 h-5 animate-pulse" />
            </div>

            {/* Quality Title */}
            <h3 className="text-xl font-serif font-semibold text-zinc-100 dark:text-zinc-100 light:text-zinc-900 mb-3 group-hover:text-gold-300 transition-colors">
              {item.title}
            </h3>

            {/* Quality Description */}
            <p className="text-sm font-sans font-light leading-relaxed text-zinc-400 dark:text-zinc-300 group-hover:text-zinc-300 transition-colors">
              {item.desc}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
