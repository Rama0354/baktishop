"use client";
import Image from "next/image";
import * as React from "react";
import GiftRating from "../GiftRating";
import Link from "next/link";
import WishBtn from "./WishBtn";
import { GiftCardType } from "@/lib/types/gifts";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

const GiftCard = ({ gift }: { gift: GiftCardType }) => {
  const priceText = gift.fitem_gift_point.split(" ~ ");
  const images = gift.item_gift_images.map((image) => image);
  return (
    <Card className="max-w-[350px] hover:shadow-md">
      <CardContent className="w-full">
        <Link href={gift.item_gift_slug}>
          <div className="flex items-center justify-center rounded-md w-full h-40 overflow-hidden py-2 my-3">
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
              width={6400}
              height={360}
              className="object-cover w-full h-auto"
              alt="product"
            />
          </div>
          <p className="font-semibold text-sm md:text-base line-clamp-1">
            {gift.item_gift_name}
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
            <GiftRating stars={gift.total_rating} reviews={0} scale={20} />
            <div className="w-full">
              <p className="text-xs ">({gift.total_reviews})</p>
            </div>
          </div>
        </div>
        <button>
          <WishBtn giftId={gift.id} is_wishlist={gift.is_wishlist} />
        </button>
      </CardFooter>
    </Card>
  );
};

export default GiftCard;
