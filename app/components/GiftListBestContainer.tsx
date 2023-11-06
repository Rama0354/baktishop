"use client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import GiftCard from "./GiftCard";
import { Gifts } from "../types/gifts";
import { SkeletonCard } from "./Skeleton";

export default function GiftListBestContainer() {
  const { data, isError, error, isLoading } = useQuery({
    queryKey: [`ListBest`],
    queryFn: async () => {
      const res = await axios.get(
        `api/itemgift/page=1&per_page=10&sort_column[0]=total_redeem&sort_type[0]=desc`
      );
      return res.data.data;
    },
    onError: (error) => {
      console.log("Data not found");
    },
  });
  const skeleton = [...Array(5)];

  return (
    <section className="w-full grid grid-cols-2 md:grid-cols-4 2xl:grid-cols-5 gap-3 py-3 justify-center fadein">
      {isLoading ? (
        skeleton.map((_, id) => <SkeletonCard key={id} />)
      ) : data ? (
        data.map((gift: Gifts) => (
          <div key={gift.id} className="fadechild">
            <GiftCard gift={gift} />
          </div>
        ))
      ) : (
        <p>Not Found</p>
      )}
    </section>
  );
}
