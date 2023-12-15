'use server'

import { ExpeditionArray, FormGetExpedition } from "../../types/expedition";
import { axiosAuthServer } from "../../axios";

export async function getCostsExpedition(data:FormGetExpedition):Promise<ExpeditionArray | undefined>{
    try {
        const res = await axiosAuthServer.post(`/rajaongkir/cost`,{
            origin_city:133,
            destination_city:data.destination_city,
            weight:data.weight,
            courier:data.courier
        })
        const datas: ExpeditionArray = await res.data.data;
        const parseData = ExpeditionArray.parse(datas);
        return parseData;
    } catch (error:any) {
        if(error.response !== undefined){
            error.response.data
        }
    }
}