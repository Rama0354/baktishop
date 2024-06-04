import React from "react";
import { AiOutlineHome, AiOutlineUser } from "react-icons/ai";
import { MdNotifications } from "react-icons/md";
import CustomLink from "../custom-link";
import { auth } from "@/lib/auth";

export default async function MobileNavigation() {
  const session = await auth();
  return (
    <div className="md:hidden w-full py-2 px-3 border flex justify-around bg-background sticky bottom-0 z-50">
      <CustomLink href={"/"}>
        <AiOutlineHome className={"stroke-2 w-6 h-6"} /> Beranda
      </CustomLink>
      <CustomLink href={"/notifications"}>
        <MdNotifications className={"w-6 h-6"} /> Notifikasi
      </CustomLink>
      {session !== null ? (
        <CustomLink href={"/users"}>
          <AiOutlineUser className={"stroke-2 w-6 h-6"} /> Akun Saya
        </CustomLink>
      ) : (
        <CustomLink href="/login">
          <AiOutlineUser className={"stroke-2 w-6 h-6"} /> Akun Saya
        </CustomLink>
      )}
    </div>
  );
}
