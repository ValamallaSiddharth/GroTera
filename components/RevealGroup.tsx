'use client';
import{Children}from'react';
import{useReveal}from'@/hooks/useReveal';
import type{Anim}from'./Reveal';
/* One observer on the container; every child staggers off its own --i. Replaces per-card observers so a grid resolves as a single group. */
export default function RevealGroup({children,className='',anim='scale',itemClassName='',start=0}:{children:React.ReactNode;className?:string;anim?:Anim;itemClassName?:string;start?:number}){const ref=useReveal<HTMLDivElement>(.05);return <div ref={ref} className={className}>{Children.map(children,(child,i)=><div data-anim={anim} className={itemClassName} style={{'--i':String(i+start)}as React.CSSProperties}>{child}</div>)}</div>}
