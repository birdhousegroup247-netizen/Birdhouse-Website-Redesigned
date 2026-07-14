import React, { useEffect, useRef } from 'react';
interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  targetX: number;
  targetY: number;
  size: number;
  color: string;
  depth: number;
  angle: number;
  floatSpeed: number;
}
// Emerald, teal, soft gold, and subtle neutrals
const COLORS = [
'#0F9D58',
'#0F9D58',
'#14B8A6',
'#D4B483',
'#E4C590',
'#E5E7EB',
'#D1D5DB'];

/**
 * Sample points along an abstract "bird in flight" silhouette.
 * Two swept wings meeting at a slim body — suggested, not literal.
 */
function birdFormation(count: number, cx: number, cy: number, scale: number) {
  const pts: {
    x: number;
    y: number;
  }[] = [];
  for (let i = 0; i < count; i++) {
    const t = i / count;
    // wing sweep parameter from -1 (left tip) to 1 (right tip)
    const u = t * 2 - 1;
    // curved leading edge of the wing (raised tips, dipped body)
    const wingY = -Math.pow(Math.abs(u), 1.4) * 0.55 + 0.15;
    // gentle chord thickness, thicker near the body, thin at the tips
    const chord = (1 - Math.abs(u)) * 0.22 + 0.02;
    const jitter = (Math.random() - 0.5) * chord;
    pts.push({
      x: cx + u * scale,
      y: cy + (wingY + jitter) * scale * 0.9
    });
  }
  return pts;
}
export function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const reduceMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let animationFrameId = 0;
    let particles: Particle[] = [];
    const parent = canvas.parentElement;
    let width = parent?.clientWidth ?? window.innerWidth;
    let height = parent?.clientHeight ?? window.innerHeight;
    let mouseX = -9999;
    let mouseY = -9999;
    let idleTimer = 0;
    let state: 'bird' | 'field' | 'idle' = 'bird';
    let time = 0;
    const NUM = 420;
    const setFieldTargets = () => {
      particles.forEach((p) => {
        p.targetX = width * 0.08 + Math.random() * width * 0.84;
        p.targetY = height * 0.1 + Math.random() * height * 0.8;
      });
    };
    const setIdleTargets = () => {
      const cx = width / 2;
      const cy = height / 2;
      const R = Math.min(width, height) * 0.28;
      particles.forEach((p, i) => {
        const angle = i / particles.length * Math.PI * 6;
        const radius = R * (0.5 + 0.5 * Math.sin(angle * 0.5));
        p.targetX = cx + Math.cos(angle) * radius;
        p.targetY = cy + Math.sin(angle) * radius * 0.7;
      });
    };
    const initParticles = () => {
      const bird = birdFormation(
        NUM,
        width / 2,
        height * 0.44,
        Math.min(width, height) * 0.42
      );
      particles = [];
      for (let i = 0; i < NUM; i++) {
        const depth = Math.random() * 0.8 + 0.2;
        particles.push({
          x: width / 2 + (Math.random() - 0.5) * width * 0.6,
          y: height / 2 + (Math.random() - 0.5) * height * 0.6,
          vx: 0,
          vy: 0,
          targetX: bird[i].x,
          targetY: bird[i].y,
          size: (Math.random() * 2 + 1) * depth,
          color: COLORS[Math.floor(Math.random() * COLORS.length)],
          depth,
          angle: Math.random() * Math.PI * 2,
          floatSpeed: 0.5 + Math.random() * 0.6
        });
      }
    };
    const resize = () => {
      width = parent?.clientWidth ?? window.innerWidth;
      height = parent?.clientHeight ?? window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      // reset transform before scaling to avoid compounding on repeated resizes
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (particles.length === 0) initParticles();
    };
    resize();
    window.addEventListener('resize', resize);
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
      idleTimer = 0;
      if (state === 'idle') {
        state = 'field';
        setFieldTargets();
      }
    };
    window.addEventListener('mousemove', handleMouseMove);
    // Bird holds a few seconds, then disperses into a flowing field
    const birdTimeout = window.setTimeout(() => {
      if (state === 'bird') {
        state = 'field';
        setFieldTargets();
      }
    }, 3200);
    const render = () => {
      ctx.clearRect(0, 0, width, height);
      time += reduceMotion ? 0.002 : 0.006;
      idleTimer += 16;
      if (idleTimer > 4500 && state === 'field') {
        state = 'idle';
        setIdleTargets();
      }
      for (const p of particles) {
        // slow organic drift, like air currents
        const floatX = Math.sin(time * p.floatSpeed + p.angle) * 26 * p.depth;
        const floatY =
        Math.cos(time * p.floatSpeed + p.angle * 0.8) * 26 * p.depth;
        let tx = p.targetX + floatX;
        let ty = p.targetY + floatY;
        // gentle cursor current: soft repulsion + tangential swirl
        if (!reduceMotion) {
          const dx = mouseX - p.x;
          const dy = mouseY - p.y;
          const dist = Math.hypot(dx, dy);
          const maxDist = 220;
          if (dist < maxDist && dist > 0.001) {
            const force = (maxDist - dist) / maxDist;
            const a = Math.atan2(dy, dx);
            const pushX = -Math.cos(a);
            const pushY = -Math.sin(a);
            const swirlX = Math.cos(a + Math.PI / 2);
            const swirlY = Math.sin(a + Math.PI / 2);
            tx += (pushX * 90 + swirlX * 55) * force * p.depth;
            ty += (pushY * 90 + swirlY * 55) * force * p.depth;
          }
        }
        // spring toward target with heavy damping = weightless settle
        p.vx += (tx - p.x) * 0.018;
        p.vy += (ty - p.y) * 0.018;
        p.vx *= 0.9;
        p.vy *= 0.9;
        p.x += p.vx;
        p.y += p.vy;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.depth * 0.8;
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      animationFrameId = requestAnimationFrame(render);
    };
    render();
    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.clearTimeout(birdTimeout);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);
  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="absolute inset-0 pointer-events-none z-0"
      style={{
        width: '100%',
        height: '100%'
      }} />);


}