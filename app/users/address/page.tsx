import { options } from "@/app/api/auth/[...nextauth]/options";
import AddressClient from "@/app/components/client/AddressClient";
import axios from "axios";
import { getServerSession } from "next-auth";
import React from "react";

async function getAddresses({ page }: { page: number }) {
  const session = await getServerSession(options);
  const res = await axios
    .get(`${process.env.BACKEND_API}/address?page=${page}&per_page=3`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session?.accessToken}`,
      },
    })
    .then((res) => res.data)
    .catch((err) => err.message);
  return res;
}

export default async function AddressPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const searchPage = searchParams.page;
  const addressData = await getAddresses({
    page: searchPage ? parseInt(searchPage as string) : 1,
  });
  return <AddressClient address={addressData} />;
}
