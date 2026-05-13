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

export function OfferSection() {
  const { minutes, seconds, isFinished } = useCountdown(15);

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
          Sua Rotina,<br />
          <span className="italic font-light text-white/85">Transformada.</span>
        </h2>

        <p className="text-base sm:text-lg text-white/40 max-w-2xl mx-auto font-light font-sans leading-relaxed">
          Com base no diagnóstico do seu perfil, desbloqueamos o acesso ao protocolo mais exclusivo do Make Flow para você.
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

      {/* Pricing + Checkout block */}
      <div className="w-full flex flex-col items-center gap-8 relative">
        <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-[var(--color-brand)] blur-[160px] opacity-[0.07] rounded-full pointer-events-none" />

        {/* Price card — editorial serif */}
        <div className="text-center relative z-10 w-full max-w-2xl mx-auto px-4 sm:px-6 py-8 sm:py-10 border border-white/[0.06] rounded-3xl bg-black/30 backdrop-blur-sm">
          <p className="text-white/25 text-[10px] uppercase tracking-[0.45em] font-sans font-black mb-6">Acesso Exclusivo (Hoje)</p>

          {/* 12x installment price */}
          <div className="flex items-start justify-center gap-3 mb-3">
            <div className="flex flex-col items-end mt-6">
              <span className="text-white/40 text-sm font-sans font-light">12x</span>
              <span className="text-white/60 font-serif text-xl font-semibold leading-none">R$</span>
            </div>
            <div className="flex items-end">
              <span
                className="text-white font-serif leading-none"
                style={{ fontSize: 'clamp(80px, 18vw, 130px)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1 }}
              >
              22
              </span>
              <span className="text-white font-serif font-light mb-2" style={{ fontSize: 'clamp(28px, 6vw, 48px)' }}>
                ,30
              </span>
            </div>
          </div>

          {/* Discount badges */}
          <div className="flex items-center justify-center gap-3 mb-3">
            <span className="text-white/25 text-sm font-sans line-through">De R$ 497,00</span>
            <span className="bg-white/[0.06] border border-white/[0.10] text-white/60 text-xs font-black px-3 py-1 rounded-full font-sans tracking-wide">
              60% OFF
            </span>
          </div>

          <p className="text-white/35 text-sm uppercase tracking-[0.25em] font-sans font-light">
            ou R$ 197,00 à vista <span className="text-white/20">·</span> <span className="text-white/45">+10% com cupom MAKE10</span>
          </p>

          <div className="w-16 h-[1px] bg-[var(--color-brand)]/25 mx-auto my-6" />

          {/* What's included */}
          <div className="flex flex-col items-start gap-2 max-w-xs mx-auto text-left">
            {['Acesso vitalício ao Método Make Flow', 'Aulas + Protocolos em vídeo passo a passo', 'E-books + Guias de aplicação', 'Suporte direto da equipe Make Flow'].map((item) => (
              <div key={item} className="flex items-center gap-2.5">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <circle cx="7" cy="7" r="6" stroke="rgba(34,197,94,0.45)" strokeWidth="1"/>
                  <path d="M4 7l2 2 4-4" stroke="rgba(34,197,94,0.65)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span className="text-white/40 text-sm font-sans font-light">{item}</span>
              </div>
            ))}
          </div>
        </div>

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
