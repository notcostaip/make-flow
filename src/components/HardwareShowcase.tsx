'use client';

import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { useRef, MouseEvent } from 'react';
import { ShoppingBag, Search } from 'lucide-react';

const MAKEUP_PRODUCTS = [
  { name: 'Sérum Pré-Make Glow', price: 'R$ 89,90', rating: 5.0, discount: '-40%', emoji: '✨' },
  { name: 'Esponja Beauty Core', price: 'R$ 24,50', rating: 4.7, discount: '-35%', emoji: '💄' },
  { name: 'Paleta Niina Secrets', price: 'R$ 89,00', rating: 4.8, discount: '-40%', emoji: '🎨' },
  { name: 'Batom YSL Rouge Pur', price: 'R$ 159', rating: 4.9, discount: '-49%', emoji: '💋' },
  { name: 'Base Fit Me Maybelline', price: 'R$ 34', rating: 4.6, discount: '-62%', emoji: '🪞' },
  { name: 'Blur MAC Studio Fix', price: 'R$ 97', rating: 4.8, discount: '-56%', emoji: '🌟' },
];

// SVG product illustrations keyed by emoji — themed per product category
const PRODUCT_ICONS: Record<string, React.ReactNode> = {
  // Sérum — dropper bottle
  '✨': (
    <svg width="38" height="38" viewBox="0 0 38 38" fill="none">
      <rect x="14" y="11" width="10" height="18" rx="3" fill="#cc0000" opacity="0.15" stroke="#cc0000" strokeWidth="1.2"/>
      <rect x="16.5" y="5" width="5" height="8" rx="1.2" stroke="#cc0000" strokeWidth="1"/>
      <circle cx="19" cy="31" r="2.2" fill="#cc0000" opacity="0.55"/>
      <line x1="19" y1="15" x2="19" y2="23" stroke="#cc0000" strokeWidth="1" opacity="0.35"/>
    </svg>
  ),
  // Esponja — puff with handle
  '💄': (
    <svg width="38" height="38" viewBox="0 0 38 38" fill="none">
      <ellipse cx="19" cy="17" rx="11" ry="9" fill="#cc0000" opacity="0.1" stroke="#cc0000" strokeWidth="1.2"/>
      <ellipse cx="19" cy="17" rx="6" ry="5" fill="#cc0000" opacity="0.18"/>
      <line x1="19" y1="26" x2="19" y2="33" stroke="#cc0000" strokeWidth="2" strokeLinecap="round" opacity="0.45"/>
    </svg>
  ),
  // Paleta — grid of color swatches
  '🎨': (
    <svg width="38" height="38" viewBox="0 0 38 38" fill="none">
      <rect x="5" y="10" width="28" height="18" rx="3" fill="#cc0000" opacity="0.08" stroke="#cc0000" strokeWidth="1.2"/>
      <rect x="8" y="13" width="6" height="5" rx="1" fill="#cc0000" opacity="0.55"/>
      <rect x="16" y="13" width="6" height="5" rx="1" fill="#cc0000" opacity="0.3"/>
      <rect x="24" y="13" width="6" height="5" rx="1" fill="#cc0000" opacity="0.18"/>
      <rect x="8" y="20" width="6" height="5" rx="1" fill="#cc0000" opacity="0.18"/>
      <rect x="16" y="20" width="6" height="5" rx="1" fill="#cc0000" opacity="0.4"/>
      <rect x="24" y="20" width="6" height="5" rx="1" fill="#cc0000" opacity="0.28"/>
    </svg>
  ),
  // Batom — lipstick tube
  '💋': (
    <svg width="38" height="38" viewBox="0 0 38 38" fill="none">
      <rect x="15" y="18" width="8" height="14" rx="1.5" fill="#cc0000" opacity="0.18" stroke="#cc0000" strokeWidth="1.2"/>
      <path d="M15 18V11a4 4 0 018 0v7" stroke="#cc0000" strokeWidth="1.2"/>
      <ellipse cx="19" cy="10" rx="4" ry="2.5" fill="#cc0000" opacity="0.7"/>
      <line x1="15" y1="18" x2="23" y2="18" stroke="#cc0000" strokeWidth="1" opacity="0.5"/>
    </svg>
  ),
  // Base — pump bottle
  '🪞': (
    <svg width="38" height="38" viewBox="0 0 38 38" fill="none">
      <rect x="11" y="14" width="16" height="18" rx="3" fill="#cc0000" opacity="0.12" stroke="#cc0000" strokeWidth="1.2"/>
      <rect x="15" y="8" width="8" height="8" rx="2" stroke="#cc0000" strokeWidth="1"/>
      <line x1="11" y1="21" x2="27" y2="21" stroke="#cc0000" strokeWidth="1" opacity="0.35"/>
      <rect x="15.5" y="24" width="7" height="3" rx="1" fill="#cc0000" opacity="0.3"/>
    </svg>
  ),
  // Blur / Compact powder
  '🌟': (
    <svg width="38" height="38" viewBox="0 0 38 38" fill="none">
      <ellipse cx="19" cy="19" rx="12" ry="9" fill="#cc0000" opacity="0.1" stroke="#cc0000" strokeWidth="1.2"/>
      <ellipse cx="19" cy="19" rx="7" ry="5" fill="#cc0000" opacity="0.15" stroke="#cc0000" strokeWidth="1"/>
      <circle cx="19" cy="19" r="2.2" fill="#cc0000" opacity="0.5"/>
    </svg>
  ),
};

// Product card inside the iPhone screen — SVG product thumbnails
function PhoneProductCard({ product }: { product: typeof MAKEUP_PRODUCTS[0] }) {
  return (
    <div className="relative bg-[#1c0a0a] border border-white/[0.08] rounded-2xl p-3 flex-shrink-0 w-[120px] flex flex-col gap-2">
      <div className="absolute top-2 left-2 bg-[var(--color-brand)] text-white text-[8px] font-black px-1.5 py-0.5 rounded-md z-10">
        {product.discount}
      </div>
      {/* Product illustration — SVG themed per product type */}
      <div className="w-full h-[72px] rounded-xl bg-[#2a1010]/80 flex items-center justify-center">
        {PRODUCT_ICONS[product.emoji] ?? <span className="text-3xl">{product.emoji}</span>}
      </div>
      <p className="text-white text-[10px] font-medium leading-tight">{product.name}</p>
      <p className="text-white font-black text-[13px] leading-none">{product.price}</p>
      <div className="flex items-center gap-0.5">
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
          <path d="M5 1l1.2 2.5L9 4l-2 2 .5 2.8L5 7.5 2.5 8.8 3 6 1 4l2.8-.5L5 1z" fill="rgba(250,204,21,0.9)"/>
        </svg>
        <span className="text-[9px] text-white/50">{product.rating}</span>
      </div>
    </div>
  );
}

// iPhone screen UI — exactly matches image 2
function IPhoneScreen() {
  const allProducts = [...MAKEUP_PRODUCTS, ...MAKEUP_PRODUCTS, ...MAKEUP_PRODUCTS];
  return (
    <div className="w-full h-full bg-[#0d0404] flex flex-col overflow-hidden">
      {/* Status bar */}
      <div className="flex justify-between items-center px-5 pt-3 pb-1 text-[9px] text-white/60 font-sans flex-shrink-0">
        <span className="font-semibold">9:41</span>
        <span className="flex gap-1 text-white/50">• • •</span>
      </div>

      {/* App header */}
      <div className="flex items-center justify-between px-4 py-3 flex-shrink-0">
        <div className="flex items-baseline gap-1.5">
          <span className="font-serif text-white text-[22px] leading-none font-medium">Make</span>
          <span className="font-serif text-[var(--color-brand)] text-[22px] leading-none italic">Flow</span>
        </div>
        <div className="w-9 h-9 rounded-full border border-white/20 bg-white/[0.05] flex items-center justify-center">
          <ShoppingBag className="w-4 h-4 text-white/70" />
        </div>
      </div>

      {/* Search bar */}
      <div className="mx-4 mb-4 bg-[#1a0808]/90 border border-white/[0.08] rounded-2xl px-4 py-2.5 flex items-center gap-2 flex-shrink-0">
        <Search className="w-3.5 h-3.5 text-white/25" />
        <span className="text-white/25 text-xs font-sans">Buscar paletas...</span>
      </div>

      {/* Section header */}
      <div className="px-4 mb-3 flex items-center justify-between flex-shrink-0">
        <span className="text-white/65 font-black text-[10px] tracking-[0.18em] uppercase font-sans">Destaques Exclusivos</span>
        <span className="text-[var(--color-brand)] font-bold text-[11px]">→</span>
      </div>

      {/* 3-column horizontal scroll feed */}
      <div className="px-2 overflow-hidden flex-shrink-0 [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
        <motion.div
          className="flex gap-2.5 pb-2"
          animate={{ x: [0, -800] }}
          transition={{ repeat: Infinity, ease: 'linear', duration: 22 }}
        >
          {allProducts.map((p, i) => <PhoneProductCard key={i} product={p} />)}
        </motion.div>
      </div>

      {/* Vault Blur container — Kit Complete Flow is premium-locked */}
      <div className="relative mx-4 mt-4 flex-shrink-0">
        {/* Blurred kit CTA behind the vault */}
        <div className="pointer-events-none select-none" style={{ filter: 'blur(7px)', opacity: 0.6 }}>
          <div className="bg-[var(--color-brand)] rounded-[20px] p-4 flex items-center gap-3 shadow-[0_8px_30px_rgba(153,0,0,0.3)]">
            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center flex-shrink-0">
              <span className="text-white text-lg">⭐</span>
            </div>
            <div className="flex flex-col">
              <p className="text-white font-black text-[15px] leading-tight font-sans">Kit Complete Flow</p>
              <p className="text-white/70 text-[10px] uppercase tracking-[0.15em] font-sans mt-0.5">Desconto Ativado</p>
            </div>
          </div>
        </div>

        {/* Padlock overlay — centered, breathing glow */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            animate={{ opacity: [0.7, 1, 0.7], scale: [1, 1.06, 1] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
            className="flex flex-col items-center gap-1"
          >
            <svg width="22" height="26" viewBox="0 0 22 26" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="1.5" y="11" width="19" height="13" rx="2.5" stroke="white" strokeWidth="1.3"/>
              <path d="M6 11V7C6 4.24 8.24 2 11 2s5 2.24 5 5v4" stroke="white" strokeWidth="1.3" strokeLinecap="round"/>
              <circle cx="11" cy="17.5" r="2" fill="white"/>
              <line x1="11" y1="19.5" x2="11" y2="21.5" stroke="white" strokeWidth="1.3" strokeLinecap="round"/>
            </svg>
            <span className="text-white/60 text-[7px] font-black uppercase tracking-wider font-sans">Exclusivo</span>
          </motion.div>
        </div>
      </div>

      {/* Bottom nav dock — 5 symmetric slots, bag perfectly centered */}
      <div className="mt-auto px-4 pb-4 pt-3 flex justify-around items-center flex-shrink-0">
        <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
        <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
        <div className="w-12 h-7 rounded-full bg-[var(--color-brand)] flex items-center justify-center shadow-[0_0_12px_rgba(153,0,0,0.6)]">
          <ShoppingBag className="w-4 h-4 text-white" />
        </div>
        <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
        <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
      </div>
    </div>
  );
}

// Refractive glass iPhone 15 Pro Max — matches image 2
function IPhoneMockup() {
  const tiltX = useMotionValue(0);
  const tiltY = useMotionValue(0);
  const springX = useSpring(tiltX, { stiffness: 70, damping: 22 });
  const springY = useSpring(tiltY, { stiffness: 70, damping: 22 });

  function handleMouseMove(e: MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    tiltX.set((e.clientY - rect.top - rect.height / 2) / 15);
    tiltY.set(-(e.clientX - rect.left - rect.width / 2) / 15);
  }
  function handleMouseLeave() { tiltX.set(0); tiltY.set(0); }

  return (
    <div className="relative flex items-center justify-center">
      {/* Warm crimson radial glow — reduced luminosity / mysterious */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[360px] h-[360px] rounded-full bg-[var(--color-brand)] blur-[140px] opacity-18" />
      </div>

      <motion.div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX: springX, rotateY: springY, transformPerspective: 1200 }}
        className="relative will-change-transform"
      >
        {/* Outer metallic shell — refractive glass look */}
        <div
          className="relative w-[265px] h-[550px] sm:w-[300px] sm:h-[620px] rounded-[3rem] sm:rounded-[3.8rem] overflow-hidden"
          style={{
            background: 'linear-gradient(145deg, #2a1010 0%, #150505 40%, #1e0808 100%)',
            boxShadow: '0 40px 100px rgba(0,0,0,0.8), 0 0 0 1px rgba(255,255,255,0.12), inset 0 0 0 1px rgba(255,255,255,0.06)',
          }}
        >
          {/* Inner crimson light leak — low intensity, mysterious */}
          <div className="absolute inset-0 rounded-[3.8rem] shadow-[inset_0_0_40px_rgba(153,0,0,0.2)] pointer-events-none z-30" />

          {/* Top reflective stripe */}
          <div className="absolute top-0 left-8 right-8 h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent z-40" />

          {/* Dynamic Island */}
          <div className="absolute top-3 left-1/2 -translate-x-1/2 w-24 h-7 bg-black rounded-full z-40 flex items-center justify-center shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
            <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-brand)] animate-pulse shadow-[0_0_6px_rgba(153,0,0,0.9)]" />
          </div>

          {/* Screen bezel frame */}
          <div className="absolute inset-[6px] sm:inset-[8px] rounded-[2.6rem] sm:rounded-[3.3rem] overflow-hidden bg-[#0d0404]">
            {/* Content with top padding for dynamic island */}
            <div className="w-full h-full pt-8">
              <IPhoneScreen />
            </div>
          </div>

          {/* Glass surface reflection gradient */}
          <div
            className="absolute inset-0 rounded-[3.8rem] pointer-events-none z-20"
            style={{
              background: 'linear-gradient(135deg, rgba(255,255,255,0.10) 0%, transparent 40%, transparent 70%, rgba(255,255,255,0.04) 100%)',
            }}
          />
        </div>

        {/* Phone ambient shadow below — reduced */}
        <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-[180px] h-8 bg-[var(--color-brand)] blur-[28px] opacity-15 rounded-full" />
      </motion.div>
    </div>
  );
}

// MacBook Pro with vertical infinite marquee
function MacBookMockup() {
  const priceItems = [
    { brand: 'MAC', product: 'Studio Fix Blur', price: 'R$ 97', original: 'R$ 220', pct: '-56%' },
    { brand: 'O Boticário', product: 'Glossy Shine', price: 'R$ 42', original: 'R$ 89', pct: '-53%' },
    { brand: 'Vult', product: 'Base Líquida', price: 'R$ 19', original: 'R$ 45', pct: '-58%' },
    { brand: 'Shopee', product: 'Paleta Niina', price: 'R$ 89', original: 'R$ 149', pct: '-40%' },
    { brand: 'Amazon', product: 'Batom YSL', price: 'R$ 159', original: 'R$ 310', pct: '-49%' },
    { brand: 'Natura', product: 'Sérum Pré-Make', price: 'R$ 89', original: 'R$ 149', pct: '-40%' },
    { brand: 'Quem Disse', product: 'Fixador Bruminha', price: 'R$ 34', original: 'R$ 69', pct: '-51%' },
  ];
  const tripled = [...priceItems, ...priceItems, ...priceItems];

  return (
    <div className="relative w-full max-w-xl hidden md:block">
      {/* Screen */}
      <div
        className="w-full aspect-video rounded-t-[1.2rem] overflow-hidden relative"
        style={{
          background: '#0d0404',
          boxShadow: '0 0 0 1px rgba(255,255,255,0.10), 0 0 0 8px #1a0808, 0 0 0 9px rgba(255,255,255,0.06)',
        }}
      >
        {/* Notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-14 h-4 bg-black rounded-b-lg z-30 flex items-center justify-center">
          <div className="w-1.5 h-1.5 rounded-full bg-green-500/60 shadow-[0_0_6px_#22c55e]" />
        </div>

        {/* Screen UI */}
        <div className="w-full h-full flex flex-col p-5 pt-8 relative">
          {/* Internal glow */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(153,0,0,0.12)_0%,transparent_60%)] pointer-events-none" />

          <div className="flex justify-between items-center mb-4 relative z-10">
            <div>
              <p className="text-[var(--color-brand)] text-[9px] font-black uppercase tracking-[0.25em]">Sistema Ativo Agora</p>
              <h3 className="font-serif text-white text-xl">Painel de Preços</h3>
            </div>
            <div className="flex items-center gap-1.5 bg-green-500/10 border border-green-500/30 px-3 py-1 rounded-full">
              <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              <span className="text-green-400 text-[9px] font-bold uppercase tracking-wider">Live</span>
            </div>
          </div>

          {/* Vertical scrolling price feed */}
          <div className="flex-1 overflow-hidden relative z-10 [mask-image:linear-gradient(to_bottom,transparent,black_10%,black_90%,transparent)]">
            <motion.div
              className="flex flex-col gap-2"
              animate={{ y: [0, -800] }}
              transition={{ repeat: Infinity, ease: 'linear', duration: 20 }}
            >
              {tripled.map((item, i) => (
                <div key={i} className="flex items-center justify-between bg-[#150606]/80 border border-white/[0.06] rounded-xl px-3 py-2.5 flex-shrink-0">
                  <div className="flex flex-col gap-0.5">
                    <span className="text-[var(--color-brand)] text-[8px] font-black uppercase tracking-wider">{item.brand}</span>
                    <span className="text-white text-[11px] font-medium font-sans">{item.product}</span>
                    <div className="flex items-center gap-1.5">
                      <span className="text-white/35 text-[9px] line-through">{item.original}</span>
                      <span className="text-white font-black text-[12px]">{item.price}</span>
                    </div>
                  </div>
                  <div className="bg-[var(--color-brand)] text-white text-[9px] font-black px-2 py-1 rounded-lg shadow-[0_0_8px_rgba(153,0,0,0.5)]">
                    {item.pct}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      {/* ── Full MacBook Pro Keyboard Chassis — QWERTY HD ── */}
      <div
        className="w-full rounded-b-[1rem] relative overflow-hidden"
        style={{
          background: 'linear-gradient(180deg, #1c0808 0%, #0f0505 100%)',
          boxShadow: '0 30px 80px rgba(0,0,0,0.9)',
          paddingBottom: '14px',
        }}
      >
        {/* Ambient crimson backglow for keyboard */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(153,0,0,0.08)_0%,transparent_70%)] pointer-events-none" />

        <div className="px-3 pt-3 pb-2 relative z-10">
          {/* Function row */}
          {(() => {
            const fnRow = ['esc','F1','F2','F3','F4','F5','F6','F7','F8','F9','F10','F11','F12','⏏'];
            return (
              <div className="flex gap-[2px] mb-[2px]">
                {fnRow.map((k) => (
                  <div key={k} className="flex-1 h-[9px] rounded-[1.5px] bg-[#200e0e] border border-white/[0.05] flex items-center justify-center" style={{ boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.05)' }}>
                    <span className="text-white/20 font-sans leading-none" style={{ fontSize: '3.5px' }}>{k}</span>
                  </div>
                ))}
              </div>
            );
          })()}

          {/* Row 1 — numbers */}
          {(() => {
            const row = ['`','1','2','3','4','5','6','7','8','9','0','-','=','⌫'];
            return (
              <div className="flex gap-[2px] mb-[2px]">
                {row.map((k, i) => (
                  <div key={i} className={`${k === '⌫' ? 'flex-[1.8]' : 'flex-1'} h-[12px] rounded-[1.5px] bg-[#251010] border border-white/[0.07] flex items-center justify-center`} style={{ boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.07), 0 1px 0 rgba(0,0,0,0.5)' }}>
                    <span className="text-white/30 font-sans leading-none" style={{ fontSize: '4px' }}>{k}</span>
                  </div>
                ))}
              </div>
            );
          })()}

          {/* Row 2 — QWERTY */}
          {(() => {
            const row = ['⇥','Q','W','E','R','T','Y','U','I','O','P','[',']','\\'];
            return (
              <div className="flex gap-[2px] mb-[2px]">
                {row.map((k, i) => (
                  <div key={i} className={`${k === '⇥' || k === '\\' ? 'flex-[1.5]' : 'flex-1'} h-[12px] rounded-[1.5px] bg-[#251010] border border-white/[0.07] flex items-center justify-center`} style={{ boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.07), 0 1px 0 rgba(0,0,0,0.5)' }}>
                    <span className={`font-sans leading-none ${/[A-Z]/.test(k) ? 'text-white/40' : 'text-white/25'}`} style={{ fontSize: '4px' }}>{k}</span>
                  </div>
                ))}
              </div>
            );
          })()}

          {/* Row 3 — ASDF */}
          {(() => {
            const row = ['⇪','A','S','D','F','G','H','J','K','L',';',"'",'↵'];
            return (
              <div className="flex gap-[2px] mb-[2px]">
                {row.map((k, i) => (
                  <div key={i} className={`${k === '⇪' ? 'flex-[1.6]' : k === '↵' ? 'flex-[1.8]' : 'flex-1'} h-[12px] rounded-[1.5px] bg-[#251010] border border-white/[0.07] flex items-center justify-center`} style={{ boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.07), 0 1px 0 rgba(0,0,0,0.5)' }}>
                    <span className={`font-sans leading-none ${/[A-Z]/.test(k) ? 'text-white/40' : 'text-white/25'}`} style={{ fontSize: '4px' }}>{k}</span>
                  </div>
                ))}
              </div>
            );
          })()}

          {/* Row 4 — ZXCV */}
          {(() => {
            const row = ['⇧','Z','X','C','V','B','N','M',',','.','/', '⇧'];
            return (
              <div className="flex gap-[2px] mb-[2px]">
                {row.map((k, i) => (
                  <div key={i} className={`${k === '⇧' ? 'flex-[2]' : 'flex-1'} h-[12px] rounded-[1.5px] bg-[#251010] border border-white/[0.07] flex items-center justify-center`} style={{ boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.07), 0 1px 0 rgba(0,0,0,0.5)' }}>
                    <span className={`font-sans leading-none ${/[A-Z]/.test(k) ? 'text-white/40' : 'text-white/25'}`} style={{ fontSize: '4px' }}>{k}</span>
                  </div>
                ))}
              </div>
            );
          })()}

          {/* Bottom row — space + modifiers */}
          <div className="flex gap-[2px]">
            {[{ k: 'fn', w: '1.2' }, { k: '⌃', w: '1' }, { k: '⌥', w: '1' }, { k: '⌘', w: '1.4' }].map(({ k, w }) => (
              <div key={k} className="h-[12px] rounded-[1.5px] bg-[#251010] border border-white/[0.07] flex items-center justify-center" style={{ flex: w, boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.07)' }}>
                <span className="text-white/20 font-sans leading-none" style={{ fontSize: '4px' }}>{k}</span>
              </div>
            ))}
            <div className="flex-[5] h-[12px] rounded-[1.5px] bg-[#251010] border border-white/[0.07]" style={{ boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.07)' }} />
            {[{ k: '⌘', w: '1.4' }, { k: '⌥', w: '1' }, { k: '←', w: '1' }, { k: '↕', w: '0.8' }, { k: '→', w: '1' }].map(({ k, w }) => (
              <div key={k} className="h-[12px] rounded-[1.5px] bg-[#251010] border border-white/[0.07] flex items-center justify-center" style={{ flex: w, boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.07)' }}>
                <span className="text-white/20 font-sans leading-none" style={{ fontSize: '4px' }}>{k}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Trackpad — with crimson ambient reflection */}
        <div
          className="mx-auto w-[38%] h-[28px] rounded-[6px] border border-white/[0.06] mt-1.5"
          style={{
            background: 'linear-gradient(180deg, #1e0c0c 0%, #160808 100%)',
            boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.04), 0 1px 0 rgba(0,0,0,0.6), 0 0 10px rgba(153,0,0,0.06)',
          }}
        />

        {/* Hinge bar */}
        <div className="mx-auto w-24 h-[3px] rounded-b bg-black/70 mt-2" />
      </div>
    </div>
  );
}

export function HardwareShowcase() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <section id="a-plataforma" ref={ref} className="w-full py-28 relative overflow-hidden bg-[#050505]">
      <motion.div style={{ y, opacity }} className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[var(--color-brand)] blur-[200px] opacity-15 rounded-full" />
      </motion.div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section heading */}
        <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between mb-16 gap-6">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="text-[var(--color-brand)] uppercase tracking-[0.4em] text-[10px] font-black mb-4"
            >
              A Plataforma
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 24, filter: 'blur(8px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.1 }}
              className="font-serif text-4xl sm:text-5xl md:text-6xl text-white leading-[1.05]"
            >
              Seu sistema de beauty<br />
              <span className="italic font-light text-white/80">inteligente</span>
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-white/40 text-base font-light font-sans max-w-sm leading-relaxed"
          >
            Comparamos preços de maquiagem em tempo real. Você recebe alertas automáticos antes de todo mundo.
          </motion.p>
        </div>

        {/* Device layout: iPhone + MacBook side by side */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-10 md:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <IPhoneMockup />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-xl"
          >
            <MacBookMockup />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
