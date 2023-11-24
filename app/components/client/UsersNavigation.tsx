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
                ? "bg-primary-dark text-white hover:text-white"
                : "bg-white text-primary-dark hover:bg-primary-light hover:text-primary-dark"
            }  block w-full py-2 px-3 font-medium rounded-md outline-none`}
          >
            {nav.title}
          </Link>
        </li>
      ))}
    </ul>
  );
}
