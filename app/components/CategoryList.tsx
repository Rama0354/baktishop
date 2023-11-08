"use client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useRouter } from "next/navigation";
import { SkeletonCatCard } from "./Skeleton";

type catListType = {
  id: number;
  category_code: string;
  category_name: string;
  category_slug: string;
  category_image: string;
  category_image_url: string;
  category_sort: number;
  category_status: string;
};

export default function CategoryList() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { data, isError, error, isLoading } = useQuery({
    queryKey: ["category"],
    queryFn: async () => {
      const res = await axios.get(`api/getlistcategory`);
      return res.data.data;
    },
    onError: (error) => {
      console.log("Data not found");
    },
  });
  const catSk = [...Array(5)];
  return (
    <div className="w-full flex shrink gap-3 py-6 fadein">
      {isLoading
        ? catSk.map((_, id) => <SkeletonCatCard key={id} />)
        : data &&
          data.map((cat: catListType, idx: number) => (
            <Link
              key={cat.id}
              href={`/category/${cat.category_slug}`}
              className={`fadechild w-24 p-3 flex shrink flex-col items-center gap-1 border border-slate-200 hover:border-purple-500 rounded-md shadow-md`}
            >
              <div className="relative w-20 h-20">
                <Image
                  src={
                    cat.category_image_url
                      ? cat.category_image_url
                      : "/assets/img/no-image.jpg"
                  }
                  layout="fill"
                  objectFit="contain"
                  objectPosition="center"
                  alt={`${cat.category_slug}-category`}
                />
              </div>
              <span className="text-sm text-slate-700 font-medium">
                {cat.category_name}
              </span>
            </Link>
          ))}
    </div>
  );
}
