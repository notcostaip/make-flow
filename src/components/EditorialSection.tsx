'use client';

import { motion } from 'framer-motion';
import { ShoppingBag, Search, X } from 'lucide-react';

const PAIN_POINTS = [
  {
    icon: ShoppingBag,
    title: "Gaveta Cheia",
    desc: "Produtos caros que você comprou pela embalagem e nunca soube usar. Dinheiro jogado fora.",
  },
  {
    icon: Search,
    title: "Overdose de Tutoriais",
    desc: "Vídeos ensinando drag queen quando você só queria esconder uma olheira às 7h da manhã.",
  },
  {
    icon: X,
    title: "O 'Efeito Máscara'",
    desc: "A sensação de argamassa no rosto, maquiagem derretendo e acumulando nas linhas.",
  },
];

export function EditorialSection() {
  return (
    <section className="w-full py-16 md:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[#0d0404] to-[#050505] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(153,0,0,0.12)_0%,transparent_60%)] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <p className="text-[var(--color-brand)] uppercase tracking-[0.35em] text-xs font-bold mb-4">O Problema</p>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white leading-[1.1] md:leading-[1.05]">
            Você reconhece<br />
            <span className="italic font-light text-white/80">alguma dessas?</span>
          </h2>
        </motion.div>

        <div className="flex flex-col space-y-4">
          {PAIN_POINTS.map((point, idx) => {
            const Icon = point.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.7, delay: idx * 0.12, ease: [0.16, 1, 0.3, 1] }}
                className="group relative flex items-start gap-4 sm:gap-6 p-6 sm:p-8 border border-[#3a1010]/60 rounded-2xl bg-[#0e0505]/70 hover:border-[var(--color-brand)]/40 hover:bg-[#120707]/80 transition-all duration-500 cursor-default backdrop-blur-sm"
              >
                {/* Left crimson accent bar */}
                <div className="absolute left-0 top-4 bottom-4 w-[2px] bg-[var(--color-brand)]/30 group-hover:bg-[var(--color-brand)] transition-colors duration-500 rounded-full" />

                <div className="flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center border border-white/10 rounded-xl bg-white/[0.03] group-hover:border-[var(--color-brand)]/30 transition-colors">
                  <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-white/50 group-hover:text-[var(--color-brand)] transition-colors" />
                </div>

                <div className="flex flex-col space-y-2">
                  <h3 className="font-serif text-2xl text-white group-hover:text-white transition-colors">{point.title}</h3>
                  <p className="text-white/50 font-light text-base leading-relaxed font-sans">{point.desc}</p>
                </div>

                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[var(--color-brand)]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              </motion.div>
            );
          })}
        </div>

        {/* Emotional amplifier — makes the pain FELT */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.4 }}
          className="mt-12 text-center"
        >
          <p className="text-white/30 font-serif text-lg sm:text-xl italic leading-relaxed max-w-lg mx-auto">
            Cada mês que passa, você gasta mais R$ 200 em produtos errados e continua se sentindo insegura no espelho.
          </p>
          <p className="text-[var(--color-brand)]/70 font-sans text-sm font-bold uppercase tracking-[0.3em] mt-4">
            E se existisse um caminho mais inteligente?
          </p>
        </motion.div>
      </div>
    </section>
  );
}
