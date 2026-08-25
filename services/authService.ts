'use client';
export interface MockUser{fullName:string;email:string;provider:'password'|'google-mock'}
const KEY='grotera_auth_user';
const save=(user:MockUser)=>{localStorage.setItem(KEY,JSON.stringify(user));return user};
export const authService={
 currentUser:():MockUser|null=>{if(typeof window==='undefined')return null;try{return JSON.parse(localStorage.getItem(KEY)||'null')}catch{return null}},
 login:async(email:string,password:string)=>{void password;return save({fullName:email.split('@')[0],email,provider:'password'})},
 signup:async(fullName:string,email:string,password:string)=>{void password;return save({fullName,email,provider:'password'})},
 google:async()=>save({fullName:'GroTera User',email:'',provider:'google-mock'}),
 requestReset:async(email:string)=>{void email;return true},
 logout:()=>localStorage.removeItem(KEY)
};
