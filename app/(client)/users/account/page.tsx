import { auth } from "@/lib/auth";
import AccountClient from "@/components/users/account/AccountClient";
import axios from "axios";
import React from "react";

async function getUserData() {
  const session = await auth();
  const res = await axios
    .get(`${process.env.BACKEND_API}/users/${session?.user.id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session?.access_token}`,
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
