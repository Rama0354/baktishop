"use client";
import { changeWishlist } from "@/lib/utils/action/WishlistActions";
import Image from "next/image";
import React, { useOptimistic, useTransition } from "react";
import toast from "react-hot-toast";

export default function WishBtn({
  productId,
  is_wishlist,
}: {
  productId: number;
  is_wishlist: number;
}) {
  const [isPending, startTransition] = useTransition();
  const [optimisticWish, setOptimisticWish] = useOptimistic(
    { is_wishlist, sending: false },
    (state, newWish) => ({
      ...state,
      is_wishlist: newWish as number,
      sending: true,
    })
  );
  return (
    <div className="relative">
      <input
        className="invisible absolute"
        type="checkbox"
        disabled={isPending}
      />
      <Image
        src={`/assets/img/${
          isPending
            ? optimisticWish.is_wishlist === 1
              ? "onlike"
              : "offlike"
            : is_wishlist === 1
            ? "onlike"
            : "offlike"
        }.svg`}
        alt="favorite"
        width={54}
        height={32}
        onClick={async () => {
          if (is_wishlist === 1) {
            startTransition(() =>
              setOptimisticWish((optimisticWish.is_wishlist = 0))
            );
            await changeWishlist(productId)
              .then((res) => toast.success(res.message))
              .catch((err) => {
                console.log(err);
                toast.error("ada masalah");
              });
          } else {
            startTransition(() =>
              setOptimisticWish((optimisticWish.is_wishlist = 1))
            );
            await changeWishlist(productId)
              .then((res) => toast.success(res.message))
              .catch((err) => {
                console.log(err);
                toast.error("ada masalah");
              });
          }
        }}
        className={`object-contain hover:cursor-pointer ${
          isPending && "pointer-events-none"
        }`}
      />
    </div>
  );
}
