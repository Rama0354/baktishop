"use client";
import React, { useTransition } from "react";
import { MdDeleteOutline } from "react-icons/md";
import { useDispatch } from "react-redux";

import { Button } from "@/components/ui/button";
import { getCart } from "@/lib/redux/slice/cartSlice";
import { deleteCart } from "@/lib/utils/action/CartsActions";

export default function DeleteBtnCart({ cartid }: { cartid: string }) {
  const [isPending, startTransition] = useTransition();
  const dispatch = useDispatch();

  return (
    <Button
      variant={"destructive"}
      disabled={isPending}
      onClick={async () => {
        startTransition(
          async () => await deleteCart(cartid).then(dispatch(getCart() as any))
        );
      }}
    >
      <MdDeleteOutline className={"w-6 h-6"} />
      <p className="hidden sm:block font-medium text-sm">Hapus</p>
    </Button>
  );
}
