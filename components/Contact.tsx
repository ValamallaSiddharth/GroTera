'use client';

import { useState } from 'react';
import { ArrowRight, Info, Send } from 'lucide-react';
import { contactServices } from '@/data/siteData';
import Reveal from './Reveal';
import RevealText from './RevealText';

type Form = {
  name: string;
  business: string;
  email: string;
  budget: string;
  service: string;
  message: string;
};

const initial: Form = { name: '', business: '', email: '', budget: '', service: '', message: '' };
export default function Contact() {
  const [form, setForm] = useState(initial);
  const [errors, setErrors] = useState<Partial<Record<keyof Form, string>>>({});
  const [status, setStatus] = useState<'idle' | 'unavailable'>('idle');
  const set = (key: keyof Form, value: string) => {
    setForm(current => ({ ...current, [key]: value }));
    if (errors[key]) setErrors(current => ({ ...current, [key]: undefined }));
    setStatus('idle');
  };

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    const nextErrors: typeof errors = {};
    if (!form.name.trim()) nextErrors.name = 'Enter your name';
    if (!/^\S+@\S+\.\S+$/.test(form.email.trim())) nextErrors.email = 'Enter a valid email address';
    if (!form.budget) nextErrors.budget = 'Choose a monthly budget';
    if (!form.service) nextErrors.service = 'Choose a service';
    if (form.message.trim().length < 10) nextErrors.message = 'Add a little more detail';
    setErrors(nextErrors);
    const firstError = Object.keys(nextErrors)[0] as keyof Form | undefined;
    if (firstError) {
      setStatus('idle');
      event.currentTarget.querySelector<HTMLElement>('[name="' + firstError + '"]')?.focus();
      return;
    }

    // Email delivery will be connected later; an unsent brief must not show success.
    setStatus('unavailable');
  };

  return (
    <section id="contact" className="relative isolate scroll-mt-24 overflow-hidden bg-brand-deep px-5 py-20 text-brand-light lg:py-24">
      <div className="mx-auto max-w-[1240px]">
        <Reveal anim="fade">
          <div className="mb-12 grid gap-6 lg:grid-cols-[1fr_.7fr] lg:items-end">
            <div>
              <p data-anim="up" className="section-label section-label-dark">Start a conversation</p>
              <RevealText className="section-heading mt-4 text-white" start={1} lines={['Ready to grow your business?']} />
            </div>
            <div>
              <p data-anim="up" style={{ '--i': '2' } as React.CSSProperties} className="text-lg text-brand-secondary">Tell us about your business and what you would like to achieve.</p>
              <button data-anim="up" style={{ '--i': '3' } as React.CSSProperties} onClick={() => document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth', block: 'center' })} className="service-link mt-5 inline-flex items-center gap-2 text-sm font-extrabold text-brand-accent">Open project brief <ArrowRight className="button-arrow" size={16} /></button>
            </div>
          </div>
        </Reveal>

        <Reveal anim="scale">
          <form id="contact-form" noValidate onSubmit={submit} className="rounded-2xl border border-white/10 bg-brand-soft p-6 shadow-2xl sm:p-8">
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Name" errorId="contact-name-error" error={errors.name} i={0}><input name="name" required aria-describedby={errors.name ? "contact-name-error" : undefined} autoComplete="name" aria-invalid={!!errors.name} className="form-input" value={form.name} onChange={event => set('name', event.target.value)} placeholder="Your name" /></Field>
              <Field label="Business name" i={1}><input name="business" autoComplete="organization" className="form-input" value={form.business} onChange={event => set('business', event.target.value)} placeholder="Your business" /></Field>
              <Field label="Work email" errorId="contact-email-error" error={errors.email} i={2}><input name="email" required aria-describedby={errors.email ? "contact-email-error" : undefined} autoComplete="email" aria-invalid={!!errors.email} type="email" className="form-input" value={form.email} onChange={event => set('email', event.target.value)} placeholder="you@business.com" /></Field>
              <Field label="Monthly marketing budget" errorId="contact-budget-error" error={errors.budget} i={3}><select name="budget" required aria-describedby={errors.budget ? "contact-budget-error" : undefined} aria-invalid={!!errors.budget} className="form-input" value={form.budget} onChange={event => set('budget', event.target.value)}><option value="">Select a range</option>{['₹2k–₹5k', '₹5k–₹10k', '₹10k–₹20k', '₹20k–₹50k', '₹50k+'].map(option => <option key={option}>{option}</option>)}</select></Field>
              <div className="sm:col-span-2"><Field label="Service interested in" errorId="contact-service-error" error={errors.service} i={4}><select name="service" required aria-describedby={errors.service ? "contact-service-error" : undefined} aria-invalid={!!errors.service} className="form-input" value={form.service} onChange={event => set('service', event.target.value)}><option value="">Select a service</option>{contactServices.map(service => <option key={service}>{service}</option>)}</select></Field></div>
              <div className="sm:col-span-2"><Field label="Project goals" errorId="contact-message-error" error={errors.message} i={5}><textarea name="message" required aria-describedby={errors.message ? "contact-message-error" : undefined} aria-invalid={!!errors.message} className="form-input min-h-32 resize-y" value={form.message} onChange={event => set('message', event.target.value)} placeholder="What would you like your marketing to achieve?" /></Field></div>
            </div>

            <div className="mt-6 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
              <button type="submit" data-anim="up" style={{ '--i': '6' } as React.CSSProperties} className="premium-button inline-flex min-w-44 items-center justify-center gap-2 rounded-lg bg-brand-accent px-6 py-3.5 font-extrabold text-brand-deep">
                Start Growing <Send className="button-arrow" size={17} />
              </button>
              <p className="text-xs leading-5 text-[#ADDFDE]">Online enquiries are not available yet. This form will not send your details.</p>
            </div>

            {status === 'unavailable' && <div role="status" aria-live="polite" className="success-card mt-6 flex items-start gap-3 rounded-xl border border-brand-accent/30 bg-brand-accent/10 p-4 text-sm text-white"><Info className="mt-0.5 shrink-0 text-brand-accent" size={20} /><div><strong>Your enquiry has not been sent.</strong><p className="mt-1 text-brand-secondary">Online enquiries are not available yet. Your details remain here for you to edit or copy before leaving this page.</p></div></div>}
          </form>
        </Reveal>
      </div>
    </section>
  );
}

function Field({ label, error, errorId, children, i }: { label: string; error?: string; errorId?: string; children: React.ReactNode; i?: number }) {
  return <label data-anim="up" style={{ '--i': String(i ?? 0) } as React.CSSProperties} className="block"><span className="mb-2 block text-sm font-bold text-brand-light/90">{label}</span>{children}{error && <span id={errorId} role="alert" className="field-error mt-1.5 block text-xs font-semibold text-brand-error">{error}</span>}</label>;
}
