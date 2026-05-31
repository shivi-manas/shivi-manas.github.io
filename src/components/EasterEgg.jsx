import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, X } from "lucide-react";

export default function EasterEgg() {
  const [isOpen, setIsOpen] = useState(false);

  // Keyboard accessibility: escape to close modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  return (
    <>
      {/* Floating Heart Button */}
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 5, duration: 0.8, type: "spring" }}
        whileHover={{ scale: 1.1, rotate: 10 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
        aria-label="Open secret love note"
        className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full bg-gradient-to-tr from-gold-500 via-rose-gold to-rose-500 text-white flex items-center justify-center shadow-[0_8px_32px_0_rgba(183,110,121,0.3)] border border-white/20 cursor-pointer focus-visible:ring-4 focus-visible:ring-gold-400 focus-visible:outline-none"
      >
        <Heart className="w-6 h-6 fill-current animate-pulse" />
      </motion.button>

      {/* Easter Egg Lightbox Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-xl p-6 select-none"
            onClick={() => setIsOpen(false)}
            role="dialog"
            aria-modal="true"
            aria-label="Secret Love Note Modal"
          >
            {/* Close Button */}
            <motion.button
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="absolute top-6 right-6 p-3 rounded-full bg-white/5 border border-white/10 text-white/80 hover:text-white hover:bg-white/15 transition-all cursor-pointer z-50 focus-visible:ring-2 focus-visible:ring-gold-400 focus-visible:outline-none"
              onClick={() => setIsOpen(false)}
              aria-label="Close secret love note modal"
            >
              <X className="w-5 h-5" />
            </motion.button>

            {/* Glass Modal Card */}
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 180 }}
              className="glass-panel max-w-lg w-full rounded-3xl p-8 md:p-12 border gold-border text-center shadow-[0_15px_50px_rgba(208,171,104,0.15)] relative"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Top gradient line */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-[1px] bg-gradient-to-r from-transparent via-gold-400 to-transparent" />

              {/* Heart Graphic */}
              <motion.div
                animate={{ scale: [1, 1.15, 1] }}
                transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
                className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-rose-500/10 text-rose-500 border border-rose-500/15 mb-8"
              >
                <Heart className="w-8 h-8 fill-current" />
              </motion.div>

              {/* Content */}
              <span className="font-sans text-xs font-semibold tracking-[0.3em] text-gold-400 uppercase block mb-3">
                One Last Thing...
              </span>
              
              <h3 className="font-serif text-xl md:text-2xl font-light italic leading-relaxed text-zinc-200 dark:text-zinc-200 mb-8">
                "I love you more today than yesterday, and I will love you even more tomorrow."
              </h3>

              {/* Signoff */}
              <div className="flex flex-col items-center">
                <span className="font-serif text-lg font-medium text-gold-400">
                  — Manas
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
