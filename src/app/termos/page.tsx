import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Termos de Uso | Make Flow' };

export default function TermosPage() {
  return (
    <main className="min-h-screen bg-[#050505] text-white/70 px-6 py-24">
      <div className="max-w-2xl mx-auto space-y-10">
        <div className="space-y-2">
          <p className="text-[#990000] text-xs font-black uppercase tracking-[0.4em]">Contrato</p>
          <h1 className="font-serif text-4xl text-white">Termos de Uso</h1>
          <p className="text-white/30 text-sm">Última atualização: Abril 2026</p>
        </div>

        {[
          {
            title: '1. Aceitação dos Termos',
            body: 'Ao acessar e utilizar a plataforma Make Flow, você concorda expressamente com os termos estabelecidos aqui. O acesso ao conteúdo é individual e intransferível.'
          },
          {
            title: '2. Licença de Uso',
            body: 'Concedemos a você uma licença pessoal e limitada para visualizar e utilizar os conteúdos para fins de auto-maquiagem. É estritamente proibida a reprodução, cópia ou redistribuição de qualquer material.'
          },
          {
            title: '3. Acesso Vitalício',
            body: 'O termo "Vitalício" refere-se à duração da vida útil comercial do produto. Enquanto a plataforma estiver ativa, seu acesso estará garantido para as versões adquiridas.'
          },
          {
            title: '4. Pagamentos e Reembolsos',
            body: 'Processamos pagamentos via PepperPay. Oferecemos 30 dias de garantia integral. Solicitações de reembolso devem ser feitas dentro deste prazo via e-mail de suporte.'
          },
          {
            title: '5. Responsabilidade',
            body: 'A Make Flow não se responsabiliza por reações alérgicas a produtos recomendados. Sempre verifique a bula e componentes dos cosméticos utilizados.'
          }
        ].map(({ title, body }) => (
          <section key={title} className="border-t border-white/[0.06] pt-8 space-y-3">
            <h2 className="font-serif text-white text-xl">{title}</h2>
            <p className="font-sans font-light leading-relaxed text-white/50">{body}</p>
          </section>
        ))}

        <a href="/" className="inline-block mt-8 text-[#990000] text-sm hover:opacity-80 transition-opacity">← Voltar ao início</a>
      </div>
    </main>
  );
}
