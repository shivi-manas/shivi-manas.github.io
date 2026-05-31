import React, { useRef, useEffect } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import confetti from "canvas-confetti";

export default function TheFutureReveal() {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const finalLineRef = useRef(null);
  
  const isInView = useInView(containerRef, { once: true, amount: 0.2 });
  const isFinalInView = useInView(finalLineRef, { once: true, amount: 0.8 });
  const shouldReduceMotion = useReducedMotion();

  // Stardust rising animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId;
    let stars = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", resize);
    resize();

    // Sparse, very slow rising gold embers
    const isMobile = window.innerWidth < 768;
    const starCount = isMobile ? 15 : 35;
    
    for (let i = 0; i < starCount; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 1.5 + 0.5,
        speedY: Math.random() * 0.08 + 0.03, // slow upward drift
        alpha: Math.random() * 0.5 + 0.1,
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      stars.forEach((s) => {
        s.y -= s.speedY; // Rising up
        if (s.y < 0) {
          s.y = canvas.height;
          s.x = Math.random() * canvas.width;
        }

        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(208, 171, 104, ${s.alpha})`;
        ctx.shadowBlur = s.size * 6;
        ctx.shadowColor = "rgba(208, 171, 104, 0.4)";
        ctx.fill();
      });
      animId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animId);
    };
  }, []);

  // Climax celebration trigger
  useEffect(() => {
    if (isFinalInView) {
      const end = Date.now() + 2 * 1000;
      const colors = ["#d4af37", "#f3e5ab", "#ffffff", "#e6ca65"];

      (function frame() {
        confetti({
          particleCount: 3,
          angle: 60,
          spread: 55,
          origin: { x: 0, y: 0.8 },
          colors: colors
        });
        confetti({
          particleCount: 3,
          angle: 120,
          spread: 55,
          origin: { x: 1, y: 0.8 },
          colors: colors
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      }());
    }
  }, [isFinalInView]);

  // Text fragments
  const lines = [
    { text: "Today I celebrate your birthday.", delay: 0.5, scale: 1 },
    { text: "Next year,", delay: 2.2, scale: 1 },
    { text: "I hope I celebrate it standing beside you as your husband.", delay: 3.8, scale: 1.15, highlight: true },
    { text: "And after that...", delay: 6.5, scale: 1 },
    { text: "Every birthday.", delay: 8.0, scale: 1 },
    { text: "Every festival.", delay: 9.0, scale: 1 },
    { text: "Every achievement.", delay: 10.0, scale: 1 },
    { text: "Every challenge.", delay: 11.0, scale: 1 },
    { text: "Every dream.", delay: 12.0, scale: 1 },
    { text: "Together.", delay: 13.8, scale: 1.3, final: true },
  ];

  return (
    <section
      ref={containerRef}
      id="future"
      className="relative min-h-screen w-full flex flex-col items-center justify-center bg-[#010102] text-white px-6 overflow-hidden select-none py-24 md:py-36"
      role="region"
      aria-label="Cinematic Promise Reveal"
    >
      {/* Background canvas stardust */}
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-[1] opacity-75" />

      {/* Cinematic Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,rgba(0,0,0,0.95)_80%)] pointer-events-none z-10" />

      <div className="relative z-20 max-w-5xl w-full text-center flex flex-col items-center justify-center space-y-6 md:space-y-8">
        {isInView &&
          lines.map((line, idx) => (
            <motion.div
              key={idx}
              ref={line.final ? finalLineRef : null}
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 1.5,
                delay: line.delay,
                ease: [0.16, 1, 0.3, 1],
              }}
              style={{ scale: line.scale }}
              className="w-full flex justify-center"
            >
              <h3
                className={`font-serif leading-snug tracking-wide ${
                  line.highlight
                    ? "text-xl sm:text-3xl md:text-5xl font-semibold text-gold-400 drop-shadow-[0_0_20px_rgba(208,171,104,0.4)] px-4"
                    : line.final
                    ? "text-4xl sm:text-6xl md:text-8xl font-bold text-gold-gradient tracking-[0.15em] pt-8 uppercase drop-shadow-[0_0_25px_rgba(208,171,104,0.2)]"
                    : "text-base sm:text-2xl md:text-3xl font-light text-zinc-400"
                }`}
              >
                {line.text}
              </h3>
            </motion.div>
          ))}
      </div>
    </section>
  );
}
