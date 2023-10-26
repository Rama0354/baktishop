import React from "react";
import AppBar from "../AppBar";
import Footer from "../Footer";
import Link from "next/link";
import { Toaster } from "react-hot-toast";
import {
  AiOutlineHome,
  AiOutlineMessage,
  AiOutlineShoppingCart,
  AiOutlineUser,
} from "react-icons/ai";
import NextProgressbar from "../NextProgressbar";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AppBar />
      {/* <NextProgressbar /> */}
      <main className="w-full min-h-screen flex flex-col items-center mx-auto bg-white">
        {children}
      </main>
      <div className="md:hidden w-full py-2 px-3 border border-slate-200 flex justify-around bg-white fixed bottom-0">
        <Link
          href={"/"}
          className="w-full py-1 px-2 flex flex-col items-center cursor-pointer hover:bg-purple-100 font-medium text-sm hover:text-purple-500 rounded-md"
        >
          <AiOutlineHome className={"stroke-2 w-6 h-6"} /> Beranada
        </Link>
        <Link
          href={"/message"}
          className="w-full py-1 px-2 flex flex-col items-center cursor-pointer hover:bg-purple-100 font-medium text-sm hover:text-purple-500 rounded-md"
        >
          <AiOutlineMessage className={"stroke-2 w-6 h-6"} /> Pesan
        </Link>
        <Link
          href={"/cart"}
          className="w-full py-1 px-2 flex flex-col items-center cursor-pointer hover:bg-purple-100 font-medium text-sm hover:text-purple-500 rounded-md"
        >
          <AiOutlineShoppingCart className={"stroke-2 w-6 h-6"} /> Keranjang
        </Link>
        <Link
          href={"/account"}
          className="w-full py-1 px-2 flex flex-col items-center cursor-pointer hover:bg-purple-100 font-medium text-sm hover:text-purple-500 rounded-md"
        >
          <AiOutlineUser className={"stroke-2 w-6 h-6"} /> Akun
        </Link>
      </div>
      <Toaster position="top-center" />
      <Footer />
    </>
  );
}
