'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { CTAButton } from './CTAButton';

export function ExitIntentPopup() {
  const [show, setShow] = useState(false);
  const [closed, setClosed] = useState(false);

  useEffect(() => {
    // Desktop: Trigger on mouse leave
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !closed) {
        setShow(true);
      }
    };

    // Mobile/Universal: Trigger after 45s of "idleness" on page
    const timer = setTimeout(() => {
      if (!closed && !show) {
        setShow(true);
      }
    }, 45000);

    document.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave);
      clearTimeout(timer);
    };
  }, [closed, show]);

  if (closed && !show) return null;

  return (
    <AnimatePresence>
      {show && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => { setShow(false); setClosed(true); }}
            className="absolute inset-0 bg-black/90 backdrop-blur-md"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-lg bg-[#0a0505] border border-[#990000]/30 rounded-[2.5rem] p-10 text-center overflow-hidden"
          >
            {/* Background Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-[#990000]/20 blur-[80px] -z-10" />

            <div className="space-y-6">
              <div className="inline-block px-4 py-1.5 rounded-full bg-[#990000]/10 border border-[#990000]/40 text-[#ff4444] text-[10px] font-black uppercase tracking-[0.4em]">
                Oferta Única
              </div>
              
              <h2 className="font-serif text-4xl md:text-5xl text-white leading-tight">
                Não vá embora <br />
                <span className="italic font-light text-white/70 text-3xl md:text-4xl">sem o seu bônus.</span>
              </h2>

              <p className="text-white/40 text-base font-sans max-w-xs mx-auto">
                Ao entrar no Make Flow agora, você ganha acesso ao <strong>Workshop: Automaquiagem para Noite</strong> (Valor: R$ 97) totalmente grátis.
              </p>

              <div className="pt-4">
                <CTAButton 
                  onClick={() => {
                    const el = document.getElementById('quiz-section');
                    el?.scrollIntoView({ behavior: 'smooth' });
                    setShow(false);
                    setClosed(true);
                  }}
                  size="lg" 
                  className="w-full"
                >
                  Resgatar Meu Bônus →
                </CTAButton>
              </div>

              <button 
                onClick={() => { setShow(false); setClosed(true); }}
                className="text-white/20 text-xs font-sans uppercase tracking-widest hover:text-white/40 transition-colors"
              >
                Não, prefiro continuar sem o bônus
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
