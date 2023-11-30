"use client";
import { usePathname } from "next/navigation";
import React from "react";
import { MdFilterAlt } from "react-icons/md";

export default function MobileFilter() {
  const pathname = usePathname();
  return (
    <div className={`sm:hidden ${pathname !== "/search" ? "hidden" : "block"}`}>
      <button
        aria-label="filter-pencarian"
        className="p-2 hover:bg-purple-100/50 transition duration-300 ease-in-out rounded-full"
      >
        <MdFilterAlt className="text-white w-6 h-6" />
      </button>
    </div>
  );
}
