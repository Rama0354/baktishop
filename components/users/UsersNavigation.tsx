"use client";
// import { accountnavigations } from "@/app/lib/constant/accountPage";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import {
  AiOutlineEnvironment,
  AiOutlineHeart,
  AiOutlineIdcard,
} from "react-icons/ai";
import { MdOutlineFactCheck } from "react-icons/md";

export default function UsersNavigation() {
  const pathname = usePathname();
  const accountnavigations = [
    {
      id: 1,
      name: "dashboard",
      title: "Dashboard",
      urls: "/users",
      icon: <MdOutlineFactCheck className="w-6 h-6" />,
    },
    {
      id: 2,
      name: "favorit",
      title: "Wishlist",
      urls: "/users/wishlist",
      icon: <AiOutlineHeart className="w-6 h-6" />,
    },
    {
      id: 3,
      name: "alamat",
      title: "Alamat",
      urls: "/users/address",
      icon: <AiOutlineEnvironment className="w-6 h-6" />,
    },
    {
      id: 4,
      name: "akun",
      title: "Akun",
      urls: "/users/account",
      icon: <AiOutlineIdcard className="w-6 h-6" />,
    },
  ];
  return (
    <ul className={"w-full py-2 border-t"}>
      {accountnavigations.map((nav, idx) => (
        <li
          key={idx}
          id={nav.name}
          className={`${
            pathname === nav.urls
              ? "bg-primary text-white hover:text-white"
              : "text-primary bg-secondary hover:dark:text-white hover:text-primary hover:bg-primary/25"
          } w-full py-2 px-3 font-medium rounded-md outline-none`}
        >
          <Link href={nav.urls} className={`w-full h-full flex gap-1 `}>
            {nav.icon}
            <span className="hidden sm:block">{nav.title}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
