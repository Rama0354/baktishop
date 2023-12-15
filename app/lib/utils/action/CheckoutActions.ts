'use server'

import { getServerSession } from "next-auth";
import { Checkout } from "../../types/checkout";
import { options } from "@/app/api/auth/[...nextauth]/options";
import axios from "axios";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { axiosAuthServer } from "../../axios";

export async function createCheckout(data:Checkout):Promise<Checkout | undefined>{
    try {
        const res = await axiosAuthServer.post(`/gifts/redeem/checkout`,{
            redeem_details: data.redeem_details,
            redeem_item_gifts_details: data.redeem_item_gifts_details,
            shipping_details: data.shipping_details,
            address_details: data.address_details
        })
        return res.data
    } catch (error:any) {
        if(error.response !== undefined){
            console.log(error.response.data)
        }
    }
}