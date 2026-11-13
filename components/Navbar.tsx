'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import Logo from './Logo';

const links = [['Home', 'home'], ['About', 'about'], ['Services', 'services'], ['Work', 'work'], ['Contact', 'contact']];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('');

  useEffect(() => {
    const onScroll = () => setScrolled(scrollY > 16);
    onScroll();
    addEventListener('scroll', onScroll, { passive: true });
    return () => removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const sections = links.map(([, id]) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    if (!sections.length) return;
    const observer = new IntersectionObserver(entries => {
      const seen = entries.filter(entry => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (seen) setActive(seen.target.id);
    }, { rootMargin: '-88px 0px -55% 0px', threshold: [.08, .3, .6] });
    sections.forEach(section => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const go = (id: string) => {
    setOpen(false);
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
    else location.href = `/#${id}`;
  };

  return (
    <header className={`site-nav hero-nav-enter fixed inset-x-0 top-0 z-50 isolate px-3 pt-2 sm:pt-3 ${scrolled ? 'site-nav-scrolled' : ''}`}>
      <div className="site-nav-panel mx-auto max-w-[1240px] overflow-hidden rounded-2xl border border-white/15 bg-[#1F375D] shadow-xl backdrop-blur-md">
        <nav aria-label="Primary" className="flex h-[68px] items-center justify-between px-4 sm:px-5">
          <button onClick={() => go('home')} aria-label="GroTera home"><Logo /></button>
          <div className="hidden items-center gap-7 lg:flex">
            {links.map(([label, id]) => <button key={id} onClick={() => go(id)} aria-current={active === id ? 'true' : undefined} className={`nav-link text-sm font-medium ${active === id ? 'nav-link-active' : 'text-brand-light/90'}`}>{label}</button>)}
          </div>
          <div className="hidden items-center gap-3 lg:flex">
            <Link href="/login" className="nav-link px-3 py-2 text-sm font-semibold text-brand-light/90">Login</Link>
            <button onClick={() => go('contact')} className="premium-button group inline-flex items-center gap-2 rounded-xl bg-brand-accent px-5 py-3 text-sm font-extrabold text-brand-deep">Grow Your Business <ArrowUpRight className="button-arrow" size={16} /></button>
          </div>
          <button onClick={() => setOpen(!open)} aria-expanded={open} aria-label="Toggle navigation" className="ripple-target relative grid h-11 w-11 place-items-center rounded-xl border border-white/20 text-white lg:hidden">{open ? <X /> : <Menu />}</button>
        </nav>
        <span aria-hidden="true" className="scroll-progress" />
        <div className={`mobile-menu overflow-hidden border-t border-white/10 bg-[#1F375D] px-5 lg:hidden ${open ? 'mobile-menu-open' : 'mobile-menu-closed'}`}>
          {links.map(([label, id], i) => <button key={id} onClick={() => go(id)} style={{ '--i': String(i) } as React.CSSProperties} className="m-item block w-full border-b border-white/10 py-3 text-left text-base text-brand-light">{label}</button>)}
          <Link href="/login" style={{ '--i': String(links.length) } as React.CSSProperties} className="m-item block border-b border-white/10 py-3 text-brand-light">Login</Link>
          <button onClick={() => go('contact')} style={{ '--i': String(links.length + 1) } as React.CSSProperties} className="m-item ripple-target relative my-4 w-full rounded-xl bg-brand-accent px-5 py-3 font-extrabold text-brand-deep">Grow Your Business</button>
        </div>
      </div>
    </header>
  );
}
