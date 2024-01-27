import React, { Suspense } from "react";
import GiftCard from "./GiftCard";
import { SkeletonCard } from "../Skeleton";
import { getGiftCards } from "@/lib/utils/action/GiftActions";
import Image from "next/image";

export default async function GiftListNewContainer() {
  const allGiftsData = await getGiftCards();

  return (
    <section className="w-full flex py-2 justify-center">
      <Suspense fallback={<SkeletonCard />}>
        {allGiftsData && allGiftsData.data.length !== 0 ? (
          <div className="w-full grid grid-cols-2 md:grid-cols-4 2xl:grid-cols-5 gap-3 justify-center">
            {allGiftsData.data.map((gift, idx: number) => (
              <GiftCard gift={gift} key={idx} />
            ))}
          </div>
        ) : (
          <div className="w-full h-full flex justify-center items-center">
            <Image
              src={"/assets/img/not-found-product.jpg"}
              width={200}
              height={200}
              className="sm:w-64"
              alt="product-not-found"
            />
          </div>
        )}
      </Suspense>
    </section>
  );
}
