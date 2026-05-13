'use client';

import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const PLATFORM_LINK = 'https://makeflow.com.br/acesso'; // Replace with actual platform link

/* ── Small helpers ─────────────────────────────────────────────── */

function ArrowIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  );
}

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${count} estrelas`}>
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} width="13" height="13" viewBox="0 0 14 14" fill="none" aria-hidden>
          <path d="M7 1l1.8 3.6L13 5.3l-3 2.9.7 4.1L7 10.1l-3.7 2.2.7-4.1-3-2.9 4.2-.7L7 1z" fill="#cc0000" />
        </svg>
      ))}
    </div>
  );
}

/** Animated counter that counts up on mount */
function CountUp({ to, suffix = '' }: { to: number; suffix?: string }) {
  const [display, setDisplay] = useState(0);
  useEffect(() => {
    let start = 0;
    const step = Math.ceil(to / 60);
    const timer = setInterval(() => {
      start += step;
      if (start >= to) { setDisplay(to); clearInterval(timer); }
      else setDisplay(start);
    }, 16);
    return () => clearInterval(timer);
  }, [to]);
  return <>{display.toLocaleString('pt-BR')}{suffix}</>;
}

/* ── Data ──────────────────────────────────────────────────────── */

const TESTIMONIALS = [
  {
    name: 'Camila R.',
    city: 'São Paulo',
    text: 'Em 3 dias já tinha economizado R$180 em produtos que eu precisava comprar de qualquer jeito.',
    stars: 5,
    saving: 'R$180 em 3 dias',
  },
  {
    name: 'Fernanda M.',
    city: 'Belo Horizonte',
    text: 'Comprei minha base favorita com 65% de desconto. O sistema alertou antes de qualquer site.',
    stars: 5,
    saving: '65% off',
  },
  {
    name: 'Larissa T.',
    city: 'Porto Alegre',
    text: 'Perguntei sobre meu protocolo e recebi resposta personalizada em menos de 1 hora.',
    stars: 5,
    saving: 'Suporte real',
  },
];

const INACTION_ITEMS = [
  { emoji: '💸', text: 'Outras membras economizaram em média R$240 só esse mês.' },
  { emoji: '🔔', text: 'O sistema já encontrou 3 promoções acima de 60% hoje — você não viu nenhuma.' },
  { emoji: '🔒', text: 'Seu acesso como membra está ativo agora. Ele não espera para sempre.' },
];

/* ── Page ──────────────────────────────────────────────────────── */

export default function ObrigadoPage() {
  return (
    <main className="min-h-screen bg-[#050505] text-white overflow-hidden relative">

      {/* ── Background ── */}
      <div className="fixed inset-0 pointer-events-none" aria-hidden>
        <div className="absolute top-[-10%] right-[10%] w-[700px] h-[700px] bg-[#990000] blur-[300px] opacity-[0.06] rounded-full" />
        <div className="absolute bottom-[10%] left-[5%] w-[400px] h-[400px] bg-[#550000] blur-[200px] opacity-[0.05] rounded-full" />
      </div>
      <div
        className="fixed inset-0 opacity-[0.015] pointer-events-none"
        aria-hidden
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.5) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.5) 1px,transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      {/* ── Nav ── */}
      <nav className="relative z-10 flex items-center justify-center px-4 py-6">
        <Link href="/" className="flex items-center gap-2" aria-label="Voltar ao início Make Flow">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logomark.png" alt="Make Flow" width={26} height={26} style={{ objectFit: 'contain' }} />
          <span className="font-serif text-white/60 text-base font-medium tracking-wide">Make Flow</span>
        </Link>
      </nav>

      <div className="relative z-10 max-w-2xl mx-auto px-4 pb-28">

        {/* ══════════════════════════════════════
            1. CELEBRAÇÃO — anchor emocional
        ══════════════════════════════════════ */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="text-center pt-10 pb-14 space-y-5"
        >
          {/* badge animado */}
          <motion.div
            initial={{ scale: 0.4, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.15, duration: 0.9, type: 'spring', bounce: 0.55 }}
            className="inline-flex items-center gap-2 bg-[#990000]/10 border border-[#990000]/35 px-5 py-2 rounded-full"
          >
            <span className="text-base" aria-hidden>🎉</span>
            <span className="text-[#cc0000] text-[10px] font-black uppercase tracking-[0.4em] font-sans">
              Compra confirmada
            </span>
          </motion.div>

          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl text-white leading-[1.07] tracking-tight">
            Bem-vinda,<br />
            <span className="italic font-light text-white/75">Make Flow.</span>
          </h1>

          <p className="text-white/45 font-sans font-light text-base sm:text-lg leading-relaxed max-w-lg mx-auto">
            Sua decisão foi tomada. O protocolo está a caminho.<br />
            Agora existe <strong className="text-white/70">um único passo</strong> entre você e o seu protocolo exclusivo de maquiagem.
          </p>
        </motion.div>

        {/* ══════════════════════════════════════
            2. ACESSO EXCLUSIVO — CTA imediato
        ══════════════════════════════════════ */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.9 }}
          aria-label="Ativar acesso à plataforma"
          className="mb-14"
        >
          <div
            className="relative rounded-3xl overflow-hidden"
            style={{
              background: 'linear-gradient(145deg, rgba(14,2,2,0.95), rgba(8,1,1,0.98))',
              border: '1px solid rgba(153,0,0,0.45)',
              boxShadow: '0 0 100px rgba(153,0,0,0.09), 0 40px 80px rgba(0,0,0,0.55)',
              backdropFilter: 'blur(24px)',
            }}
          >
            {/* top line */}
            <div
              className="absolute inset-x-0 top-0 h-[1px]"
              style={{ background: 'linear-gradient(90deg,transparent,rgba(200,0,0,0.8) 50%,transparent)' }}
            />

            <div className="p-8 sm:p-12 space-y-7 text-center">
              <div className="space-y-2">
                <p className="text-[#cc0000] text-[9px] font-black uppercase tracking-[0.5em] font-sans">
                  Passo final · exclusivo para membras
                </p>
                <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-white leading-[1.1]">
                  Ative Seu Protocolo<br />
                  <span className="italic font-light text-white/70">e acesse a plataforma agora</span>
                </h2>
              </div>

              <p className="text-white/40 font-sans font-light text-sm sm:text-base leading-relaxed max-w-md mx-auto">
                O <strong className="text-white/65">Protocolo Make Flow</strong> inclui guias práticos ilustrados, protocolos de aplicação passo a passo e suporte exclusivo da equipe — tudo pronto para você aplicar <em>a partir de hoje</em>.
              </p>

              {/* Stats rápidas */}
              <div className="grid grid-cols-3 gap-3 max-w-sm mx-auto">
                {[
                  { value: '4.200', label: 'alunas ativas' },
                  { value: '6h+', label: 'de conteúdo' },
                  { value: '30', label: 'dias de garantia' },
                ].map((s) => (
                  <div key={s.label} className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-3">
                    <p className="font-serif text-white text-lg font-medium">{s.value}</p>
                    <p className="text-white/30 text-[10px] font-sans leading-tight mt-0.5">{s.label}</p>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <motion.a
                id="cta-plataforma-principal"
                href={PLATFORM_LINK}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.04, y: -3 }}
                whileTap={{ scale: 0.96 }}
                animate={{
                  boxShadow: [
                    '0 0 20px rgba(180,0,0,0.45)',
                    '0 0 55px rgba(210,0,0,0.8)',
                    '0 0 20px rgba(180,0,0,0.45)',
                  ],
                }}
                transition={{ duration: 2, repeat: Infinity }}
                className="inline-flex items-center justify-center gap-3 w-full sm:w-auto px-10 py-5 rounded-full font-sans text-sm font-black uppercase tracking-[0.2em] text-white"
                style={{
                  background: 'linear-gradient(135deg, #d40000 0%, #7a0000 100%)',
                  border: '1px solid rgba(255,90,90,0.35)',
                }}
              >
                <ArrowIcon />
                Acessar Meu Protocolo Agora →
              </motion.a>

              <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-1.5">
                {['✓ 100% gratuito', '✓ Acesso imediato', '✓ Sem spam'].map((t) => (
                  <span key={t} className="text-white/20 text-[10px] font-sans">{t}</span>
                ))}
              </div>
            </div>
          </div>
        </motion.section>

        {/* ══════════════════════════════════════
            3. PROVA SOCIAL — depoimentos
        ══════════════════════════════════════ */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          aria-label="Depoimentos de membras"
          className="mb-14 space-y-5"
        >
          <div className="text-center space-y-1">
            <p className="text-[#cc0000] text-[9px] font-black uppercase tracking-[0.5em] font-sans">Resultado real</p>
            <h2 className="font-serif text-xl sm:text-2xl text-white">O que elas estão dizendo</h2>
          </div>

          <div className="flex flex-col gap-3">
            {TESTIMONIALS.map((t, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ delay: idx * 0.1, duration: 0.6 }}
                className="flex items-start gap-4 p-5 rounded-2xl border border-white/[0.06] bg-white/[0.025]"
                style={{ borderLeft: '2px solid rgba(153,0,0,0.55)' }}
              >
                <div className="flex-shrink-0 w-9 h-9 rounded-full bg-[#990000]/20 border border-[#990000]/30 flex items-center justify-center">
                  <span className="font-serif text-[#cc0000] text-sm font-bold">{t.name[0]}</span>
                </div>
                <div className="flex-1 space-y-1.5">
                  <div className="flex items-center justify-between flex-wrap gap-1">
                    <div>
                      <p className="font-serif text-white text-sm leading-none">{t.name}</p>
                      <p className="text-white/25 font-sans text-[10px]">{t.city}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[#cc0000] text-[10px] font-bold font-sans bg-[#990000]/10 px-2 py-0.5 rounded-full border border-[#990000]/20">
                        {t.saving}
                      </span>
                      <StarRating count={t.stars} />
                    </div>
                  </div>
                  <p className="text-white/45 font-sans font-light text-sm leading-relaxed">"{t.text}"</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* ══════════════════════════════════════
            4. CUSTO DA INAÇÃO — perda antecipada
        ══════════════════════════════════════ */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          aria-label="O custo de não entrar agora"
          className="mb-10"
        >
          <div
            className="relative rounded-3xl p-7 sm:p-10 overflow-hidden"
            style={{
              background: 'rgba(18,2,2,0.92)',
              border: '1px solid rgba(153,0,0,0.2)',
            }}
          >
            <div
              className="absolute inset-x-0 top-0 h-[1px]"
              style={{ background: 'linear-gradient(90deg,transparent,rgba(153,0,0,0.5) 50%,transparent)' }}
            />
            <p className="text-[#cc0000] text-[9px] font-black uppercase tracking-[0.5em] font-sans text-center mb-6">
              Agora mesmo, enquanto você lê isso
            </p>
            <div className="space-y-4">
              {INACTION_ITEMS.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -14 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className="flex items-start gap-3"
                >
                  <span className="text-base flex-shrink-0 mt-0.5">{item.emoji}</span>
                  <p className="text-white/50 font-sans font-light text-sm leading-relaxed">{item.text}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* ── Live counter ── */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-center gap-2.5 mb-10"
        >
          <span className="relative flex h-2.5 w-2.5" aria-hidden>
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#990000] opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#cc0000]" />
          </span>
          <p className="text-white/35 font-sans text-xs">
            <strong className="text-white/60">+4.200 membras</strong> ativas na plataforma agora
          </p>
        </motion.div>

        {/* ══════════════════════════════════════
            5. CTA FINAL — fechamento
        ══════════════════════════════════════ */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          aria-label="Acessar protocolo"
          className="text-center space-y-5"
        >
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-white leading-[1.1]">
            Você chegou até aqui.<br />
            <span className="italic font-light text-white/65">Não saia de mãos vazias.</span>
          </h2>
          <p className="text-white/35 font-sans text-sm leading-relaxed max-w-sm mx-auto">
            A plataforma é <strong className="text-white/60">gratuita para membras</strong>, o acesso é imediato — e cada minuto fora custa dinheiro real.
          </p>

          <motion.a
            id="cta-plataforma-final"
            href={PLATFORM_LINK}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.04, y: -3 }}
            whileTap={{ scale: 0.96 }}
            animate={{
              boxShadow: [
                '0 0 22px rgba(180,0,0,0.4)',
                '0 0 58px rgba(210,0,0,0.78)',
                '0 0 22px rgba(180,0,0,0.4)',
              ],
            }}
            transition={{ duration: 2.2, repeat: Infinity }}
            className="inline-flex items-center justify-center gap-3 w-full sm:w-auto px-10 py-5 rounded-full font-sans text-sm font-black uppercase tracking-[0.2em] text-white"
            style={{
              background: 'linear-gradient(135deg, #d40000 0%, #7a0000 100%)',
              border: '1px solid rgba(255,90,90,0.35)',
            }}
          >
            <ArrowIcon />
            Acessar meu protocolo agora →
          </motion.a>

          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-1.5">
            {['✓ 100% gratuito', '✓ Acesso imediato', '✓ Cancele quando quiser'].map((t) => (
              <span key={t} className="text-white/20 text-[10px] font-sans">{t}</span>
            ))}
          </div>

          <div className="pt-10 border-t border-white/[0.04]">
            <Link href="/" className="text-white/15 text-xs font-sans hover:text-white/35 transition-colors">
              ← Voltar ao início
            </Link>
          </div>
        </motion.section>

      </div>
    </main>
  );
}
