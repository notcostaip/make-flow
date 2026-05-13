import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Suporte | Make Flow' };

export default function SuportePage() {
  return (
    <main className="min-h-screen bg-[#050505] text-white/70 px-6 py-24">
      <div className="max-w-2xl mx-auto space-y-10">
        <div className="space-y-2">
          <p className="text-[#990000] text-xs font-black uppercase tracking-[0.4em]">Ajuda</p>
          <h1 className="font-serif text-4xl text-white">Central de Suporte</h1>
          <p className="text-white/30 text-sm">Resolvemos sua dúvida rapidamente.</p>
        </div>

        <div className="grid gap-4">
          {[
            {
              q: 'Como acesso o Make Flow após a compra?',
              a: 'Você receberá um e-mail automático com seu link de acesso imediatamente após a confirmação do pagamento.'
            },
            {
              q: 'Posso pagar no Pix?',
              a: 'Sim! Aceitamos Pix, cartão de crédito em até 12x e boleto bancário com compensação em 1–3 dias úteis.'
            },
            {
              q: 'Qual é a política de reembolso?',
              a: 'Oferecemos garantia de satisfação de 30 dias. Se não estiver feliz com o resultado, devolvemos 100% do valor sem questionamentos.'
            },
            {
              q: 'O cupon MAKE10 é acumulativo?',
              a: 'O cupom MAKE10 concede 10% de desconto adicional e pode ser aplicado diretamente no checkout.'
            },
            {
              q: 'Por quanto tempo terei acesso?',
              a: 'O acesso ao Make Flow é vitalício. Uma vez comprado, você tem acesso ilimitado a todo o conteúdo e atualizações futuras.'
            },
          ].map(({ q, a }) => (
            <div key={q} className="border border-white/[0.07] rounded-2xl bg-white/[0.02] p-6 space-y-2">
              <h2 className="font-serif text-white text-lg">{q}</h2>
              <p className="text-white/45 font-sans font-light text-sm leading-relaxed">{a}</p>
            </div>
          ))}
        </div>

        <div className="border-t border-white/[0.06] pt-8 space-y-3">
          <p className="text-white/35 font-sans text-sm">Não encontrou o que precisa?</p>
          <a
            href="mailto:contato@makeflow.com"
            className="inline-flex items-center gap-2 bg-[#990000]/10 border border-[#990000]/40 text-[#990000] px-5 py-2.5 rounded-full text-sm font-black uppercase tracking-widest hover:bg-[#990000]/20 transition-all"
          >
            Enviar e-mail →
          </a>
        </div>

        <a href="/" className="inline-block text-[#990000] text-sm hover:opacity-80 transition-opacity">← Voltar ao início</a>
      </div>
    </main>
  );
}
