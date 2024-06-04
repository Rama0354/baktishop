"use server";

import { revalidatePath } from "next/cache";
import { axiosAuthServer } from "@/lib/axios";
import { wishList } from "@/lib/types/wish";
import { auth } from "@/lib/auth";

export const getWishlist = async (params?: string) => {
  try {
    const session = await auth();
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
    if (error.response) {
      console.log(
        `API Get Wishlist request failed: ${error.response.status} - ${error.response.data.message}`
      );
    } else if (error.request) {
      console.log(`API request failed: No response received`);
    } else {
      console.log(`Unexpected error: ${error.message}`);
    }
  }
};

export const changeWishlist = async (id: number) => {
  try {
    const res = await axiosAuthServer.post(`/products/${id}/wishlists`);
    return res.data;
  } catch (error: any) {
    if (error.response) {
      console.log(
        `API Change Wishlist request failed: ${error.response.status} - ${error.response.data.message}`
      );
    } else if (error.request) {
      console.log(`API request failed: No response received`);
    } else {
      console.log(`Unexpected error: ${error.message}`);
    }
  } finally {
    revalidatePath("/");
  }
};
