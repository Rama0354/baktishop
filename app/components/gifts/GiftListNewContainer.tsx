import React, { Suspense } from "react";
import GiftCard from "../GiftCard";
import { Gifts } from "../../types/gifts";
import { SkeletonCard } from "../Skeleton";
import { getAllGifts, getCookieData } from "@/app/utils/action/GiftActions";

export default async function GiftListNewContainer() {
  const allGiftsData = await getAllGifts("per_page=10");
  // const skeleton = [...Array(5)];

  return (
    <section className="w-full grid grid-cols-2 md:grid-cols-4 2xl:grid-cols-5 gap-3 py-3 justify-center fadein">
      <Suspense fallback={<SkeletonCard />}>
        {allGiftsData && allGiftsData.data.length !== 0 ? (
          allGiftsData.data.map((gift: Gifts, idx: number) => (
            <div key={idx + 1} className="fadechild">
              <GiftCard gift={gift} />
            </div>
          ))
        ) : (
          <p>Tidak ada Barang</p>
        )}
      </Suspense>
    </section>
  );
}
