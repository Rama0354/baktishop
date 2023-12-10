"use server";

import { options } from "@/app/api/auth/[...nextauth]/options";
import axios from "axios";
import { getServerSession } from "next-auth";

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
