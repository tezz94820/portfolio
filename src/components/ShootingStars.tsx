import { useEffect, useRef, useState, useCallback } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Star {
  x: number;
  y: number;
  size: number;
  twinkle: number;
  twinkleSpeed: number;
  opacity: number;
  color: string;
}

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  decay: number;
  trail: { x: number; y: number; opacity: number }[];
  color: string;
  hue: number;
  pulsePhase: number;
  isComet: boolean;
  cometLength: number;
  angle: number;
}

interface Nebula {
  x: number;
  y: number;
  radius: number;
  color: string;
  opacity: number;
  drift: number;
  driftAngle: number;
}

interface MousePos {
  x: number;
  y: number;
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

const PALETTES = [
  // Cosmic Blue / Gold
  ["210,100%,70%", "200,100%,80%", "45,100%,65%", "35,100%,70%"],
  // Aurora
  ["150,100%,60%", "180,100%,65%", "280,100%,75%", "320,100%,70%"],
  // Solar Flare
  ["15,100%,65%", "35,100%,70%", "55,100%,75%", "200,100%,80%"],
];

const pick = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

const hsla = (hslStr: string, a: number) => `hsla(${hslStr},${a})`;

// ─── Component ────────────────────────────────────────────────────────────────

export interface ShootingStarsProps {
  maxParticles?: number;
  spawnRate?: number;
  interactive?: boolean;
  showNebula?: boolean;
  paletteIndex?: 0 | 1 | 2;
  opacity?: number;
}

const ShootingStars = ({
  maxParticles = 12,
  spawnRate = 0.035,
  interactive = true,
  showNebula = true,
  paletteIndex = 0,
  opacity = 0.85,
}: ShootingStarsProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef<MousePos>({ x: -9999, y: -9999 });
  const clickBurstRef = useRef<{ x: number; y: number; frame: number } | null>(null);
  const [isVisible, setIsVisible] = useState(true);
  const palette = PALETTES[paletteIndex];
  const timeRef = useRef(0);

  // ── Interaction ────────────────────────────────────────────────────────────

  const handleMouseMove = useCallback((e: MouseEvent) => {
    mouseRef.current = { x: e.clientX, y: e.clientY };
  }, []);

  const handleClick = useCallback((e: MouseEvent) => {
    clickBurstRef.current = { x: e.clientX, y: e.clientY, frame: 0 };
  }, []);

  const handleVisibility = useCallback(() => {
    setIsVisible(!document.hidden);
  }, []);

  // ── Core ───────────────────────────────────────────────────────────────────

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let animId: number;
    let particles: Particle[] = [];
    let stars: Star[] = [];
    let nebulae: Nebula[] = [];
    let burstParticles: Particle[] = [];

    // ── Resize ─────────────────────────────────────────────────────────────

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initStars();
      initNebulae();
    };

    // ── Init static background ─────────────────────────────────────────────

    const initStars = () => {
      const count = Math.floor((canvas.width * canvas.height) / 4500);
      stars = Array.from({ length: count }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 1.2 + 0.2,
        twinkle: Math.random() * Math.PI * 2,
        twinkleSpeed: Math.random() * 0.02 + 0.005,
        opacity: Math.random() * 0.5 + 0.2,
        color: pick(palette),
      }));
    };

    const initNebulae = () => {
      if (!showNebula) { nebulae = []; return; }
      nebulae = Array.from({ length: 4 }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 250 + 150,
        color: pick(palette),
        opacity: Math.random() * 0.04 + 0.015,
        drift: Math.random() * 0.12 + 0.04,
        driftAngle: Math.random() * Math.PI * 2,
      }));
    };

    // ── Factories ──────────────────────────────────────────────────────────

    const makeParticle = (override?: Partial<Particle>): Particle => {
      const isComet = Math.random() < 0.25;
      const angle = isComet
        ? Math.PI / 4 + (Math.random() - 0.5) * 0.3
        : Math.PI / 4 + (Math.random() - 0.5) * 0.6;
      const speed = isComet ? Math.random() * 5 + 4 : Math.random() * 2.5 + 1;
      const hue = parseFloat(pick(palette).split(",")[0]);
      return {
        x: Math.random() * canvas.width * 0.7,
        y: Math.random() < 0.5 ? Math.random() * canvas.height * 0.3 : -10,
        size: isComet ? Math.random() * 2 + 2 : Math.random() * 2 + 0.8,
        speedX: Math.cos(angle) * speed,
        speedY: Math.sin(angle) * speed,
        opacity: 1,
        decay: isComet ? Math.random() * 0.002 + 0.001 : Math.random() * 0.004 + 0.002,
        trail: [],
        color: pick(palette),
        hue,
        pulsePhase: Math.random() * Math.PI * 2,
        isComet,
        cometLength: isComet ? Math.random() * 60 + 40 : 20,
        angle,
        ...override,
      };
    };

    const makeBurst = (x: number, y: number): Particle[] => {
      return Array.from({ length: 18 }, (_, i) => {
        const angle = (i / 18) * Math.PI * 2;
        const speed = Math.random() * 4 + 1.5;
        return {
          x, y,
          size: Math.random() * 2 + 0.8,
          speedX: Math.cos(angle) * speed,
          speedY: Math.sin(angle) * speed,
          opacity: 1,
          decay: Math.random() * 0.02 + 0.012,
          trail: [],
          color: pick(palette),
          hue: parseFloat(pick(palette).split(",")[0]),
          pulsePhase: 0,
          isComet: false,
          cometLength: 14,
          angle,
        };
      });
    };

    // ── Draw helpers ───────────────────────────────────────────────────────

    const drawNebulae = (t: number) => {
      nebulae.forEach((n) => {
        n.x += Math.cos(n.driftAngle + t * 0.0002) * n.drift * 0.01;
        n.y += Math.sin(n.driftAngle + t * 0.0003) * n.drift * 0.01;
        const g = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.radius);
        g.addColorStop(0, hsla(n.color, n.opacity * 1.5));
        g.addColorStop(0.5, hsla(n.color, n.opacity));
        g.addColorStop(1, hsla(n.color, 0));
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.radius, 0, Math.PI * 2);
        ctx.fill();
      });
    };

    const drawStars = (t: number) => {
      stars.forEach((s) => {
        s.twinkle += s.twinkleSpeed;
        const tw = Math.sin(s.twinkle) * 0.35 + 0.65;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size * tw, 0, Math.PI * 2);
        ctx.fillStyle = hsla(s.color, s.opacity * tw);
        ctx.fill();

        // cross sparkle for larger stars
        if (s.size > 0.9) {
          const len = s.size * 2.5 * tw;
          ctx.strokeStyle = hsla(s.color, s.opacity * 0.4 * tw);
          ctx.lineWidth = 0.5;
          ctx.beginPath();
          ctx.moveTo(s.x - len, s.y); ctx.lineTo(s.x + len, s.y);
          ctx.moveTo(s.x, s.y - len); ctx.lineTo(s.x, s.y + len);
          ctx.stroke();
        }
      });
    };

    const drawMouseAura = () => {
      const { x, y } = mouseRef.current;
      if (x < 0 || y < 0) return;
      const g = ctx.createRadialGradient(x, y, 0, x, y, 120);
      g.addColorStop(0, hsla(pick(palette), 0.06));
      g.addColorStop(1, hsla(pick(palette), 0));
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(x, y, 120, 0, Math.PI * 2);
      ctx.fill();
    };

    const drawParticle = (p: Particle) => {
      const trailLen = p.trail.length;

      if (p.isComet && trailLen > 1) {
        // Comet: single gradient line trail
        const tail = p.trail[0];
        const head = p.trail[trailLen - 1];
        const lg = ctx.createLinearGradient(tail.x, tail.y, head.x, head.y);
        lg.addColorStop(0, hsla(p.color, 0));
        lg.addColorStop(0.6, hsla(p.color, p.opacity * 0.3));
        lg.addColorStop(1, hsla(p.color, p.opacity * 0.9));
        ctx.beginPath();
        ctx.moveTo(tail.x, tail.y);
        p.trail.forEach((pt) => ctx.lineTo(pt.x, pt.y));
        ctx.strokeStyle = lg;
        ctx.lineWidth = p.size * 1.2;
        ctx.lineCap = "round";
        ctx.stroke();
      } else {
        // Regular: dot trail
        p.trail.forEach((pt, i) => {
          const ratio = i / trailLen;
          ctx.beginPath();
          ctx.arc(pt.x, pt.y, p.size * ratio * 0.85, 0, Math.PI * 2);
          ctx.fillStyle = hsla(p.color, pt.opacity * ratio * 0.6);
          ctx.fill();
        });
      }

      // Head glow (multi-layer)
      [p.size * 6, p.size * 3, p.size].forEach((r, i) => {
        const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, r);
        const aMultiplier = [0.12, 0.25, 0.9][i];
        g.addColorStop(0, hsla(p.color, p.opacity * aMultiplier));
        g.addColorStop(1, hsla(p.color, 0));
        ctx.beginPath();
        ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
        ctx.fillStyle = g;
        ctx.fill();
      });

      // Sparkle cross on head
      if (p.opacity > 0.5) {
        const armLen = p.size * 4 * p.opacity;
        const sparkA = p.opacity * 0.5;
        ctx.strokeStyle = hsla(p.color, sparkA);
        ctx.lineWidth = p.size * 0.4;
        ctx.lineCap = "round";
        ctx.beginPath();
        ctx.moveTo(p.x - armLen, p.y); ctx.lineTo(p.x + armLen, p.y);
        ctx.moveTo(p.x, p.y - armLen); ctx.lineTo(p.x, p.y + armLen);
        ctx.stroke();
        // diagonal arms (lighter)
        const dLen = armLen * 0.55;
        ctx.strokeStyle = hsla(p.color, sparkA * 0.5);
        ctx.beginPath();
        ctx.moveTo(p.x - dLen, p.y - dLen); ctx.lineTo(p.x + dLen, p.y + dLen);
        ctx.moveTo(p.x + dLen, p.y - dLen); ctx.lineTo(p.x - dLen, p.y + dLen);
        ctx.stroke();
      }
    };

    const updateParticle = (p: Particle) => {
      // Mouse gravity (gentle pull)
      if (interactive) {
        const { x: mx, y: my } = mouseRef.current;
        const dx = mx - p.x;
        const dy = my - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 200 && dist > 1) {
          const force = (200 - dist) / 200 * 0.04;
          p.speedX += (dx / dist) * force;
          p.speedY += (dy / dist) * force;
        }
      }

      p.trail.push({ x: p.x, y: p.y, opacity: p.opacity });
      const maxTrail = p.isComet ? 35 : 22;
      if (p.trail.length > maxTrail) p.trail.shift();

      p.x += p.speedX;
      p.y += p.speedY;
      p.opacity -= p.decay;
      p.pulsePhase += 0.08;
    };

    // ── Main loop ──────────────────────────────────────────────────────────

    const animate = () => {
      if (!isVisible) { animId = requestAnimationFrame(animate); return; }

      timeRef.current += 1;
      const t = timeRef.current;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      drawNebulae(t);
      drawStars(t);
      if (interactive) drawMouseAura();

      // Spawn
      if (Math.random() < spawnRate && particles.length < maxParticles) {
        particles.push(makeParticle());
      }

      // Click burst
      if (clickBurstRef.current) {
        const b = clickBurstRef.current;
        if (b.frame === 0) {
          burstParticles.push(...makeBurst(b.x, b.y));
        }
        b.frame++;
        if (b.frame > 60) clickBurstRef.current = null;
      }

      // Update & draw
      const drawList = [...particles, ...burstParticles];
      drawList.forEach((p) => { updateParticle(p); drawParticle(p); });

      particles = particles.filter((p) => p.opacity > 0 && p.x < canvas.width + 50 && p.y < canvas.height + 50);
      burstParticles = burstParticles.filter((p) => p.opacity > 0);

      animId = requestAnimationFrame(animate);
    };

    resize();
    window.addEventListener("resize", resize);

    if (interactive) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("click", handleClick);
    }
    document.addEventListener("visibilitychange", handleVisibility);

    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("click", handleClick);
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, [isVisible, interactive, showNebula, maxParticles, spawnRate, paletteIndex]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity }}
    />
  );
};

export default ShootingStars;