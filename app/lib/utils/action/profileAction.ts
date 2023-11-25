'use server'
import { options } from "@/app/api/auth/[...nextauth]/options";
import axios from "axios";
import { getServerSession } from "next-auth";

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