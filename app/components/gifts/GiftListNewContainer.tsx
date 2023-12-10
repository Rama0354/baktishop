import React, { Suspense } from "react";
import GiftCard from "./GiftCard";
import { SkeletonCard } from "../Skeleton";
import { getGiftCards } from "@/app/lib/utils/action/GiftActions";

export default async function GiftListNewContainer() {
  const allGiftsData = await getGiftCards();

  return (
    <section className="w-full grid grid-cols-2 md:grid-cols-4 2xl:grid-cols-5 gap-3 py-3 justify-center fadein">
      <Suspense fallback={<SkeletonCard />}>
        {allGiftsData && allGiftsData.data.length !== 0 ? (
          allGiftsData.data.map((gift, idx: number) => (
            <GiftCard gift={gift} key={idx} />
          ))
        ) : (
          <p>Tidak ada Barang</p>
        )}
      </Suspense>
    </section>
  );
}
