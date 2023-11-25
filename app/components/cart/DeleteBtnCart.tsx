"use client";
import { deleteCart } from "@/app/lib/utils/action/Cartactions";
import React, { useTransition } from "react";
import { MdDeleteOutline } from "react-icons/md";

export default function DeleteBtnCart({ cartid }: { cartid: string }) {
  const [isPending, startTransition] = useTransition();

  return (
    <button
      disabled={isPending}
      onClick={async () => {
        startTransition(async () => await deleteCart(cartid));
      }}
      className="text-rose-500 disabled:text-rose-300 py-2 px-3 flex gap-1 items-center bg-rose-100 sm:bg-white hover:bg-rose-100 rounded-md"
    >
      <MdDeleteOutline className={"w-6 h-6"} />
      <p className="hidden sm:block font-medium text-sm">Hapus</p>
    </button>
  );
}
