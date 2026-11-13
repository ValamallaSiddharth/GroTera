'use client';

import { useEffect } from 'react';

export function useMagnetic<T extends HTMLElement>(ref: React.RefObject<T | null>, threshold = 35) {
  useEffect(() => {
    const element = ref.current;
    if (!element || !matchMedia('(pointer: fine)').matches || matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let bounds = element.getBoundingClientRect();
    let targetX = 0;
    let targetY = 0;
    let x = 0;
    let y = 0;
    let velocityX = 0;
    let velocityY = 0;
    let frame = 0;

    const refreshBounds = () => { bounds = element.getBoundingClientRect(); };
    const animate = () => {
      velocityX = (velocityX + (targetX - x) * .12) * .72;
      velocityY = (velocityY + (targetY - y) * .12) * .72;
      x += velocityX;
      y += velocityY;
      element.style.transform = `translate3d(${x}px,${y}px,0)`;
      const moving = Math.abs(targetX - x) + Math.abs(targetY - y) + Math.abs(velocityX) + Math.abs(velocityY) > .08;
      if (moving) frame = requestAnimationFrame(animate);
      else {
        frame = 0;
        if (targetX === 0 && targetY === 0) element.style.removeProperty('transform');
      }
    };
    const queue = () => { if (!frame) frame = requestAnimationFrame(animate); };
    const move = (event: PointerEvent) => {
      const nearby = event.clientX >= bounds.left - threshold && event.clientX <= bounds.right + threshold && event.clientY >= bounds.top - threshold && event.clientY <= bounds.bottom + threshold;
      if (nearby) {
        targetX = Math.max(-10, Math.min(10, (event.clientX - (bounds.left + bounds.width / 2)) * .13));
        targetY = Math.max(-8, Math.min(8, (event.clientY - (bounds.top + bounds.height / 2)) * .16));
      } else {
        targetX = 0;
        targetY = 0;
      }
      queue();
    };
    const reset = () => { targetX = 0; targetY = 0; queue(); };

    addEventListener('pointermove', move, { passive: true });
    addEventListener('resize', refreshBounds, { passive: true });
    addEventListener('scroll', refreshBounds, { passive: true });
    document.addEventListener('pointerleave', reset);
    return () => {
      cancelAnimationFrame(frame);
      removeEventListener('pointermove', move);
      removeEventListener('resize', refreshBounds);
      removeEventListener('scroll', refreshBounds);
      document.removeEventListener('pointerleave', reset);
      element.style.removeProperty('transform');
    };
  }, [ref, threshold]);
}
