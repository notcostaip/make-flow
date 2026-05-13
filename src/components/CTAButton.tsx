'use client';

import { motion } from 'framer-motion';

/**
 * Shared premium CTA button — extracted to its own file so the navbar
 * does NOT have to load the entire QuizSection bundle just for this component.
 */
export function CTAButton({
  children,
  onClick,
  size = 'lg',
  className = '',
}: {
  children: React.ReactNode;
  onClick?: () => void;
  size?: 'sm' | 'lg';
  className?: string;
}) {
  const pad = size === 'lg' ? 'px-8 sm:px-12 py-4 text-sm' : 'px-5 sm:px-6 py-2.5 text-xs';
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.96 }}
      className={`group relative overflow-hidden rounded-full border border-[#990000]/70 font-black uppercase tracking-[0.28em] text-white transition-all duration-300 hover:border-[#cc0000] hover:shadow-[0_0_36px_rgba(153,0,0,0.55),0_0_70px_rgba(153,0,0,0.2)] ${pad} ${className}`}
      style={{
        background: 'linear-gradient(135deg, rgba(153,0,0,0.85) 0%, rgba(100,0,0,0.95) 100%)',
        boxShadow: '0 0 18px rgba(153,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.07)',
      }}
    >
      {/* Shimmer sweep on hover */}
      <span
        className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out pointer-events-none"
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.09) 50%, transparent)',
        }}
      />
      {/* Top rim highlight */}
      <span className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
}
