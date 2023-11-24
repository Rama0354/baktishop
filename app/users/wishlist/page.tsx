import GiftCardWishlist from "@/app/components/GiftCardWishlist";
import { getAllWishlist } from "@/app/utils/action/WishlistActions";
import React from "react";
import { AiOutlineHeart } from "react-icons/ai";

export default async function WishlistPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const searchPage = searchParams.page;
  const wishlistData = await getAllWishlist();
  return (
    <section className="w-full pb-6">
      <div className="w-full flex gap-3 items-center py-3 px-6 mb-3 border-b border-slate-200">
        <AiOutlineHeart className={"text-slate-700 stroke-2 w-6 h-6"} />
        <h2 className="font-semibold text-lg text-slate-700">Barang Favorit</h2>
      </div>
      {wishlistData && !wishlistData.data.error ? (
        <div className="relative overflow-x-auto grid grid-cols-2 sm:grid-cols-4 gap-3">
          {wishlistData.data.data.map((wish: any, idx: number) => (
            <GiftCardWishlist key={idx} wish={wish} />
          ))}
        </div>
      ) : (
        <div>Anda Belum mempunyai Produk Favorit</div>
      )}
    </section>
  );
}
