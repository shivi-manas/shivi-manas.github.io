import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Heart } from "lucide-react";

export default function LoveLetterCard() {
  const shouldReduceMotion = useReducedMotion();

  const letterParagraphs = [
    "Today is your special day.",
    "I want you to know how deeply grateful I am that you are a part of my life.",
    "Thank you for every shared smile.",
    "Thank you for every beautiful memory.",
    "Thank you for every breathtaking moment.",
    "You possess this rare, beautiful gift of making ordinary days feel incredibly special.",
    "You bring a profound sense of peace and quiet during my most difficult times.",
    "You inspire me to look inward, grow, and strive to become a better person every single day.",
    "I hope this birthday brings you as much pure, unadulterated happiness as you bring into my life.",
  ];

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const paragraphVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 15 },
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
    <section id="letter" className="relative py-24 md:py-36 w-full max-w-4xl mx-auto px-6 overflow-hidden select-none">
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
        className="glass-panel rounded-3xl p-6 sm:p-10 md:p-16 border gold-border relative shadow-[0_20px_50px_rgba(0,0,0,0.4)] hover:gold-glow transition-all duration-500"
      >
        {/* Glowing top detail */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-[1px] bg-gradient-to-r from-transparent via-gold-400 to-transparent" />

        {/* Letter Head */}
        <div className="flex flex-col items-center mb-12">
          <div className="w-12 h-12 rounded-full bg-gold-400/10 border border-gold-400/20 flex items-center justify-center text-gold-400 mb-4 animate-pulse">
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
          className="space-y-6 md:space-y-8 text-center max-w-2xl mx-auto"
        >
          {letterParagraphs.map((p, idx) => (
            <motion.p
              key={idx}
              variants={paragraphVariants}
              className="font-serif text-base md:text-lg font-light leading-relaxed text-zinc-300 dark:text-zinc-300 light:text-zinc-800"
            >
              {p}
            </motion.p>
          ))}

          {/* Birthday Greetings */}
          <motion.div variants={paragraphVariants} className="pt-6 md:pt-8">
            <h4 className="font-serif text-2xl md:text-3xl font-semibold text-gold-gradient mb-2 tracking-wide">
              Happy Birthday ❤️
            </h4>
          </motion.div>

          {/* Signature Block */}
          <motion.div
            variants={paragraphVariants}
            className="pt-8 md:pt-12 flex flex-col items-center"
          >
            <span className="font-serif text-sm italic text-zinc-500 uppercase tracking-widest block mb-2">
              Forever,
            </span>
            <span className="font-serif text-2xl md:text-3xl font-medium tracking-wide text-gold-400">
              Manas
            </span>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
