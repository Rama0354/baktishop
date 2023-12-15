'use server'

import { GiftCardApi } from "../../types/gifts"
import { axiosAuthServer } from "../../axios"

export const getGiftCards =async (params?:string):Promise<GiftCardApi | undefined> => {
    try {
        const res = await axiosAuthServer.get(`/gifts?${params}`)
        const datas: GiftCardApi = res.data;
        const parseData = GiftCardApi.parse(datas)
        return parseData;
    } catch (error:any) {
        if(error.response !== undefined){
            console.log(error.response.data)
        }
    }
}
