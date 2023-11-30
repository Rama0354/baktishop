'use server'

import { getServerSession } from "next-auth";
import { Checkout } from "../../types/checkout";
import { options } from "@/app/api/auth/[...nextauth]/options";
import axios from "axios";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createCheckout(data:Checkout):Promise<Checkout | undefined>{
    // const customGifts = data.redeem_item_gifts_details.map((gift)=>{
    //     if(gift.variant_id === null){
    //         return {
    //             item_gift_id:gift.item_gift_id,
    //             redeem_quantity:gift.redeem_quantity
    //         }
    //     }
    //     return gift
    // })
    try {
        const session = await getServerSession(options)
        const res = await axios.post(`${process.env.BACKEND_API}/gifts/redeem/checkout`,{
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
            console.log(error.response.data)
        }
    }
}