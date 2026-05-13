'use client';

import { motion, AnimatePresence, useInView } from 'framer-motion';
import { useRef, useState } from 'react';

// ── Meaningful FAQ icons ──────────────────────────────────────────────────

// 1. Person/silhouette — "funciona para qualquer idade"
const IconAge = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
    <circle cx="9" cy="6" r="3.2" stroke="currentColor" strokeWidth="1.2"/>
    <path d="M2.5 16.5c0-3.04 2.91-5.5 6.5-5.5s6.5 2.46 6.5 5.5"
      stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
  </svg>
);

// 2. Stopwatch — "não tenho tempo"
const IconClock = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
    <circle cx="9" cy="10" r="6.5" stroke="currentColor" strokeWidth="1.2"/>
    <path d="M9 7v3.5l2.2 2.2" stroke="currentColor" strokeWidth="1.2"
      strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M6.5 1.5h5M9 1.5v2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
  </svg>
);

// 3. Price tag with down-arrow — "investir em produtos"
const IconTag = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
    <path d="M9.5 2H3v6.5l7 7 6.5-6.5L9.5 2Z"
      stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round"/>
    <circle cx="5.8" cy="5.8" r="1" fill="currentColor"/>
    <path d="M11 10l2 2M13 10l-2 2" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round"/>
  </svg>
);

// 4. Signal/radar waves — "acesso à plataforma"
const IconAccess = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
    <path d="M9 14a5 5 0 0 0 0-10" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
    <path d="M9 17a8 8 0 0 0 0-16" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeDasharray="1.5 2"/>
    <circle cx="9" cy="9" r="1.5" fill="currentColor"/>
    <path d="M9 9l3.5-3.5" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round"/>
  </svg>
);

// 5. Medal/award — "se não funcionar, garantia"
const IconMedal = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
    <circle cx="9" cy="7.5" r="5" stroke="currentColor" strokeWidth="1.2"/>
    <path d="M5.5 11.5L4 16l2.5-1L9 16.5l2.5-1.5L14 16l-1.5-4.5"
      stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round"/>
    <path d="M6.5 7.5l1.8 1.8 3-3"
      stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// ══ 1. CUSTO DA IGNORÂNCIA ════════════════════════════════════════════════

const WASTE_ITEMS = [
  { label: 'Base errada',   value: 'R$ 180' },
  { label: 'Curso online',  value: 'R$ 350' },
  { label: 'Paleta inútil', value: 'R$ 290' },
  { label: 'Sérum errado',  value: 'R$ 420' },
];

const MF_BENEFITS = [
  'Protocolos de maquiagem profissional',
  'Aulas em vídeo passo a passo',
  'Suporte vitalício',
  'Acesso imediato',
];

export function CostComparisonSection() {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  const WASTE_TOTAL = WASTE_ITEMS.reduce((s, i) => s + parseInt(i.value.replace(/\D/g, '')), 0);
  const BAR_H_WASTE = 160;
  const BAR_H_MF    = Math.round((197 / WASTE_TOTAL) * BAR_H_WASTE); // ~38px

  return (
    <section className="relative w-full py-28 px-4 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[280px] bg-[#990000] blur-[220px] opacity-[0.07] rounded-full" />
      </div>

      <div ref={ref} className="relative max-w-4xl mx-auto flex flex-col items-center gap-16">

        {/* Heading */}
        <div className="text-center space-y-4 max-w-xl">
          <p className="text-[#990000] text-[10px] font-black uppercase tracking-[0.45em] font-sans">Análise Real</p>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-white leading-[1.1]">
            O Custo da{' '}
            <span className="italic font-light text-white/65">Ignorância</span>
          </h2>
          <p className="text-white/35 font-sans font-light text-sm sm:text-base leading-relaxed">
            A cada produto errado, o buraco fica maior.
            Veja o quanto o jeito antigo custa por ano.
          </p>
        </div>

        {/* Chart */}
        <div className="w-full grid grid-cols-1 md:grid-cols-[1fr_48px_1fr] items-end gap-6 md:gap-4">

          {/* ── LEFT: Waste ── */}
          <div className="flex flex-col items-stretch gap-5">
            {/* Item cards — always above bar, fully visible */}
            <div className="flex flex-col gap-2.5">
              {WASTE_ITEMS.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -16 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: i * 0.12 + 0.2, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="flex items-center justify-between px-4 py-3 rounded-xl"
                  style={{
                    background: 'rgba(60,0,0,0.55)',
                    border: '1px solid rgba(180,0,0,0.3)',
                    backdropFilter: 'blur(14px)',
                  }}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-600 flex-shrink-0" />
                    <span className="text-white/55 text-sm font-sans">{item.label}</span>
                  </div>
                  <span className="font-mono font-bold text-sm" style={{ color: '#ff6060' }}>
                    {item.value}
                  </span>
                </motion.div>
              ))}
            </div>

            {/* Separator line */}
            <div className="flex items-center gap-3">
              <div className="flex-1 h-px" style={{ background: 'rgba(180,0,0,0.25)' }} />
              <span className="text-white/20 text-[10px] font-sans uppercase tracking-widest">por ano</span>
              <div className="flex-1 h-px" style={{ background: 'rgba(180,0,0,0.25)' }} />
            </div>

            {/* Animated bar */}
            <div className="rounded-t-2xl overflow-hidden relative" style={{ height: BAR_H_WASTE }}>
              <motion.div
                className="absolute inset-0"
                initial={{ scaleY: 0 }}
                animate={inView ? { scaleY: 1 } : {}}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.6 }}
                style={{ originY: 1 }}
              >
                <motion.div
                  className="absolute inset-0"
                  animate={{ x: [0, -2, 2, -1.5, 1.5, -0.5, 0.5, 0] }}
                  transition={{ duration: 0.9, repeat: Infinity, ease: 'easeInOut' }}
                  style={{
                    background: 'linear-gradient(180deg, rgba(200,0,0,0.9) 0%, rgba(80,0,0,0.98) 100%)',
                  }}
                >
                  <div style={{
                    position: 'absolute', inset: 0,
                    background: 'repeating-linear-gradient(45deg, transparent, transparent 12px, rgba(0,0,0,0.12) 12px, rgba(0,0,0,0.12) 14px)',
                  }} />
                  <motion.div
                    className="absolute inset-0"
                    animate={{ x: ['-100%', '200%'] }}
                    transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut', repeatDelay: 1.5 }}
                    style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.07), transparent)' }}
                  />
                </motion.div>
                <div className="absolute inset-x-0 top-0 h-[2px]" style={{ background: 'rgba(255,60,60,0.6)' }} />
              </motion.div>
            </div>

            {/* Total */}
            <div className="text-center space-y-1">
              <motion.p
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ delay: 1.8 }}
                className="font-mono font-bold text-3xl"
                style={{ color: '#cc3333' }}
              >
                R$ {WASTE_TOTAL.toLocaleString('pt-BR')}<span className="text-xl">+</span>
              </motion.p>
              <p className="text-white/25 text-xs font-sans uppercase tracking-[0.3em]">Jeito tradicional</p>
              <div className="mt-1 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px]"
                style={{ background: 'rgba(180,0,0,0.1)', border: '1px solid rgba(180,0,0,0.25)', color: '#ff5555' }}>
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                Sem resultado garantido
              </div>
            </div>
          </div>

          {/* VS */}
          <div className="flex md:flex-col items-center justify-center gap-3 py-4 self-center">
            <div className="flex-1 md:flex-none h-px md:h-12 md:w-px w-full bg-white/[0.07]" />
            <span className="text-white/20 text-[10px] font-sans uppercase tracking-[0.4em]">vs</span>
            <div className="flex-1 md:flex-none h-px md:h-12 md:w-px w-full bg-white/[0.07]" />
          </div>

          {/* ── RIGHT: Make Flow ── */}
          <div className="flex flex-col items-stretch gap-5">
            {/* Benefit cards */}
            <div className="flex flex-col gap-2.5">
              {MF_BENEFITS.map((benefit, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 16 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: i * 0.12 + 0.2, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="flex items-center gap-2.5 px-4 py-3 rounded-xl"
                  style={{
                    background: 'rgba(153,0,0,0.1)',
                    border: '1px solid rgba(153,0,0,0.25)',
                  }}
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M2 7l3.5 3.5 6.5-7" stroke="#990000" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span className="text-white/55 text-sm font-sans">{benefit}</span>
                </motion.div>
              ))}
            </div>

            {/* Separator */}
            <div className="flex items-center gap-3">
              <div className="flex-1 h-px" style={{ background: 'rgba(153,0,0,0.2)' }} />
              <span className="text-white/20 text-[10px] font-sans uppercase tracking-widest">único</span>
              <div className="flex-1 h-px" style={{ background: 'rgba(153,0,0,0.2)' }} />
            </div>

            {/* Bar (proportional height) */}
            <div
              className="flex flex-col justify-end"
              style={{ height: BAR_H_WASTE }}
            >
              <div
                className="rounded-t-2xl overflow-hidden relative"
                style={{ height: BAR_H_MF }}
              >
                <motion.div
                  className="absolute inset-0"
                  initial={{ scaleY: 0 }}
                  animate={inView ? { scaleY: 1 } : {}}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.7 }}
                  style={{ originY: 1, background: 'linear-gradient(180deg, #cc0000 0%, #660000 100%)' }}
                >
                  <div className="absolute inset-x-0 top-0 h-[1.5px]" style={{ background: 'rgba(255,100,100,0.5)' }} />
                  <motion.div
                    className="absolute inset-0"
                    animate={{ x: ['-100%', '200%'] }}
                    transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut', repeatDelay: 2.5 }}
                    style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.12), transparent)' }}
                  />
                </motion.div>
              </div>
            </div>

            {/* Total + label */}
            <div className="text-center space-y-1">
              <motion.p
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ delay: 1.5 }}
                className="font-mono font-bold text-3xl text-white"
              >
                R$ 197
              </motion.p>
              <p className="text-white/25 text-xs font-sans uppercase tracking-[0.3em]">Make Flow</p>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 2 }}
                className="mt-1 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px]"
                style={{
                  background: 'rgba(0,120,0,0.15)',
                  border: '1px solid rgba(0,180,0,0.3)',
                  color: 'rgba(80,220,80,0.9)',
                  boxShadow: '0 0 16px rgba(0,180,0,0.12)',
                }}
              >
                87% de economia
              </motion.div>
            </div>
          </div>
        </div>

        <p className="text-white/12 text-[11px] font-sans text-center max-w-xs">
          * Média calculada com pesquisas de consumo IEMI Brasil 2023.
        </p>
      </div>
    </section>
  );
}

// ══ 2. FILTRO DA VERDADE — FAQ ════════════════════════════════════════════

const FAQ_ITEMS = [
  {
    q: 'O Método funciona para qualquer idade?',
    a: 'Sim. Do diagnóstico à técnica, focamos em beleza real e maturidade da pele. Nossos protocolos foram desenvolvidos para mulheres entre 25 e 65 anos — porque a ciência da beleza não envelhece.',
    Icon: IconAge,
    hint: 'Todas as idades',
  },
  {
    q: 'Não tenho tempo para rotinas longas.',
    a: 'Seu protocolo será de apenas 7 minutos. Desenvolvemos técnicas de mão única pensadas para o caos do dia a dia. Se você tem tempo para abrir o Instagram, tem tempo para o Make Flow.',
    Icon: IconClock,
    hint: '7 minutos/dia',
  },
  {
    q: 'Vou precisar investir muito em produtos?',
    a: 'Pelo contrário. O protocolo ensina exatamente quais produtos usar para o seu tipo de pele — sem desperdício. A economia da sua primeira compra guiada já paga o Make Flow inteiro.',
    Icon: IconTag,
    hint: 'Economia de até 80%',
  },
  {
    q: 'Tenho acesso à plataforma imediatamente?',
    a: 'No segundo após o checkout, o link da plataforma é liberado no seu e-mail. Não há espera — é acesso 24h, sem fila.',
    Icon: IconAccess,
    hint: 'Acesso instantâneo',
  },
  {
    q: 'E se o método não funcionar para mim?',
    a: '30 dias de garantia total — sem questionar, sem burocracia. Se você aplicar os protocolos e não ver resultado, devolvemos 100% do valor. Simples assim.',
    Icon: IconMedal,
    hint: 'Garantia de 30 dias',
  },
];

export function FAQSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <section className="relative w-full py-24 px-4">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/[0.07] to-transparent" />

      <div className="max-w-2xl mx-auto flex flex-col gap-10">

        {/* Heading */}
        <div className="text-center space-y-4">
          <p className="text-[#990000] text-[10px] font-black uppercase tracking-[0.45em] font-sans">Dúvidas Reais</p>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-white leading-[1.1]">
            O Filtro da{' '}
            <span className="italic font-light text-white/65">Verdade</span>
          </h2>
          <p className="text-white/30 font-sans font-light text-sm sm:text-base max-w-sm mx-auto">
            Sem eufemismos. Sem promessas vazias. Só respostas reais.
          </p>
        </div>

        {/* Accordion */}
        <div className="flex flex-col gap-2.5">
          {FAQ_ITEMS.map((item, idx) => {
            const isOpen = openIdx === idx;
            return (
              <motion.div
                key={idx}
                layout
                onClick={() => setOpenIdx(isOpen ? null : idx)}
                className="relative rounded-2xl overflow-hidden cursor-pointer"
                style={{
                  background: isOpen
                    ? 'rgba(153,0,0,0.07)'
                    : 'rgba(255,255,255,0.022)',
                  border: `1px solid ${isOpen ? 'rgba(153,0,0,0.45)' : 'rgba(255,255,255,0.07)'}`,
                  boxShadow: isOpen
                    ? '0 0 50px rgba(153,0,0,0.12), inset 0 0 24px rgba(153,0,0,0.04)'
                    : 'none',
                  transition: 'background 0.3s, border-color 0.3s, box-shadow 0.35s',
                }}
                transition={{ layout: { type: 'spring', mass: 0.9, damping: 22, stiffness: 190 } }}
              >
                {/* Top rim glow */}
                {isOpen && (
                  <div
                    className="absolute inset-x-0 top-0 h-[1px] pointer-events-none"
                    style={{ background: 'linear-gradient(90deg, transparent, rgba(153,0,0,0.6) 50%, transparent)' }}
                  />
                )}

                {/* Header */}
                <motion.div layout="position" className="flex items-center gap-4 p-5 md:p-6">
                  {/* Icon + hint badge */}
                  <div className="flex-shrink-0 flex flex-col items-center gap-1.5">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300"
                      style={{
                        background: isOpen ? 'rgba(153,0,0,0.22)' : 'rgba(255,255,255,0.04)',
                        border: `1px solid ${isOpen ? 'rgba(153,0,0,0.55)' : 'rgba(255,255,255,0.07)'}`,
                        color: isOpen ? 'rgba(255,90,90,0.9)' : 'rgba(255,255,255,0.28)',
                        boxShadow: isOpen ? '0 0 14px rgba(153,0,0,0.3)' : 'none',
                      }}
                    >
                      <item.Icon />
                    </div>
                    {isOpen && (
                      <motion.span
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-[9px] font-sans font-bold uppercase tracking-wide whitespace-nowrap"
                        style={{ color: 'rgba(153,0,0,0.8)' }}
                      >
                        {item.hint}
                      </motion.span>
                    )}
                  </div>

                  <h3
                    className="flex-1 font-serif text-lg md:text-xl leading-snug pr-2"
                    style={{ color: isOpen ? 'rgba(255,255,255,0.95)' : 'rgba(255,255,255,0.72)' }}
                  >
                    {item.q}
                  </h3>

                  <motion.div
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ type: 'spring', mass: 0.5, damping: 14, stiffness: 220 }}
                    className="flex-shrink-0 w-7 h-7 flex items-center justify-center"
                  >
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M7 1v12M1 7h12"
                        stroke={isOpen ? 'rgba(153,0,0,0.9)' : 'rgba(255,255,255,0.22)'}
                        strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                  </motion.div>
                </motion.div>

                {/* Answer */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="answer"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ type: 'spring', mass: 0.9, damping: 22, stiffness: 190 }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 md:px-6 pb-5 md:pb-6 pt-0">
                        <div className="w-full h-px mb-4" style={{ background: 'rgba(153,0,0,0.15)' }} />
                        <p className="text-white/45 font-sans font-light text-[15px] leading-relaxed">
                          {item.a}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
