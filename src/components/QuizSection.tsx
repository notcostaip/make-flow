'use client';

import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import { useQuiz } from '@/hooks/useQuiz';
import { useState, useCallback, useEffect } from 'react';
import { CTAButton } from '@/components/CTAButton';
export { CTAButton } from '@/components/CTAButton';

const QUIZ_QUESTIONS = [
  { id: 1, title: 'Qual é o seu maior desafio com maquiagem?', options: ['Maquiagem derrete rápido', 'Não sei os produtos certos', 'Gasto muito e não uso tudo'] },
  { id: 2, title: 'Qual é o seu tipo de pele?', options: ['Oleosa / Mista', 'Seca / Normal', 'Sensível / Acneica'] },
  { id: 3, title: 'Com que frequência você se maquia?', options: ['Todo dia (rotina diária)', 'Quando tenho eventos', 'Mal consigo começar'] },
  { id: 4, title: 'Qual é o seu nível de experiência?', options: ['Iniciante total', 'Sei o básico', 'Intermediária'] },
  { id: 5, title: 'Qual look você mais deseja?', options: ['Natural / Glow', 'Dramático / Noite', 'Clean / Sem maquiagem'] },
  { id: 6, title: 'Qual parte do rosto você mais quer destacar?', options: ['Olhos', 'Pele / Base', 'Lábios'] },
  { id: 7, title: 'Pronta para transformar sua relação com a maquiagem?', options: ['Sim! Me mostra meu perfil →'] },
];

const OPTION_LETTERS = ['A', 'B', 'C', 'D'];

// ── Shimmer wave ─────────────────────────────────────────────────────────
function ShimmerWave({ active }: { active: boolean }) {
  return (
    <AnimatePresence>
      {active && (
        <motion.div
          key="shimmer-wave"
          className="fixed inset-0 z-[60] pointer-events-none overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
        >
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: '200%' }}
            transition={{ duration: 0.65, ease: [0.25, 0, 0.5, 1] }}
            className="absolute inset-y-0 w-full"
            style={{
              background: 'linear-gradient(90deg, transparent, rgba(153,0,0,0.3) 40%, rgba(153,0,0,0.5) 50%, rgba(153,0,0,0.3) 60%, transparent)',
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ── DNA Loading ───────────────────────────────────────────────────────────
function DNALoading() {
  const DNA_LABELS = [
    'Lendo tipo de pele…',
    'Analisando biotipo facial…',
    'Mapeando rotina ideal…',
    'Compilando seu perfil…',
    'Desbloqueando protocolo…',
  ];
  const [label, setLabel] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setLabel((l) => Math.min(l + 1, DNA_LABELS.length - 1));
    }, 480);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, filter: 'blur(12px)' }}
      animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
      exit={{ opacity: 0, scale: 1.04, filter: 'blur(16px)' }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col items-center gap-10 w-full text-center"
    >
      <div className="relative w-32 h-32 flex items-center justify-center">
        <div className="absolute w-5 h-5 rounded-full bg-[var(--color-brand)] shadow-[0_0_20px_rgba(153,0,0,0.8)]" />
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2.4, ease: 'linear', repeat: Infinity }}
          className="absolute w-20 h-20 rounded-full border border-[var(--color-brand)]/40"
          style={{ borderTopColor: 'rgba(153,0,0,0.9)' }}
        >
          <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-[var(--color-brand)] shadow-[0_0_10px_rgba(153,0,0,1)]" />
        </motion.div>
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 3.2, ease: 'linear', repeat: Infinity }}
          className="absolute w-32 h-32 rounded-full border border-white/[0.08]"
          style={{ borderRightColor: 'rgba(255,255,255,0.25)' }}
        >
          <div className="absolute top-0 right-0 w-2 h-2 rounded-full bg-white/50 shadow-[0_0_6px_rgba(255,255,255,0.5)]" />
        </motion.div>
      </div>

      <div className="flex flex-col gap-4 items-center">
        <p className="text-[var(--color-brand)] text-[10px] font-black uppercase tracking-[0.4em] font-sans">
          Analisando seu DNA de Make
        </p>
        <AnimatePresence mode="wait">
          <motion.p
            key={label}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
            className="font-serif text-2xl text-white/70 italic font-light"
          >
            {DNA_LABELS[label]}
          </motion.p>
        </AnimatePresence>

        <div className="w-48 h-[2px] bg-white/[0.06] rounded-full overflow-hidden mt-2">
          <motion.div
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ duration: 2.4, ease: 'easeInOut' }}
            className="h-full bg-[var(--color-brand)] rounded-full shadow-[0_0_8px_rgba(153,0,0,0.8)]"
          />
        </div>
      </div>
    </motion.div>
  );
}


// ── Option Card (replaces AuraNode) ──────────────────────────────────────
function OptionCard({
  label,
  letter,
  onClick,
  delay,
  single,
}: {
  label: string;
  letter: string;
  onClick: () => void;
  delay: number;
  single: boolean;
}) {
  const [hovered, setHovered] = useState(false);
  const [pressed, setPressed] = useState(false);
  const controls = useAnimation();

  const handleClick = async () => {
    setPressed(true);
    await controls.start({
      x: [0, -5, 5, -3, 3, 0],
      transition: { duration: 0.32, ease: 'easeInOut' },
    });
    setPressed(false);
    onClick();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 18, filter: 'blur(6px)' }}
      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.45, delay, ease: [0.16, 1, 0.3, 1] }}
      className={single ? 'w-full max-w-sm mx-auto' : 'w-full'}
    >
      <motion.button
        animate={controls}
        onClick={handleClick}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="group relative w-full flex items-center gap-4 rounded-2xl border transition-all duration-250 overflow-hidden text-left"
        style={{
          padding: '16px 20px',
          background: hovered
            ? 'linear-gradient(90deg, rgba(153,0,0,0.18) 0%, rgba(153,0,0,0.06) 100%)'
            : 'rgba(255,255,255,0.025)',
          borderColor: hovered ? 'rgba(153,0,0,0.7)' : 'rgba(255,255,255,0.09)',
          boxShadow: hovered
            ? '0 0 24px rgba(153,0,0,0.22), inset 0 0 0 1px rgba(153,0,0,0.1)'
            : 'none',
        }}
      >
        {/* Fill animation bar */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: pressed ? 1 : 0 }}
          style={{
            originX: 0,
            background: 'linear-gradient(90deg, rgba(153,0,0,0.35), transparent)',
          }}
          transition={{ duration: 0.25 }}
        />

        {/* Letter badge */}
        <div
          className="relative z-10 flex-shrink-0 w-9 h-9 rounded-xl flex items-center justify-center border transition-all duration-200"
          style={{
            background: hovered ? 'rgba(153,0,0,0.35)' : 'rgba(255,255,255,0.04)',
            borderColor: hovered ? 'rgba(153,0,0,0.8)' : 'rgba(255,255,255,0.1)',
            boxShadow: hovered ? '0 0 12px rgba(153,0,0,0.4)' : 'none',
          }}
        >
          <span
            className="font-mono text-xs font-black transition-colors duration-200"
            style={{ color: hovered ? '#ff4444' : 'rgba(255,255,255,0.35)' }}
          >
            {letter}
          </span>
        </div>

        {/* Label */}
        <span
          className="relative z-10 font-sans font-medium text-base transition-colors duration-200 leading-snug"
          style={{ color: hovered ? 'rgba(255,255,255,0.95)' : 'rgba(255,255,255,0.6)' }}
        >
          {label}
        </span>

        {/* Right arrow */}
        <motion.svg
          className="relative z-10 ml-auto flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
          animate={{ x: hovered ? 0 : -4 }}
          transition={{ duration: 0.2 }}
          width="16" height="16" viewBox="0 0 16 16" fill="none"
        >
          <path d="M3 8h10M9 4l4 4-4 4" stroke="rgba(153,0,0,0.9)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </motion.svg>
      </motion.button>
    </motion.div>
  );
}

// ── Progress dots ─────────────────────────────────────────────────────────
function ProgressDots({ current, total }: { current: number; total: number }) {
  return (
    <div className="flex flex-col items-center gap-3 w-full">
      <div className="flex items-center gap-2">
        {Array.from({ length: total }).map((_, i) => (
          <motion.div
            key={i}
            animate={{
              width: i === current - 1 ? 24 : 6,
              background: i < current
                ? 'rgba(153,0,0,1)'
                : 'rgba(255,255,255,0.1)',
              boxShadow: i === current - 1
                ? '0 0 8px rgba(153,0,0,0.8)'
                : 'none',
            }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="h-[5px] rounded-full"
          />
        ))}
      </div>
      <div className="flex justify-between w-full text-[10px] text-white/20 font-sans uppercase tracking-[0.3em]">
        <span>Etapa {current} de {total}</span>
        <span>{Math.round((current / total) * 100)}%</span>
      </div>
    </div>
  );
}

// ── Main QuizSection ──────────────────────────────────────────────────────
export function QuizSection({ onComplete }: { onComplete: () => void }) {
  const quiz = useQuiz(QUIZ_QUESTIONS.length);
  const [shimmer, setShimmer] = useState(false);
  const [showDNA, setShowDNA] = useState(false);

  const handleOptionClick = useCallback(() => {
    setShimmer(true);
    setTimeout(() => setShimmer(false), 700);

    setTimeout(() => {
      if (quiz.currentStep === quiz.totalSteps) {
        quiz.completeQuiz();
        onComplete();
      } else if (quiz.state === 'idle') {
        quiz.startQuiz();
      } else if (quiz.currentStep === 6) {
        setShowDNA(true);
        setTimeout(() => {
          setShowDNA(false);
          quiz.nextStep();
        }, 2600);
      } else {
        quiz.nextStep();
      }
    }, 350);
  }, [quiz, onComplete]);

  const currentQ = QUIZ_QUESTIONS[Math.max(0, quiz.currentStep - 1)];

  return (
    <>
      <ShimmerWave active={shimmer} />

      <div className="relative w-full max-w-xl mx-auto flex flex-col items-center justify-center min-h-[70vh] px-4">
        {/* Crimson ambient glow */}
        <div
          className="absolute inset-0 pointer-events-none -z-10"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(100,0,0,0.22) 0%, rgba(40,0,0,0.08) 55%, transparent 80%)',
          }}
        />

        <AnimatePresence mode="wait">
          {quiz.state === 'idle' ? (
            // ── START SCREEN ──
            <motion.div
              key="start"
              initial={{ opacity: 0, y: 30, filter: 'blur(12px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -20, scale: 1.05, filter: 'blur(20px)' }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-center text-center space-y-8"
            >
              {/* Icon */}
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center"
                style={{
                  background: 'rgba(153,0,0,0.12)',
                  border: '1px solid rgba(153,0,0,0.4)',
                  boxShadow: '0 0 24px rgba(153,0,0,0.2)',
                }}
              >
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                  <path d="M14 3C8.477 3 4 7.477 4 13s4.477 10 10 10 10-4.477 10-10S19.523 3 14 3Z" stroke="rgba(153,0,0,0.9)" strokeWidth="1.2"/>
                  <path d="M14 8v6l4 2" stroke="rgba(255,80,80,0.8)" strokeWidth="1.2" strokeLinecap="round"/>
                  <circle cx="14" cy="13" r="1.5" fill="rgba(153,0,0,0.9)"/>
                </svg>
              </div>

              <div className="space-y-3">
                <p className="text-[var(--color-brand)] text-[10px] font-black uppercase tracking-[0.45em] font-sans">Diagnóstico Personalizado</p>
                <h2 className="font-serif text-3xl sm:text-4xl md:text-6xl text-white font-medium leading-[1.08]">
                  Descubra Seu{' '}
                  <span className="italic font-light text-white/80">Perfil</span>
                  <br />de Maquiagem
                </h2>
                <p className="text-white/35 text-sm sm:text-base font-light font-sans max-w-xs mx-auto leading-relaxed">
                  7 perguntas que desbloqueiam sua rotina ideal — sem desperdício.
                </p>
              </div>

              {/* Stats row */}
              <div className="flex items-center gap-4 sm:gap-6 text-center">
                {[['7', 'Perguntas'], ['2min', 'Duração'], ['100%', 'Grátis']].map(([val, lbl]) => (
                  <div key={lbl} className="flex flex-col gap-0.5">
                    <span className="font-mono text-white font-bold text-base sm:text-lg">{val}</span>
                    <span className="text-white/25 text-[8px] sm:text-[9px] uppercase tracking-[0.3em] font-sans">{lbl}</span>
                  </div>
                ))}
              </div>

              <CTAButton onClick={quiz.startQuiz} size="lg">
                Iniciar Jornada
              </CTAButton>
            </motion.div>

          ) : showDNA ? (
            <DNALoading key="dna" />

          ) : (
            // ── QUESTION SCREEN ──
            <motion.div
              key={`q-${quiz.currentStep}`}
              initial={{ opacity: 0, scale: 0.96, filter: 'blur(14px)' }}
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              exit={{ opacity: 0, scale: 1.03, filter: 'blur(14px)' }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              className="w-full flex flex-col space-y-6 sm:space-y-8"
            >
              {/* Progress dots */}
              <ProgressDots current={quiz.currentStep} total={quiz.totalSteps} />

              {/* Glass card */}
              <div
                className="w-full rounded-3xl p-5 sm:p-8"
                style={{
                  background: 'rgba(10,2,2,0.55)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255,255,255,0.07)',
                  boxShadow: '0 0 60px rgba(0,0,0,0.4)',
                }}
              >
                {/* Question */}
                <motion.h2
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay: 0.05 }}
                  className="font-serif text-xl sm:text-2xl md:text-3xl text-white leading-tight mb-5 sm:mb-7"
                >
                  {currentQ.title}
                </motion.h2>

                {/* Option cards */}
                <div className="flex flex-col gap-3">
                  {currentQ.options.map((option, idx) => (
                    <OptionCard
                      key={`${quiz.currentStep}-${idx}`}
                      label={option}
                      letter={currentQ.options.length === 1 ? '→' : OPTION_LETTERS[idx]}
                      delay={idx * 0.06}
                      onClick={handleOptionClick}
                      single={currentQ.options.length === 1}
                    />
                  ))}
                </div>
              </div>

              {/* Footer note */}
              <p className="text-center text-white/15 text-xs font-sans">
                Suas respostas são privadas e usadas apenas para personalizar seu protocolo.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
