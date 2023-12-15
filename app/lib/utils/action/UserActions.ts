'use server'
import { getServerSession } from "next-auth";
import { FormEditPassword } from "../../types/user";
import { options } from "@/app/api/auth/[...nextauth]/options";
import { axiosAuthServer } from "../../axios";

export async function changePassword(data:FormEditPassword){
    try {
        const session = await getServerSession(options)
        const res = await axiosAuthServer.patch(`/users/${session && session.user.id}`,{
            password:data.password
        })
        return res.data
    } catch (error:any) {
        console.log(error)
    }
}