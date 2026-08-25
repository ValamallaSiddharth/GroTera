'use client';
import{useEffect,useState}from'react';import{ArrowUp}from'lucide-react';
export default function BackToTop(){const[show,setShow]=useState(false);useEffect(()=>{const on=()=>setShow(scrollY>520);on();addEventListener('scroll',on,{passive:true});return()=>removeEventListener('scroll',on)},[]);if(!show)return null;return <button onClick={()=>scrollTo({top:0,behavior:'smooth'})} aria-label="Back to top" className="back-to-top fixed bottom-5 right-5 z-40 grid h-11 w-11 place-items-center rounded-full bg-brand-accent text-brand-deep shadow-lg"><ArrowUp size={18}/></button>}
