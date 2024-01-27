import Image from "next/image";
import React from "react";
import GiftRating from "../GiftRating";
import Link from "next/link";
import { WishlistData } from "@/lib/types/giftwishlist";
import WishBtn from "./WishBtn";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

const GiftCardWishlist = ({ wish }: { wish: WishlistData }) => {
  const priceText = wish.item_gifts.fitem_gift_point.split(" ~ ");
  const images = wish.item_gifts.item_gift_images.map((image) => image);
  return (
    <Card className="max-w-[350px] hover:shadow-md">
      <CardContent className="w-full">
        <Link href={`/${wish.item_gifts.item_gift_slug}`}>
          <div className="flex items-center justify-center w-full h-40 overflow-hidden py-2">
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
          <p className="font-semibold text-sm md:text-base line-clamp-1 py-2">
            {wish.item_gifts.item_gift_name}
          </p>
        </Link>
      </CardContent>
      <CardFooter className="flex w-full justify-between">
        <div className="flex flex-col px-1">
          <div className="w-full">
            {priceText &&
              priceText.map((price) => (
                <p
                  key={price}
                  className="text-xs md:text-sm font-bold whitespace-nowrap"
                >
                  {price}
                </p>
              ))}
          </div>
          <div className="w-full items-center flex">
            <GiftRating
              stars={wish.item_gifts.total_rating}
              reviews={0}
              scale={20}
            />
            <div className="w-full">
              <p className="text-xs ">({wish.item_gifts.total_reviews})</p>
            </div>
          </div>
        </div>
        <button>
          <WishBtn giftId={wish.item_gifts.id} is_wishlist={1} />
        </button>
      </CardFooter>
    </Card>
  );
};

export default GiftCardWishlist;
