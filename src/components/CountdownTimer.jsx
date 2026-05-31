import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Clock } from "lucide-react";
import { config } from "../config";

export default function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isCompleted: false,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = +new Date(config.countdownDate) - +new Date();
      let newTimeLeft = {};

      if (difference <= 0) {
        newTimeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0, isCompleted: true };
      } else {
        newTimeLeft = {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
          isCompleted: false,
        };
      }
      setTimeLeft(newTimeLeft);
    };

    calculateTimeLeft();
    const interval = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(interval);
  }, []);

  const timeBlocks = [
    { label: "Days", value: timeLeft.days },
    { label: "Hours", value: timeLeft.hours },
    { label: "Minutes", value: timeLeft.minutes },
    { label: "Seconds", value: timeLeft.seconds },
  ];

  return (
    <section id="countdown" className="relative py-24 md:py-36 w-full max-w-7xl mx-auto px-6 overflow-hidden select-none">
      {/* Background elegant blurs */}
      <div className="absolute top-1/2 left-[10%] w-[300px] h-[300px] rounded-full bg-violet-600/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/2 right-[10%] w-[300px] h-[300px] rounded-full bg-amber-500/5 blur-[120px] pointer-events-none" />

      {/* Header */}
      <div className="text-center mb-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 0.7, scale: 1 }}
          viewport={{ once: true }}
          className="w-12 h-12 rounded-full bg-gold-400/10 border border-gold-400/20 flex items-center justify-center text-gold-400 mx-auto mb-4 animate-pulse"
        >
          <Clock className="w-5 h-5" />
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="text-3xl md:text-5xl font-serif font-bold text-zinc-100 dark:text-zinc-100 light:text-zinc-900 mt-2"
        >
          Our Next Beautiful Chapter
        </motion.h2>
        <div className="w-16 h-[1px] bg-gold-400/50 mx-auto mt-6" />
      </div>

      {/* Timer Cards Grid */}
      <div className="max-w-4xl mx-auto flex flex-wrap justify-center gap-2 sm:gap-4 md:gap-8 px-2 sm:px-4">
        {timeBlocks.map((block) => (
          <motion.div
            key={block.label}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            whileHover={{ scale: 1.03 }}
            className="w-[21%] min-w-[66px] max-w-[180px] aspect-[4/5] sm:w-32 sm:h-40 md:w-44 md:h-52 glass-panel rounded-xl sm:rounded-3xl border gold-border flex flex-col items-center justify-center shadow-xl relative group"
          >
            {/* Top decorative glass overlay */}
            <div className="absolute inset-x-0 top-0 h-1/2 border-b border-white/[0.02] bg-white/[0.01] rounded-t-xl sm:rounded-t-3xl pointer-events-none" />

            {/* Glowing spot */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-gold-400/5 blur-md opacity-0 group-hover:opacity-100 transition-opacity" />

            {/* Animated Time Value */}
            <div className="text-xl sm:text-4xl md:text-6xl font-serif font-semibold text-gold-gradient relative z-10 w-full text-center overflow-hidden flex items-center justify-center">
              <AnimatePresence mode="wait">
                <motion.span
                  key={block.value}
                  initial={{ y: 15, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -15, opacity: 0 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="inline-block"
                >
                  {block.value.toString().padStart(2, "0")}
                </motion.span>
              </AnimatePresence>
            </div>

            {/* Label */}
            <span className="text-[7px] sm:text-[10px] md:text-xs font-sans font-bold tracking-[0.15em] sm:tracking-[0.2em] text-zinc-500 group-hover:text-gold-400 transition-colors uppercase relative z-10 mt-1 sm:mt-3">
              {block.label}
            </span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
