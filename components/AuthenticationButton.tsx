"use client";
import { signIn, signOut } from "next-auth/react";
import React from "react";
import { AiOutlineUser } from "react-icons/ai";
import toast from "react-hot-toast";
import { MdLogout } from "react-icons/md";

import { LogoutAction } from "@/lib/utils/action/AuthActions";
import { Button } from "@/components/ui/button";

export default function AuthenticationButton({ type }: { type: string }) {
  const handleLogout = async () => {
    return LogoutAction()
      .then(() => signOut({ callbackUrl: "/login" }))
      .catch(() => toast.error("ada masalah 🙁"));
  };
  return type === "logout" ? (
    <Button
      variant={"ghost"}
      size={"sm"}
      className="flex gap-1 hover:text-destructive dark:hover:text-white dark:hover:font-bold"
      onClick={handleLogout}
    >
      <MdLogout className="w-3 h-3" />
      <span className="hidden sm:block">Log Out</span>
    </Button>
  ) : (
    <button
      onClick={() => signIn()}
      aria-label="user button navigation to login"
      className="p-2 object-contain hover:bg-primary/50 transition duration-300 ease-in-out rounded-full"
    >
      <AiOutlineUser className="text-white stroke-2 w-6 h-6" />
    </button>
  );
}
