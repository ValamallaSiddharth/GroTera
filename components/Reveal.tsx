'use client';
import{useReveal}from'@/hooks/useReveal';
export type Anim='up'|'section'|'scale'|'fade'|'img';
export default function Reveal({children,className='',anim='up',delay=0,index}:{children:React.ReactNode;className?:string;anim?:Anim;delay?:number;index?:number}){const ref=useReveal<HTMLDivElement>();const style:React.CSSProperties={};if(delay)(style as Record<string,string>)['--dl']=`${delay}ms`;if(index!==undefined)(style as Record<string,string>)['--i']=String(index);return <div ref={ref} data-anim={anim} className={className} style={style}>{children}</div>}
