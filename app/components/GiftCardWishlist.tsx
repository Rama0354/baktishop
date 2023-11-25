import Image from "next/image";
import React from "react";
import GiftRating from "./GiftRating";
import Link from "next/link";
import { WishlistData } from "../lib/types/giftwishlist";
import WishBtn from "./gifts/WishBtn";

const GiftCardWishlist = ({ wish }: { wish: WishlistData }) => {
  const priceText = wish.item_gifts.fitem_gift_point.split(" ~ ");
  const images = wish.item_gifts.item_gift_images.map((image) => image);
  return (
    <div className="relative group">
      <div className="w-full flex flex-col justify-start gap-3 px-3 py-6 border-2 bg-white border-primary-light hover:border-secondary-light rounded-md sm:rounded-lg hover:shadow-md">
        {/* content */}
        <div className="flex items-center justify-center w-full h-40 overflow-hidden">
          <Image
            src={
              images[0] !== undefined
                ? images[0].item_gift_image_url
                : "/assets/img/no-image.jpg"
            }
            blurDataURL={
              images[0] !== undefined
                ? images[0].item_gift_image_thumbnail_url
                : "/assets/img/no-image.jpg"
            }
            placeholder="blur"
            width={160}
            height={160}
            className="object-contain h-full w-auto"
            alt="product"
          />
        </div>
        <Link href={`/${wish.item_gifts.item_gift_slug}`} scroll={false}>
          <p className="font-semibold text-sm md:text-base line-clamp-1">
            {wish.item_gifts.item_gift_name}
          </p>
        </Link>
        <div className="flex items-start gap-1">
          <div className="w-3/4 flex flex-col justify-between px-1">
            <div className="w-full h-12 ">
              {priceText &&
                priceText.map((price) => (
                  <p
                    key={price}
                    className="text-xs md:text-base font-semibold text-amber-600 whitespace-nowrap"
                  >
                    {price}
                  </p>
                ))}
            </div>
            <div className="w-full items-center flex justify-between gap-1 px-3">
              <GiftRating
                stars={wish.item_gifts.total_rating}
                reviews={0}
                scale={20}
              />
              <div className="w-full">
                <p className="text-xs text-slate-400">
                  ({wish.item_gifts.total_reviews})
                </p>
              </div>
            </div>
          </div>
          <button className="w-1/4">
            <WishBtn giftId={wish.item_gifts.id} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default GiftCardWishlist;
