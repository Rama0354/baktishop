'use server'
import { options } from "@/app/api/auth/[...nextauth]/options";
import axios from "axios";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";

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

export async function editProfile(data:FormData){
  const profileId = data.get('profileid')
  const name = data.get('profilename')
  const phone = data.get('phone')
  const birth = data.get('birthdate')
  try {
    const session = await getServerSession(options)
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