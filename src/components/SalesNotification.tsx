'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

const SALES = [
  { name: 'Juliana S.', city: 'São Paulo, SP' },
  { name: 'Mariana F.', city: 'Rio de Janeiro, RJ' },
  { name: 'Carolina M.', city: 'Curitiba, PR' },
  { name: 'Beatriz L.', city: 'Belo Horizonte, MG' },
  { name: 'Amanda P.', city: 'Brasília, DF' },
  { name: 'Fernanda R.', city: 'Porto Alegre, RS' },
  { name: 'Gabriela C.', city: 'Salvador, BA' },
  { name: 'Letícia W.', city: 'Florianópolis, SC' },
];

export function SalesNotification() {
  const [current, setCurrent] = useState<typeof SALES[0] | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const showNext = () => {
      const randomSale = SALES[Math.floor(Math.random() * SALES.length)];
      setCurrent(randomSale);
      setVisible(true);

      setTimeout(() => {
        setVisible(false);
      }, 5000);
    };

    const timer = setInterval(showNext, 12000);
    setTimeout(showNext, 3000); // Initial delay

    return () => clearInterval(timer);
  }, []);

  return (
    <AnimatePresence>
      {visible && current && (
        <motion.div
          initial={{ opacity: 0, x: -50, scale: 0.9 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8, filter: 'blur(10px)' }}
          className="fixed bottom-32 left-4 z-[100] md:bottom-8 md:left-8"
        >
          <div className="bg-black/80 backdrop-blur-xl border border-white/10 rounded-2xl p-4 flex items-center gap-4 shadow-2xl max-w-[280px]">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#990000] to-[#ff4444] flex items-center justify-center flex-shrink-0">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                <path d="M20 6L9 17l-5-5" />
              </svg>
            </div>
            <div className="flex flex-col">
              <p className="text-white text-xs font-bold font-sans">
                {current.name} acabou de entrar
              </p>
              <p className="text-white/40 text-[10px] font-sans">
                {current.city} • Confirmado há 1 min
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
