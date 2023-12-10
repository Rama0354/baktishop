'use server'

import { options } from "@/app/api/auth/[...nextauth]/options"
import axios from "axios"
import { getServerSession } from "next-auth"
import { GiftCardApi } from "../../types/gifts"

export const getGiftCards =async (params?:string):Promise<GiftCardApi | undefined> => {
    try {
        const session = await getServerSession(options)
        const res = await axios.get(`${process.env.BACKEND_API}/gifts?${params}`,{
            headers:{
                'Content-Type':'application/json',
                Authorization:`Bearer ${session?.accessToken}`
            }
        })
        const datas: GiftCardApi = res.data;
        const parseData = GiftCardApi.parse(datas)
        return parseData;
    } catch (error:any) {
        if(error.response !== undefined){
            console.log(error.response.data)
        }
    }
}
