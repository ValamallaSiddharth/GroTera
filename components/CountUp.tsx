'use client';

import { useEffect, useRef } from 'react';

type ParsedValue = {
  prefix: string;
  target: number;
  decimals: number;
  suffix: string;
};

function parseValue(value: string): ParsedValue | null {
  const match = value.match(/^([^\d]*)(\d+(?:\.\d+)?)(.*)$/);
  if (!match) return null;
  const [, prefix, rawNumber, suffix] = match;
  return {
    prefix,
    target: Number(rawNumber),
    decimals: rawNumber.includes('.') ? rawNumber.split('.')[1].length : 0,
    suffix,
  };
}

export default function CountUp({ value }: { value: string }) {
  const elementRef = useRef<HTMLSpanElement>(null);
  const previousTargetRef = useRef<number | null>(null);

  useEffect(() => {
    const element = elementRef.current;
    const parsed = parseValue(value);
    if (!element || !parsed) return;

    const { prefix, target, decimals, suffix } = parsed;
    const previousTarget = previousTargetRef.current;
    previousTargetRef.current = target;

    // The server-rendered value is already correct. Keep it on first mount so
    // the estimator can never become stuck at zero waiting for viewport events.
    if (previousTarget === null || matchMedia('(prefers-reduced-motion: reduce)').matches) {
      element.textContent = value;
      return;
    }

    let frame = 0;
    const startedAt = performance.now();
    const duration = 520;
    const render = (amount: number) => {
      element.textContent = `${prefix}${amount.toFixed(decimals)}${suffix}`;
    };
    const tick = (time: number) => {
      const progress = Math.min((time - startedAt) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      render(previousTarget + (target - previousTarget) * eased);
      if (progress < 1) frame = requestAnimationFrame(tick);
      else element.textContent = value;
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [value]);

  return <span ref={elementRef} aria-label={value}>{value}</span>;
}
