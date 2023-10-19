import Image from "next/image";
import React from "react";
import WishButton from "./WishButton";
import GiftRating from "./GiftRating";
import { Gifts } from "../types/gifts";
import Link from "next/link";

const GiftCard = ({ gift }: { gift: Gifts }) => {
  const priceText = gift.fitem_gift_point.split(" ~ ");
  const images = gift.item_gift_images.map(
    (image) => image.item_gift_image_url
  );
  return (
    <div className="relative group">
      <div className="w-full flex flex-col justify-start gap-3 px-3 py-6 border bg-white hover:border-purple-500 border-slate-200 rounded-md shadow-md">
        {/* content */}
        <div className="absolute top-0 right-0">
          <Image
            src={"/assets/img/labelnew.svg"}
            width={96}
            height={79}
            alt="label"
            className="right-0 invisible"
          />
        </div>
        <Image
          src={images[0] !== undefined ? images[0] : "/assets/img/no-image.jpg"}
          alt="product"
          width={250}
          height={250}
          className="w-full h-36 object-contain"
        />
        <Link href={`${gift.item_gift_slug}`}>
          <p className="font-semibold text-sm md:text-base line-clamp-2">
            {gift.item_gift_name}
          </p>
        </Link>
        <div className="flex items-start gap-1">
          <div className="w-3/4 flex flex-col justify-between px-1 lg:px-3">
            <div className="w-full h-8 ">
              {priceText.map((price) => (
                <p
                  key={price}
                  className="text-xs md:text-sm font-medium text-amber-600 whitespace-nowrap"
                >
                  {price}
                </p>
              ))}
            </div>
            <div className="w-full items-center flex justify-between gap-1">
              <GiftRating stars={gift.total_rating} reviews={0} />
              <div className="w-full">
                <p className="text-xs text-slate-400">({gift.total_reviews})</p>
              </div>
            </div>
          </div>
          <button className="w-1/4">
            <WishButton id={gift.id} isWishlist={gift.is_wishlist} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default GiftCard;
