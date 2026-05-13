'use client';

import Link from 'next/link';

export function Footer() {
  return (
    <footer className="w-full bg-[#030202] border-t border-white/[0.05]">

      {/* Main 3-column body */}
      <div className="max-w-7xl mx-auto px-6 md:px-8 py-12 md:py-16 grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-14 items-start">

        {/* ── Column 1: Brand + CNPJ ── */}
        <div className="flex flex-col gap-5">
          <Link href="/" className="flex items-center gap-3">
            <div className="relative w-10 h-10 flex-shrink-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/logomark.png"
                alt="Make Flow"
                width={40}
                height={40}
                style={{
                  objectFit: 'contain',
                  display: 'block',
                  filter: 'drop-shadow(0 8px 10px rgba(153,0,0,0.75))',
                }}
              />
            </div>
            <span className="font-serif text-white/70 text-xl font-medium tracking-wide">Make Flow</span>
          </Link>

          <p className="text-white/25 text-sm font-light font-sans leading-relaxed">
            A plataforma de inteligência de maquiagem para quem quer resultados reais, sem desperdício.
          </p>

          <a href="mailto:contato@makeflow.com" className="text-white/25 text-sm font-sans font-light hover:text-white/50 transition-colors mt-2">
            contato@makeflow.com
          </a>

          <p className="text-white/15 text-xs font-sans font-light mt-2">
            © 2026 Make Flow. Todos os direitos reservados.
          </p>
        </div>

        {/* ── Column 2: Links ── */}
        <div className="flex flex-col gap-5">
          <p className="text-white/20 text-[10px] uppercase tracking-[0.45em] font-sans font-black">Links</p>

          <nav className="flex flex-col gap-3.5">
            {[
              { label: 'Termos de Uso', href: '/termos' },
              { label: 'Políticas de Privacidade', href: '/privacidade' },
              { label: 'Contato', href: '/contato' },
              { label: 'Suporte', href: '/suporte' },
            ].map(({ label, href }) => (
              <Link
                key={label}
                href={href}
                className="text-white/30 text-sm font-light font-sans hover:text-white/65 transition-colors duration-200 flex items-center gap-2 group"
              >
                <span className="text-white/10 group-hover:text-white/35 transition-colors text-xs">→</span>
                {label}
              </Link>
            ))}
          </nav>
        </div>

        {/* ── Column 3: Trust signals — ALL monochrome ── */}
        <div className="flex flex-col gap-5">
          <p className="text-white/20 text-[10px] uppercase tracking-[0.45em] font-sans font-black">Segurança</p>

          <div className="flex flex-col gap-3">
            {[
              {
                label: 'SSL Secured',
                sub: 'Criptografia 256-bit',
                svg: (
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <rect x="2" y="7" width="12" height="8" rx="1.5" stroke="rgba(255,255,255,0.4)" strokeWidth="1.2" />
                    <path d="M5 7V4.5C5 2.57 6.57 1 8.5 1v0C10.43 1 12 2.57 12 4.5V7" stroke="rgba(255,255,255,0.4)" strokeWidth="1.2" strokeLinecap="round" />
                    <circle cx="8.5" cy="11" r="1.2" fill="rgba(255,255,255,0.4)" />
                  </svg>
                ),
              },
              {
                label: 'Google Safe Browsing',
                sub: 'Site verificado',
                svg: (
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M8 1L14 4v4.5c0 3-2.5 5.8-6 6.5C2.5 14.3 0 11.5 0 8.5V4L8 1z" stroke="rgba(255,255,255,0.4)" strokeWidth="1.2" strokeLinejoin="round" />
                    <path d="M5 8l2 2 4-4" stroke="rgba(255,255,255,0.4)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                ),
              },
              {
                label: 'Garantia 30 Dias',
                sub: '100% satisfação ou reembolso',
                svg: (
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <circle cx="8" cy="8" r="6.5" stroke="rgba(255,255,255,0.4)" strokeWidth="1.2" />
                    <path d="M5 8l2 2 4-4" stroke="rgba(255,255,255,0.4)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                ),
              },
            ].map(({ label, sub, svg }) => (
              <div
                key={label}
                className="flex items-center gap-3 bg-white/[0.02] border border-white/[0.05] rounded-xl px-4 py-3"
              >
                <div className="flex-shrink-0">{svg}</div>
                <div>
                  <p className="text-white/45 text-xs font-sans font-medium leading-none">{label}</p>
                  <p className="text-white/20 text-[10px] font-sans font-light mt-0.5">{sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom rule */}
      <div className="border-t border-white/[0.04] px-8 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-center">
          <p className="text-white/10 text-[10px] font-sans font-light tracking-wider uppercase">
            Make Flow © 2026 • Todos os direitos reservados
          </p>
        </div>
      </div>
    </footer>
  );
}
