import ProductApp from '@/components/ProductApp'; export default async function Page({params}:{params:Promise<{id:string}>}){const{id}=await params;return <ProductApp page="detail" id={id}/>}
