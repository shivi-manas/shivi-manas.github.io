import React, { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { config } from "../config";

export default function OurStoryTimeline() {
  const containerRef = useRef(null);
  const shouldReduceMotion = useReducedMotion();

  // Scroll tracing for the central line progression
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"],
  });

  // Scale height of the line from 0 to 100%
  const scaleY = useTransform(scrollYProgress, [0, 0.95], [0, 1]);

  // Map image keys to public assets paths
  const imageMapping = {
    how_we_met: "/assets/how_we_met.png",
    first_conversations: "/assets/first_conversations.png",
    memories_created: "/assets/memories_created.png",
    support_strength: "/assets/support_strength.png",
    dreamed_future: "/assets/dreamed_future.png",
  };

  return (
    <section
      ref={containerRef}
      id="story"
      className="relative py-24 md:py-36 w-full max-w-7xl mx-auto px-6 overflow-hidden select-none"
    >
      {/* Background soft blurs */}
      <div className="absolute top-[20%] left-[-10%] w-[300px] h-[300px] rounded-full bg-violet-600/5 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[-10%] w-[300px] h-[300px] rounded-full bg-rose-600/5 blur-[100px] pointer-events-none" />

      {/* Section Title */}
      <div className="text-center mb-20">
        <motion.span
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 0.7, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-xs font-sans font-semibold tracking-[0.35em] text-gold-400 uppercase"
        >
          A Walk Down Memory Lane
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="text-4xl md:text-6xl font-serif font-bold text-zinc-100 dark:text-zinc-100 light:text-zinc-900 mt-3"
        >
          Our Story
        </motion.h2>
        <div className="w-16 h-[1px] bg-gold-400/50 mx-auto mt-6" />
      </div>

      {/* Timeline Elements Container */}
      <div className="relative mt-16">
        {/* Vertical Center Track (Gray background) */}
        <div className="absolute left-[20px] md:left-1/2 top-0 bottom-0 w-[2px] bg-zinc-800/40 -translate-x-1/2 pointer-events-none" />

        {/* Dynamic Growing Glowing Line */}
        <motion.div
          style={{ scaleY, originY: 0 }}
          className="absolute left-[20px] md:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-gold-400 via-rose-gold to-violet-500 origin-top -translate-x-1/2 pointer-events-none z-10 shadow-[0_0_10px_rgba(208,171,104,0.3)]"
        />

        {/* Timeline cards mapping */}
        {config.timelineEvents.map((event, index) => {
          const isEven = index % 2 === 0;

          return (
            <div
              key={event.id}
              className={`relative mb-16 md:mb-24 flex flex-col md:flex-row items-start ${
                isEven ? "md:justify-start" : "md:justify-end"
              } w-full`}
            >
              {/* Timeline Indicator Dot */}
              <div className="absolute left-[20px] md:left-1/2 top-4 -translate-x-1/2 w-6 h-6 rounded-full border border-gold-400/40 bg-zinc-950 flex items-center justify-center z-20 pointer-events-none shadow-[0_0_12px_rgba(208,171,104,0.2)]">
                <motion.div
                  initial={{ scale: 0.6 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="w-2.5 h-2.5 rounded-full bg-gold-400"
                />
              </div>

              {/* Milestone Card */}
              <motion.div
                initial={{ 
                  opacity: 0, 
                  x: shouldReduceMotion ? 0 : (isEven ? -40 : 40), 
                  y: shouldReduceMotion ? 0 : 20 
                }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                viewport={{ once: true, margin: "-150px" }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                tabIndex="0"
                role="article"
                aria-label={`Milestone: ${event.title}`}
                className="w-[calc(100%-50px)] md:w-[45%] ml-[40px] md:ml-0 glass-panel rounded-2xl overflow-hidden gold-border border p-5 md:p-6 shadow-2xl relative group hover:gold-glow transition-all duration-500"
              >
                {/* Year Badge */}
                <span className="text-[10px] font-sans font-bold tracking-widest text-gold-400 uppercase block mb-1">
                  {event.year}
                </span>

                {/* Milestone Title */}
                <h3 className="text-xl md:text-2xl font-serif font-semibold text-zinc-100 dark:text-zinc-100 light:text-zinc-900 mb-4 flex items-center gap-2">
                  <span>{event.emoji}</span>
                  {event.title}
                </h3>

                {/* Premium Custom Generated Illustration */}
                <div className="w-full h-48 md:h-56 rounded-xl overflow-hidden mb-4 relative bg-zinc-900 border border-white/5">
                  <motion.img
                    src={imageMapping[event.imageKey]}
                    alt={`Illustration representing our milestone: ${event.title}`}
                    loading="lazy"
                    role="img"
                    whileHover={shouldReduceMotion ? {} : { scale: 1.05 }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
                </div>

                {/* Milestone Description */}
                <p className="text-sm font-sans font-light leading-relaxed text-zinc-400 dark:text-zinc-300">
                  {event.description}
                </p>
              </motion.div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
