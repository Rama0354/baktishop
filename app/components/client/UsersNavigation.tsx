"use client";
import { accountnavigations } from "@/app/constant/accountPage";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export default function UsersNavigation() {
  const pathname = usePathname();
  return (
    <ul className={"w-full py-2 flex sm:flex-col border-t border-l-slate-100"}>
      {accountnavigations.map((nav, idx) => (
        <li
          key={idx}
          id={nav.name}
          className={"w-full text-center sm:text-left"}
        >
          <Link
            href={nav.urls}
            className={`${
              pathname === nav.urls
                ? "bg-purple-500 text-white hover:bg-purple-600 hover:text-white"
                : "bg-white text-slate-700"
            } hover:bg-purple-100 hover:text-purple-500 block w-full py-2 px-3 font-medium rounded-md outline-none`}
          >
            {nav.title}
          </Link>
        </li>
      ))}
    </ul>
  );
}
