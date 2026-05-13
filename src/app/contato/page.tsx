import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Contato | Make Flow' };

export default function ContatoPage() {
  return (
    <main className="min-h-screen bg-[#050505] text-white/70 px-6 py-24">
      <div className="max-w-2xl mx-auto space-y-10">
        <div className="space-y-2">
          <p className="text-[#990000] text-xs font-black uppercase tracking-[0.4em]">Fale Conosco</p>
          <h1 className="font-serif text-4xl text-white">Contato</h1>
          <p className="text-white/30 text-sm">Respondemos em até 24 horas úteis.</p>
        </div>

        <div className="grid gap-5">
          {[
            { label: 'E-mail Geral', value: 'contato@makeflow.com.br', href: 'mailto:contato@makeflow.com.br' },
            { label: 'Suporte Técnico', value: 'suporte@makeflow.com.br', href: 'mailto:suporte@makeflow.com.br' },
            { label: 'Parcerias', value: 'parcerias@makeflow.com.br', href: 'mailto:parcerias@makeflow.com.br' },
          ].map(({ label, value, href }) => (
            <a
              key={label}
              href={href}
              className="flex flex-col gap-1 p-6 border border-white/[0.07] rounded-2xl bg-white/[0.02] hover:border-white/[0.15] hover:bg-white/[0.04] transition-all group"
            >
              <span className="text-[#990000] text-[10px] font-black uppercase tracking-[0.3em]">{label}</span>
              <span className="font-serif text-white/80 text-lg group-hover:text-white transition-colors">{value}</span>
            </a>
          ))}
        </div>

        <div className="border-t border-white/[0.06] pt-8">
          <p className="font-serif text-white/40 text-lg leading-relaxed">
            Prefere uma resposta mais rápida? Acesse nossa central de{' '}
            <a href="/suporte" className="text-[#990000] hover:opacity-80">suporte</a>.
          </p>
        </div>

        <a href="/" className="inline-block text-[#990000] text-sm hover:opacity-80 transition-opacity">← Voltar ao início</a>
      </div>
    </main>
  );
}
