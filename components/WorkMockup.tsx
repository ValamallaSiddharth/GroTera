import {
  ArrowDown,
  Heart,
  MessageCircle,
  Search,
  Send,
  TrendingUp,
  Users,
} from 'lucide-react';

export type WorkVisual = 'social' | 'visibility' | 'ads' | 'funnel';

export default function WorkMockup({ type }: { type: WorkVisual }) {
  if (type === 'social') {
    return (
      <div className="mockup-phone" aria-hidden="true">
        <div className="flex items-center gap-2 border-b border-white/10 px-3 py-2">
          <span className="h-6 w-6 rounded-full bg-[#97D5E0]" />
          <span className="h-2 w-20 rounded-full bg-white/55" />
        </div>
        <div className="m-2 h-20 rounded-lg bg-[linear-gradient(135deg,#ADDFDE,#97D5E0)] p-3">
          <div className="h-2 w-16 rounded-full bg-[#1F375D]/65" />
          <div className="mt-2 h-2 w-24 rounded-full bg-white/70" />
          <div className="mt-5 h-5 w-14 rounded-full bg-[#1F375D]" />
        </div>
        <div className="flex items-center gap-3 px-3 py-1 text-white/75">
          <Heart size={13} /><MessageCircle size={13} /><Send size={13} />
        </div>
        <div className="space-y-1.5 px-3 py-2">
          <div className="h-1.5 w-full rounded-full bg-white/35" />
          <div className="h-1.5 w-3/4 rounded-full bg-white/20" />
        </div>
      </div>
    );
  }

  if (type === 'visibility') {
    return (
      <div className="mockup-panel w-[min(82%,330px)]" aria-hidden="true">
        <div className="flex items-center gap-2 rounded-full bg-white px-3 py-2 text-[#1F375D] shadow-sm">
          <Search size={14} /><span className="text-[10px] font-bold">your category + solution</span>
        </div>
        <div className="mt-4 flex items-end gap-2">
          {[34, 48, 43, 62, 76, 92].map((height, index) => (
            <span key={height} className="flex-1 rounded-t-md bg-[#ADDFDE]" style={{ height, opacity: .6 + index * .07 }} />
          ))}
        </div>
        <div className="mt-3 flex items-center justify-between text-[10px] font-extrabold text-[#1F375D]">
          <span>Search visibility</span><span className="flex items-center gap-1 text-[#0C4C8A]"><TrendingUp size={13} /> Rising</span>
        </div>
      </div>
    );
  }

  if (type === 'ads') {
    return (
      <div className="mockup-panel w-[min(84%,350px)]" aria-hidden="true">
        <div className="flex items-center justify-between">
          <div><p className="text-[9px] font-bold uppercase tracking-[.12em] text-[#1F375D]">Campaign efficiency</p><p className="mt-1 text-lg font-black text-[#1F375D]">Performance trend</p></div>
          <span className="rounded-full bg-[#97D5E0]/25 px-2.5 py-1 text-[10px] font-black text-[#0C4C8A]">Optimized</span>
        </div>
        <svg viewBox="0 0 300 85" className="mt-3 h-20 w-full overflow-visible">
          <defs><linearGradient id="adArea" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#97D5E0" stopOpacity=".38"/><stop offset="1" stopColor="#97D5E0" stopOpacity="0"/></linearGradient></defs>
          <path d="M0 74 C35 70 46 56 77 60 S116 44 145 49 S182 25 214 31 S257 7 300 10 L300 85 L0 85 Z" fill="url(#adArea)" />
          <path d="M0 74 C35 70 46 56 77 60 S116 44 145 49 S182 25 214 31 S257 7 300 10" fill="none" stroke="#0C4C8A" strokeWidth="4" strokeLinecap="round" />
        </svg>
      </div>
    );
  }

  return (
    <div className="flex w-[min(88%,390px)] items-center justify-center gap-3" aria-hidden="true">
      <div className="funnel-step w-28"><Users size={20} /><span>Qualified traffic</span></div>
      <ArrowDown className="rotate-[-90deg] text-[#97D5E0]" size={20} />
      <div className="funnel-step w-24 bg-[#ADDFDE]"><TrendingUp size={20} /><span>Nurtured demand</span></div>
      <ArrowDown className="rotate-[-90deg] text-[#97D5E0]" size={20} />
      <div className="funnel-step w-20 bg-[#97D5E0]"><span className="text-xl font-black">✓</span><span>Sales ready</span></div>
    </div>
  );
}
