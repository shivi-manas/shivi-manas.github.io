import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Heart } from "lucide-react";

export default function LoveLetterCard() {
  const shouldReduceMotion = useReducedMotion();

  const letterParagraphs = [
    "In a world that constantly moves, you are my still point. Meeting you wasn't just a beautiful chapter in my life; it was the quiet realignment of my entire universe. From our very first long conversation to the gentle sunsets we have shared, every moment with you has become a sanctuary of peace.",
    "You possess this rare, breathtaking gift of making the most ordinary days feel full of magic and quiet wonder. Thank you for your warmth, for your brilliant laughter, and for the gentle ways you hold my doubts and believe in me, even when my own confidence falters.",
    "Holding your hand is my absolute favorite place in the world. As we look out toward the future and everything we have dreamed of building, I want to promise you my unwavering support, my deepest respect, and a love that only grows stronger and deeper with each passing season.",
    "Today, on your birthday, my only wish is to bring even a fraction of the immense, beautiful light into your life that you bring into mine. You are my safe harbor, my greatest inspiration, and my absolute favorite person."
  ];

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const paragraphVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1.0,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <section id="letter" className="relative py-28 md:py-40 w-full max-w-4xl mx-auto px-6 overflow-hidden select-none">
      {/* Soft floating blurred background elements */}
      <div className="absolute top-0 left-1/4 w-[300px] h-[300px] rounded-full bg-rose-500/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[300px] h-[300px] rounded-full bg-gold-400/5 blur-[120px] pointer-events-none" />

      {/* Love Letter glass panel */}
      <motion.div
        initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        tabIndex="0"
        role="region"
        aria-label="Love Letter from Manas"
        className="glass-panel rounded-3xl p-8 sm:p-14 md:p-20 border gold-border relative shadow-[0_25px_60px_rgba(0,0,0,0.5)] hover:gold-glow transition-all duration-500 bg-gradient-to-b from-zinc-950 via-zinc-900/40 to-zinc-950"
      >
        {/* Glowing top detail */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-[1px] bg-gradient-to-r from-transparent via-gold-400 to-transparent" />

        {/* Letter Head */}
        <div className="flex flex-col items-start mb-10">
          <div className="w-12 h-12 rounded-full bg-gold-400/10 border border-gold-400/20 flex items-center justify-center text-gold-400 mb-6 animate-pulse">
            <Heart className="w-5 h-5 fill-gold-400/10" />
          </div>
          <motion.h3
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="font-serif text-3xl md:text-4xl italic text-gold-400"
          >
            Dear Shivi,
          </motion.h3>
        </div>

        {/* Paragraphs with scroll stagger reveals */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="space-y-6 md:space-y-8 text-left max-w-3xl"
        >
          {letterParagraphs.map((p, idx) => (
            <motion.p
              key={idx}
              variants={paragraphVariants}
              className="font-serif text-base sm:text-lg md:text-xl font-light leading-relaxed text-zinc-300 dark:text-zinc-300 light:text-zinc-800 indent-6 md:indent-8"
            >
              {p}
            </motion.p>
          ))}

          {/* Birthday Greetings */}
          <motion.div variants={paragraphVariants} className="pt-8">
            <h4 className="font-serif text-2xl md:text-3xl font-semibold text-gold-gradient mb-2 tracking-wide">
              Happy Birthday, my love. ❤️
            </h4>
          </motion.div>

          {/* Signature Block */}
          <motion.div
            variants={paragraphVariants}
            className="pt-10 md:pt-14 flex flex-col items-start"
          >
            <span className="font-serif text-sm italic text-zinc-500 uppercase tracking-widest block mb-2">
              Forever Yours,
            </span>
            <span className="font-serif text-3xl md:text-4xl font-medium tracking-wide text-gold-400">
              Manas
            </span>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
