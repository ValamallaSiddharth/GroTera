'use client';

import { useRef } from 'react';
import { MessageCircle, ArrowUpRight } from 'lucide-react';
import { useMagnetic } from '@/hooks/useMagnetic';

export default function QuickInquiry() {
  const buttonRef = useRef<HTMLButtonElement>(null);
  useMagnetic(buttonRef);
  return (
    <div className="quick-inquiry-position fixed left-4 z-40 sm:left-1/2 sm:-translate-x-1/2">
      <button
        ref={buttonRef}
        onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
        className="quick-inquiry group flex items-center gap-2 rounded-full border border-white/15 bg-[#1F375D]/95 px-3 py-2.5 text-xs font-extrabold text-[#F4FAFA] shadow-2xl backdrop-blur-md sm:gap-3 sm:px-4 sm:py-3 sm:text-sm"
      >
        <span className="grid h-7 w-7 place-items-center rounded-full bg-[#97D5E0] text-[#1F375D] sm:h-8 sm:w-8"><MessageCircle size={16} /></span>
        Quick inquiry
        <ArrowUpRight className="quick-inquiry-arrow text-[#97D5E0]" size={16} />
      </button>
    </div>
  );
}
