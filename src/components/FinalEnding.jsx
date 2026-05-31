import React, { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import StarfieldBackground from "./StarfieldBackground";

export default function FinalEnding() {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.8,
        delayChildren: 0.5,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1.2,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <section className="relative min-h-screen w-full flex flex-col items-center justify-center bg-[#020203] text-white px-6 overflow-hidden select-none py-24">
      {/* Drifting Starfield Background Canvas */}
      <StarfieldBackground activeMode="dark" />

      {/* Cinematic Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,rgba(0,0,0,0.95)_80%)] pointer-events-none z-10" />

      {/* Content wrapper */}
      <div className="relative z-20 max-w-3xl w-full text-center flex flex-col items-center justify-center">
        {/* Soft floating particles backdrop */}
        <div className="absolute w-[40vw] h-[40vw] rounded-full bg-pink-500/[0.02] blur-[150px] pointer-events-none" />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="space-y-6 md:space-y-8"
        >
          {/* Main title */}
          <motion.h2
            variants={itemVariants}
            className="font-serif text-3xl md:text-5xl font-semibold tracking-wide text-gold-400 drop-shadow-[0_0_15px_rgba(208,171,104,0.25)]"
          >
            To The Love Of My Life ❤️
          </motion.h2>

          {/* Core paragraphs */}
          <motion.p
            variants={itemVariants}
            className="font-serif text-lg md:text-2xl font-light italic leading-relaxed text-zinc-300 max-w-2xl mx-auto"
          >
            "No matter how many years pass, you will always be my favorite chapter."
          </motion.p>

          <motion.div variants={itemVariants} className="space-y-3 pt-6">
            <p className="font-sans text-sm md:text-base font-light tracking-[0.2em] text-zinc-400 uppercase">
              Thank you for existing.
            </p>
            <p className="font-sans text-sm md:text-base font-light tracking-[0.2em] text-zinc-400 uppercase">
              Thank you for choosing me.
            </p>
            <p className="font-sans text-sm md:text-base font-light tracking-[0.2em] text-zinc-400 uppercase">
              Thank you for being you.
            </p>
          </motion.div>

          <motion.h3
            variants={itemVariants}
            className="font-serif text-3xl md:text-6xl font-bold tracking-tight text-gold-gradient pt-8"
          >
            Happy Birthday Shivi.
          </motion.h3>

          {/* Signoff */}
          <motion.div variants={itemVariants} className="pt-8 flex flex-col items-center">
            <span className="font-serif text-sm italic text-zinc-500 tracking-widest uppercase mb-2">
              Forever Yours,
            </span>
            <span className="font-serif text-3xl md:text-4xl font-semibold text-gold-400">
              Manas ❤️
            </span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
