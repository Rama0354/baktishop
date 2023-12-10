'use server'
import { getServerSession } from "next-auth";
import { FormEditPassword } from "../../types/user";
import { options } from "@/app/api/auth/[...nextauth]/options";
import axios from "axios";

export async function changePassword(data:FormEditPassword){
    try {
        const session = await getServerSession(options)
        console.log(data)
        const res = await axios.patch(`${process.env.BACKEND_API}/users/${session && session.user.id}`,{
            password:data.password
        },{ headers: { 'Content-Type': 'application/json', Authorization:`Bearer ${session && session.accessToken}` }})
        return res.data
    } catch (error:any) {
        console.log(error)
    }
}