import { options } from "@/app/api/auth/[...nextauth]/options";
import AddressClient from "@/app/components/client/AddressClient";
import { FullAddressArray } from "@/app/types/address";
import axios from "axios";
import { getServerSession } from "next-auth";
import React from "react";
import { z } from "zod";

async function getAddresses(): Promise<FullAddressArray | undefined> {
  const session = await getServerSession(options);
  try {
    const res = await axios.get(`${process.env.BACKEND_API}/address`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session?.accessToken}`,
      },
    });
    const datas: FullAddressArray = await res.data.data;
    const parseData = FullAddressArray.parse(datas);
    return parseData;
  } catch (error) {
    console.log(error);
  }
}

export default async function AddressPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const searchPage = searchParams.page;
  const addressData = await getAddresses();
  return <AddressClient address={addressData} />;
}
