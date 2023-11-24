'use server'

import { options } from "@/app/api/auth/[...nextauth]/options"
import axios from "axios"
import { getServerSession } from "next-auth"
import { revalidatePath } from "next/cache"

export const getAllWishlist =async (params?:string) => {
    const session = await getServerSession(options)
    try {
        const res = await axios.get(`${process.env.BACKEND_API}/gifts/wishlist${params ? '?'+params:''}`,{
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

export const changeWishlist =async (giftId:number) => {
    const session = await getServerSession(options)
    try {
        await axios.post(`${process.env.BACKEND_API}/gifts/${giftId}/wishlist`,undefined,{
            headers:{
                'Content-Type':'application/json',
                Authorization:`Bearer ${session?.accessToken}`
            }
        })
    } catch (error) {
        console.log(error)
    }finally{
        revalidatePath('/')
    }
}