import Image from "next/image";
import * as React from "react";
import ProductRating from "../ProductRating";
import Link from "next/link";
import WishBtn from "./WishBtn";
import { ProductCardType } from "@/lib/types/product";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { auth } from "@/lib/auth";

const ProductCard = async ({ product }: { product: ProductCardType }) => {
  const priceText = product.fpoint.split(" ~ ");
  const images = product.product_images.map((image) => image);
  const session = await auth();
  return (
    <Card>
      <div className="max-w-[350px] relative">
        <CardContent>
          <button className="absolute top-0 right-3 shrink-0 w-9 sm:w-12 rounded-full bg-secondary">
            {session !== null ? (
              <WishBtn
                productId={product.id}
                is_wishlist={product.is_wishlist}
              />
            ) : (
              <div className="relative">
                <Link type="checkbox" href={"/login"}>
                  <Image
                    src={`/assets/img/offlike.svg`}
                    alt="favorite"
                    width={54}
                    height={32}
                    className={`object-contain hover:cursor-pointer`}
                  />
                </Link>
              </div>
            )}
          </button>
          <Link href={`/${product.slug}`}>
            <div className="flex items-center justify-center rounded-md w-full overflow-hidden py-2 my-3 bg-secondary">
              <Image
                src={
                  images[0] !== undefined && images[0] !== null
                    ? images[0].image_url
                    : "/assets/img/no-image.jpg"
                }
                width={300}
                height={300}
                className="object-contain w-52"
                alt="product"
              />
            </div>
            <div className="w-full flex gap-3 py-1 text-xs">
              {product.brand !== null && (
                <p className="uppercase text-primary font-semibold">
                  {product.brand.name}
                </p>
              )}
              {" - "}
              {product.category !== null && (
                <p className="font-thin">{product.category.name}</p>
              )}
            </div>
            <p className="font-semibold text-sm md:text-base line-clamp-1">
              {product.name}
            </p>
          </Link>
        </CardContent>
      </div>
      <CardFooter>
        <div className="flex w-full justify-between">
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
              <ProductRating
                stars={product.total_rating}
                reviews={0}
                scale={20}
              />
              <div className="w-full">
                <p className="text-xs ">({product.total_review})</p>
              </div>
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
