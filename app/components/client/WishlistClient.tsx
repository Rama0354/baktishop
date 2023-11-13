import { WishlistData } from "@/app/types/giftwishlist";
import React from "react";
import { AiOutlineHeart } from "react-icons/ai";
import GiftCardWishlist from "../GiftCardWishlist";

type wishlistClientProps = {
  wishlist: {
    data: WishlistData[];
  };
};

export default function WishlistClient({ wishlist }: wishlistClientProps) {
  return (
    <section className="w-full pb-6">
      <div className="w-full flex gap-3 items-center py-3 px-6 mb-3 border-b border-slate-200">
        <AiOutlineHeart className={"text-slate-700 stroke-2 w-6 h-6"} />
        <h2 className="font-semibold text-lg text-slate-700">Barang Favorit</h2>
      </div>
      <div className="relative overflow-x-auto grid grid-cols-2 sm:grid-cols-4 gap-3">
        {wishlist && wishlist.data.length !== 0
          ? wishlist.data.map((wish, idx: number) => (
              <GiftCardWishlist key={idx} wish={wish} />
            ))
          : null}
      </div>
    </section>
  );
}
