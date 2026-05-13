'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { AnimatePresence, motion } from 'framer-motion';

// ── CRITICAL PATH — above-the-fold, synchronous ──────────────────────────
// These must be available immediately — server renders them to HTML
import { NavigationBar }  from '@/components/NavigationBar';
import { HeroSection }    from '@/components/HeroSection';
import { MarqueeSection } from '@/components/MarqueeSection';

// ── BELOW THE FOLD — direct imports (SSR'd for instant paint) ────────────
// Next.js renders these on the server → browser receives complete HTML
import { EditorialSection }                         from '@/components/EditorialSection';
import { HardwareShowcase }                         from '@/components/HardwareShowcase';
import { BenefitsSection }                          from '@/components/BenefitsSection';
import { BridgeSection }                            from '@/components/BridgeSection';
import { CostComparisonSection, FAQSection }        from '@/components/InsightSections';
import { QuizSection }                              from '@/components/QuizSection';
import { Footer }                                   from '@/components/Footer';
import { FloatingCTA }                              from '@/components/FloatingCTA';

// ── CANVAS — must be ssr:false (window/requestAnimationFrame required) ───
const ParticleBackground = dynamic(
  () => import('@/components/ParticleBackground').then(m => ({ default: m.ParticleBackground })),
  { ssr: false }
);

// ── POST-QUIZ ONLY — user spends 2+ min on quiz before this shows ────────
// Safe to lazy-load: user has plenty of time while answering questions
const OfferSection = dynamic(
  () => import('@/components/OfferSection').then(m => ({ default: m.OfferSection })),
  { ssr: false }
);

export default function Home() {
  const [isQuizComplete, setIsQuizComplete] = useState(false);

  const handleQuizComplete = () => {
    setIsQuizComplete(true);
    setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 500);
  };

  const startQuiz = () => {
    requestAnimationFrame(() => {
      const el = document.getElementById('quiz-section');
      if (!el) return;
      const top = el.getBoundingClientRect().top + window.scrollY - 88;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  };

  return (
    <main className="min-h-screen w-full overflow-x-hidden font-sans bg-[#050505] scroll-smooth relative z-0">
      {/* Canvas: deferred, not blocking first paint */}
      <ParticleBackground />

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(153,0,0,0.1)_0%,rgba(5,5,5,1)_60%)] pointer-events-none -z-10" />

      <AnimatePresence mode="wait">
        {!isQuizComplete ? (
          <motion.div
            key="lander"
            exit={{ opacity: 0, y: -60, filter: 'blur(12px)' }}
            transition={{ duration: 0.55, ease: 'easeInOut' }}
            className="w-full flex-1 flex flex-col items-center"
          >
            <NavigationBar onStartQuiz={startQuiz} />
            <HeroSection />
            <MarqueeSection />

            <div id="o-método" className="w-full">
              <EditorialSection />
            </div>
            <div id="a-plataforma" className="w-full">
              <HardwareShowcase />
            </div>
            <div id="investimento" className="w-full">
              <BenefitsSection />
            </div>

            <BridgeSection />
            <CostComparisonSection />
            <FAQSection />

            {/* ── QUIZ — standalone "app" container ── */}
            <div id="quiz-section" className="w-full py-16 md:py-32 relative">
              {/* Full-width dramatic separator */}
              <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[var(--color-brand)] to-transparent" />
              <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-[#990000]/[0.12] to-transparent pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-full h-[300px] bg-gradient-to-t from-[#990000]/[0.06] to-transparent pointer-events-none" />

              {/* Pulsing ambient orb */}
              <motion.div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none -z-10"
                animate={{
                  background: [
                    'radial-gradient(circle, rgba(153,0,0,0.15) 0%, transparent 70%)',
                    'radial-gradient(circle, rgba(153,0,0,0.25) 0%, transparent 70%)',
                    'radial-gradient(circle, rgba(153,0,0,0.15) 0%, transparent 70%)',
                  ],
                }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              />

              {/* Floating label — "app header" */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="flex justify-center mb-8"
              >
                <div
                  className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full"
                  style={{
                    background: 'rgba(153,0,0,0.08)',
                    border: '1px solid rgba(153,0,0,0.5)',
                    backdropFilter: 'blur(12px)',
                    boxShadow: '0 0 30px rgba(153,0,0,0.15), 0 4px 20px rgba(0,0,0,0.3)',
                  }}
                >
                  <motion.div
                    className="w-2 h-2 rounded-full bg-[var(--color-brand)]"
                    animate={{
                      boxShadow: ['0 0 4px #990000', '0 0 12px #cc0000', '0 0 4px #990000'],
                    }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                  <span className="text-[var(--color-brand)] text-[10px] font-black uppercase tracking-[0.35em] font-sans">
                    Diagnóstico Personalizado
                  </span>
                  <span className="text-white/20 text-[10px] font-sans">·</span>
                  <span className="text-white/30 text-[10px] font-sans font-medium">Grátis</span>
                </div>
              </motion.div>

              {/* App-like container with glowing border */}
              <div className="max-w-xl mx-auto px-4">
                <div
                  className="relative rounded-[2rem] overflow-hidden"
                  style={{
                    background: 'rgba(5,5,5,0.9)',
                    border: '1.5px solid rgba(153,0,0,0.4)',
                    boxShadow: '0 0 60px rgba(153,0,0,0.12), 0 0 120px rgba(153,0,0,0.06), 0 40px 80px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.04)',
                  }}
                >
                  {/* Inner glow edges */}
                  <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[var(--color-brand)]/30 to-transparent" />
                  <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[var(--color-brand)]/20 to-transparent" />

                  <div className="px-2 py-6 sm:p-8">
                    <QuizSection onComplete={handleQuizComplete} />
                  </div>
                </div>
              </div>
            </div>

            <Footer />
            <FloatingCTA />
          </motion.div>
        ) : (
          <motion.div
            key="offer"
            initial={{ opacity: 0, scale: 0.97, filter: 'blur(8px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            transition={{ duration: 1.2, type: 'spring', bounce: 0.25 }}
            className="w-full min-h-screen pt-32 pb-40"
          >
            <OfferSection />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
