'use client';

import { motion } from 'framer-motion';

const BRANDS = [
  "O Boticário",
  "Natura",
  "Quem Disse Berenice?",
  "MAC",
  "Amazon",
  "Mercado Livre",
  "Shopee",
  "NYX Professional",
  "L'Oréal Paris",
  "Maybelline",
];

export function MarqueeSection() {
  const doubled = [...BRANDS, ...BRANDS];

  return (
    <section className="w-full py-5 bg-[#0a0808] overflow-hidden border-y border-white/[0.06] relative">
      {/* Fade edges */}
      <div className="absolute left-0 top-0 h-full w-24 bg-gradient-to-r from-[#0a0808] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 h-full w-24 bg-gradient-to-l from-[#0a0808] to-transparent z-10 pointer-events-none" />

      <div className="flex overflow-hidden">
        <motion.div
          className="flex items-center gap-16 whitespace-nowrap"
          animate={{ x: ['0%', '-50%'] }}
          transition={{ ease: 'linear', duration: 28, repeat: Infinity }}
        >
          {doubled.map((brand, idx) => (
            <span
              key={idx}
              className="text-white/25 font-serif text-2xl tracking-widest uppercase hover:text-white/60 transition-colors cursor-default flex-shrink-0 px-4"
            >
              {brand}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
