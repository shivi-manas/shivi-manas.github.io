import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const phrases = [
  "Opening the chapter of us...",
  "Gathering shared smiles...",
  "Counting the stars in our sky...",
  "Loading memories...",
  "Preparing the magic..."
];

export default function LoadingScreen({ onComplete }) {
  const [currentPhrase, setCurrentPhrase] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Progress incrementor
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 1;
      });
    }, 35); // takes around ~3.5 seconds

    // Phrase cycler
    const phraseInterval = setInterval(() => {
      setCurrentPhrase((prev) => (prev + 1) % phrases.length);
    }, 800);

    return () => {
      clearInterval(progressInterval);
      clearInterval(phraseInterval);
    };
  }, []);

  useEffect(() => {
    if (progress === 100) {
      const timeout = setTimeout(() => {
        onComplete();
      }, 600); // slight buffer for satisfying completion feeling
      return () => clearTimeout(timeout);
    }
  }, [progress, onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#030303] text-white px-6 select-none"
      exit={{ opacity: 0, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } }}
    >
      {/* Background radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(208,171,104,0.05),transparent_60%)] pointer-events-none" />

      <div className="relative flex flex-col items-center max-w-md w-full text-center">
        {/* Subtle glowing heart */}
        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.6, 1, 0.6] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="mb-8 text-gold-400 text-3xl drop-shadow-[0_0_12px_rgba(208,171,104,0.4)]"
        >
          ❤️
        </motion.div>

        {/* Cinematic phrase reveals */}
        <div className="h-8 mb-6 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.p
              key={currentPhrase}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 0.8 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="text-sm font-sans font-light tracking-[0.2em] uppercase text-zinc-400"
            >
              {phrases[currentPhrase]}
            </motion.p>
          </AnimatePresence>
        </div>

        {/* Progress Bar Container */}
        <div className="relative w-48 h-[2px] bg-zinc-800/80 rounded-full overflow-hidden mb-2">
          <motion.div
            className="absolute left-0 top-0 h-full bg-gradient-to-r from-gold-400 to-rose-gold rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Progress percentage */}
        <span className="text-[10px] font-sans font-semibold tracking-widest text-gold-400/80 uppercase">
          {progress}%
        </span>
      </div>
    </motion.div>
  );
}
