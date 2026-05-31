import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import StarfieldBackground from "./StarfieldBackground";

export default function HeroSection({ activeMode }) {
  const quoteWords = "Of all the beautiful things life has given me, meeting you was my favorite.".split(" ");
  const shouldReduceMotion = useReducedMotion();

  // Container variants for staggered word reveal
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: shouldReduceMotion ? 0.05 : 0.15,
        delayChildren: 0.8,
      },
    },
  };

  // Individual word variants
  const wordVariants = {
    hidden: {
      opacity: 0,
      y: shouldReduceMotion ? 0 : 12,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1], // premium inertial curve
      },
    },
  };

  const titleVariants = {
    hidden: {
      opacity: 0,
      y: shouldReduceMotion ? 0 : 30,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1.5,
        delay: 0.4,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <section className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden px-6 select-none aurora-bg">
      {/* Dynamic Starfield Layer */}
      <StarfieldBackground activeMode={activeMode} />

      {/* Decorative Blur Orbs */}
      <div className="absolute top-[30%] left-[20%] w-[35vw] h-[35vw] rounded-full bg-gold-500/5 blur-[120px] pointer-events-none z-0 dark:block hidden" />
      <div className="absolute bottom-[30%] right-[20%] w-[35vw] h-[35vw] rounded-full bg-gold-400/3 blur-[120px] pointer-events-none z-0 dark:block hidden" />

      {/* Hero Content */}
      <div className="relative z-10 text-center max-w-4xl flex flex-col items-center">
        {/* Glowing Hearts Micro-Detail */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.7, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.2, ease: "easeOut" }}
          className="mb-6 font-sans text-xs tracking-[0.4em] uppercase text-gold-400 font-semibold"
        >
          A DIGITAL LOVE LETTER
        </motion.div>

        {/* Happy Birthday Shivi */}
        <motion.h1
          variants={titleVariants}
          initial="hidden"
          animate="visible"
          className="font-serif text-4xl sm:text-6xl md:text-8xl font-bold tracking-tight mb-8 text-gold-gradient drop-shadow-[0_4px_24px_rgba(208,171,104,0.08)] px-2"
        >
          Happy Birthday Shivi
        </motion.h1>

        {/* Story Quote with premium staggered word fade-in */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-wrap justify-center gap-x-2 gap-y-1 max-w-2xl px-4"
        >
          {quoteWords.map((word, idx) => (
            <motion.span
              key={idx}
              variants={wordVariants}
              className={`font-serif text-lg md:text-2xl font-light italic tracking-wide ${
                word.toLowerCase().includes("favorite") || word.toLowerCase().includes("beautiful")
                  ? "text-gold-400 font-normal drop-shadow-[0_0_8px_rgba(208,171,104,0.2)]"
                  : "text-zinc-400 dark:text-zinc-300"
              }`}
            >
              {word}
            </motion.span>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator with micro-animations */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.8, duration: 1 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-3 cursor-pointer"
        onClick={() => {
          window.scrollTo({
            top: window.innerHeight,
            behavior: "smooth",
          });
        }}
      >
        <span className="text-[10px] font-sans font-semibold tracking-[0.3em] uppercase text-zinc-500 hover:text-gold-400 transition-colors">
          Scroll to Begin
        </span>
        <div className="w-[20px] h-[36px] border border-zinc-600 rounded-full flex justify-center p-[4px] opacity-70 hover:opacity-100 hover:border-gold-400 transition-all">
          <motion.div
            animate={{
              y: [0, 10, 0],
            }}
            transition={{
              duration: 1.8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="w-[4px] h-[8px] bg-gold-400 rounded-full"
          />
        </div>
      </motion.div>
    </section>
  );
}
