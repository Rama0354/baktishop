"use server";

import { ExpeditionArray, FormGetExpedition } from "@/lib/types/expedition";
import { axiosAuthServer } from "@/lib/axios";

export async function getCostsExpedition(
  data: FormGetExpedition
): Promise<ExpeditionArray | undefined> {
  try {
    console.log(data);
    const res = await axiosAuthServer.post(`/rajaongkir/checking-costs`, {
      origin_city: 133,
      destination_city: data.destination_city,
      weight: data.weight,
      courier: data.courier,
    });
    const datas: ExpeditionArray = await res.data.data;
    const parseData = ExpeditionArray.parse(datas);
    return parseData;
  } catch (error: any) {
    if (error.response !== undefined) {
      error.response.data;
    }
  }
}
