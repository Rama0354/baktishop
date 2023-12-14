import { options } from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import React from "react";
import EmailNotification from "./EmailNotification";

export default async function EmailVerifNotifContainer() {
  const session = await getServerSession(options);
  return session && session.verifed === "unverifed" ? (
    <EmailNotification />
  ) : null;
}
