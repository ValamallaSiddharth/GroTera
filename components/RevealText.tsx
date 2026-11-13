'use client';
import{createElement}from'react';
import{useReveal}from'@/hooks/useReveal';
/* Masked line reveal: each line sits in an overflow-hidden wrapper and slides up from behind it. Pass one entry per line to stagger them. */
export default function RevealText({lines,className='',as='h2',start=0}:{lines:React.ReactNode[];className?:string;as?:'h1'|'h2'|'h3'|'p';start?:number}){const ref=useReveal<HTMLElement>();return createElement(as,{ref,className:`reveal-lines ${className}`},lines.map((line,i)=><span key={i} className="line"><span data-anim="line" style={{'--i':String(i+start)}as React.CSSProperties}>{line}{i<lines.length-1?' ':null}</span></span>))}
