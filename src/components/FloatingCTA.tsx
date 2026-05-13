'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

export function FloatingCTA() {
  const [visible, setVisible] = useState(false);
  const [quizVisible, setQuizVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const heroHeight = window.innerHeight;
      const quizEl = document.getElementById('quiz-section');
      
      // Show after scrolling past hero
      setVisible(scrollY > heroHeight * 0.6);

      // Hide when quiz is in view
      if (quizEl) {
        const quizRect = quizEl.getBoundingClientRect();
        setQuizVisible(quizRect.top < window.innerHeight && quizRect.bottom > 0);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const shouldShow = visible && !quizVisible;

  return (
    <AnimatePresence>
      {shouldShow && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="fixed bottom-0 left-0 right-0 z-50 md:hidden"
        >
          {/* Gradient fade */}
          <div className="h-6 bg-gradient-to-t from-[#050505] to-transparent" />
          <div className="bg-[#050505]/95 backdrop-blur-xl border-t border-white/[0.08] px-4 pb-5 pt-3">
            <button
              onClick={() => {
                requestAnimationFrame(() => {
                  const el = document.getElementById('quiz-section');
                  if (!el) return;
                  const top = el.getBoundingClientRect().top + window.scrollY - 88;
                  window.scrollTo({ top, behavior: 'smooth' });
                });
              }}
              className="w-full py-3.5 rounded-full font-sans font-black text-sm uppercase tracking-[0.15em] text-white relative overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, #d40000 0%, #7a0000 100%)',
                boxShadow: '0 0 30px rgba(153,0,0,0.5), 0 4px 15px rgba(0,0,0,0.4)',
              }}
            >
              {/* Shimmer effect */}
              <motion.div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.15) 50%, transparent)',
                }}
                animate={{ x: ['-100%', '200%'] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3, ease: 'easeInOut' }}
              />
              <span className="relative z-10">Quero Meu Protocolo →</span>
            </button>
            <p className="text-center text-white/20 text-[10px] mt-2 uppercase tracking-[0.2em]">
              Quiz rápido · 2 minutos
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
