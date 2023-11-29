'use server'

import { getServerSession } from "next-auth";
import { Checkout } from "../../types/checkout";
import { options } from "@/app/api/auth/[...nextauth]/options";
import axios from "axios";

export async function createCheckout(data:Checkout):Promise<Checkout | undefined>{
    try {
        const session = await getServerSession(options)
        const res = await axios.post(`${process.env.BACKEND_API}/redeem/checkout`,{
            redeem_details: data.redeem_details,
            redeem_item_gifts_details: data.redeem_item_gifts_details,
            shipping_details: data.shipping_details,
            address_details: data.address_details
        },{
            headers:{
                'Content-Type':'application/json',
                Authorization:`Bearer ${session?.accessToken}`
            }
        })
        return res.data
    } catch (error:any) {
        if(error.response !== undefined){
            error.response.data
        }
    }
}