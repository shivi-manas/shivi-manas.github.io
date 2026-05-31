import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { X, ZoomIn, Eye } from "lucide-react";

const galleryItems = [
  {
    id: 1,
    title: "How We Met",
    subtitle: "The magical beginning",
    desc: "The night the stars aligned, bringing our paths together under the soft glow of destiny.",
    image: "/assets/how_we_met.png",
    aspect: "aspect-square",
  },
  {
    id: 2,
    title: "First Conversations",
    subtitle: "Hours flew like minutes",
    desc: "Talking late into the night at our favorite cozy cafe corner, finding a deep home in your voice.",
    image: "/assets/first_conversations.png",
    aspect: "aspect-[4/5]",
  },
  {
    id: 3,
    title: "Memories Created",
    subtitle: "Sunsets and strolls",
    desc: "Unforgettable long walks along the beach, building our foundation on laughter and quiet sands.",
    image: "/assets/memories_created.png",
    aspect: "aspect-[16/10]",
  },
  {
    id: 4,
    title: "Support & Strength",
    subtitle: "Unwavering anchor",
    desc: "Holding hands tightly through doubts and storms, proving that we are stronger together.",
    image: "/assets/support_strength.png",
    aspect: "aspect-square",
  },
  {
    id: 5,
    title: "Our Dreamy Future",
    subtitle: "A galaxy of promises",
    desc: "Whispering our dreams of a lifetime together, looking out at the beautiful tomorrow we are building.",
    image: "/assets/dreamed_future.png",
    aspect: "aspect-[4/5]",
  },
];

export default function MemoryGallery() {
  const [selectedItem, setSelectedItem] = useState(null);
  const shouldReduceMotion = useReducedMotion();

  // Listen for escape key press to close lightbox modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setSelectedItem(null);
      }
    };
    if (selectedItem) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedItem]);

  return (
    <section id="gallery" className="relative py-24 md:py-36 w-full max-w-7xl mx-auto px-6 overflow-hidden select-none">
      {/* Background ambient light */}
      <div className="absolute top-[10%] right-[-10%] w-[350px] h-[350px] rounded-full bg-rose-600/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[10%] left-[-10%] w-[350px] h-[350px] rounded-full bg-violet-600/5 blur-[120px] pointer-events-none" />

      {/* Section Title */}
      <div className="text-center mb-20">
        <motion.span
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 0.7, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-xs font-sans font-semibold tracking-[0.35em] text-gold-400 uppercase"
        >
          Moments Suspended in Time
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="text-4xl md:text-6xl font-serif font-bold text-zinc-100 dark:text-zinc-100 light:text-zinc-900 mt-3"
        >
          Memory Gallery
        </motion.h2>
        <div className="w-16 h-[1px] bg-gold-400/50 mx-auto mt-6" />
      </div>

      {/* Responsive columns for masonry look */}
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
        {galleryItems.map((item) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            onClick={() => setSelectedItem(item)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                setSelectedItem(item);
              }
            }}
            tabIndex="0"
            role="button"
            aria-label={`Open memory: ${item.title}`}
            className="break-inside-avoid relative rounded-2xl overflow-hidden glass-panel border gold-border group cursor-pointer hover:gold-glow hover:scale-[1.01] transition-all duration-500 focus-visible:ring-2 focus-visible:ring-gold-400 focus-visible:outline-none"
          >
            {/* Gallery Image Container */}
            <div className={`w-full ${item.aspect} overflow-hidden relative bg-zinc-950`}>
              <motion.img
                src={item.image}
                alt={`Photograph showing memory: ${item.title}`}
                loading="lazy"
                role="img"
                whileHover={shouldReduceMotion ? {} : { scale: 1.04 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"
              />

              {/* Black Gradient Vignette on Hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/20 opacity-40 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

              {/* Subtle zoom indicator icon */}
              <div className="absolute top-4 right-4 p-2 rounded-full bg-black/40 backdrop-blur-md text-white/80 border border-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <ZoomIn className="w-4 h-4" />
              </div>

              {/* Dynamic Text & Button Slide-up Overlay */}
              <div className={`absolute inset-x-0 bottom-0 p-6 flex flex-col justify-end ${
                shouldReduceMotion ? "opacity-0 group-hover:opacity-100" : "transform translate-y-4 group-hover:translate-y-0"
              } transition-all duration-500 ease-[0.16,1,0.3,1]`}>
                <span className="text-[10px] font-sans font-bold tracking-widest text-gold-400/90 uppercase mb-1">
                  {item.subtitle}
                </span>
                <h3 className="text-lg md:text-xl font-serif font-semibold text-white mb-3">
                  {item.title}
                </h3>

                {/* Premium "View Memory" Button */}
                <motion.div
                  className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-gold-400 to-rose-gold text-white font-sans text-xs font-semibold tracking-wider uppercase flex items-center justify-center gap-2 border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                >
                  <Eye className="w-3.5 h-3.5" />
                  View Memory
                </motion.div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Lightbox Modal overlay */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-xl p-4 select-none"
            onClick={() => setSelectedItem(null)}
            role="dialog"
            aria-modal="true"
            aria-label={`Lightbox modal showing memory: ${selectedItem.title}`}
          >
            {/* Close button */}
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="absolute top-6 right-6 p-3 rounded-full bg-white/5 border border-white/10 text-white/80 hover:text-white hover:bg-white/15 transition-all z-50 cursor-pointer focus-visible:ring-2 focus-visible:ring-gold-400"
              onClick={() => setSelectedItem(null)}
              aria-label="Close memory modal"
            >
              <X className="w-6 h-6" />
            </motion.button>

            {/* Modal Image Box */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 180 }}
              className="relative max-w-4xl w-full max-h-[85vh] rounded-2xl overflow-hidden border border-white/10 bg-zinc-950 flex flex-col justify-end shadow-[0_0_50px_rgba(208,171,104,0.15)]"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Display full image */}
              <div className="w-full overflow-hidden flex items-center justify-center bg-black/40">
                <img
                  src={selectedItem.image}
                  alt={`Full size view of ${selectedItem.title}`}
                  className="max-h-[55vh] md:max-h-[60vh] object-contain w-full"
                />
              </div>

              {/* Text Description Drawer */}
              <div className="p-6 md:p-8 bg-zinc-950 border-t border-white/5">
                <span className="text-[10px] font-sans font-bold tracking-[0.2em] text-gold-400 uppercase block mb-1">
                  {selectedItem.subtitle}
                </span>
                <h3 className="text-2xl md:text-3xl font-serif font-bold text-white mb-2">
                  {selectedItem.title}
                </h3>
                <p className="text-sm md:text-base font-sans font-light leading-relaxed text-zinc-400">
                  {selectedItem.desc}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
