import GiftCardWishlist from "@/components/gifts/GiftCardWishlist";
import { getAllWishlist } from "@/lib/utils/action/WishlistActions";
import Image from "next/image";
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
    <section className="w-full h-screen">
      <div className="w-full flex gap-3 items-center py-4 px-1 sm:px-6 mb-3 border-b-2 bg-accent">
        <AiOutlineHeart className={" stroke-2 w-6 h-6"} />
        <h2 className="font-semibold text-lg">Barang Favorit</h2>
      </div>
      <div className="p-3">
        {wishlistData && !wishlistData.data.error ? (
          <div className="relative overflow-x-auto grid grid-cols-2 sm:grid-cols-4 gap-3">
            {wishlistData.data.data.map((wish: any, idx: number) => (
              <GiftCardWishlist key={idx} wish={wish} />
            ))}
          </div>
        ) : (
          <div className="w-full flex justify-center">
            <Image
              src={"/assets/img/not-found-favorite.png"}
              width={300}
              height={300}
              className="sm:w-80"
              alt="product-not-found"
            />
          </div>
        )}
      </div>
    </section>
  );
}
