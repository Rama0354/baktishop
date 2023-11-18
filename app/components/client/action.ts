"use server"

import { options } from "@/app/api/auth/[...nextauth]/options"
import axios from "axios"
import { getServerSession } from "next-auth"
import { revalidatePath } from "next/cache"

// type FormData = {
//     profileId: string;
//     profilename: string;
//     birthdate: string;
//     phone: string;
//   };

export async function editProfile(data:FormData){
    const session = await getServerSession(options)
    const profileId = data.get('profileid')
    const name = data.get('profilename')
    const phone = data.get('phone')
    const birth = data.get('birthdate')
    try {
        const res = await axios.post(`${process.env.BACKEND_API}/profile/${profileId}`,{
            name,
            birthdate:birth,
            phone_number:phone
        },{
            headers:{
                'Content-Type':'application/json',
                Authorization: `Bearer ${session?.accessToken}`
            }
        })
        return res
    } catch (error) {
        console.log(error)
    }finally{
        revalidatePath('/users/account')
    }
} 