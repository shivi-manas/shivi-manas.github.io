import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll } from "framer-motion";
import confetti from "canvas-confetti";
import { Sun, Moon } from "lucide-react";

// Component imports
import LoadingScreen from "./components/LoadingScreen";
import HeroSection from "./components/HeroSection";
import OurStoryTimeline from "./components/OurStoryTimeline";
import SpecialQualities from "./components/SpecialQualities";
import MemoryGallery from "./components/MemoryGallery";
import LoveLetterCard from "./components/LoveLetterCard";
import TheFutureReveal from "./components/TheFutureReveal";
import ThingsIAdore from "./components/ThingsIAdore";
import WishSection from "./components/WishSection";
import FinalEnding from "./components/FinalEnding";
import EasterEgg from "./components/EasterEgg";

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [theme, setTheme] = useState("dark");
  const { scrollYProgress } = useScroll();

  // Handle light/dark mode setup
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "dark";
    setTheme(savedTheme);
    if (savedTheme === "light") {
      document.body.classList.add("light");
    } else {
      document.body.classList.remove("light");
    }
  }, []);

  const toggleTheme = () => {
    if (theme === "dark") {
      setTheme("light");
      localStorage.setItem("theme", "light");
      document.body.classList.add("light");
    } else {
      setTheme("dark");
      localStorage.setItem("theme", "dark");
      document.body.classList.remove("light");
    }
  };

  // Launch celebration confetti
  const triggerConfetti = () => {
    const duration = 3.5 * 1000;
    const end = Date.now() + duration;

    (function frame() {
      // Golden and pink confetti mix
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ["#d0ab68", "#b76e79", "#ffccd5", "#ffffff"],
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ["#d0ab68", "#b76e79", "#ffccd5", "#ffffff"],
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();
  };

  const handleLoadingComplete = () => {
    setIsLoading(false);
    // Slight delay to let page mount before launching confetti
    setTimeout(() => {
      triggerConfetti();
    }, 400);
  };

  return (
    <>
      {/* Dynamic Cinematic Loading Screen */}
      <AnimatePresence mode="wait">
        {isLoading && (
          <LoadingScreen key="loader" onComplete={handleLoadingComplete} />
        )}
      </AnimatePresence>

      {!isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="relative min-h-screen w-full overflow-x-hidden transition-colors duration-500 bg-[#030303] text-zinc-300 dark:bg-[#030303] light:bg-[#faf8f5]"
        >
          {/* Scroll Progress Bar */}
          <motion.div
            style={{ scaleX: scrollYProgress }}
            className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-gold-400 via-rose-gold to-violet-500 origin-left z-50 shadow-[0_1px_10px_rgba(208,171,104,0.35)]"
          />

          {/* Floating Dark/Light Toggle */}
          <motion.button
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.6 }}
            onClick={toggleTheme}
            className="fixed top-6 right-6 z-40 w-11 h-11 rounded-full glass-panel border gold-border flex items-center justify-center text-gold-400/80 hover:text-gold-400 hover:scale-105 transition-all shadow-md cursor-pointer focus-visible:ring-2 focus-visible:ring-gold-400 focus-visible:outline-none"
            aria-label="Toggle Theme"
          >
            <AnimatePresence mode="wait">
              {theme === "dark" ? (
                <motion.div
                  key="sun"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Sun className="w-5 h-5" />
                </motion.div>
              ) : (
                <motion.div
                  key="moon"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Moon className="w-5 h-5" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>

          {/* Website Content Sections */}
          <main className="relative">
            {/* 1. Cinematic Hero Section */}
            <HeroSection activeMode={theme} />

            {/* 2. Interactive Milestones Timeline */}
            <OurStoryTimeline />

            {/* 3. Soft Glowing Why You Are Special Cards */}
            <SpecialQualities />

            {/* 4. Luxury Masonry Memory Gallery & Lightbox */}
            <MemoryGallery />

            {/* 5. Things I Adore About You Notes Grid */}
            <ThingsIAdore />

            {/* 6. Luxury Glass Love Letter */}
            <LoveLetterCard />

            {/* 7. High-Contrast Emotional Future Reveal */}
            <TheFutureReveal />

            {/* 8. Cinematic Wish Centering Section */}
            <WishSection />

            {/* 9. Stars Drifting Final Ending */}
            <FinalEnding />
          </main>

          {/* Easter Egg Floating Pulse Heart */}
          <EasterEgg />
        </motion.div>
      )}
    </>
  );
}
