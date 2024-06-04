"use server";

import { auth } from "@/lib/auth";
import { axiosAuthServer } from "@/lib/axios";
import { OrdersData, OrdersDataFull } from "@/lib/types/order";
import { resiHistories } from "@/lib/types/resi";
import * as z from "zod";

const getOrdersType = z.object({
  page: z.number().optional(),
  params: z.string().optional(),
});
type getOrdersType = z.infer<typeof getOrdersType>;

export const getTransByCode = async (code: string) => {
  const session = await auth();
  try {
    const res = await axiosAuthServer.get(
      `/orders?search_column[0]=code&search_text[0]=${code}&search_operator[0]==&search_column[1]=user_id&search_text[1]=${session?.user.id}&search_operator[1]==`
    );
    const data: OrdersData = res.data.data[0];
    const parse = OrdersData.safeParse(data);
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

export const getOrdersByUser = async ({ page, params }: getOrdersType) => {
  const session = await auth();
  const id = session?.user.id;
  try {
    const res = await axiosAuthServer.get(
      `/orders?page=${page}&per_page=5&search_column[0]=user_id&search_text[0]=${id}&search_operator[0]==${params}`
    );
    const data: OrdersDataFull = res.data;
    const parse = OrdersDataFull.safeParse(data);
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

export const getResiHistory = async ({
  resi,
  courier,
}: {
  resi: string;
  courier: string;
}) => {
  try {
    const user = await auth();
    const user_id = user?.user.id;
    console.log(user_id, resi, courier);
    const res = await axiosAuthServer.post("/binderbyte/tracking-receipts", {
      resi,
      courier,
      user_id,
    });
    const datas: resiHistories = res.data.data.history;
    const parseData = resiHistories.parse(datas);
    return parseData;
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
};
