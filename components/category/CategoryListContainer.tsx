import React from "react";
import { getAllCategory } from "@/lib/utils/action/CategoryActions";
import Image from "next/image";
import Link from "next/link";

export default async function CategoryListContainer() {
  const getCategoryData = await getAllCategory();
  return (
    <div className="w-full flex shrink gap-3 py-6">
      {getCategoryData &&
        getCategoryData.data.map((cat: any, idx: number) => (
          <Link
            key={cat.id}
            href={`/category/${cat.category_slug}`}
            className={`w-24 p-3 flex shrink flex-col items-center gap-1 border border-slate-200 hover:border-purple-500 rounded-md shadow-md`}
          >
            <div className="relative w-20 h-20 mx-auto">
              <Image
                src={
                  cat.category_image_url
                    ? cat.category_image_url
                    : "/assets/img/no-image.jpg"
                }
                width={100}
                height={100}
                style={{ width: "auto", height: "100%" }}
                sizes="(max-width: 425px) 50vw,75vw"
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
