"use server";

import { FormEditPassword } from "@/lib/types/user";
import { axiosAuthServer } from "@/lib/axios";
import { auth } from "@/lib/auth";

export async function changePassword(data: FormEditPassword) {
  try {
    const session = await auth();
    const res = await axiosAuthServer.patch(
      `/users/${session && session.user.id}`,
      {
        password: data.password,
      }
    );
    return res.data;
  } catch (error: any) {
    if (error.response) {
      console.log(
        `API request failed: ${error.response.status} - ${error.response.data.message}`
      );
    } else if (error.request) {
      console.log(`API request failed: No response received`);
    } else {
      console.log(`Unexpected error: ${error.message}`);
    }
  }
}
