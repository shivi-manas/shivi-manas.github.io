import React, { useEffect, useRef } from "react";

export default function StarfieldBackground({ activeMode = "dark" }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId;
    let particles = [];
    const isMobile = window.innerWidth < 768;
    const particleCount = isMobile ? 30 : 70;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    // Create particles
    const initParticles = () => {
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 1.5 + 0.5,
          speedX: (Math.random() - 0.5) * 0.08,
          speedY: (Math.random() - 0.5) * 0.08 - 0.03, // slow upward drift
          alpha: Math.random() * 0.7 + 0.1,
          decay: Math.random() * 0.005 + 0.002,
          increasing: Math.random() > 0.5
        });
      }
    };

    initParticles();

    // Mouse interactive effect (gentle attraction)
    let mouse = { x: null, y: null };
    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    window.addEventListener("mousemove", handleMouseMove);

    // Animation Loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Particle rendering
      particles.forEach((p) => {
        // Star drift
        p.x += p.speedX;
        p.y += p.speedY;

        // Wrap around boundaries
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        // Soft twinkle / breathing effect
        if (p.increasing) {
          p.alpha += p.decay;
          if (p.alpha >= 0.8) p.increasing = false;
        } else {
          p.alpha -= p.decay;
          if (p.alpha <= 0.15) p.increasing = true;
        }

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);

        if (activeMode === "dark") {
          // Dark Mode: glowing gold and white particles
          const isGold = p.size > 1.2;
          ctx.fillStyle = isGold
            ? `rgba(208, 171, 104, ${p.alpha})`
            : `rgba(255, 255, 255, ${p.alpha})`;
          if (isGold) {
            ctx.shadowBlur = p.size * 6;
            ctx.shadowColor = "rgba(208, 171, 104, 0.4)";
          }
        } else {
          // Light Mode: soft pastel rose/gold/purple particles
          ctx.fillStyle = `rgba(183, 110, 121, ${p.alpha})`;
          ctx.shadowBlur = 0;
        }

        ctx.fill();
        ctx.shadowBlur = 0; // reset
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [activeMode]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-[1]"
      style={{ opacity: activeMode === "dark" ? 0.7 : 0.4 }}
    />
  );
}
