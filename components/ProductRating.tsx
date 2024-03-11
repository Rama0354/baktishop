"use client";
import Image from "next/image";

interface ProductRating {
  stars: number;
  reviews: number;
  scale?: number;
}

const ProductRating = ({ stars, reviews, scale }: ProductRating) => {
  const ratingStar = Array.from({ length: 5 }, (element, index) => {
    let number = index + 0.5;
    return (
      <span key={index}>
        {stars >= index + 1 ? (
          <Image
            src={"/assets/img/star100.svg"}
            alt={"rating"}
            width={scale ? scale : 20}
            height={scale ? scale : 20}
          />
        ) : stars >= number ? (
          <Image
            src={"/assets/img/star50.svg"}
            alt={"rating"}
            width={scale ? scale : 20}
            height={scale ? scale : 20}
          />
        ) : (
          <Image
            src={"/assets/img/star0.svg"}
            alt={"rating"}
            width={scale ? scale : 20}
            height={scale ? scale : 20}
          />
        )}
      </span>
    );
  });

  return <div className="flex gap-1">{ratingStar}</div>;
};
export default ProductRating;
