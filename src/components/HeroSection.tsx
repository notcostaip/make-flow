'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';

// 24h countdown with localStorage persistence
function useHeroCountdown() {
  const [time, setTime] = useState({ h: 23, m: 59, s: 59 });

  useEffect(() => {
    const KEY = 'mf_offer_end_v1';
    let end = parseInt(localStorage.getItem(KEY) || '0');
    if (!end || end < Date.now()) {
      end = Date.now() + 24 * 60 * 60 * 1000;
      localStorage.setItem(KEY, String(end));
    }
    const tick = () => {
      const diff = Math.max(0, end - Date.now());
      setTime({
        h: Math.floor(diff / 3600000),
        m: Math.floor((diff % 3600000) / 60000),
        s: Math.floor((diff % 60000) / 1000),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return time;
}

function pad(n: number) { return String(n).padStart(2, '0'); }

// Minimal digital unit block
function TimeUnit({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex flex-col items-center gap-1.5">
      <div
        className="relative px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl font-mono text-white text-xl sm:text-2xl md:text-3xl font-bold tracking-wider"
        style={{
          background: 'rgba(153,0,0,0.08)',
          border: '1px solid rgba(153,0,0,0.35)',
          boxShadow: '0 0 16px rgba(153,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.04)',
          minWidth: '56px',
          textAlign: 'center',
        }}
      >
        {value}
      </div>
      <span className="text-white/25 text-[9px] uppercase tracking-[0.35em] font-sans">{label}</span>
    </div>
  );
}

function CountdownTimer() {
  const { h, m, s } = useHeroCountdown();
  return (
    <motion.div
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, delay: 0.1 }}
      className="flex flex-col items-center gap-5"
    >
      <p className="text-[var(--color-brand)] text-[10px] font-black uppercase tracking-[0.45em] font-sans">
        Oferta Encerra Em
      </p>
      <div className="flex items-start gap-3">
        <TimeUnit value={pad(h)} label="Horas" />
        <span className="text-[var(--color-brand)]/60 text-2xl font-mono font-bold mt-2">:</span>
        <TimeUnit value={pad(m)} label="Minutos" />
        <span className="text-[var(--color-brand)]/60 text-2xl font-mono font-bold mt-2">:</span>
        <TimeUnit value={pad(s)} label="Segundos" />
      </div>
    </motion.div>
  );
}

export function HeroSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });

  const yText = useTransform(scrollYProgress, [0, 1], ['0%', '25%']);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const yGlow = useTransform(scrollYProgress, [0, 1], ['0%', '40%']);

  return (
    <section ref={ref} className="relative w-full min-h-screen overflow-hidden flex items-center justify-center bg-[#050505]" style={{ position: 'relative' }}>

      {/* Animated crimson glow orbs */}
      <motion.div style={{ y: yGlow }} className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-[var(--color-brand)] blur-[200px] opacity-18 rounded-full" />
        <div className="absolute bottom-1/3 left-1/4 w-[300px] h-[300px] bg-[#550000] blur-[150px] opacity-25 rounded-full" />
      </motion.div>

      {/* Subtle grid texture */}
      <div
        className="absolute inset-0 opacity-[0.022] pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.5) 1px,transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      {/* Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,#050505_100%)] pointer-events-none" />

      <motion.div
        style={{ y: yText, opacity }}
        className="relative z-10 text-center px-4 max-w-5xl mx-auto flex flex-col items-center gap-12 py-24"
      >
        {/* Countdown timer — top of hero */}
        <CountdownTimer />

        <div className="flex flex-col items-center gap-8">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="text-[var(--color-brand)] uppercase tracking-[0.45em] text-xs font-black"
          >
            O Método Definitivo
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 40, filter: 'blur(12px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 1.2, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="font-serif text-3xl sm:text-5xl md:text-7xl lg:text-[90px] xl:text-[100px] text-white font-medium leading-[1.1] md:leading-[1] lg:leading-[0.92] tracking-tight"
          >
            Maquiagem que<br />
            <span className="italic font-light text-white/85">funciona de verdade</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="text-sm sm:text-base md:text-lg lg:text-xl text-white/40 max-w-xl font-light font-sans leading-relaxed px-4"
          >
            Do diagnóstico ao look completo — sem desperdício, sem tutoriais inúteis, sem maquiagem derretendo.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="flex flex-col items-center"
        >
          <p className="text-white/20 uppercase tracking-[0.3em] text-[10px] mb-4 font-sans">Role para descobrir</p>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            className="w-[1px] h-12 bg-gradient-to-b from-[var(--color-brand)] to-transparent"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
