'use client';

import Link from 'next/link';
import { Mail, Phone } from 'lucide-react';
import { navItems, SITE_CONFIG } from '@/constants/site';
import BackToTop from './BackToTop';
import Logo from './Logo';

export default function Footer() {
  const go = (id: string) => {
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
    else location.href = `/#${id}`;
  };

  return <><BackToTop /><footer className="border-t border-white/10 bg-brand-deep px-5 py-12 text-brand-light"><div className="mx-auto grid max-w-[1240px] gap-10 md:grid-cols-[1.3fr_1fr_1fr]"><div><button onClick={() => go('home')} aria-label="GroTera home"><Logo /></button><p className="mt-5 max-w-xs text-base font-bold">Digital Promotion Built for Business Growth.</p></div><div><p className="footer-title">Links</p><div className="mt-4 grid grid-cols-2 gap-y-3">{navItems.map(([name, id]) => <button key={id} onClick={() => go(id)} className="text-left text-sm text-brand-muted hover:text-brand-accent">{name}</button>)}<Link href="/login" className="text-sm text-brand-muted hover:text-brand-accent">Login</Link></div></div><div><p className="footer-title">Contact</p><div className="mt-4 flex flex-col items-start gap-3"><a href={`mailto:${SITE_CONFIG.email}`} className="inline-flex items-center gap-2 text-sm text-brand-muted transition-colors hover:text-brand-accent"><Mail size={17} />{SITE_CONFIG.email}</a>{SITE_CONFIG.phone && <a href={`tel:${SITE_CONFIG.phone.replace(/\s/g, '')}`} className="inline-flex items-center gap-2 text-sm text-brand-muted transition-colors hover:text-brand-accent"><Phone size={17} />{SITE_CONFIG.phone}</a>}{SITE_CONFIG.socials.length > 0 && <div className="flex flex-wrap gap-4">{SITE_CONFIG.socials.map(social => <a key={social.label} href={social.href} target="_blank" rel="noreferrer" className="text-sm font-semibold text-brand-muted transition-colors hover:text-brand-accent">{social.label}</a>)}</div>}</div></div></div><div className="mx-auto mt-10 flex max-w-[1240px] flex-col justify-between gap-2 border-t border-white/10 pt-6 text-xs text-brand-muted sm:flex-row"><p>© GroTera. All rights reserved.</p><p>Strategy · Creativity · Promotion · Growth</p></div></footer></>;
}
