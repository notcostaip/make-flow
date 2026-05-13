'use client';

import { motion } from 'framer-motion';
import { ListChecks, CalendarDays, LayoutGrid, Package, Trophy } from 'lucide-react';

const FEATURES = [
  {
    num: '1',
    icon: ListChecks,
    title: 'QUIZ\nMAGNÉTICO',
    desc: 'Diagnóstico preciso em 2 minutos para entender seu biotipo e rotina.',
  },
  {
    num: '2',
    icon: CalendarDays,
    title: 'TRILHA 2\nSEMANAS',
    desc: 'Aulas rápidas e estruturadas por níveis para evolução garantida.',
  },
  {
    num: '3',
    icon: LayoutGrid,
    title: 'ROTINAS\nPRONTAS',
    desc: 'Protocolos passo a passo para o seu perfil: Dia, Noite e Eventos.',
  },
  {
    num: '4',
    icon: Package,
    title: 'KIT\nESSENCIAL',
    desc: 'Lista de compras inteligente para não gastar em produtos errados.',
  },
  {
    num: '5',
    icon: Trophy,
    title: 'DESAFIO\n30 DIAS',
    desc: 'Aplique as técnicas e receba feedback exclusivo da equipe.',
  },
];

export function BenefitsSection() {
  return (
    <section className="w-full py-20 relative overflow-hidden border-t border-white/[0.05]">
      <div className="absolute inset-0 bg-[#0a0505] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(153,0,0,0.15)_0%,transparent_55%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-0">
          {FEATURES.map((feat, idx) => {
            const Icon = feat.icon;
            const isFirst = idx === 0;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className={`group relative flex flex-col p-6 sm:p-8 border-b border-white/[0.07] sm:border-r sm:[&:nth-child(even)]:border-r-0 lg:[&:nth-child(even)]:border-r lg:last:border-r-0 lg:border-b-0 cursor-default ${isFirst ? 'border-l border-l-[var(--color-brand)]/60' : ''}`}
              >
                {/* Large ghost number */}
                <span className="absolute top-4 right-6 font-serif text-[88px] leading-none text-white/[0.04] pointer-events-none select-none group-hover:text-[var(--color-brand)]/10 transition-colors duration-700">
                  {feat.num}
                </span>

                <Icon
                  className={`w-8 h-8 mb-6 ${isFirst ? 'text-[var(--color-brand)]' : 'text-white/40 group-hover:text-[var(--color-brand)]'} transition-colors duration-500`}
                />

                <h3 className={`font-sans font-black text-sm tracking-[0.15em] leading-tight text-white whitespace-pre-line mb-4 ${isFirst ? 'text-white' : 'text-white/70 group-hover:text-white'} transition-colors duration-500`}>
                  {feat.title}
                </h3>

                <p className="text-white/35 text-sm font-light leading-relaxed font-sans group-hover:text-white/55 transition-colors duration-500">
                  {feat.desc}
                </p>

                {/* Bottom red rule — only first item */}
                {isFirst && (
                  <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[var(--color-brand)]" />
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
