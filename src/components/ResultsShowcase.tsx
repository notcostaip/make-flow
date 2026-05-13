'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

const RESULTS = [
  {
    image: '/make_flow_transformation_1_1778657485055.png',
    name: 'Amanda, 28',
    text: 'Sempre gastei fortunas em bases que deixavam minha pele pesada. Com o protocolo de Pele Glow, aprendi a técnica certa e hoje minha make dura o dia todo com aspecto natural.',
    tag: 'Foco: Pele Glow'
  },
  {
    image: '/make_flow_transformation_2_1778657537234.png',
    name: 'Beatriz, 34',
    text: 'Minha maior dificuldade eram as olheiras e o aspecto cansado. O Make Flow me ensinou a neutralizar sem craquelar. É libertador.',
    tag: 'Foco: Olheiras & Contorno'
  }
];

export function ResultsShowcase() {
  return (
    <section className="w-full py-24 bg-[#050505]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16 space-y-4">
          <p className="text-[var(--color-brand)] text-[10px] font-black uppercase tracking-[0.45em]">Resultados Reais</p>
          <h2 className="font-serif text-4xl md:text-6xl text-white">
            Transformações <span className="italic font-light text-white/70">Magnéticas</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {RESULTS.map((res, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: idx * 0.2 }}
              className="group relative bg-white/[0.02] border border-white/[0.05] rounded-[2rem] overflow-hidden"
            >
              <div className="aspect-square relative overflow-hidden">
                <Image
                  src={res.image}
                  alt={res.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-6 right-6">
                  <span className="bg-black/60 backdrop-blur-md border border-white/10 px-4 py-1.5 rounded-full text-[10px] font-bold text-white uppercase tracking-widest">
                    {res.tag}
                  </span>
                </div>
              </div>
              <div className="p-8 space-y-4">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="#990000">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  ))}
                </div>
                <p className="text-white/60 text-lg font-serif italic leading-relaxed">
                  "{res.text}"
                </p>
                <p className="text-white font-sans text-sm font-bold uppercase tracking-widest">
                  — {res.name}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
