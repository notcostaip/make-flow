import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Obrigada pela sua compra · Make Flow',
  description: 'Sua compra foi confirmada! Ative agora seu acesso exclusivo ao Protocolo Make Flow e comece a transformar sua rotina de beleza hoje mesmo.',
  robots: 'noindex, nofollow',
};

export default function ObrigadoLayout({ children }: { children: React.ReactNode }) {
  return children;
}
