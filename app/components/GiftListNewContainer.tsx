"use client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import GiftCard from "./GiftCard";
import { Gifts } from "../types/gifts";
import { SkeletonCard } from "./Skeleton";

export default function GiftListNewContainer() {
  const { data, isError, error, isLoading } = useQuery({
    queryKey: [`ListNew`],
    queryFn: async () => {
      const res = await axios.get(`api/itemgift`);
      return res.data.data;
    },
    onError: (error) => {
      console.log("Data not found");
    },
  });
  const skeleton = [...Array(5)];

  return (
    <section className="w-full grid grid-cols-2 md:grid-cols-4 2xl:grid-cols-5 gap-3 py-3 justify-center">
      {isLoading ? (
        skeleton.map((_, id) => <SkeletonCard key={id} />)
      ) : data ? (
        data.map((gift: Gifts, idx: number) => (
          <GiftCard key={idx + 1} gift={gift} />
        ))
      ) : (
        <p>Not Found</p>
      )}
    </section>
  );
}
