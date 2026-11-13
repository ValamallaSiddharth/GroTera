import Image from 'next/image';
import { BadgeCheck, Star } from 'lucide-react';
import { testimonials } from '@/data/testimonials';
import Reveal from './Reveal';
import RevealText from './RevealText';

export default function Testimonials() {
  if (!testimonials.length) return null;

  return (
    <section aria-label="Client testimonials" className="bg-[#E5ECE7] px-5 py-20 text-[#1F375D] lg:py-24">
      <div className="mx-auto max-w-[1240px]">
        <Reveal anim="fade">
          <p data-anim="up" className="section-label">Client reviews</p>
          <RevealText className="section-heading mt-4 max-w-3xl" start={1} lines={['Growth stories, told by our clients.']} />
        </Reveal>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {testimonials.slice(0, 3).map(item => (
            <article key={`${item.name}-${item.company}`} className="testimonial-card rounded-2xl border border-[#1F375D]/10 bg-[#F4FAFA] p-6 shadow-[0_16px_40px_rgba(13,40,33,.08)]">
              <div className="flex items-center justify-between gap-3">
                <div className="flex gap-1" aria-label={`${item.rating} out of 5 stars`}>
                  {Array.from({ length: 5 }, (_, star) => <Star key={star} size={16} className={star < item.rating ? 'fill-[#0C4C8A] text-[#0C4C8A]' : 'text-[#1F375D]/20'} />)}
                </div>
                <span className="rounded-full bg-[#97D5E0]/15 px-3 py-1 text-[10px] font-black uppercase tracking-[.08em] text-[#7A4404]">{item.impact}</span>
              </div>
              <blockquote className="mt-6 text-base font-semibold leading-7 text-[#0C4C8A]">“{item.quote}”</blockquote>
              <div className="mt-7 flex items-center gap-3 border-t border-[#1F375D]/10 pt-5">
                <Image src={item.avatar} alt="" width={44} height={44} className="h-11 w-11 rounded-full object-cover" />
                <div className="min-w-0">
                  <p className="flex items-center gap-1.5 font-extrabold">{item.name}<BadgeCheck size={15} className="text-[#0C4C8A]" aria-label="Verified client" /></p>
                  <p className="truncate text-xs text-[#1F375D]">{item.role} at {item.company}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
