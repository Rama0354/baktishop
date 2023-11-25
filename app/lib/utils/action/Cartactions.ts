'use server'

import axios from "axios"
import useSWR from 'swr';
import { getServerSession } from "next-auth"
import { options } from "../../../api/auth/[...nextauth]/options"
import { revalidatePath } from "next/cache"
import { CartArray, FormAddCart } from "../../types/cart"

export const getCarts =async ():Promise<CartArray | undefined> => {
    try {
        const session = await getServerSession(options)
        const res = await axios.get(`${process.env.BACKEND_API}/carts`,{
            headers:{
                'Content-Type':'application/json',
                Authorization:`Bearer ${session?.accessToken}`
            }
        })
        const datas: CartArray = res.data.data;
        const parseData = CartArray.parse(datas);
        return parseData;
    } catch (error:any) {
        if(error.response !== undefined){
            console.log(error.response.data)
        }
    }
}
export const incQty =async (cartid:string,cartqty:number) => {
    try {
        const session = await getServerSession(options)
        await axios.put(`${process.env.BACKEND_API}/carts/${cartid}`,{
            cart_quantity:cartqty + 1
        },{
            headers:{
                'Content-Type':'application/json',
                Authorization:`Bearer ${session?.accessToken}`
            }
        })
    } catch (error) {
        console.log(error)
    }finally{
        revalidatePath('/cart')
    }
    
}
export const addCart =async ({item_gift_id,variant_id,cart_quantity}:FormAddCart) => {
    try {
        const session = await getServerSession(options)
        await axios.post(`${process.env.BACKEND_API}/carts`,
        variant_id !== null ? 
        { item_gift_id,variant_id,cart_quantity}
        :{item_gift_id,cart_quantity},
        {headers:{
                'Content-Type':'application/json',
                Authorization:`Bearer ${session?.accessToken}`
            }
        })
    } catch (error) {
        console.log(error)
    }finally{
        revalidatePath('/cart')
    }
}
export const decQty =async (cartid:string,cartqty:number) => {
    try {
        const session = await getServerSession(options)
        if(cartqty === 1){
            await axios.delete(`${process.env.BACKEND_API}/carts/${cartid}`,{
                headers:{
                    'Content-Type':'application/json',
                    Authorization:`Bearer ${session?.accessToken}`
                }
            })
        }else{
            await axios.put(`${process.env.BACKEND_API}/carts/${cartid}`,{
                cart_quantity:cartqty - 1
            },{
                headers:{
                    'Content-Type':'application/json',
                    Authorization:`Bearer ${session?.accessToken}`
                }
            })
        }
    } catch (error) {
        console.log(error)
    }finally{
        revalidatePath('/cart')
    }
}
export const deleteCart =async (cartid:string) => {
    try {
        const session = await getServerSession(options)
        await axios.delete(`${process.env.BACKEND_API}/carts/${cartid}`,{
            headers:{
                'Content-Type':'application/json',
                Authorization:`Bearer ${session?.accessToken}`
            }
        })
    } catch (error) {
        console.log(error)
    }finally{
        revalidatePath('/cart')
    }
}