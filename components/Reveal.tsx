'use client';
import{useReveal}from'@/hooks/useReveal';
export default function Reveal({children,className='',delay=0}:{children:React.ReactNode;className?:string;delay?:number}){const ref=useReveal<HTMLDivElement>();return <div ref={ref} className={`reveal ${className}`} style={{transitionDelay:`${delay}ms`}}>{children}</div>}
