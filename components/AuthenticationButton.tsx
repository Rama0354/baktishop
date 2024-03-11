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
    await LogoutAction()
      .then((res: any) => {
        console.log(res);
        if (res && res.status_code === 200) {
          signOut({ callbackUrl: "/login" });
        } else {
          toast.error(res.message);
        }
      })
      .catch(() => toast.error("ada masalah 🙁"));
  };
  return type === "logout" ? (
    <Button
      variant={"ghost"}
      size={"icon"}
      className="w-full flex gap-1 hover:text-destructive dark:hover:text-white dark:hover:font-bold hover:bg-destructive/25 dark:hover:bg-destructive sm:hover:bg-secondary"
      onClick={handleLogout}
    >
      <MdLogout />
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
