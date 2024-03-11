"use server";

import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";
import { revalidatePath } from "next/cache";
import { FormAddCart, cartsSort } from "@/lib/types/cart";
import axios, { axiosAuthServer } from "@/lib/axios";

export const getCarts = async () => {
  try {
    // const session = await getServerSession(options);
    const res = await axiosAuthServer.get(`/carts/users/5`);
    const datas: cartsSort = res.data;
    const parse = cartsSort.safeParse(datas);
    if (parse.success) {
      return parse.data;
    }
    console.log(parse.error);
    return;
  } catch (error: any) {
    console.log(error.response.data);
    return error.response.data;
  }
};
export const incQty = async (cartid: string, cartqty: number) => {
  try {
    await axiosAuthServer
      .put(`/carts/${cartid}`, {
        quantity: cartqty + 1,
      })
      .then((res) => res.data.data.cart_quantity);
  } catch (error: any) {
    return error.response.data;
  } finally {
    revalidatePath("/cart");
  }
};
export const addCart = async ({
  product_id,
  variant_id,
  quantity,
}: FormAddCart) => {
  try {
    await axiosAuthServer.post(
      `/carts`,
      variant_id !== null
        ? { product_id, variant_id, quantity }
        : { product_id, quantity }
    );
  } catch (error: any) {
    console.log(error.response.data);
  } finally {
    revalidatePath("/cart");
  }
};
export const decQty = async (cartid: string, cartqty: number) => {
  try {
    if (cartqty === 1) {
      await axiosAuthServer.delete(`/carts/${cartid}`);
    } else {
      await axiosAuthServer.put(`/carts/${cartid}`, {
        quantity: cartqty - 1,
      });
    }
  } catch (error) {
    console.log(error);
  } finally {
    revalidatePath("/cart");
  }
};
export const deleteCart = async (cartid: string) => {
  try {
    await axiosAuthServer.delete(`/carts/${cartid}`);
  } catch (error) {
    console.log(error);
  } finally {
    revalidatePath("/cart");
  }
};
