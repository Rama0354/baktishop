'use server'

import { getServerSession } from "next-auth"
import { options } from "../../../api/auth/[...nextauth]/options"
import { revalidatePath } from "next/cache"
import { CartArray, FormAddCart } from "../../types/cart"
import axios, { axiosAuthServer } from "../../axios"

export const getCarts =async ():Promise<CartArray | undefined> => {
    try {
        const session = await getServerSession(options)
        const res = await axiosAuthServer.get(`/carts/user/${session?.user.id}`)
        const datas: CartArray = res.data.data;
        const parseData = CartArray.parse(datas);
        return parseData;
    } catch (error:any) {
        if(error.response !== undefined){
            console.log(error.response.data.error.message)
        }
    }
}
export const incQty =async (cartid:string,cartqty:number) => {
    try {
        await axiosAuthServer.put(`/carts/${cartid}`,{
            cart_quantity:cartqty + 1
        })
    } catch (error) {
        console.log(error)
    }finally{
        revalidatePath('/cart')
    }
    
}
export const addCart =async ({item_gift_id,variant_id,cart_quantity}:FormAddCart) => {
    try {
        await axiosAuthServer.post(`/carts`,
        variant_id !== null ? 
        { item_gift_id,variant_id,cart_quantity}
        :{item_gift_id,cart_quantity})
    } catch (error:any) {
        console.log(error.response.data)
    }finally{
        revalidatePath('/cart')
    }
}
export const decQty =async (cartid:string,cartqty:number) => {
    try {
        if(cartqty === 1){
            await axiosAuthServer.delete(`/carts/${cartid}`)
        }else{
            await axiosAuthServer.put(`/carts/${cartid}`,{
                cart_quantity:cartqty - 1
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
        await axiosAuthServer.delete(`/carts/${cartid}`)
    } catch (error) {
        console.log(error)
    }finally{
        revalidatePath('/cart')
    }
}