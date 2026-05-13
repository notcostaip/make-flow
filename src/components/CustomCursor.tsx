'use client';

import { useEffect, useRef, useState } from 'react';

// ─── DOM particle burst on click ─────────────────────────────────────────
function spawnParticles(x: number, y: number) {
  const count = 10;
  for (let i = 0; i < count; i++) {
    const p = document.createElement('div');
    const angle = (i / count) * Math.PI * 2;
    const dist  = 20 + Math.random() * 28;
    const size  = 2 + Math.random() * 4;

    p.style.cssText = `
      position:fixed; pointer-events:none; z-index:9998;
      left:${x - size / 2}px; top:${y - size / 2}px;
      width:${size}px; height:${size}px; border-radius:50%;
      background:radial-gradient(circle,#ff3333 0%,#990000 100%);
      box-shadow:0 0 8px rgba(255,0,0,0.8);
      transition:transform .5s cubic-bezier(.1,.9,.2,1), opacity .5s ease-out;
      transform:translate(0,0) scale(1); opacity:1;
      will-change:transform,opacity;
    `;
    document.body.appendChild(p);
    requestAnimationFrame(() => requestAnimationFrame(() => {
      p.style.transform = `translate(${Math.cos(angle)*dist}px,${Math.sin(angle)*dist}px) scale(0)`;
      p.style.opacity = '0';
    }));
    setTimeout(() => p.remove(), 550);
  }
}

// ─── Magnetic snap to CTA buttons ────────────────────────────────────────
function getMagneticOffset(el: HTMLElement, px: number, py: number) {
  const r  = el.getBoundingClientRect();
  const cx = r.left + r.width / 2;
  const cy = r.top  + r.height / 2;
  const dx = cx - px, dy = cy - py;
  const d  = Math.hypot(dx, dy);
  if (d > 80) return { ox: 0, oy: 0 };
  const s = (1 - d / 80) * 0.35;
  return { ox: dx * s, oy: dy * s };
}

// ─────────────────────────────────────────────────────────────────────────
export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const ringRef   = useRef<HTMLDivElement>(null);
  const [hover, setHover] = useState(false);
  const [click, setClick] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const rawX = useRef(0), rawY = useRef(0);
  const curX = useRef(0), curY = useRef(0);
  const magEl = useRef<HTMLElement | null>(null);

  useEffect(() => {
    // Detect mobile/touch
    const mql = window.matchMedia('(max-width: 1024px), (pointer: coarse)');
    const checkMobile = () => setIsMobile(mql.matches);
    checkMobile();
    mql.addEventListener('change', checkMobile);

    const INERTIA = 0.12;
    const onMove = (e: MouseEvent) => { if (mql.matches) return; rawX.current = e.clientX; rawY.current = e.clientY; };
    const onDown = (e: MouseEvent) => { if (mql.matches) return; setClick(true); spawnParticles(e.clientX, e.clientY); };
    const onUp   = ()              => { if (mql.matches) return; setClick(false); };

    // Disable touch support completely for particles on mobile
    const onTouchStart = (e: TouchEvent) => {
      if (mql.matches) return;
      if (e.touches[0]) spawnParticles(e.touches[0].clientX, e.touches[0].clientY);
    };

    const onEnter = (e: Event) => { setHover(true);  magEl.current = e.currentTarget as HTMLElement; };
    const onLeave = ()          => { setHover(false); magEl.current = null; };

    const attach = () =>
      document.querySelectorAll<HTMLElement>('a,button,[role="button"],input,textarea,label,select')
        .forEach(el => { el.addEventListener('mouseenter', onEnter); el.addEventListener('mouseleave', onLeave); });
    attach();

    let raf: number;
    const loop = () => {
      // If mobile, we stop the visual update loop but we keep particle listeners active
      if (mql.matches) {
        raf = requestAnimationFrame(loop);
        return;
      }

      let ox = 0, oy = 0;
      if (magEl.current) { const m = getMagneticOffset(magEl.current, rawX.current, rawY.current); ox = m.ox; oy = m.oy; }
      curX.current += (rawX.current + ox - curX.current) * INERTIA;
      curY.current += (rawY.current + oy - curY.current) * INERTIA;
      const x = curX.current, y = curY.current;
      if (cursorRef.current) cursorRef.current.style.transform = `translate3d(${x}px,${y}px,0)`;
      if (ringRef.current)   ringRef.current.style.transform   = `translate3d(${x-20}px,${y-20}px,0)`;
      raf = requestAnimationFrame(loop);
    };

    document.addEventListener('mousemove', onMove);
    document.addEventListener('mousedown', onDown);
    document.addEventListener('mouseup',   onUp);
    document.addEventListener('touchstart', onTouchStart, { passive: true });

    raf = requestAnimationFrame(loop);
    const obs = new MutationObserver(attach);
    obs.observe(document.body, { childList: true, subtree: true });

    return () => {
      mql.removeEventListener('change', checkMobile);
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('mouseup',   onUp);
      document.removeEventListener('touchstart', onTouchStart);
      cancelAnimationFrame(raf);
      obs.disconnect();
    };
  }, []);

  if (isMobile) return null;

  const scale = click ? 0.9 : hover ? 1.15 : 1.0;
  const ARROW = `M 3 2 L 3 23 L 9 17 L 15 29 L 19 27 L 13 15 L 22 15 Z`;

  return (
    <>
      <div
        ref={ringRef}
        className="pointer-events-none fixed top-0 left-0 z-[9997]"
        style={{
          width: 40, height: 40, borderRadius: '50%',
          border: `1px solid rgba(153,0,0,${hover ? 0.8 : 0})`,
          boxShadow: hover ? '0 0 20px rgba(153,0,0,0.5),inset 0 0 8px rgba(153,0,0,0.15)' : 'none',
          animation: hover ? 'cursorRing 1.1s ease-out infinite' : 'none',
          transition: 'border-color .2s,box-shadow .2s',
          willChange: 'transform',
        }}
      />

      <div
        ref={cursorRef}
        className="pointer-events-none fixed top-0 left-0 z-[9999]"
        style={{ willChange: 'transform' }}
      >
        <svg
          width="46" height="52"
          viewBox="-8 -8 38 46"
          fill="none"
          style={{
            display: 'block',
            transform: `scale(${scale})`,
            transformOrigin: '8px 8px',
            transition: 'transform .15s cubic-bezier(.34,1.56,.64,1)',
          }}
        >
          <defs>
            <filter id="neonAura" x="-80%" y="-80%" width="260%" height="260%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="7" result="b1"/>
              <feColorMatrix in="b1" type="matrix" values="1 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.9 0" result="redAura"/>
              <feMerge><feMergeNode in="redAura"/><feMergeNode in="SourceGraphic"/></feMerge>
            </filter>
            <filter id="neonRim" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="b2"/>
              <feColorMatrix in="b2" type="matrix" values="1 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0" result="redRim"/>
              <feMerge><feMergeNode in="redRim"/><feMergeNode in="SourceGraphic"/></feMerge>
            </filter>
            <filter id="neonCore" x="-25%" y="-25%" width="150%" height="150%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="1.2" result="b3"/>
              <feColorMatrix in="b3" type="matrix" values="1 0 0 0 0.2  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0" result="core"/>
              <feMerge><feMergeNode in="core"/><feMergeNode in="SourceGraphic"/></feMerge>
            </filter>
            <linearGradient id="arrowGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ff3333"/><stop offset="40%" stopColor="#cc0000"/><stop offset="100%" stopColor="#770000"/>
            </linearGradient>
          </defs>
          <path d={ARROW} fill="#990000" opacity="0.6" filter="url(#neonAura)"/>
          <path d={ARROW} fill="#bb0000" opacity="0.75" filter="url(#neonRim)"/>
          <path d={ARROW} fill="url(#arrowGrad)" filter="url(#neonCore)"/>
          <circle cx="3.2" cy="2.2" r="1.8" fill="rgba(255,180,180,0.85)"/>
        </svg>
      </div>

      <style>{`
        @keyframes cursorRing {
          0%   { transform: scale(.7); opacity: .9; }
          100% { transform: scale(2.5); opacity: 0; }
        }
      `}</style>
    </>
  );
}
