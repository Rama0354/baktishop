import { WishlistData } from "@/app/lib/types/giftwishlist";
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
    <section className="w-full h-screen bg-slate-200/50">
      <div className="w-full flex gap-3 items-center py-3 px-6 mb-3 border-b-2 border-slate-300 bg-white">
        <AiOutlineHeart className={"text-slate-700 stroke-2 w-6 h-6"} />
        <h2 className="font-semibold text-lg text-slate-700">Barang Favorit</h2>
      </div>
      <div className="relative overflow-x-auto grid grid-cols-2 sm:grid-cols-4 gap-3">
        {wishlist && wishlist.data.length !== 0 ? (
          wishlist.data.map((wish, idx: number) => (
            <GiftCardWishlist key={idx} wish={wish} />
          ))
        ) : (
          <div>Anda Belum mempunyai Produk Favorit</div>
        )}
      </div>
    </section>
  );
}
