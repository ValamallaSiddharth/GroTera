import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://promptforge.openai.site'),
  title: { default: 'PromptForge — Better prompts. Better AI results.', template: '%s | PromptForge' },
  description: 'Discover, create, optimize, and organize high-quality prompts for every leading AI platform.',
  openGraph: { title: 'PromptForge — Better prompts. Better AI results.', description: 'Forge prompts that turn ideas into remarkable AI results.', type: 'website', images: [{ url: '/og.png', width: 1200, height: 630, alt: 'PromptForge prompt editor' }] },
  twitter: { card: 'summary_large_image', title: 'PromptForge — Better prompts. Better AI results.', description: 'Forge prompts that turn ideas into remarkable AI results.', images: ['/og.png'] },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en"><body>{children}</body></html>;
}
