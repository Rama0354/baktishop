import React from "react";
import Image from "next/image";
import SelectSort from "@/components/SelectSort";
import { getProductCards } from "@/lib/utils/action/ProductActions";
import ProductCard from "@/components/products/ProductCard";

export default async function SearchPage({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const slug = params.slug;
  const search = `search_column[0]=name&search_text[0]=${slug}&search_operator[0]=like`;
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

  const filters = search !== "" ? search + (sort !== "" ? "&" + sort : "") : "";
  const items = await getProductCards(filters);
  return (
    <div className="container px-3 md:px-9">
      <div id="maincontent" className="w-full flex gap-6">
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
          <div className="w-full min-h-screen pt-3 pb-12 px-6 bg-secondary/25">
            <section className="w-full flex py-2 justify-center">
              {items && items.data.length !== 0 ? (
                <div className="w-full grid grid-cols-2 md:grid-cols-4 2xl:grid-cols-5 gap-3 justify-center">
                  {items.data.map((item, idx: number) => (
                    <ProductCard product={item} key={idx} />
                  ))}
                </div>
              ) : (
                <div className="w-full h-full flex justify-center items-center">
                  <Image
                    src={"/assets/img/not-found-product.png"}
                    width={300}
                    height={300}
                    className="sm:w-80"
                    alt="product-not-found"
                  />
                </div>
              )}
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
