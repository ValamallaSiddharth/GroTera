'use client';

import { useState } from 'react';
import { ArrowLeftRight } from 'lucide-react';

export default function CampaignReveal() {
  const [split, setSplit] = useState(52);

  return (
    <div className="campaign-reveal mt-10 overflow-hidden rounded-[22px] border border-[#1F375D]/12 bg-[#1F375D] shadow-[0_24px_60px_rgba(13,40,33,.18)]">
      <div className="flex flex-col justify-between gap-3 border-b border-white/10 px-5 py-4 text-[#F4FAFA] sm:flex-row sm:items-center">
        <div><p className="text-[10px] font-black uppercase tracking-[.13em] text-[#97D5E0]">Campaign transformation</p><h3 className="mt-1 text-lg font-extrabold">Drag to compare performance</h3></div>
        <p className="text-xs text-[#ADDFDE]">Before GroTera → After GroTera</p>
      </div>
      <div className="campaign-reveal-viewport relative h-[330px] sm:h-[380px]" style={{ '--split': `${split}%` } as React.CSSProperties}>
        <div className="campaign-side campaign-after absolute inset-0 bg-[#DDE9E2] p-5 sm:p-8">
          <span className="campaign-side-label right-5 bg-[#1F375D] text-[#F4FAFA] sm:right-8">After GroTera</span>
          <div className="campaign-graph ml-auto mt-12 w-[82%] sm:w-[64%]">
            <svg viewBox="0 0 520 180" className="h-auto w-full overflow-visible" aria-hidden="true">
              <path d="M5 161 C62 158 88 142 126 145 S194 117 231 124 S294 82 333 91 S391 44 430 51 S476 13 515 17" fill="none" stroke="#0C4C8A" strokeWidth="8" strokeLinecap="round" />
              <path d="M5 161 C62 158 88 142 126 145 S194 117 231 124 S294 82 333 91 S391 44 430 51 S476 13 515 17 L515 180 L5 180 Z" fill="url(#afterFill)" />
              <defs><linearGradient id="afterFill" x1="0" y1="0" x2="0" y2="1"><stop stopColor="#97D5E0" stopOpacity=".38"/><stop offset="1" stopColor="#97D5E0" stopOpacity="0"/></linearGradient></defs>
            </svg>
          </div>
          <div className="absolute bottom-6 right-5 grid w-[82%] grid-cols-3 gap-2 sm:bottom-8 sm:right-8 sm:w-[64%]">
            <CampaignMetric value="3.6x" label="ROAS" positive />
            <CampaignMetric value="−38%" label="CAC" positive />
            <CampaignMetric value="+185%" label="Engagement" positive />
          </div>
        </div>

        <div className="campaign-side campaign-before absolute inset-0 bg-[#E8E4D9] p-5 sm:p-8">
          <span className="campaign-side-label left-5 bg-[#6A706B] text-white sm:left-8">Before GroTera</span>
          <div className="campaign-graph mt-12 w-[82%] sm:w-[64%]">
            <svg viewBox="0 0 520 180" className="h-auto w-full overflow-visible" aria-hidden="true">
              <path d="M5 126 C58 128 82 116 126 123 S198 119 238 124 S300 111 347 120 S418 113 515 119" fill="none" stroke="#777D78" strokeWidth="8" strokeLinecap="round" />
              <path d="M5 126 C58 128 82 116 126 123 S198 119 238 124 S300 111 347 120 S418 113 515 119 L515 180 L5 180 Z" fill="#777D7814" />
            </svg>
          </div>
          <div className="absolute bottom-6 left-5 grid w-[82%] grid-cols-3 gap-2 sm:bottom-8 sm:left-8 sm:w-[64%]">
            <CampaignMetric value="Flat" label="Growth" />
            <CampaignMetric value="High" label="CAC" />
            <CampaignMetric value="Low" label="Momentum" />
          </div>
        </div>

        <div className="campaign-divider absolute inset-y-0 z-20 w-px bg-[#97D5E0]" aria-hidden="true">
          <span className="absolute left-1/2 top-1/2 grid h-11 w-11 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border-4 border-[#F4FAFA] bg-[#97D5E0] text-[#1F375D] shadow-xl"><ArrowLeftRight size={17} /></span>
        </div>
        <input className="campaign-range absolute inset-0 z-30 h-full w-full cursor-col-resize opacity-0" type="range" min="12" max="88" value={split} onChange={event => setSplit(Number(event.target.value))} aria-label="Compare campaign performance before and after GroTera" />
      </div>
    </div>
  );
}

function CampaignMetric({ value, label, positive = false }: { value: string; label: string; positive?: boolean }) {
  return <div className="rounded-xl border border-[#1F375D]/10 bg-[#F4FAFA]/85 p-2.5 backdrop-blur-sm"><strong className={`block text-base font-black sm:text-xl ${positive ? 'text-[#0C4C8A]' : 'text-[#535C57]'}`}>{value}</strong><span className="mt-1 block text-[9px] font-bold text-[#1F375D] sm:text-[10px]">{label}</span></div>;
}
