import React from "react";
import Image from "next/image";
import {
  getCategoryBySlug,
  getProductByCategory,
} from "@/lib/utils/action/CategoryActions";
import SelectSort from "@/components/SelectSort";
import CategoryListContainer from "@/components/category/CategoryListContainer";
import { productMin } from "@/lib/types/product";
import ProductCard from "@/components/products/ProductCard";

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
      : searchParams.sort === "a"
      ? "sort_column[0]=name&sort_type[0]=asc"
      : searchParams.sort === "z"
      ? "sort_column[0]=name&sort_type[0]=desc"
      : searchParams.sort === "low"
      ? "sort_column[0]=point&sort_type[0]=asc"
      : searchParams.sort === "high"
      ? "sort_column[0]=point&sort_type[0]=desc"
      : "";
  const slug = params.slug;
  const cat = await getCategoryBySlug(slug);
  const data = await getProductByCategory(
    slug + (sort !== "" ? "?" + sort : "")
  );
  const products: productMin | undefined = data;

  return (
    <div className="container p-3 md:px-6 min-h-screen bg-secondary/25 border border-border">
      <div className="w-full bg-gradient-to-r from-primary to-primary/25">
        <div className="w-full flex gap-3 h-48 p-6">
          <div className="w-36 h-36 flex items-center justify-center">
            <Image
              src={cat ? cat.image_url : "/assets/img/no-image.jpg"}
              width={200}
              height={200}
              alt={cat ? cat.slug : "category"}
              className="w-52 object-contain"
            />
          </div>
          <div>
            <h2 className="font-semibold text-3xl">{cat && cat.name}</h2>
            <p className="font-thin text-xl">Category</p>
          </div>
        </div>
      </div>
      <CategoryListContainer />
      <div id="maincontent" className="w-full flex gap-6 mb-12">
        {/* <Sidebar /> */}
        <div className="w-full">
          {/* main content */}
          <div className="w-full sticky top-16 lg:top-18 z-30 flex items-center justify-between p-3 border-b-2 border-primary bg-secondary">
            <div className="w-full">
              <p className="font-semibold text-base">Product List</p>
            </div>
            <div className="flex justify-end gap-3 items-center w-1/2 md:w-full">
              <SelectSort />
            </div>
          </div>
          <div className="w-full pb-12">
            <section className="w-full flex py-2 justify-center">
              {products && products.data.length !== 0 ? (
                <div className="w-full grid grid-cols-2 md:grid-cols-4 2xl:grid-cols-5 gap-3 justify-center">
                  {products.data.map((item, idx: number) => (
                    <ProductCard product={item} key={idx} />
                  ))}
                </div>
              ) : (
                <div className="w-full h-full flex justify-center items-center">
                  <Image
                    src={"/assets/img/not-found-product.png"}
                    width={300}
                    height={300}
                    className="sm:w-80 bg-transparent"
                    alt="product-not-found"
                  />
                </div>
              )}
            </section>
            {/* <GiftList pType={"cat"} sType={`${slug}`} /> */}
          </div>
        </div>
      </div>
    </div>
  );
}
