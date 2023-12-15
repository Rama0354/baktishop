'use server'

import { options } from "@/app/api/auth/[...nextauth]/options"
import { getServerSession } from "next-auth"
import { revalidatePath } from "next/cache"
import { axiosAuthServer } from "../../axios"

export const getAllWishlist =async (params?:string) => {
    try {
        const session = await getServerSession(options)
        const res = await axiosAuthServer.get(`/gifts/wishlist/user/${session?.user.id}${params ? '?'+params:''}`)
        return res
    } catch (error:any) {
        console.log(error.response.data)
    }
}

export const changeWishlist =async (giftId:number) => {
    try {
        const res = await axiosAuthServer.post(`/gifts/${giftId}/wishlist`)
        return res.data
    } catch (error) {
        console.log(error)
    }finally{
        revalidatePath('/')
    }
}