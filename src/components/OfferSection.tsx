'use client';

import { motion } from 'framer-motion';
import { useCountdown } from '@/hooks/useCountdown';
import { CreditCard, Banknote } from 'lucide-react';

// ── Ultra-thin SVG stroke icons (1px weight, white/crimson) ──
const IconFace = () => (
  <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
    <circle cx="11" cy="11" r="9.5" stroke="white" strokeWidth="1"/>
    <circle cx="8" cy="9.5" r="1.2" fill="white"/>
    <circle cx="14" cy="9.5" r="1.2" fill="white"/>
    <path d="M7 13.5c1 1.5 7 1.5 8 0" stroke="white" strokeWidth="1" strokeLinecap="round"/>
  </svg>
);
const IconBolt = () => (
  <svg width="18" height="22" viewBox="0 0 18 22" fill="none">
    <path d="M10.5 1L1 13h8.5L7.5 21L17 9H8.5L10.5 1Z" stroke="white" strokeWidth="1" strokeLinejoin="round"/>
  </svg>
);
const IconRibbon = () => (
  <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
    <circle cx="11" cy="8" r="6.5" stroke="white" strokeWidth="1"/>
    <path d="M7 13.5L4 20l7-3 7 3-3-6.5" stroke="white" strokeWidth="1" strokeLinejoin="round"/>
    <path d="M9 8l1.5 1.5L13 6" stroke="white" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
const IconShield = () => (
  <svg width="20" height="22" viewBox="0 0 20 22" fill="none">
    <path d="M10 1L1 5v6c0 5 4 9 9 10 5-1 9-5 9-10V5L10 1Z" stroke="white" strokeWidth="1" strokeLinejoin="round"/>
    <path d="M6 11l3 3 5-5" stroke="white" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const BENEFITS = [
  { Icon: IconFace, title: 'Base Sem Máscara', desc: 'Fórmula leve com cobertura real que não acumula nas linhas.' },
  { Icon: IconBolt, title: 'Rotina em 5 Minutos', desc: 'Protocolos rápidos para o dia a dia sem complicação.' },
  { Icon: IconShield, title: 'Método Validado', desc: 'Desenvolvido por make artistas com + de 10 anos de carreira.' },
  { Icon: IconRibbon, title: 'Suporte Exclusivo', desc: 'Acompanhamento, feedback personalizado e desafios semanais com a equipe Make Flow.' },
];

// Guarantee trust cards
const GUARANTEES = [
  {
    icon: <IconShield />,
    title: 'Compra 100% Segura',
    desc: 'SSL 256-bit • Ambiente criptografado',
  },
  {
    icon: <IconRibbon />,
    title: 'Garantia de 30 Dias',
    desc: 'Reembolso integral sem perguntas',
  },
  {
    icon: <IconBolt />,
    title: 'Acesso Imediato',
    desc: 'Desbloqueio automático após o pagamento',
  },
];

// Glassmorphism checkout container — crimson 1px border, blur 25px
function SeamlessCheckout() {
  return (
    <div
      className="w-full relative rounded-[2rem] overflow-hidden"
      style={{
        background: 'rgba(8, 2, 2, 0.75)',
        backdropFilter: 'blur(25px)',
        WebkitBackdropFilter: 'blur(25px)',
        border: '1px solid rgba(153, 0, 0, 0.5)',
        boxShadow: '0 0 60px rgba(153,0,0,0.12), 0 40px 80px rgba(0,0,0,0.6)',
      }}
    >
      {/* Header bar */}
      <div className="w-full px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-[rgba(153,0,0,0.2)]">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 bg-white/[0.04] border border-white/[0.08] rounded-xl p-2.5">
            <CreditCard className="w-5 h-5 text-white/50" />
            <Banknote className="w-5 h-5 text-white/40" />
          </div>
          <div>
            <p className="text-white font-serif text-base leading-none">Checkout Seguro</p>
            <p className="text-white/40 text-xs mt-1 font-sans">Pix ou Cartão em até 12x</p>
          </div>
        </div>

        {/* Pulsing coupon badge */}
        <motion.div
          animate={{
            boxShadow: [
              '0 0 8px rgba(34,197,94,0.2)',
              '0 0 20px rgba(34,197,94,0.5)',
              '0 0 8px rgba(34,197,94,0.2)',
            ],
          }}
          transition={{ duration: 2.5, repeat: Infinity }}
          className="flex items-center gap-2 bg-green-500/[0.06] border border-green-500/35 px-4 py-2 rounded-xl"
        >
          <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
          <span className="text-green-400 text-[10px] font-black uppercase tracking-widest font-sans">Cupom Ativo:</span>
          <span className="text-white font-mono font-black text-sm bg-white/[0.07] px-2 py-0.5 rounded-lg">MAKE10</span>
        </motion.div>
      </div>

      {/* Fade at bottom of iframe */}
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#080202] to-transparent pointer-events-none z-10" />

      {/* The PepperPay iframe */}
      <iframe
        src="https://go.pepperpay.com.br/ktmvn"
        title="Checkout Seguro PepperPay"
        className="w-full border-none bg-transparent relative z-0"
        style={{
          height: '720px',
          filter: 'invert(1) hue-rotate(180deg) contrast(1.05) brightness(0.92) saturate(0.9)',
        }}
        allowFullScreen
        loading="lazy"
      />

      {/* Footer SSL strip */}
      <div className="w-full px-6 py-4 border-t border-[rgba(153,0,0,0.15)] flex items-center justify-center gap-2 relative z-20">
        <IconShield />
        <span className="text-white/20 text-xs font-sans">Protegido por PepperPay • 256-bit SSL • Ambiente Seguro</span>
      </div>
    </div>
  );
}

export function OfferSection({ answers }: { answers?: Record<number, string> }) {
  const { minutes, seconds, isFinished } = useCountdown(15);

  // Dynamic Content Logic
  const skinType = answers?.[2] || 'seu biotipo';
  const mainChallenge = answers?.[1] || 'sua rotina';
  const desiredLook = answers?.[5] || 'Magnética';

  const dynamicHeadline = answers ? (
    <>
      Protocolo de Pele <span className="italic font-light text-white/85">{desiredLook}</span><br />
      <span className="text-3xl md:text-5xl opacity-60">Gerado para {skinType}</span>
    </>
  ) : (
    <>
      Sua Rotina,<br />
      <span className="italic font-light text-white/85">Transformada.</span>
    </>
  );

  const dynamicSub = answers 
    ? `Com base no seu desafio com "${mainChallenge}", desbloqueamos as técnicas exatas para você nunca mais errar.`
    : "Com base no diagnóstico do seu perfil, desbloqueamos o acesso ao protocolo mais exclusivo do Make Flow para você.";

  return (
    <motion.section
      initial={{ opacity: 0, y: 80, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      className="w-full max-w-4xl mx-auto flex flex-col items-center space-y-16 py-20 px-4"
    >
      {/* Headline */}
      <div className="text-center space-y-6">
        <motion.div
          animate={{
            boxShadow: ['0 0 10px rgba(153,0,0,0.3)', '0 0 25px rgba(153,0,0,0.6)', '0 0 10px rgba(153,0,0,0.3)'],
          }}
          transition={{ repeat: Infinity, duration: 2.5 }}
          className="inline-block bg-[var(--color-brand)]/10 border border-[var(--color-brand)]/60 text-[var(--color-brand)] px-6 py-2 rounded-full text-xs font-black uppercase tracking-widest backdrop-blur-md font-sans"
        >
          {isFinished ? 'Protocolo Encerrado' : `Vaga reservada por ${minutes}:${seconds}`}
        </motion.div>

        <h2 className="text-4xl sm:text-5xl md:text-7xl font-serif text-white drop-shadow-2xl leading-[1.02]">
          {dynamicHeadline}
        </h2>

        <p className="text-base sm:text-lg text-white/40 max-w-2xl mx-auto font-light font-sans leading-relaxed">
          {dynamicSub}
        </p>
      </div>

      {/* Benefit grid — thin SVG icons, no color */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full">
        {BENEFITS.map(({ Icon, title, desc }, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-start gap-3 sm:gap-4 p-5 sm:p-6 bg-white/[0.02] border border-white/[0.07] rounded-2xl hover:border-white/[0.13] hover:bg-white/[0.03] transition-all group"
          >
            <div className="flex-shrink-0 mt-0.5 opacity-60 group-hover:opacity-90 transition-opacity">
              <Icon />
            </div>
            <div>
              <h3 className="font-serif text-white text-lg sm:text-xl mb-1">{title}</h3>
              <p className="text-white/35 font-light font-sans text-xs sm:text-sm leading-relaxed">{desc}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Value Stack — anchoring perceived value */}
      <div className="w-full max-w-lg mx-auto">
        <p className="text-center text-white/20 text-[10px] uppercase tracking-[0.4em] font-sans font-black mb-6">O que está incluso (e quanto custaria separado)</p>
        <div className="flex flex-col gap-2">
          {[
            { item: 'Diagnóstico Personalizado de Pele', value: 'R$ 250' },
            { item: 'Guia Completo: Kit Essencial de Maquiagem', value: 'R$ 97' },
            { item: '14 Protocolos de Aplicação Passo a Passo', value: 'R$ 497' },
            { item: '3 Rotinas Prontas (Dia, Noite, Evento)', value: 'R$ 150' },
            { item: 'Suporte Vitalício com a Equipe', value: 'R$ 300' },
          ].map(({ item, value }) => (
            <div key={item} className="flex items-center justify-between py-2.5 px-4 border-b border-white/[0.04]">
              <span className="text-white/50 text-sm font-sans font-light">{item}</span>
              <span className="text-white/20 text-sm font-sans line-through">{value}</span>
            </div>
          ))}
          <div className="flex items-center justify-between py-3 px-4 mt-2 bg-[var(--color-brand)]/[0.06] border border-[var(--color-brand)]/20 rounded-xl">
            <span className="text-white/70 text-sm font-sans font-bold">Valor Total Real</span>
            <span className="text-white/40 text-lg font-serif line-through">R$ 1.294</span>
          </div>
        </div>
      </div>

      {/* Pricing + Checkout block */}
      <div className="w-full flex flex-col items-center gap-8 relative">
        <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-[var(--color-brand)] blur-[160px] opacity-[0.07] rounded-full pointer-events-none" />

        {/* Price card — MAXIMUM impact */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-center relative z-10 w-full max-w-2xl mx-auto px-4 sm:px-6 py-10 sm:py-14 rounded-3xl overflow-hidden"
          style={{
            background: 'linear-gradient(145deg, rgba(20,5,5,0.9) 0%, rgba(5,2,2,0.95) 100%)',
            border: '1.5px solid rgba(153,0,0,0.45)',
            boxShadow: '0 0 80px rgba(153,0,0,0.15), 0 0 160px rgba(153,0,0,0.08), 0 40px 80px rgba(0,0,0,0.6)',
          }}
        >
          {/* Animated border glow */}
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[var(--color-brand)] to-transparent" />
          <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[var(--color-brand)]/30 to-transparent" />

          {/* Floating sparkles */}
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full bg-[var(--color-brand)]"
              style={{
                left: `${15 + i * 18}%`,
                top: `${20 + (i % 3) * 25}%`,
              }}
              animate={{
                opacity: [0, 0.6, 0],
                scale: [0.5, 1.2, 0.5],
                y: [0, -20, 0],
              }}
              transition={{
                duration: 2 + i * 0.5,
                repeat: Infinity,
                delay: i * 0.4,
                ease: 'easeInOut',
              }}
            />
          ))}

          <p className="text-white/30 text-[10px] uppercase tracking-[0.45em] font-sans font-black mb-8">Acesso Exclusivo (Hoje)</p>

          {/* 12x installment price */}
          <div className="flex items-start justify-center gap-3 mb-4">
            <div className="flex flex-col items-end mt-6">
              <span className="text-white/40 text-sm font-sans font-light">12x</span>
              <span className="text-white/60 font-serif text-xl font-semibold leading-none">R$</span>
            </div>
            <motion.div
              className="flex items-end"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5, type: 'spring', bounce: 0.3 }}
            >
              <span
                className="text-white font-serif leading-none"
                style={{
                  fontSize: 'clamp(80px, 18vw, 130px)',
                  fontWeight: 800,
                  letterSpacing: '-0.03em',
                  lineHeight: 1,
                  textShadow: '0 0 40px rgba(153,0,0,0.5), 0 0 80px rgba(153,0,0,0.25)',
                }}
              >
              22
              </span>
              <span className="text-white font-serif font-light mb-2" style={{ fontSize: 'clamp(28px, 6vw, 48px)' }}>
                ,30
              </span>
            </motion.div>
          </div>

          {/* Discount badges — more aggressive */}
          <div className="flex items-center justify-center gap-4 mb-4">
            <span className="text-white/20 text-base font-sans relative">
              <span className="line-through">De R$ 497,00</span>
            </span>
            <motion.span
              animate={{
                boxShadow: ['0 0 8px rgba(34,197,94,0.2)', '0 0 20px rgba(34,197,94,0.5)', '0 0 8px rgba(34,197,94,0.2)'],
              }}
              transition={{ duration: 2, repeat: Infinity }}
              className="bg-green-500/15 border border-green-500/40 text-green-400 text-xs font-black px-4 py-1.5 rounded-full font-sans tracking-wide"
            >
              60% OFF
            </motion.span>
          </div>

          {/* À vista highlight — the R$197 */}
          <motion.div
            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl mx-auto mb-2"
            style={{
              background: 'rgba(153,0,0,0.08)',
              border: '1px solid rgba(153,0,0,0.35)',
            }}
            animate={{
              boxShadow: ['0 0 15px rgba(153,0,0,0.15)', '0 0 35px rgba(153,0,0,0.3)', '0 0 15px rgba(153,0,0,0.15)'],
            }}
            transition={{ duration: 2.5, repeat: Infinity }}
          >
            <span className="text-white/60 text-sm font-sans font-medium">ou</span>
            <span className="text-white font-serif font-bold text-2xl sm:text-3xl" style={{ textShadow: '0 0 20px rgba(153,0,0,0.4)' }}>
              R$ 197
            </span>
            <span className="text-white/60 text-sm font-sans font-medium">à vista</span>
          </motion.div>
          <p className="text-white/30 text-xs font-sans mt-2 mb-6">
            <span className="text-green-400/60">+10% off</span> com cupom <span className="font-mono font-bold text-white/50 bg-white/5 px-1.5 py-0.5 rounded">MAKE10</span>
          </p>

          {/* What's included */}
          <div className="flex flex-col items-start gap-2 max-w-xs mx-auto text-left">
            {['Acesso vitalício ao Método Make Flow', 'Protocolos ilustrados passo a passo', 'E-books + Guias de aplicação', 'Suporte direto da equipe Make Flow'].map((item) => (
              <div key={item} className="flex items-center gap-2.5">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <circle cx="7" cy="7" r="6" stroke="rgba(34,197,94,0.45)" strokeWidth="1"/>
                  <path d="M4 7l2 2 4-4" stroke="rgba(34,197,94,0.65)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span className="text-white/40 text-sm font-sans font-light">{item}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* ── Guarantee Trust Cards ── */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full relative z-10">
          {GUARANTEES.map(({ icon, title, desc }) => (
            <div
              key={title}
              className="flex flex-col items-center text-center gap-3 p-5 rounded-2xl border border-white/[0.06] bg-white/[0.02]"
            >
              <div className="opacity-45">{icon}</div>
              <div>
                <p className="text-white/55 text-sm font-serif font-medium leading-snug">{title}</p>
                <p className="text-white/25 text-[11px] sm:text-xs font-sans font-light mt-1 leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Glassmorphism PepperPay checkout */}
        <div className="w-full relative z-10">
          <SeamlessCheckout />
        </div>
      </div>
    </motion.section>
  );
}
