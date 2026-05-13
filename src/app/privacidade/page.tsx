import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Políticas de Privacidade | Make Flow' };

export default function PrivacidadePage() {
  return (
    <main className="min-h-screen bg-[#050505] text-white/70 px-6 py-24">
      <div className="max-w-2xl mx-auto space-y-10">
        <div className="space-y-2">
          <p className="text-[#990000] text-xs font-black uppercase tracking-[0.4em]">Legal</p>
          <h1 className="font-serif text-4xl text-white">Políticas de Privacidade</h1>
          <p className="text-white/30 text-sm">Última atualização: Abril 2026</p>
        </div>

        {[
          {
            title: '1. Informações Coletadas',
            body: 'Coletamos apenas as informações necessárias para processar sua compra e entregar acesso ao produto: nome, e-mail e dados de pagamento. Nenhum dado adicional é armazenado sem seu consentimento.'
          },
          {
            title: '2. Uso das Informações',
            body: 'Suas informações são utilizadas exclusivamente para processamento de pedidos, suporte ao cliente e comunicações diretamente relacionadas ao Make Flow. Não vendemos, alugamos ou compartilhamos seus dados com terceiros.'
          },
          {
            title: '3. Segurança',
            body: 'Todos os dados trafegam sob criptografia SSL 256-bit. Transações financeiras são processadas por plataformas certificadas (Kiwify) que seguem os padrões PCI-DSS.'
          },
          {
            title: '4. Cookies',
            body: 'Utilizamos cookies essenciais para funcionamento do site e cookies analíticos anônimos para melhorar a experiência. Você pode desabilitar cookies nas configurações do seu navegador.'
          },
          {
            title: '5. Seus Direitos',
            body: 'Você tem direito de acessar, corrigir ou solicitar a exclusão dos seus dados a qualquer momento. Entre em contato via suporte@makeflow.com.br.'
          },
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
