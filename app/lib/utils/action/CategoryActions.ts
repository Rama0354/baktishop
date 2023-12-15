'use server'
import { GiftCardsByCategory, SingleCategory } from "../../types/category"
import axios, { axiosAuthServer } from "../../axios"

export async function getAllCategory() {
    try {
        const res = await axios.get(`/category`)
        return res.data
    } catch (error) {
        console.log(error)
    }
}
export async function getCategoryBySlug(slug:string):Promise<SingleCategory | undefined> {
    try {
        const res = await axios.get(`/category/slug/${slug}`)
        const data:SingleCategory = res.data.data
        const parseData = SingleCategory.parse(data)
        return parseData
    } catch (error) {
        console.log(error)
    }
}

export async function getAllItemByCategory(slug:string):Promise<GiftCardsByCategory | undefined> {
    try {
        const res = await axiosAuthServer.get(`/gifts/category/${slug}`)
        const data:GiftCardsByCategory = res.data.data
        const parseData = GiftCardsByCategory.parse(data)
        return parseData
    } catch (error) {
        console.log(error)
    }
}