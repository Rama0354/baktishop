"use client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type BrandListType = {
  id: number;
  brand_name: string;
  brand_slug: string;
  brand_logo: string;
  brand_logo_url: string;
  brand_sort: number;
};

export default function BrandList() {
  const { data, isError, error, isLoading } = useQuery({
    queryKey: ["brand"],
    queryFn: async () => {
      const res = await axios.get(`api/getlistbrand`);
      return res.data.data;
    },
    onError: (error) => {
      console.log("Data not found");
    },
  });
  return (
    <div className="w-full flex gap-3 py-6">
      {data.map((b: BrandListType) => (
        <Link
          key={b.id}
          href={`/brand/${b.brand_slug}`}
          className="min-w-24 p-3 flex flex-col items-center gap-1 border border-slate-200 hover:border-purple-500 rounded-md shadow-md"
        >
          <Image
            src={
              b.brand_logo_url ? b.brand_logo_url : "/assets/img/no-image.jpg"
            }
            width={100}
            height={100}
            alt={`${b.brand_slug}-category`}
            className="h-20 shrink object-contain"
          />
        </Link>
      ))}
    </div>
  );
}
