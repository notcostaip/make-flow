'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import Link from 'next/link';
import { CTAButton } from '@/components/CTAButton';

const NAV_ITEMS: { label: string; id: string }[] = [
  { label: 'O Método',     id: 'o-método' },
  { label: 'A Plataforma', id: 'a-plataforma' },
  { label: 'Investimento', id: 'investimento' },
];

const NAVBAR_HEIGHT = 88; // px — fixed header offset

function scrollToId(id: string) {
  // rAF ensures we read layout after the current paint — prevents reflow jank
  requestAnimationFrame(() => {
    const el = document.getElementById(id);
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - NAVBAR_HEIGHT;
    window.scrollTo({ top, behavior: 'smooth' });
  });
}

export function NavigationBar({ onStartQuiz }: { onStartQuiz?: () => void }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleNavClick = (id: string) => {
    setIsOpen(false);
    scrollToId(id);
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, type: 'spring', bounce: 0.4 }}
      className="fixed top-0 left-0 w-full z-50 px-4 md:px-6 py-4"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between bg-[#0a0a0a]/70 backdrop-blur-xl border border-white/10 rounded-full px-4 md:px-6 py-2.5 md:py-3 shadow-2xl relative">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-2 cursor-pointer relative z-[60]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logomark.png"
            alt="Make Flow"
            width={24}
            height={24}
            className="md:w-7 md:h-7"
            style={{ objectFit: 'contain', display: 'block' }}
          />
          <span className="font-serif text-lg md:text-xl text-white font-medium tracking-wide">Make Flow</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center space-x-8">
          {NAV_ITEMS.map(({ label, id }) => (
            <button
              key={id}
              onClick={() => handleNavClick(id)}
              className="text-sm font-medium text-gray-400 hover:text-white transition-colors"
            >
              {label}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-3 relative z-[60]">
          <CTAButton
            size="sm"
            className="hidden sm:flex"
            onClick={() => {
              setIsOpen(false);
              if (onStartQuiz) onStartQuiz();
              else scrollToId('quiz-section');
            }}
          >
            Começar →
          </CTAButton>

          {/* Mobile Hamburguer */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 text-white/70 hover:text-white transition-colors"
            aria-label="Toggle Menu"
          >
            <div className="w-6 h-5 flex flex-col justify-between items-end">
              <motion.span
                animate={{ rotate: isOpen ? 45 : 0, y: isOpen ? 9 : 0, width: isOpen ? '100%' : '100%' }}
                className="h-[2px] bg-white rounded-full bg-current"
              />
              <motion.span
                animate={{ opacity: isOpen ? 0 : 1 }}
                className="h-[2px] w-2/3 bg-white rounded-full bg-current"
              />
              <motion.span
                animate={{ rotate: isOpen ? -45 : 0, y: isOpen ? -9 : 0, width: isOpen ? '100%' : '100%' }}
                className="h-[2px] bg-white rounded-full bg-current"
              />
            </div>
          </button>
        </div>

        {/* Mobile Menu Drawer */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="absolute top-[110%] left-0 w-full bg-[#0a0a0a]/90 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] p-8 flex flex-col gap-6 shadow-2xl lg:hidden z-50"
            >
              {NAV_ITEMS.map(({ label, id }) => (
                <button
                  key={id}
                  onClick={() => handleNavClick(id)}
                  className="text-xl font-serif text-white/80 hover:text-white transition-all text-left flex items-center justify-between group"
                >
                  <span>{label}</span>
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity text-[var(--color-brand)]">→</span>
                </button>
              ))}
              <div className="h-px bg-white/10 w-full" />
              <CTAButton
                size="lg"
                className="w-full sm:hidden"
                onClick={() => {
                  setIsOpen(false);
                  if (onStartQuiz) onStartQuiz();
                  else scrollToId('quiz-section');
                }}
              >
                Começar Jornada →
              </CTAButton>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}
