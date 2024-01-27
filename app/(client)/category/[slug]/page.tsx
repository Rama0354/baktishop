import React from "react";
import Image from "next/image";
import {
  getAllItemByCategory,
  getCategoryBySlug,
} from "@/lib/utils/action/CategoryActions";
import GiftCard from "@/components/gifts/GiftCard";
import GiftList from "@/components/GiftList";
import SelectSort from "@/components/SelectSort";
import Sidebar from "@/components/Sidebar";
import CatAndBrLayout from "@/components/layouts/CatAndBrLayout";
import CategoryListContainer from "@/components/category/CategoryListContainer";

export default async function CategoryPage({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const sort =
    searchParams.sort === "new"
      ? ""
      : searchParams.sort === "nameUp"
      ? "sort_column[0]=item_gift_name&sort_type[0]=asc"
      : searchParams.sort === "nameDown"
      ? "sort_column[0]=item_gift_name&sort_type[0]=desc"
      : searchParams.sort === "low"
      ? "sort_column[0]=item_gift_point&sort_type[0]=asc"
      : searchParams.sort === "high"
      ? "sort_column[0]=item_gift_point&sort_type[0]=desc"
      : "";
  const slug = params.slug;
  const cat = await getCategoryBySlug(slug);
  const items = await getAllItemByCategory(
    slug + (sort !== "" ? "?" + sort : "")
  );
  return (
    <div className="container px-3 md:px-9 min-h-screen bg-white">
      <div className="w-full bg-gradient-to-r from-primary-dark to-secondary-light">
        <div className="w-full flex gap-3 h-48 p-6 text-white">
          <div className="w-36 h-36 flex items-center justify-center bg-white rounded-md shadow-md">
            <Image
              src={cat ? cat.category_image_url : "/assets/img/no-image.jpg"}
              width={100}
              height={100}
              alt="category"
              className="h-full object-contain"
            />
          </div>
          <div>
            <h2 className="font-semibold text-3xl">
              {cat && cat.category_name}
            </h2>
            <p className="font-thin text-xl">Category</p>
          </div>
        </div>
      </div>
      <CategoryListContainer />
      <div id="maincontent" className="w-full flex gap-6 text-slate-700 mb-12">
        {/* <Sidebar /> */}
        <div className="w-full">
          {/* main content */}
          <div className="w-full sticky top-16 lg:top-18 z-30 flex items-center justify-between p-3 border-b-2 bg-white border-slate-200">
            <div className="w-full">
              <p className="font-semibold text-base">Product List</p>
            </div>
            <div className="flex justify-end gap-3 items-center w-1/2 md:w-full">
              <SelectSort />
            </div>
          </div>
          <div className="w-full pb-12">
            <section className="w-full grid grid-cols-2 md:grid-cols-4 2xl:grid-cols-5 gap-3 py-3 justify-center">
              {items && items.length !== 0 ? (
                items.map((item, idx: number) => (
                  <GiftCard gift={item} key={idx} />
                ))
              ) : (
                <span>Tidak ada Barang</span>
              )}
            </section>
            {/* <GiftList pType={"cat"} sType={`${slug}`} /> */}
          </div>
        </div>
      </div>
    </div>
  );
}
