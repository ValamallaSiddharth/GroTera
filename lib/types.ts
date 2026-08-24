export type AIModel='ChatGPT'|'Claude'|'Gemini'|'Midjourney'|'DALL-E'|'Coding AI'|'Video AI';
export interface Prompt {id:string;title:string;description:string;content:string;category:string;model:AIModel;tags:string[];author:string;rating:number;uses:number;createdAt:string;custom?:boolean;}
export interface User {name:string;email:string;}
