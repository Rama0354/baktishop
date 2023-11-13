"use client";
import axios from "axios";
import { signIn, signOut } from "next-auth/react";
import React from "react";
import { AiOutlineUser } from "react-icons/ai";

export default function AuthenticationhButton({ type }: { type: string }) {
  const handleLogout = async () => {
    const res = await axios.post("/api/logout").then((res) => {
      signOut({ callbackUrl: "/login" });
    });
    return res;
  };
  return type === "logout" ? (
    <button
      onClick={handleLogout}
      className="text-rose-500 font-medium py-1 px-2 rounded-md hover:bg-rose-200"
    >
      Log Out
    </button>
  ) : (
    <button
      onClick={() => signIn()}
      className="p-2 object-contain hover:bg-purple-100/50 transition duration-300 ease-in-out rounded-full"
    >
      <AiOutlineUser className="text-white stroke-2 w-6 h-6" />
    </button>
  );
}
