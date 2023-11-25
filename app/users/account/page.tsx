import { options } from "@/app/api/auth/[...nextauth]/options";
import AccountClient from "@/app/components/users/AccountClient";
import axios from "axios";
import { getServerSession } from "next-auth";
import React from "react";

async function getUserData() {
  const session = await getServerSession(options);
  const res = await axios
    .get(`${process.env.BACKEND_API}/users/${session?.user.id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session?.accessToken}`,
      },
    })
    .then((res) => res.data)
    .catch((err) => err.message);
  return res;
}

export default async function AccountPage() {
  const userData = await getUserData();
  return <AccountClient userData={userData.data} />;
}
