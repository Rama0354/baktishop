"use server";

import { options } from "@/app/api/auth/[...nextauth]/options";
import axios from "axios";
import { getServerSession } from "next-auth";
import { FormRegister } from "../../types/auth";

export async function LogoutAction() {
  try {
    const session = await getServerSession(options);
    await axios.post(
      `${process.env.BACKEND_API}/logout`,
      {},
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session && session.accessToken}`,
        },
      }
    );
  } catch (error) {
    console.log(error);
  }
}

export async function RegisterAction(data:FormRegister) {
  try {
    const res = await axios.post(
      `${process.env.BACKEND_API}/register`,
      {
        name:data.name,
        username:data.username,
        email:data.email,
        birthdate:data.birthdate,
        password:data.password,
        password_confirmation:data.password_confirmation
      },
      {
        headers: {
          "Content-Type": "application/json"
        },
      }
    );
    return res.data
  } catch (error:any) {
    console.log(error);
  }
}
