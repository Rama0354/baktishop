"use server";

import { axiosAuthServer } from "@/lib/axios";
import { Checkout } from "@/lib/types/checkout";

export async function createCheckout(data: Checkout) {
  try {
    const res = await axiosAuthServer.post(`/gifts/redeem/checkout`, {
      redeem_details: data.redeem_details,
      redeem_item_gifts_details: data.redeem_item_gifts_details,
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
    const res = await axiosAuthServer.post(`/gifts/redeem/receive/${id}`, {
      redeem_status: "received",
    });
    return res.data;
  } catch (error: any) {
    console.log(error.response.data);
    return error.response.data;
  }
}
