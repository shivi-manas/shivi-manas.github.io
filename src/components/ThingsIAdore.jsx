import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Heart } from "lucide-react";

const adoreStatements = [
  "You believe in me even when my own confidence falters, acting as my unwavering light.",
  "Your presence brings a quiet, reassuring peace into my most chaotic and difficult days.",
  "You understand the unspoken emotions behind my silence better than anyone else ever could.",
  "You make the simplest, ordinary moments feel like timeless, beautiful adventures.",
  "Your unwavering support is the foundation upon which I build my biggest dreams.",
  "Your laugh is my favorite soundtrack, capable of shifting my entire day instantly.",
  "In a world full of constant noise, you are my safe, quiet, and loving harbor.",
  "You accept me completely—with all my strengths, my flaws, and my eccentricities.",
  "Your gentle encouragement challenges me to grow into a better man every single day.",
  "You bring a beautiful, lighthearted playfulness that perfectly balances my serious soul.",
  "You are my true home, a sanctuary where I can be entirely myself without any pretense.",
  "The absolute warmth in your eyes whenever you look at me melts all my worries away.",
  "You possess an incredible depth of mind and soul that leaves me constantly in awe.",
  "Your resilience and inner strength inspire me more than you will ever realize.",
  "You remember the smallest details, showing how deeply and genuinely you care.",
  "The comfort of your hand in mine makes even the most difficult path feel passable.",
  "Your kindness is a gentle force that makes the world a softer place for everyone.",
  "You celebrate my tiny achievements as if they were major, groundbreaking victories.",
  "We share an unspoken language of glances, micro-smiles, and quiet gestures.",
  "You have a beautiful way of seeing the best in people, especially when they cannot see it.",
  "Your beautiful, loving heart holds an ocean of patience, compassion, and support.",
  "The sparkling intelligence in your conversations keeps me forever captivated.",
  "You stand beside me through everything as my equal, my partner, and my closest confidante.",
  "You make me look forward to growing old, knowing every chapter will be shared with you.",
  "Quite simply, you are the best part of my today, and the anchor of all my tomorrows."
];

export default function ThingsIAdore() {
  const shouldReduceMotion = useReducedMotion();

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: shouldReduceMotion ? 0 : 25 
    },
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
    <section 
      id="adore" 
      className="relative py-28 md:py-40 w-full max-w-7xl mx-auto px-6 overflow-hidden select-none"
      role="region"
      aria-label="Things I Adore About You"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-[20%] right-[-15%] w-[450px] h-[450px] rounded-full bg-gold-400/5 blur-[160px] pointer-events-none" />
      <div className="absolute bottom-[20%] left-[-15%] w-[450px] h-[450px] rounded-full bg-rose-500/5 blur-[160px] pointer-events-none" />

      {/* Header */}
      <div className="text-center mb-24">
        <motion.span
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 0.6, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-xs font-sans font-bold tracking-[0.4em] text-gold-400 uppercase block mb-3"
        >
          The Depth of My Devotion
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="text-4xl md:text-6xl font-serif font-bold text-zinc-100 dark:text-zinc-100 light:text-zinc-900 mt-2"
        >
          Things I Adore About You
        </motion.h2>
        <div className="w-20 h-[1px] bg-gradient-to-r from-transparent via-gold-400 to-transparent mx-auto mt-6" />
      </div>

      {/* Asymmetric Elegant Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {adoreStatements.map((text, idx) => {
          const isLarge = (idx + 1) % 7 === 0; // Create an asymmetrical rhythm

          return (
            <motion.div
              key={idx}
              variants={cardVariants}
              whileHover={{
                y: shouldReduceMotion ? 0 : -6,
                borderColor: "rgba(208, 171, 104, 0.35)",
                boxShadow: "0 20px 40px -15px rgba(208, 171, 104, 0.15)",
              }}
              tabIndex="0"
              role="article"
              aria-label={`Adoration Note ${idx + 1}: ${text}`}
              className={`glass-panel p-8 rounded-2xl border gold-border transition-all duration-500 relative group flex flex-col justify-between min-h-[180px] ${
                isLarge ? "sm:col-span-2 lg:col-span-2 bg-gradient-to-br from-zinc-950 via-zinc-900/60 to-zinc-950" : ""
              }`}
            >
              {/* Card Ribbon Line */}
              <div className="absolute top-0 left-8 right-8 h-[1px] bg-gradient-to-r from-transparent via-gold-400/20 to-transparent group-hover:via-gold-400/40 transition-all duration-500" />

              {/* Card Header Tag */}
              <div className="flex items-center justify-between mb-6">
                <span className="font-sans text-[10px] font-bold tracking-widest text-gold-400/50 group-hover:text-gold-400 transition-colors uppercase">
                  Note {(idx + 1).toString().padStart(2, "0")}
                </span>
                <Heart className="w-4 h-4 text-rose-500/20 group-hover:text-rose-500/80 group-hover:scale-110 transition-all duration-300 fill-current" />
              </div>

              {/* Devotional Copy */}
              <p className="font-serif text-base md:text-lg font-light leading-relaxed text-zinc-300 dark:text-zinc-300 light:text-zinc-800 group-hover:text-zinc-100 transition-colors">
                {text}
              </p>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}
