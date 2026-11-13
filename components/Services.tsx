'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { services } from '@/data/siteData';
import Reveal from './Reveal';
import RevealGroup from './RevealGroup';
import RevealText from './RevealText';

function moveSpotlight(event: React.PointerEvent<HTMLElement>) {
  if (!matchMedia('(pointer: fine)').matches || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const card = event.currentTarget;
  const rect = card.getBoundingClientRect();
  const localX = event.clientX - rect.left;
  const localY = event.clientY - rect.top;
  const rotateX = ((localY / rect.height) - .5) * -7;
  const rotateY = ((localX / rect.width) - .5) * 8;
  card.style.setProperty('--spot-x', `${localX}px`);
  card.style.setProperty('--spot-y', `${localY}px`);
  card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translate3d(0,-5px,0)`;
}

function resetCard(event: React.PointerEvent<HTMLElement>) {
  event.currentTarget.style.removeProperty('transform');
}

export default function Services({ full = false }: { full?: boolean }) {
  const items = full ? services : services.slice(0, 6);
  return (
    <section id="services" className="bg-brand-deep px-5 py-20 text-brand-light lg:py-24">
      <div className="mx-auto max-w-[1240px]">
        <Reveal anim="fade">
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <div>
              <p data-anim="up" className="section-label section-label-dark">What we do</p>
              <RevealText className="section-heading mt-4 text-white" start={1} lines={['Services built to move', 'your business forward.']} />
            </div>
            {!full && <Link href="/services" data-anim="up" style={{ '--i': '3' } as React.CSSProperties} className="service-link inline-flex items-center gap-2 text-sm font-bold text-brand-accent">View all services <ArrowRight className="button-arrow" size={16} /></Link>}
          </div>
        </Reveal>
        <RevealGroup className="mt-10 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {items.map((service, index) => {
            const Icon = service.icon;
            return (
              <article key={service.title} onPointerMove={moveSpotlight} onPointerLeave={resetCard} className="agency-card agency-card-tilt">
                <div className="flex items-start justify-between"><span className="service-icon" style={{ color: service.iconColor, backgroundColor: service.iconBackground }}><Icon size={21} aria-hidden="true" /></span><span className="text-xs font-black text-brand-secondary/55">0{index + 1}</span></div>
                <h3 className="mt-7 text-xl font-extrabold">{service.title}</h3>
                <p className="mt-3 text-sm leading-6 text-brand-secondary">{service.text}</p>
                <span className="service-arrow mt-6 inline-flex items-center gap-2 text-xs font-bold text-brand-accent">Explore service <ArrowRight size={14} /></span>
              </article>
            );
          })}
        </RevealGroup>
      </div>
    </section>
  );
}
