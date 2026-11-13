'use client';

import Link from 'next/link';
import { useCallback, useEffect, useState } from 'react';
import { ArrowRight, ArrowUpRight, X } from 'lucide-react';
import { projects } from '@/data/siteData';
import Reveal from './Reveal';
import RevealGroup from './RevealGroup';
import RevealText from './RevealText';
import WorkMockup from './WorkMockup';
import CountUp from './CountUp';
import CampaignReveal from './CampaignReveal';

type Project = (typeof projects)[number];

export default function Portfolio({ full = false }: { full?: boolean }) {
  const [selected, setSelected] = useState<Project | null>(null);
  const [closing, setClosing] = useState(false);
  const items = full ? projects : projects.slice(0, 4);

  const close = useCallback(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setSelected(null);
      return;
    }
    setClosing(true);
    setTimeout(() => {
      setSelected(null);
      setClosing(false);
    }, 250);
  }, []);

  useEffect(() => {
    if (!selected) return;
    const onKey = (event: KeyboardEvent) => event.key === 'Escape' && close();
    addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [selected, close]);

  return (
    <section id="work" className="border-t border-[#ADDFDE]/25 bg-[#0C4C8A] px-5 py-20 text-brand-text lg:py-24">
      <div className="mx-auto max-w-[1240px]">
        <Reveal anim="fade">
          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div>
              <p data-anim="up" className="section-label section-label-dark">Performance portfolio</p>
              <RevealText className="section-heading mt-4 text-white" start={1} lines={['Selected work']} />
              <p data-anim="up" style={{ '--i': '2' } as React.CSSProperties} className="mt-4 max-w-xl text-sm leading-6 text-brand-secondary sm:text-base">
                Focused marketing systems paired with outcomes that matter to the business.
              </p>
            </div>
            {!full && (
              <Link href="/work" data-anim="up" style={{ '--i': '3' } as React.CSSProperties} className="service-link inline-flex items-center gap-2 text-sm font-bold text-brand-accent">
                View all case studies <ArrowRight className="button-arrow" size={16} />
              </Link>
            )}
          </div>
        </Reveal>

        <Reveal anim="scale"><CampaignReveal /></Reveal>

        <RevealGroup className="mt-10 grid gap-5 md:grid-cols-2">
          {items.map((project, index) => (
            <article key={project.name} className="work-card group">
              <div className="work-visual img-mask">
                <div data-anim="img" className="absolute inset-0">
                  <div className="work-visual-inner">
                    <div className="work-grid absolute inset-0" />
                    <div className="absolute left-5 top-5 z-10 flex gap-2">
                      <span className="work-tag rounded-full border border-white/15 bg-[#1F375D]/75 px-3 py-1 text-[11px] font-bold text-[#F4FAFA] backdrop-blur-sm">{project.industry}</span>
                      <span className="work-tag rounded-full border border-[#1F375D]/10 bg-[#F4FAFA]/85 px-3 py-1 text-[11px] font-bold text-[#1F375D] backdrop-blur-sm">{project.category}</span>
                    </div>
                    <WorkMockup type={project.visual} />
                    <span className="work-index absolute bottom-5 right-5 z-10 text-xs font-black text-[#1F375D]/55">0{index + 1}</span>
                  </div>
                </div>
              </div>

              <div className="p-5 sm:p-6">
                <p className="work-category text-xs font-black uppercase tracking-[.1em] text-brand-accent-strong">{project.category}</p>
                <div className="mt-2 flex items-start justify-between gap-5">
                  <div>
                    <h3 className="work-title text-2xl font-extrabold">{project.name}</h3>
                    <p className="mt-2 text-sm leading-6 text-brand-muted">{project.description}</p>
                  </div>
                  <button onClick={() => setSelected(project)} aria-label={`View ${project.name} case study`} className="work-open ripple-target relative grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-brand-primary text-white hover:bg-brand-accent hover:text-brand-deep">
                    <ArrowUpRight size={18} />
                  </button>
                </div>
                <div className={`mt-5 grid gap-2 border-t border-brand-border pt-4 ${project.metrics.length === 3 ? 'grid-cols-3' : 'grid-cols-2'}`}>
                  {project.metrics.map(metric => (
                    <div key={metric.label} className="metric-cell">
                      <strong><CountUp value={metric.value} /></strong>
                      <span>{metric.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </RevealGroup>
      </div>

      {selected && (
        <div role="dialog" aria-modal="true" aria-labelledby="work-title" onMouseDown={event => event.target === event.currentTarget && close()} className={`modal-backdrop fixed inset-0 z-[80] grid place-items-center bg-brand-deep/90 p-5 backdrop-blur-sm ${closing ? 'modal-out' : ''}`}>
          <div className="modal-card w-full max-w-xl overflow-hidden rounded-2xl bg-brand-background text-brand-text shadow-2xl">
            <div className="modal-visual relative h-52 overflow-hidden bg-[#E8F5F5] p-6">
              <div className="work-grid absolute inset-0" />
              <WorkMockup type={selected.visual} />
              <button onClick={close} aria-label="Close case study" className="ripple-target absolute right-4 top-4 z-20 grid h-10 w-10 place-items-center rounded-lg bg-[#1F375D] text-white transition-colors hover:bg-brand-accent hover:text-brand-deep"><X size={18} /></button>
            </div>
            <div className="p-7">
              <p className="text-xs font-black uppercase tracking-[.1em] text-brand-accent-strong">{selected.industry} · {selected.category}</p>
              <h2 id="work-title" className="mt-2 text-3xl font-black">{selected.name}</h2>
              <p className="mt-4 text-base leading-7 text-brand-muted">{selected.description}</p>
              <div className={`mt-6 grid gap-3 ${selected.metrics.length === 3 ? 'grid-cols-3' : 'grid-cols-2'}`}>
                {selected.metrics.map(metric => <div key={metric.label} className="metric-cell metric-cell-modal"><strong><CountUp value={metric.value} /></strong><span>{metric.label}</span></div>)}
              </div>
              <p className="mt-6 text-xs font-black uppercase tracking-[.12em] text-brand-muted">Services involved</p>
              <div className="mt-3 flex flex-wrap gap-2">{selected.services.map(service => <span key={service} className="rounded-full bg-brand-secondary/35 px-3 py-1.5 text-xs font-bold text-brand-primary">{service}</span>)}</div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
