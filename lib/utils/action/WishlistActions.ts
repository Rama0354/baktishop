"use server";

import { options } from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { axiosAuthServer } from "@/lib/axios";
import { wishList } from "@/lib/types/wish";

export const getWishlist = async (params?: string) => {
  try {
    const session = await getServerSession(options);
    const res = await axiosAuthServer.get(
      `/wishlists/users/${session?.user.id}${params ? "?" + params : ""}`
    );
    const data: wishList = res.data;
    const parse = wishList.safeParse(data);
    if (parse.success) {
      return parse.data;
    }
    console.log(parse.error);
    return;
  } catch (error: any) {
    console.log(error.response.data);
  }
};

export const changeWishlist = async (id: number) => {
  try {
    const res = await axiosAuthServer.post(`/products/${id}/wishlists`);
    return res.data;
  } catch (error) {
    console.log(error);
  } finally {
    revalidatePath("/");
  }
};
