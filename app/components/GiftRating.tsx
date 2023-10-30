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
            className={`object-contain ${
              scale ? "w-" + 3 * scale + " h-" + 3 * scale : "w-3 h-3"
            }`}
          />
        ) : stars >= number ? (
          <Image
            src={"/assets/img/star50.svg"}
            alt={"rating"}
            width={20}
            height={20}
            className={`object-contain ${
              scale ? "w-" + 3 * scale + " h-" + 3 * scale : "w-3 h-3"
            }`}
          />
        ) : (
          <Image
            src={"/assets/img/star0.svg"}
            alt={"rating"}
            width={20}
            height={20}
            className={`object-contain ${
              scale ? "w-" + 3 * scale + " h-" + 3 * scale : "w-3 h-3"
            }`}
          />
        )}
      </span>
    );
  });

  return <div className="flex gap-1">{ratingStar}</div>;
};
export default GiftRating;
