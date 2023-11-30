"use client";
import React from "react";
import Link from "next/link";
import { AiOutlineHome, AiOutlineMessage, AiOutlineUser } from "react-icons/ai";
import { usePathname } from "next/navigation";

export default function MobileNavigation() {
  const pathname = usePathname();
  return (
    <div className="md:hidden w-full py-2 px-3 border border-slate-200 flex justify-around bg-white sticky bottom-0 z-50">
      <Link
        href={"/"}
        className={`w-full py-1 px-2 flex flex-col items-center cursor-pointer font-medium text-sm rounded-md 
        ${
          pathname === "/"
            ? "bg-primary-dark text-white hover:bg-secondary-dark"
            : "bg-white text-primary-dark hover:bg-primary-light hover:text-primary-dark"
        }`}
      >
        <AiOutlineHome className={"stroke-2 w-6 h-6"} /> Beranada
      </Link>
      <Link
        href={"/message"}
        className={`w-full py-1 px-2 flex flex-col items-center cursor-pointer font-medium text-sm rounded-md ${
          pathname === "/message"
            ? "bg-primary-dark text-white hover:bg-secondary-dark"
            : "bg-white text-primary-dark hover:bg-primary-light hover:text-primary-dark"
        }`}
      >
        <AiOutlineMessage className={"stroke-2 w-6 h-6"} /> Pesan
      </Link>
      <Link
        href={"/users"}
        className={`w-full py-1 px-2 flex flex-col items-center cursor-pointer font-medium text-sm rounded-md ${
          pathname === "/users"
            ? "bg-primary-dark text-white hover:bg-secondary-dark"
            : "bg-white text-primary-dark hover:bg-primary-light hover:text-primary-dark"
        }`}
      >
        <AiOutlineUser className={"stroke-2 w-6 h-6"} /> Akun Saya
      </Link>
    </div>
  );
}
