'use server'

import { cookies } from 'next/headers'
import { options } from "@/app/api/auth/[...nextauth]/options"
import axios from "axios"
import { getServerSession } from "next-auth"

export const getAllGifts =async (params?:string) => {
    try {
        const session = await getServerSession(options)
            const res = await axios.get(`${process.env.BACKEND_API}/gifts?${params}`,{
                headers:{
                    'Content-Type':'application/json',
                    Authorization:`Bearer ${session?.accessToken}`
                }
            })
            return res.data
    } catch (error) {
        console.log(error)
    }
}

 
export async function getCookieData() {
  const cookieData = cookies().getAll()
  return new Promise((resolve) =>
    setTimeout(() => {
      resolve(cookieData)
    }, 1000)
  )
}