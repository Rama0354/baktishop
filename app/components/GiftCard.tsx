import Image from "next/image";
import React from "react";
import WishButton from "./WishButton";
import GiftRating from "./GiftRating";
import { Gifts } from "../types/gifts";
import Link from "next/link";
import { useRouter } from "next/navigation";

const GiftCard = ({ gift }: { gift: Gifts }) => {
  const router = useRouter();
  const priceText = gift.fitem_gift_point.split(" ~ ");
  const images = gift.item_gift_images.map((image) => image);
  const handleClicked = () => {
    router.push(gift.item_gift_slug);
    router.refresh();
  };
  return (
    <div className="relative group">
      <div className="w-full flex flex-col justify-start gap-3 px-3 py-6 border-2 bg-white border-purple-300 hover:border-purple-500 rounded-md sm:rounded-lg hover:shadow-md">
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
                ? images[0].item_gift_image_thumb_url
                : "/assets/img/no-image.jpg"
            }
            placeholder="blur"
            width={160}
            height={160}
            className="object-contain h-full w-auto"
            alt="product"
          />
        </div>
        <div onClick={handleClicked} className=" cursor-pointer">
          <p className="font-semibold text-sm md:text-base line-clamp-2">
            {gift.item_gift_name}
          </p>
        </div>
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
              <GiftRating stars={gift.total_rating} reviews={0} scale={20} />
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
