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
    if (error.response) {
      console.log(
        `API Get Expedition request failed: ${error.response.status} - ${error.response.data.message}`
      );
      return error.response.data;
    } else if (error.request) {
      console.log(`API request failed: No response received`);
    } else {
      console.log(`Unexpected error: ${error.message}`);
    }
  }
}
