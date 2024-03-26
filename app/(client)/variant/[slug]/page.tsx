import React, { Fragment } from "react";
import { notFound } from "next/navigation";
import {
  getProductDetail,
  getProductVariantDetail,
} from "@/lib/utils/action/ProductActions";
import Link from "next/link";
import Image from "next/image";
import GiftRating from "@/components/ProductRating";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ReviewsClient } from "@/components/reviews/reviews-client";
import { productDetail, productDetailVariant } from "@/lib/types/product";
import ResponsiveCarousel from "@/components/responsive-carousel";
import ResponsiveCarouselVariant from "@/components/responsive-carousel-variant";
import ProductDetailClient from "@/components/products/product-detail-client";

export default async function SlugPage({
  params,
}: {
  params: { slug: string };
}) {
  const slug = params.slug;
  console.log(slug);
  const slugs = decodeURIComponent(slug);
  const data = await getProductVariantDetail(slugs);
  const varDetail: productDetailVariant = data;
  if (varDetail && !data.error) {
    return (
      <section className="container py-3 px-0">
        <Card className="bg-secondary/25">
          <CardHeader className="border-b">
            <CardTitle>
              <Link href={"/"}>Product</Link>
              {` > ${varDetail.products.name} ${varDetail.name}`}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="w-full flex flex-col md:flex-row gap-3 lg:gap-6 justify-center items-start">
              <div className="w-full md:w-2/4 lg:w-1/4 px-3 flex flex-col shrink gap-3 justify-center">
                <div className="h-72 object-contain mx-auto">
                  {/* <Image
                      src={"/assets/img/no-image.jpg"}
                      alt="product"
                      width={100}
                      height={100}
                      style={{ width: "auto", height: "100%" }}
                      sizes="(max-width: 425px) 50vw,75vw"
                    /> */}
                  <ResponsiveCarouselVariant
                    data={varDetail.products.product_images}
                    variant_id={varDetail.id}
                  />
                </div>
              </div>
              <div className="px-3 md:2/4 lg:w-3/4 flex flex-col gap-3">
                <p className="font-bold text-2xl">
                  {`${varDetail.products.name} - ${varDetail.name}`}
                </p>
                <div className="flex gap-3 items-center">
                  <GiftRating
                    stars={varDetail.products.total_rating}
                    reviews={varDetail.products.total_review}
                    scale={20}
                  />
                  <div className="w-full">
                    <p className="text-sm">
                      {varDetail.products.total_review} reviewers
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <p className="font-bold text-2xl text-primary">
                    {varDetail.fpoint}
                  </p>
                </div>
                <div className="w-full">
                  <div className="w-min py-0.5 border-b border-border">
                    <h2 className="font-semibold text-lg">Detail</h2>
                  </div>
                  <div className="flex flex-col gap-1 pt-1">
                    <div className="flex gap-3">
                      <div className="w-20">
                        <p className="font-medium uppercase">Brand</p>
                      </div>
                      <p>
                        {varDetail.products.brand
                          ? varDetail.products.brand.name
                          : "-"}
                      </p>
                    </div>
                    <div className="flex gap-3">
                      <div className="w-20">
                        <p className="font-medium uppercase">Kategori</p>
                      </div>
                      <p>
                        {varDetail.products.category
                          ? varDetail.products.category.name
                          : "-"}
                      </p>
                    </div>
                    <div className="flex gap-3">
                      <div className="w-20">
                        <p className="font-medium uppercase">Berat</p>
                      </div>
                      <p>{varDetail.fweight}</p>
                    </div>
                    <div className="flex gap-3">
                      <div className="w-20">
                        <p className="font-medium uppercase">Stok</p>
                      </div>
                      <p>{varDetail.quantity}</p>
                    </div>
                    {varDetail.products.variants.length && (
                      <div className="flex gap-3">
                        <div className="w-20">
                          <p>Variant</p>
                        </div>
                        <div className="flex flex-wrap gap-3">
                          {varDetail.products &&
                            varDetail.products.variants.map(
                              (v: any, idx: number) => {
                                return v.slug !== null ? (
                                  <Link key={idx} href={`/variant/${v.slug}`}>
                                    <Button
                                      variant={
                                        slugs === v.slug ? "default" : "outline"
                                      }
                                    >
                                      {v.name}
                                    </Button>
                                  </Link>
                                ) : null;
                              }
                            )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <ProductDetailClient detail={null} varDetail={varDetail} />
              </div>
            </div>
            <div className="w-full flex flex-col gap-3 py-6 px-3 mb-24">
              {varDetail.products.spesification.length ? (
                <div className="relative w-full">
                  <div className="w-full border-b border-primary">
                    <p className="inline-block h-full py-2 px-5 text-base font-bold text-primary border-b-2 border-primary">
                      Spesifikasi Produk
                    </p>
                  </div>
                  <div className="flex flex-col gap-3 p-3">
                    <div className="w-full md:w-1/2 grid grid-cols-[25%_75%] gap-1 pt-1">
                      {varDetail.products.spesification.map(
                        (spec: any, idx: number) => (
                          <Fragment key={idx}>
                            <div className="w-full">
                              <p className="font-medium uppercase">
                                {spec.key}
                              </p>
                            </div>
                            <div className="w-full">
                              <p>: {spec.value}</p>
                            </div>
                          </Fragment>
                        )
                      )}
                    </div>
                  </div>
                </div>
              ) : null}
              <div className="relative w-full">
                <div className="w-full border-b border-primary">
                  <p className="inline-block h-full py-2 px-5 text-base font-bold text-primary border-b-2 border-primary">
                    Deskripsi Produk
                  </p>
                </div>
                <div className="flex flex-col gap-3 p-3">
                  <p>{varDetail.products.description}</p>
                </div>
              </div>
              <ReviewsClient id={varDetail.products.id} />
            </div>
          </CardContent>
        </Card>
      </section>
    );
  } else {
    notFound();
  }
}
