"use client";
import Image from "next/image";
import { useState } from "react";

interface GiftRating {
  stars: number;
  reviews: number;
  scale?: number;
}

const GiftRating = ({ stars, reviews, scale }: GiftRating) => {
  const ratingStar = Array.from({ length: 5 }, (element, index) => {
    let number = index + 0.5;
    return (
      <span key={index}>
        {stars >= index + 1 ? (
          <Image
            src={"/assets/img/star100.svg"}
            alt={"rating"}
            width={20}
            height={20}
            className={`w-8 h-8 object-contain ${
              scale ? "scale-" + scale : ""
            }`}
          />
        ) : stars >= number ? (
          <Image
            src={"/assets/img/star50.svg"}
            alt={"rating"}
            width={20}
            height={20}
            className={`w-8 h-8 object-contain ${
              scale ? "scale-" + scale : ""
            }`}
          />
        ) : (
          <Image
            src={"/assets/img/star0.svg"}
            alt={"rating"}
            width={20}
            height={20}
            className={`w-8 h-8 object-contain ${
              scale ? "scale-" + scale : ""
            }`}
          />
        )}
      </span>
    );
  });

  return <div className="flex gap-1">{ratingStar}</div>;
};
export default GiftRating;
