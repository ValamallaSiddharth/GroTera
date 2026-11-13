'use client';

import {
  ArrowRight,
  BarChart3,
  Globe2,
  Heart,
  Megaphone,
  Search,
  Share2,
  TrendingUp,
} from 'lucide-react';
import { useEffect, useRef } from 'react';
import { useMagnetic } from '@/hooks/useMagnetic';
import HeroTicker from './HeroTicker';

export default function Hero() {
  const stageRef = useRef<HTMLDivElement>(null);
  const primaryButtonRef = useRef<HTMLButtonElement>(null);
  const go = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  useMagnetic(primaryButtonRef);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage || !matchMedia('(pointer: fine)').matches || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const badges = Array.from(stage.querySelectorAll<HTMLElement>('[data-depth]'));
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let frame = 0;
    let bounds = stage.getBoundingClientRect();

    const animate = () => {
      currentX += (targetX - currentX) * .075;
      currentY += (targetY - currentY) * .075;
      badges.forEach(badge => {
        const depth = Number(badge.dataset.depth || 0);
        badge.style.setProperty('--parallax-x', `${currentX * depth}px`);
        badge.style.setProperty('--parallax-y', `${currentY * depth}px`);
      });
      if (Math.abs(targetX - currentX) > .002 || Math.abs(targetY - currentY) > .002) frame = requestAnimationFrame(animate);
      else frame = 0;
    };
    const queue = () => { if (!frame) frame = requestAnimationFrame(animate); };
    const enter = () => { bounds = stage.getBoundingClientRect(); };
    const move = (event: PointerEvent) => {
      targetX = ((event.clientX - bounds.left) / bounds.width - .5) * 2;
      targetY = ((event.clientY - bounds.top) / bounds.height - .5) * 2;
      queue();
    };
    const leave = () => { targetX = 0; targetY = 0; queue(); };

    stage.addEventListener('pointerenter', enter);
    stage.addEventListener('pointermove', move, { passive: true });
    stage.addEventListener('pointerleave', leave);
    return () => {
      cancelAnimationFrame(frame);
      stage.removeEventListener('pointerenter', enter);
      stage.removeEventListener('pointermove', move);
      stage.removeEventListener('pointerleave', leave);
    };
  }, []);

  return (
    <section id="home" className="hero-photo relative isolate flex h-[100svh] min-h-[600px] overflow-hidden px-4 pb-20 pt-24 sm:px-5">
      <div className="hero-ambient absolute inset-0" aria-hidden="true" />

      <div ref={stageRef} className="hero-stage relative mx-auto flex min-h-0 w-full max-w-[1240px] flex-1 items-center justify-center overflow-hidden rounded-[28px] px-5 py-6 md:px-10 md:py-8 lg:px-14">
        <div className="hero-object hero-object-search" data-depth="5" aria-hidden="true">
          <div className="hero-object-card">
            <span className="hero-object-icon"><Search size={24} /></span>
            <span>Be discovered</span>
          </div>
        </div>

        <div className="hero-object hero-object-campaign" data-depth="10" aria-hidden="true">
          <div className="hero-object-card">
            <Megaphone size={35} />
            <span>Campaign</span>
          </div>
        </div>

        <div className="hero-object hero-object-reach" data-depth="8" aria-hidden="true">
          <div className="hero-object-card">
            <Globe2 size={39} />
            <span>Reach</span>
          </div>
        </div>

        <div className="hero-object hero-object-growth" data-depth="12" aria-hidden="true">
          <div className="hero-object-card">
            <TrendingUp size={38} />
            <span>Growth</span>
          </div>
        </div>

        <div className="hero-object hero-object-engagement" data-depth="7" aria-hidden="true">
          <div className="hero-object-card">
            <Heart size={31} />
            <span>Engagement</span>
          </div>
        </div>

        <div className="hero-object hero-object-share" data-depth="9" aria-hidden="true">
          <div className="hero-object-card">
            <Share2 size={30} />
            <span>Connect</span>
          </div>
        </div>

        <div className="hero-object hero-object-analytics" data-depth="6" aria-hidden="true">
          <div className="hero-object-card">
            <BarChart3 size={34} />
            <span>Visibility</span>
          </div>
        </div>

        <div className="hero-content relative z-10 mx-auto max-w-[690px] pb-12 text-center">
          <p className="hero-eyebrow mx-auto mb-4 flex w-fit max-w-full items-center justify-center gap-2 whitespace-nowrap text-[clamp(.58rem,2.4vw,.875rem)] font-bold uppercase leading-normal tracking-[clamp(.06em,.3vw,.14em)] text-brand-primary">
            <span className="h-2 w-2 shrink-0 rounded-full bg-brand-accent-strong" />
            Digital growth, thoughtfully made
          </p>
          <h1 className="hero-heading font-black">
            <span className="hero-mask kinetic-line">
              <span className="kinetic-word" style={{ animationDelay: '120ms' }}>Reach</span>{' '}
              <span className="kinetic-word" style={{ animationDelay: '210ms' }}>further.</span>
            </span>
            <span className="hero-mask kinetic-line">
              <em className="hero-highlight kinetic-word not-italic" style={{ animationDelay: '300ms' }}>Grow stronger.</em>
            </span>
          </h1>
          <p className="hero-copy mx-auto mt-4 max-w-lg text-base leading-7 sm:text-lg">
            Creative promotion that puts your business in front of the right audience.
          </p>
          <div className="hero-actions mt-6 flex flex-col justify-center gap-3 sm:flex-row">
            <button ref={primaryButtonRef} onClick={() => go('contact')} className="premium-button magnetic-button group inline-flex items-center justify-center gap-2 rounded-xl bg-brand-accent px-6 py-3.5 font-extrabold text-brand-deep">
              Grow Your Business <ArrowRight className="button-arrow" size={18} />
            </button>
            <button onClick={() => go('services')} className="secondary-button rounded-xl border border-brand-primary/20 bg-white/55 px-6 py-3.5 font-bold text-brand-primary backdrop-blur-md">
              Explore Services
            </button>
          </div>
        </div>
        <HeroTicker />
      </div>
    </section>
  );
}
