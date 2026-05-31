import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Heart } from "lucide-react";
import { config } from "../config";

export default function ReasonsList() {
  const shouldReduceMotion = useReducedMotion();

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.05, // very fast stagger so 25 cards load smoothly
      },
    },
  };

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      scale: shouldReduceMotion ? 1 : 0.9, 
      y: shouldReduceMotion ? 0 : 20 
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <section id="reasons" className="relative py-24 md:py-36 w-full max-w-7xl mx-auto px-6 overflow-hidden select-none">
      {/* Soft color glows */}
      <div className="absolute top-[30%] left-[-15%] w-[400px] h-[400px] rounded-full bg-violet-600/5 blur-[150px] pointer-events-none" />
      <div className="absolute bottom-[30%] right-[-15%] w-[400px] h-[400px] rounded-full bg-rose-600/5 blur-[150px] pointer-events-none" />

      {/* Title */}
      <div className="text-center mb-20">
        <motion.span
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 0.7, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-xs font-sans font-semibold tracking-[0.35em] text-gold-400 uppercase"
        >
          Twenty-Five Little Things
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="text-4xl md:text-6xl font-serif font-bold text-zinc-100 dark:text-zinc-100 light:text-zinc-900 mt-3"
        >
          25 Reasons I Love You
        </motion.h2>
        <div className="w-16 h-[1px] bg-gold-400/50 mx-auto mt-6" />
      </div>

      {/* 25 Cards Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
      >
        {config.reasons.map((reason, index) => {
          const paddedIndex = (index + 1).toString().padStart(2, "0");

          return (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{
                y: shouldReduceMotion ? 0 : -6,
                borderColor: "rgba(208, 171, 104, 0.3)",
                boxShadow: "0 15px 30px -10px rgba(208, 171, 104, 0.12)",
              }}
              tabIndex="0"
              role="article"
              aria-label={`Reason ${index + 1}: ${reason}`}
              className="glass-panel p-6 rounded-2xl border gold-border transition-all duration-300 relative group flex flex-col justify-between min-h-[140px]"
            >
              {/* Card Index Badge */}
              <div className="flex items-center justify-between mb-4 w-full relative z-10">
                <span className="font-serif text-sm font-semibold tracking-wider text-gold-400/60 group-hover:text-gold-400 transition-colors">
                  #{paddedIndex}
                </span>
                <Heart className="w-3.5 h-3.5 text-rose-500/30 group-hover:text-rose-500/80 group-hover:scale-110 transition-all" />
              </div>

              {/* Reason Content */}
              <p className="font-serif text-sm md:text-base font-light leading-relaxed text-zinc-300 dark:text-zinc-300 light:text-zinc-800 relative z-10 group-hover:text-zinc-100 transition-colors">
                {reason}
              </p>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}
