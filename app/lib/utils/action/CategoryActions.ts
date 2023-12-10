'use server'
import axios from "axios"
import { GiftCardsByCategory, SingleCategory } from "../../types/category"
import { getServerSession } from "next-auth"
import { options } from "@/app/api/auth/[...nextauth]/options"

export async function getAllCategory() {
    try {
        const res = await axios.get(`${process.env.BACKEND_API}/category`)
        return res.data
    } catch (error) {
        console.log(error)
    }
}
export async function getCategoryBySlug(slug:string):Promise<SingleCategory | undefined> {
    try {
        const res = await axios.get(`${process.env.BACKEND_API}/category/slug/${slug}`)
        const data:SingleCategory = res.data.data
        const parseData = SingleCategory.parse(data)
        return parseData
    } catch (error) {
        console.log(error)
    }
}

export async function getAllItemByCategory(slug:string):Promise<GiftCardsByCategory | undefined> {
    try {
        const session = await getServerSession(options)
        const res = await axios.get(`${process.env.BACKEND_API}/gifts/category/${slug}`,{
            headers:{
                'Content-Type':'application/json',
                Authorization: `Bearer ${session && session.accessToken}`
            }
        })
        const data:GiftCardsByCategory = res.data.data
        const parseData = GiftCardsByCategory.parse(data)
        return parseData
    } catch (error) {
        console.log(error)
    }
}