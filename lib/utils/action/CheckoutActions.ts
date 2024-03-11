"use server";

import { axiosAuthServer } from "@/lib/axios";
import { Checkout } from "@/lib/types/checkout";
import { revalidatePath } from "next/cache";

export async function createCheckout(data: Checkout) {
  try {
    const res = await axiosAuthServer.post(`/orders/checkout`, {
      order_details: data.order_details,
      order_products_details: data.order_products_details,
      shipping_details: data.shipping_details,
      address_details: data.address_details,
    });
    return res.data;
  } catch (error: any) {
    console.log(error.response.data);
    return error.response.data;
  }
}

export async function receiveCheckout(id: number) {
  try {
    const res = await axiosAuthServer.post(`/orders/${id}/receive`, {
      status: "received",
    });
    return res.data;
  } catch (error: any) {
    console.log(error.response.data);
    return error.response.data;
  }
}

export async function cancelCheckout(id: number) {
  console.log(id);
  try {
    const res = await axiosAuthServer.post(`/orders/${id}/cancel`, {
      status: "cancelled",
    });
    return res.data;
  } catch (error: any) {
    console.log(error.response.data);
    return error.response.data;
  } finally {
    revalidatePath("/users");
  }
}
