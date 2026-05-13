import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Obrigada pela sua compra · Make Flow',
  description: 'Sua compra foi confirmada! Ative agora seu acesso gratuito ao grupo exclusivo no Telegram e comece a economizar em produtos de beleza hoje mesmo.',
  robots: 'noindex, nofollow',
};

export default function ObrigadoLayout({ children }: { children: React.ReactNode }) {
  return children;
}
