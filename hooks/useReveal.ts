'use client';
import{useEffect,useRef}from'react';
export function useReveal<T extends HTMLElement>(threshold=.16,rootMargin='0px 0px -8% 0px'){const ref=useRef<T>(null);useEffect(()=>{const el=ref.current;if(!el)return;if(matchMedia('(prefers-reduced-motion:reduce)').matches){el.classList.add('is-in');return}const io=new IntersectionObserver(([entry])=>{if(entry.isIntersecting){el.classList.add('is-in');io.unobserve(el)}},{threshold,rootMargin});io.observe(el);return()=>io.disconnect()},[threshold,rootMargin]);return ref}
