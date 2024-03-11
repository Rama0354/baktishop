import React, { Suspense } from "react";
import ProductCard from "./ProductCard";
import { SkeletonCard } from "../Skeleton";
import { getProductCards } from "@/lib/utils/action/ProductActions";
import Image from "next/image";

export default async function ProductListBestContainer() {
  const allProductsData = await getProductCards(
    "per_page=10&sort_column[0]=total_order&sort_type[0]=desc"
  );

  return (
    <section className="w-full flex py-2 justify-center">
      <Suspense fallback={<SkeletonCard />}>
        {allProductsData && allProductsData.data.length !== 0 ? (
          <div className="w-full grid grid-cols-2 md:grid-cols-4 2xl:grid-cols-5 gap-3 justify-center">
            {allProductsData.data.map((product, idx: number) => (
              <ProductCard product={product} key={idx} />
            ))}
          </div>
        ) : (
          <div className="w-full h-full flex justify-center items-center">
            <Image
              src={"/assets/img/not-found-product.png"}
              width={200}
              height={200}
              className="sm:w-64"
              alt="product-not-found"
            />
          </div>
        )}
      </Suspense>
    </section>
  );
}
