'use client';

import { motion } from 'framer-motion';
import { BookOpen, Video, Package, ArrowRight } from 'lucide-react';


const MATERIALS = [
  {
    type: 'Módulo 1',
    tag: 'E-BOOK PDF',
    icon: BookOpen,
    title: 'Kit Essencial de Maquiagem',
    desc: 'Guia completo com os 12 produtos que você realmente precisa — separados por biotipo e orçamento.',
    color: '#6b0000',
    accent: '#cc0000',
    pages: '48 págs',
    emoji: '📕',
    locked: true,
  },
  {
    type: 'Módulo 2',
    tag: 'TRILHA DE AULAS',
    icon: Video,
    title: 'Base Perfeita em 2 Semanas',
    desc: 'Aulas em vídeo curtas e estruturadas por nível. Do corretivo ao contorno, sem complicação.',
    color: '#3d0000',
    accent: '#990000',
    pages: '14 aulas',
    emoji: '🎬',
    locked: true,
  },
  {
    type: 'Módulo 3',
    tag: 'PROTOCOLO EXCLUSIVO',
    icon: Package,
    title: 'Rotinas Prontas: Dia, Noite e Evento',
    desc: 'Protocolo passo a passo adaptado ao seu perfil. Sem perder tempo escolhendo o que fazer.',
    color: '#220000',
    accent: '#770000',
    pages: '3 rotinas',
    emoji: '🌙',
    locked: true,
  },
];


function MaterialCard({ mat, idx }: { mat: typeof MATERIALS[0]; idx: number }) {
  const Icon = mat.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, delay: idx * 0.12, ease: [0.16, 1, 0.3, 1] }}
      className="group relative flex flex-col lg:flex-row gap-0 border border-white/[0.07] rounded-3xl overflow-hidden hover:border-white/[0.13] transition-all duration-500"
    >
      {/* Left — visual cover */}
      <div
        className="lg:w-[260px] flex-shrink-0 relative flex items-center justify-center p-10 min-h-[180px]"
        style={{ background: `linear-gradient(145deg, ${mat.color} 0%, #0a0202 100%)` }}
      >
        <span className="absolute inset-0 flex items-center justify-center font-serif text-[140px] text-white/[0.035] select-none pointer-events-none font-bold">
          {idx + 1}
        </span>
        <div className="relative z-10 flex flex-col items-center gap-3 text-center">
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center"
            style={{ background: mat.locked ? '#3a1010' : mat.accent, boxShadow: `0 0 20px ${mat.locked ? 'rgba(153,0,0,0.2)' : mat.accent + '50'}` }}
          >
            <Icon className="w-6 h-6 text-white/60" />
          </div>
          <span className="text-3xl opacity-40">{mat.emoji}</span>
          <span
            className="text-[9px] font-black uppercase tracking-[0.2em] px-3 py-1 rounded-full border font-sans"
            style={{ color: 'rgba(255,255,255,0.3)', borderColor: 'rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.04)' }}
          >
            {mat.tag}
          </span>
        </div>
        <div className="absolute inset-0 bg-gradient-to-br from-white/[0.04] to-transparent pointer-events-none" />
      </div>

      {/* Right — content (blurred when locked) */}
      <div className="flex-1 bg-[#080202]/70 p-8 flex flex-col justify-between gap-5 relative overflow-hidden">
        <div className="flex flex-col gap-3">
          <span className="text-[var(--color-brand)] text-[10px] font-black uppercase tracking-[0.3em] font-sans">{mat.type}</span>
          <h3 className="font-serif text-white text-2xl md:text-[1.6rem] leading-tight">{mat.title}</h3>
          <p className="text-white/40 font-light leading-relaxed font-sans text-sm">{mat.desc}</p>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-white/20 text-xs font-sans">{mat.pages}</span>
          <button className="flex items-center gap-2 text-[var(--color-brand)]/50 text-sm font-bold">
            <span className="font-sans text-xs uppercase tracking-wider">Acessar</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Vault blur overlay for locked cards */}
        {mat.locked && (
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)',
              background: 'linear-gradient(135deg, rgba(8,2,2,0.6) 0%, rgba(20,5,5,0.75) 100%)',
            }}
          >
            <motion.div
              animate={{ opacity: [0.65, 1, 0.65], scale: [1, 1.07, 1] }}
              transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
              className="flex flex-col items-center gap-3"
            >
              {/* Minimalist padlock SVG — 1.2px stroke */}
              <svg width="32" height="38" viewBox="0 0 32 38" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="2" y="16" width="28" height="20" rx="4" stroke="white" strokeWidth="1.4"/>
                <path d="M9 16V10C9 6.13 12.13 3 16 3s7 3.13 7 7v6" stroke="white" strokeWidth="1.4" strokeLinecap="round"/>
                <circle cx="16" cy="26" r="3" fill="white"/>
                <line x1="16" y1="29" x2="16" y2="32" stroke="white" strokeWidth="1.4" strokeLinecap="round"/>
              </svg>
              <p className="text-white/55 text-[10px] font-black uppercase tracking-[0.35em] font-sans">
                Desbloqueie após o quiz
              </p>
            </motion.div>
          </div>
        )}
      </div>
    </motion.div>
  );
}


export function BridgeSection() {
  return (
    <section className="w-full py-32 relative overflow-hidden bg-[#050505]">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(153,0,0,0.07)_0%,transparent_55%)] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="mb-16">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-[var(--color-brand)] uppercase tracking-[0.4em] text-[10px] font-black mb-4 font-sans"
          >
            O Método Make Flow
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 24, filter: 'blur(8px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.1 }}
            className="font-serif text-5xl md:text-6xl text-white leading-[1.05] max-w-2xl"
          >
            A ciência por trás<br />
            <span className="italic font-light text-white/80">da beleza real</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-white/35 max-w-xl mt-6 font-light font-sans leading-relaxed text-base"
          >
            Além do diagnóstico, você recebe o método completo. Aulas, e-books e protocolos exclusivos para dominar sua maquiagem de vez.
          </motion.p>
        </div>

        {/* Cards — clean entrance animation, no content blur */}
        <div className="flex flex-col gap-4">
          {MATERIALS.map((mat, idx) => (
            <MaterialCard key={idx} mat={mat} idx={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}
