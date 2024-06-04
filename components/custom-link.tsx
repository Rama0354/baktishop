"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export default function CustomLink({
  children,
  href,
  ...props
}: {
  children: React.ReactNode;
  href: string;
  [key: string]: any;
}) {
  const pathname = usePathname();
  return (
    <Link
      href={href}
      {...props}
      className={cn(
        "w-full py-1 px-2 flex flex-col items-center cursor-pointer font-medium text-sm rounded-md transition-all duration-300",
        {
          "text-white bg-primary hover:bg-primary/75": pathname === href,
        }
      )}
    >
      {children}
    </Link>
  );
}
