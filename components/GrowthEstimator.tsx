'use client';

import { BarChart3, Eye, ShoppingBag, Target } from 'lucide-react';
import CountUp from './CountUp';
import Reveal from './Reveal';
import RevealText from './RevealText';
import { useGrowthPlan } from './GrowthPlanContext';

const objectives = [
  { id: 'leads', label: 'Leads', icon: Target, cpm: 22, leadCost: 180, roas: 1.8 },
  { id: 'commerce', label: 'E-commerce ROAS', icon: ShoppingBag, cpm: 16, leadCost: 135, roas: 2.2 },
  { id: 'visibility', label: 'Brand Visibility', icon: Eye, cpm: 10, leadCost: 260, roas: 1.4 },
] as const;

function compact(value: number) {
  if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(1).replace('.0', '')}M`;
  if (value >= 1_000) return `${(value / 1_000).toFixed(value >= 100_000 ? 0 : 1).replace('.0', '')}k`;
  return Math.round(value).toString();
}

export default function GrowthEstimator() {
  const { budget, objective, setBudget, setObjective } = useGrowthPlan();
  const model = objectives.find(item => item.id === objective) ?? objectives[0];
  const scale = Math.log(Math.max(1, budget / 2000));
  const projections = {
    impressions: compact((budget / model.cpm) * 1000),
    leads: Math.round(budget / model.leadCost).toString(),
    roas: `${Math.min(4.4, model.roas + scale * .3).toFixed(1)}x`,
  };
  const progress = ((budget - 2000) / 48000) * 100;

  return (
    <section className="estimator-section bg-[#E5ECE7] px-5 py-20 text-[#1F375D] lg:py-24">
      <div className="mx-auto max-w-[1240px]">
        <Reveal anim="fade">
          <div className="grid gap-8 lg:grid-cols-[.8fr_1.2fr] lg:items-end">
            <div>
              <p data-anim="up" className="section-label">Growth planning tool</p>
              <RevealText className="section-heading mt-4" start={1} lines={['Explore your growth potential.']} />
            </div>
            <p data-anim="up" style={{ '--i': '2' } as React.CSSProperties} className="max-w-xl text-base leading-7 text-[#1F375D] lg:justify-self-end">
              Adjust the inputs to explore an illustrative campaign scenario before starting a conversation.
            </p>
          </div>
        </Reveal>

        <Reveal anim="scale">
          <div className="estimator-card mt-10 grid overflow-hidden rounded-[24px] border border-[#1F375D]/10 bg-[#F4FAFA] shadow-[0_28px_70px_rgba(13,40,33,.14)] lg:grid-cols-[1fr_.92fr]">
            <div className="p-6 sm:p-8 lg:p-10">
              <div className="flex items-end justify-between gap-5">
                <label htmlFor="marketing-budget" className="text-sm font-extrabold">Monthly marketing budget</label>
                <output htmlFor="marketing-budget" className="text-3xl font-black tracking-[-.04em] text-[#0C4C8A]">₹{Math.round(budget / 1000)}k{budget === 50000 ? '+' : ''}</output>
              </div>
              <input
                id="marketing-budget"
                type="range"
                min="2000"
                max="50000"
                step="1000"
                value={budget}
                onChange={event => setBudget(Number(event.target.value))}
                style={{ '--range-progress': `${progress}%` } as React.CSSProperties}
                className="estimator-range mt-6 w-full"
              />
              <div className="mt-2 flex justify-between text-[10px] font-bold text-[#1F375D]"><span>₹2k</span><span>₹50k+</span></div>

              <fieldset className="mt-9">
                <legend className="text-sm font-extrabold">Primary objective</legend>
                <div className="mt-4 grid gap-2 sm:grid-cols-3">
                  {objectives.map(item => {
                    const Icon = item.icon;
                    const active = objective === item.id;
                    return (
                      <button key={item.id} type="button" aria-pressed={active} onClick={() => setObjective(item.id)} className={`objective-button flex items-center gap-2 rounded-xl border px-3 py-3 text-left text-xs font-extrabold ${active ? 'objective-button-active border-[#1F375D] bg-[#1F375D] text-[#F4FAFA]' : 'border-[#1F375D]/15 bg-white/55 text-[#1F375D]'}`}>
                        <Icon size={17} className={active ? 'text-[#97D5E0]' : 'text-[#0C4C8A]'} />{item.label}
                      </button>
                    );
                  })}
                </div>
              </fieldset>
            </div>

            <div className="estimator-results relative grid content-center gap-3 bg-[#1F375D] p-6 text-[#F4FAFA] sm:p-8 lg:p-10">
              <div className="mb-2 flex items-center gap-2 text-xs font-black uppercase tracking-[.12em] text-[#ADDFDE]"><BarChart3 size={16} className="text-[#97D5E0]" />Illustrative projection</div>
              <Result label="Estimated impressions" value={projections.impressions} />
              <Result label="Qualified leads" value={projections.leads} />
              <Result label="Projected ROAS" value={projections.roas} />
              <p className="mt-3 text-[10px] leading-4 text-[#ADDFDE]/75">Planning model only—not a forecast or guarantee. Actual performance depends on offer, market, creative, tracking, and conversion quality.</p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Result({ label, value }: { label: string; value: string }) {
  return <div className="estimator-result flex items-center justify-between gap-4 rounded-xl border border-white/10 bg-white/[.055] px-4 py-3"><span className="text-xs font-bold text-[#ADDFDE]">{label}</span><strong className="text-2xl font-black tracking-[-.04em] text-[#97D5E0]"><CountUp value={value} /></strong></div>;
}
