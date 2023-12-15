"use server";

import { FormRegister } from "../../types/auth";
import axios, { axiosAuthServer } from "../../axios";

export async function LogoutAction() {
  try {
    await axiosAuthServer.post(
      `/logout`
    );
  } catch (error) {
    console.log(error);
  }
}

export async function RegisterAction(data:FormRegister) {
  try {
    const res = await axios.post(
      `/register`,
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
