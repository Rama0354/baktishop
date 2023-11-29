'use server'

import { getServerSession } from "next-auth";
import { ExpeditionArray, FormGetExpedition } from "../../types/expedition";
import { options } from "@/app/api/auth/[...nextauth]/options";
import axios from "axios";

export async function getCostsExpedition(data:FormGetExpedition):Promise<ExpeditionArray | undefined>{
    try {
        const session = await getServerSession(options)
        const res = await axios.post(`${process.env.BACKEND_API}/rajaongkir/cost`,{
            origin_city:133,
            destination_city:data.destination_city,
            weight:data.weight,
            courier:data.courier
        },{
            headers:{
                'Content-Type':'application/json',
                Authorization: `Bearer ${session?.accessToken}`
            }
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