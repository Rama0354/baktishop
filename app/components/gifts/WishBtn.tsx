"use client";
import { changeWishlist } from "@/app/utils/action/WishlistActions";
import Image from "next/image";
import React, { useOptimistic, useState, useTransition } from "react";

export default function WishBtn({ giftId }: { giftId: number }) {
  const [isPending, startTransition] = useTransition();
  return (
    <div className="relative">
      <input
        className="invisible absolute"
        type="checkbox"
        checked={true}
        disabled={isPending}
        onChange={async () => {
          startTransition(async () => await changeWishlist(giftId));
        }}
      />
      <Image
        src={`/assets/img/onlike.svg`}
        alt="favorite"
        width={54}
        height={32}
        onClick={async () => {
          startTransition(async () => await changeWishlist(giftId));
        }}
        className={`object-contain hover:cursor-pointer ${
          isPending && "opacity-70 pointer-events-none"
        }`}
      />
    </div>
  );
}
