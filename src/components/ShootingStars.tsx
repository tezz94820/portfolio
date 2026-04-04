import { useEffect, useRef } from "react";

const ShootingStars = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let particles: Particle[] = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    interface Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      opacity: number;
      decay: number;
      trail: { x: number; y: number }[];
      color: string;
    }

    const colors = [
      "rgba(59, 130, 246, ",   // blue
      "rgba(147, 197, 253, ",  // light blue
      "rgba(218, 165, 32, ",   // golden
      "rgba(251, 191, 36, ",   // amber
    ];

    const createParticle = (): Particle => {
      const startFromLeft = Math.random() > 0.5;
      return {
        x: startFromLeft ? Math.random() * canvas.width * 0.5 : Math.random() * canvas.width,
        y: startFromLeft ? Math.random() * canvas.height * 0.3 : -10,
        size: Math.random() * 2.5 + 1,
        speedX: Math.random() * 2 + 1,
        speedY: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.6 + 0.4,
        decay: Math.random() * 0.003 + 0.002,
        trail: [],
        color: colors[Math.floor(Math.random() * colors.length)],
      };
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (Math.random() < 0.03 && particles.length < 8) {
        particles.push(createParticle());
      }

      particles = particles.filter((p) => p.opacity > 0);

      particles.forEach((p) => {
        p.trail.push({ x: p.x, y: p.y });
        if (p.trail.length > 20) p.trail.shift();

        p.x += p.speedX;
        p.y += p.speedY;
        p.opacity -= p.decay;

        // Draw trail
        for (let i = 0; i < p.trail.length; i++) {
          const trailOpacity = (i / p.trail.length) * p.opacity * 0.5;
          const trailSize = (i / p.trail.length) * p.size;
          ctx.beginPath();
          ctx.arc(p.trail[i].x, p.trail[i].y, trailSize, 0, Math.PI * 2);
          ctx.fillStyle = p.color + trailOpacity + ")";
          ctx.fill();
        }

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color + p.opacity + ")";
        ctx.fill();

        // Glow
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 3, 0, Math.PI * 2);
        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 3);
        gradient.addColorStop(0, p.color + (p.opacity * 0.3) + ")");
        gradient.addColorStop(1, p.color + "0)");
        ctx.fillStyle = gradient;
        ctx.fill();
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.7 }}
    />
  );
};

export default ShootingStars;
