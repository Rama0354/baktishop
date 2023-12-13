"use client";
import { signIn, signOut } from "next-auth/react";
import React from "react";
import { AiOutlineUser } from "react-icons/ai";
import { LogoutAction } from "../lib/utils/action/AuthActions";
import toast from "react-hot-toast";
import { MdLogout } from "react-icons/md";

export default function AuthenticationButton({ type }: { type: string }) {
  const handleLogout = async () => {
    return LogoutAction()
      .then(() => signOut({ callbackUrl: "/login" }))
      .catch(() => toast.error("ada masalah 🙁"));
  };
  return type === "logout" ? (
    <button
      onClick={handleLogout}
      aria-label="user button navigation to logout"
      className="flex gap-1 text-rose-500 font-medium py-1 px-2 rounded-md hover:bg-rose-200"
    >
      <MdLogout className="w-6 h-6" />
      <span className="hidden sm:block">Log Out</span>
    </button>
  ) : (
    <button
      onClick={() => signIn()}
      aria-label="user button navigation to login"
      className="p-2 object-contain hover:bg-purple-100/50 transition duration-300 ease-in-out rounded-full"
    >
      <AiOutlineUser className="text-white stroke-2 w-6 h-6" />
    </button>
  );
}
