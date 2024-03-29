"use server";

import { options } from "@/app/api/auth/[...nextauth]/options";
import { axiosAuthServer } from "@/lib/axios";
import { resiHistories } from "@/lib/types/resi";
import { getServerSession } from "next-auth";

export const getResiHistory = async ({
  resi,
  courier,
}: {
  resi: string;
  courier: string;
}) => {
  try {
    const user = await getServerSession(options);
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
    console.log(error.response.data);
  }
};
