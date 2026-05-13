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

            <div id="quiz-section" className="w-full py-32 border-t border-[var(--color-brand)]/15 relative">
              <div className="absolute top-0 left-0 w-full h-[400px] bg-gradient-to-b from-[#990000]/[0.08] to-transparent pointer-events-none" />
              <QuizSection onComplete={handleQuizComplete} />
            </div>

            <Footer />
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
