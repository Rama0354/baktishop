"use server";

import {z} from 'zod'
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

const EmailVerification = z.string().email()
type EmailVerification = z.infer<typeof EmailVerification>
export async function ResendEmailVerificationAction(data:EmailVerification) {
  try {
    await axios.post('/email/resend',{
      email:data
    })
  } catch (error:any) {
    console.log(error.response.data)
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
