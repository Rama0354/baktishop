'use server'

import axios from "axios"
import { getServerSession } from "next-auth"
import { options } from "../../api/auth/[...nextauth]/options"
import { revalidatePath } from "next/cache"

export const getCarts =async () => {
    const session = await getServerSession(options)
    try {
        const res = await axios.get(`${process.env.BACKEND_API}/carts`,{
            headers:{
                'Content-Type':'application/json',
                Authorization:`Bearer ${session?.accessToken}`
            }
        })
        return res
    } catch (error) {
        console.log(error)
    }
}
export const incQty =async (cartid:string,cartqty:number) => {
    const session = await getServerSession(options)
    try {
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
export const decQty =async (cartid:string,cartqty:number) => {
    const session = await getServerSession(options)
    try {
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
    const session = await getServerSession(options)
    try {
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