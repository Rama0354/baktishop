"use client";
import { getCart } from "@/lib/redux/slice/cartSlice";
import { deleteCart } from "@/lib/utils/action/Cartactions";
import React, { useTransition } from "react";
import { MdDeleteOutline } from "react-icons/md";
import { useDispatch } from "react-redux";

export default function DeleteBtnCart({ cartid }: { cartid: string }) {
  const [isPending, startTransition] = useTransition();
  const dispatch = useDispatch();

  return (
    <button
      disabled={isPending}
      onClick={async () => {
        startTransition(
          async () => await deleteCart(cartid).then(dispatch(getCart() as any))
        );
      }}
      className="text-rose-500 disabled:text-rose-300 py-2 px-3 flex gap-1 items-center bg-rose-100 sm:bg-white hover:bg-rose-100 rounded-md"
    >
      <MdDeleteOutline className={"w-6 h-6"} />
      <p className="hidden sm:block font-medium text-sm">Hapus</p>
    </button>
  );
}
