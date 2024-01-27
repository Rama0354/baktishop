import React, { Suspense } from "react";
import GiftCard from "./GiftCard";
import { SkeletonCard } from "../Skeleton";
import { getGiftCards } from "@/lib/utils/action/GiftActions";
import Image from "next/image";

export default async function GiftListBestContainer() {
  const allGiftsData = await getGiftCards(
    "per_page=10&sort_column[0]=total_redeem&sort_type[0]=desc"
  );

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
