'use server'
import { options } from "@/app/api/auth/[...nextauth]/options";
import axios from "axios";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { FormEditProfile } from "../../types/profile";

export const getProfie = async () => {
  try {
    const session = await getServerSession(options);
    const res = await axios.get(
      `${process.env.BACKEND_API}/users/${session?.user.id}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.accessToken}`,
        },
      }
    );
    return res.data.data;
  } catch (error) {
    console.log(error)
  }
};

export async function editProfile(data:FormEditProfile){
  try {
    const session = await getServerSession(options)
      const res = await axios.post(`${process.env.BACKEND_API}/profile/${data.id}`,{
          name:data.name,
          birthdate:data.birthdate,
          phone_number:data.phone_number
      },{
          headers:{
              'Content-Type':'application/json',
              Authorization: `Bearer ${session?.accessToken}`
          }
      })
      return res.data
  } catch (error:any) {
      if(error.response !== undefined){
        console.log(error.response.data)
      }
  }finally{
      revalidatePath('/users/account')
  }
} 