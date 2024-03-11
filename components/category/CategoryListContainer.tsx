import React from "react";
import Image from "next/image";
import Link from "next/link";
import { getCategoryList } from "@/lib/utils/action/CategoryActions";
import { categoriesList } from "@/lib/types/category";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";

export default async function CategoryListContainer() {
  const data = await getCategoryList();
  const categories: categoriesList | undefined = data;

  return (
    <div className="w-full flex shrink gap-3 py-6">
      {categories?.data.map((category, idx: number) => (
        <Link key={idx} href={`/category/${category.slug}`}>
          <Card>
            <CardHeader>
              <div className="flex flex-col items-center gap-3">
                <Image
                  src={category.image_url}
                  alt={category.slug}
                  width={120}
                  height={120}
                  className={"w-20"}
                />
                <CardTitle>{category.name}</CardTitle>
              </div>
            </CardHeader>
          </Card>
        </Link>
      ))}
      {/* {getCategoryData &&
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
        ))} */}
    </div>
  );
}
