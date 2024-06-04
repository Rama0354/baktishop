"use server";

import { revalidatePath } from "next/cache";
import { FormAddCart, cartsSort } from "@/lib/types/cart";
import { axiosAuthServer } from "@/lib/axios";
import { auth } from "@/lib/auth";

export const getCarts = async () => {
  try {
    const session = await auth();
    const res = await axiosAuthServer.get(`/carts/users/${session?.user.id}`);
    const datas: cartsSort = res.data;
    const parse = cartsSort.safeParse(datas);
    if (parse.success) {
      return parse.data;
    }
    console.log(parse.error);
    return;
  } catch (error: any) {
    if (error.response) {
      console.log(
        `API Get Cart request failed: ${error.response.status} - ${error.response.data.message}`
      );
      return error.response.data;
    } else if (error.request) {
      console.log(`API request failed: No response received`);
    } else {
      console.log(`Unexpected error: ${error.message}`);
    }
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
    if (error.response) {
      console.log(
        `API Cart inQty request failed: ${error.response.status} - ${error.response.data.message}`
      );
      return error.response.data;
    } else if (error.request) {
      console.log(`API request failed: No response received`);
    } else {
      console.log(`Unexpected error: ${error.message}`);
    }
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
    if (error.response) {
      console.log(
        `API Add Cart request failed: ${error.response.status} - ${error.response.data.message}`
      );
    } else if (error.request) {
      console.log(`API request failed: No response received`);
    } else {
      console.log(`Unexpected error: ${error.message}`);
    }
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
  } catch (error: any) {
    if (error.response) {
      console.log(
        `API Cart decQty request failed: ${error.response.status} - ${error.response.data.message}`
      );
    } else if (error.request) {
      console.log(`API request failed: No response received`);
    } else {
      console.log(`Unexpected error: ${error.message}`);
    }
  } finally {
    revalidatePath("/cart");
  }
};
export const deleteCart = async (cartid: string) => {
  try {
    await axiosAuthServer.delete(`/carts/${cartid}`);
  } catch (error: any) {
    if (error.response) {
      console.log(
        `API Del Cart request failed: ${error.response.status} - ${error.response.data.message}`
      );
    } else if (error.request) {
      console.log(`API request failed: No response received`);
    } else {
      console.log(`Unexpected error: ${error.message}`);
    }
  } finally {
    revalidatePath("/cart");
  }
};
