"use client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetAll } from "../redux/filterSlice";
import { RootState } from "../redux/store";
import { useRouter } from "next/navigation";

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
  const filter = useSelector((state: RootState) => state.filter.filters);
  const sort = useSelector((state: RootState) => state.filter.sort);
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
  return (
    <div className="w-full flex gap-3 py-6">
      {data.map((cat: catListType) => (
        <Link
          key={cat.id}
          href={`cat.${cat.category_slug}`}
          className="w-24 p-3 flex flex-col items-center gap-1 border border-slate-200 hover:border-purple-500 rounded-md shadow-md"
        >
          <Image
            src={
              cat.category_image_url
                ? cat.category_image_url
                : "/assets/img/no-image.jpg"
            }
            width={100}
            height={100}
            alt={`${cat.category_slug}-category`}
            className="w-20 h-20 shrink object-contain"
          />
          <span className="text-sm text-slate-700 font-medium">
            {cat.category_name}
          </span>
        </Link>
      ))}
    </div>
  );
}
