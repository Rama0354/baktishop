'use server'
import { options } from "@/app/api/auth/[...nextauth]/options";
import axios from "axios";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { FormChangeAvatar, FormEditProfile } from "../../types/profile";
import { axiosAuthServer } from "../../axios";

export const getProfie = async () => {
  try {
    const session = await getServerSession(options);
    const res = await axiosAuthServer.get(
      `/users/${session?.user.id}`
    );
    return res.data.data;
  } catch (error) {
    console.log(error)
  }
};

export async function editProfile(data:FormEditProfile){
  try {
      const res = await axiosAuthServer.post(`/profile/${data.id}`,{
          name:data.name,
          birthdate:data.birthdate,
          phone_number:data.phone_number
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

export async function changeAvatarProfile(data:any){
  try {
    const avatar = data.avatar.get('avatar')
    const formData = new FormData();
    formData.append('avatar', avatar);
    await axiosAuthServer.post(`/profile/${data.profileId}`,formData,{
        headers:{
            'Content-Type': 'multipart/form-data',
        }
    })
  } catch (error:any) {
      if(error.response !== undefined){
        console.log(error.response.data)
      }
  }finally{
      revalidatePath('/users/account')
  }
}