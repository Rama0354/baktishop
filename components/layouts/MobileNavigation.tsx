"use client";
import React from "react";
import Link from "next/link";
import { AiOutlineHome, AiOutlineMessage, AiOutlineUser } from "react-icons/ai";
import { usePathname } from "next/navigation";
import { MdNotifications } from "react-icons/md";

export default function MobileNavigation() {
  const pathname = usePathname();
  return (
    <div className="md:hidden w-full py-2 px-3 border flex justify-around bg-background sticky bottom-0 z-50">
      <Link
        href={"/"}
        className={`w-full py-1 px-2 flex flex-col items-center cursor-pointer font-medium text-sm rounded-md transition-all duration-300
        ${
          pathname === "/"
            ? "text-white bg-primary hover:bg-primary/75"
            : "text-primary bg-background hover:bg-primary/25"
        }`}
      >
        <AiOutlineHome className={"stroke-2 w-6 h-6"} /> Beranada
      </Link>
      <Link
        href={"/notifications"}
        className={`w-full py-1 px-2 flex flex-col items-center cursor-pointer font-medium text-sm rounded-md transition-all duration-300
        ${
          pathname === "/notifications"
            ? "text-white bg-primary hover:bg-primary/75"
            : "text-primary bg-background hover:bg-primary/25"
        }`}
      >
        <MdNotifications className={"w-6 h-6"} /> Notifikasi
      </Link>
      <Link
        href={"/users"}
        className={`w-full py-1 px-2 flex flex-col items-center cursor-pointer font-medium text-sm rounded-md transition-all duration-300
         ${
           pathname.startsWith("/users")
             ? "text-white bg-primary hover:bg-primary/75"
             : "text-primary bg-background hover:bg-primary/25"
         }`}
      >
        <AiOutlineUser className={"stroke-2 w-6 h-6"} /> Akun Saya
      </Link>
    </div>
  );
}
