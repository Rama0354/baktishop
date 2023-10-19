"use client"
import Image from "next/image";
import GiftRating from "./GiftRating";
import Count from "./Count";
import Link from "next/link";
import { Gifts } from "../types/gifts";
import WishButton from "./WishButton";
import { useState } from "react";
import VariantButton from "./VariatButton";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const GiftDetail = ({slug}:{slug:string}) => {
  const { data:detail, isError, error, isLoading } = useQuery({
    queryKey: ["detail", `${slug}`],
    queryFn: async () => {
      const res = await axios.get(`api/detailgift?slug=${slug}`);
      return res.data.data;
    },
    onError: (error) => {
      console.log("Data not found");
    },
  });
  const images = detail.item_gift_images.map(
    (image:any) => image.item_gift_image_url
    );
  const [mainImage, setMainImage] = useState(images[0] !== undefined ? images[0] : "/assets/img/no-image.jpg");
  const [selectedVariant, setSelectedVariant] = useState<number | null>(null);
  const handleVariantSelect = (variantId: number) => {
    setSelectedVariant(variantId);
  };
  return (
    <section className="container text-slate-700">
        {/* breadcrumb */}
        <div className="w-full h-12 px-6 py-3 mb-3 border-b border-slate-200">
          <Link href={"/"}>Product</Link>
          {` > ${detail.item_gift_name}`}
        </div>
        <div className="w-full flex flex-col md:flex-row gap-3 lg:gap-6 justify-center items-start">
          <div className="md:w-2/4 lg:w-1/4 px-3 flex flex-col shrink gap-3 justify-center">
            <Image
              src={mainImage}
              alt="product"
              width={500}
              height={500}
              className="object-contain"
            />
            <div className="relative mx-auto">
              <div className="grid overflow-x-auto grid-cols-5 md:grid-cols-4 gap-3 py-3">
                {/* gambar */}
                {
                  detail.item_gift_images.map(
                    (image:any) => (
                        <Image
                        key={image.id}
                          src={image.item_gift_image_url !== undefined ? image.item_gift_image_url : "/assets/img/no-image.jpg"}
                          alt="product"
                          width={500}
                          height={500}
                          className={`w-20 object-contain border-2 cursor-pointer rounded-md ${mainImage === image.item_gift_image_url ? 'border-purple-500':'border-slate-300'}`}
                          onClick={() => setMainImage(image.item_gift_image_url !== undefined ? image.item_gift_image_url : "/assets/img/no-image.jpg")}
                        />
                    )
                  )
                }
              </div>
            </div>
          </div>
          <div className="px-3 md:2/4 lg:w-3/4 flex flex-col gap-3">
            <p className="font-bold text-2xl">{detail.item_gift_name}</p>
            <div className="flex gap-3 items-center">
              <GiftRating stars={detail.total_rating} reviews={detail.total_reviews} />
              <div className="w-full">
                <p className="text-sm text-slate-400">{detail.total_reviews} reviewers</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <p className="font-bold text-2xl text-purple-500">{detail.fitem_gift_point}</p>
            </div>
            <div className="w-full">
              <div className="w-min py-0.5 border-b border-slate-700">
                <h2 className="font-semibold text-lg">Detail</h2>
              </div>
              <div className="flex flex-col gap-1 pt-1">
                <div className="flex gap-3">
                  <div className="w-20">
                    <p className="font-medium uppercase">Brand</p>
                  </div>
                  <p>{detail.brand ? detail.brand.brand_name : 'Unknown'}</p>
                </div>
                <div className="flex gap-3">
                  <div className="w-20">
                    <p className="font-medium uppercase">Kategori</p>
                  </div>
                  <p>{detail.category ? detail.category.category_name : 'Unknown'}</p>
                </div>
                <div className="flex gap-3">
                  <div className="w-20">
                    <p className="font-medium uppercase">Berat</p>
                  </div>
                  <p>{detail.fitem_gift_weight ? detail.fitem_gift_weight : '0 Gram'}</p>
                </div>
                <div className="flex gap-3">
                  <div className="w-20">
                    <p className="font-medium uppercase">Stok</p>
                  </div>
                  <p>{detail.item_gift_quantity > 0 ? detail.item_gift_quantity :'Stok Habis'}</p>
                </div>
                {
                  detail.variants[0] === undefined ? '' : (
                  <div className="flex gap-3">
                  <div className="w-20">
                    <p className="font-medium uppercase">Varian</p>
                  </div>
                  <VariantButton variants={detail.variants} onVariantSelect={handleVariantSelect} />
                </div>
                  )
                }
                
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-sm">Jumlah</p>
              <Count value={1} />
            </div>
            <div className="flex gap-3">
              <WishButton id={detail.id} isWishlist={detail.is_wishlist} />
              <button className="px-3 py-1.5 text-white text-sm font-semibold bg-fuchsia-500 border border-purple-500 hover:bg-fuchsia-600 rounded-full">
                + Keranjang
              </button>
              <button className="px-3 py-1.5 text-white text-sm font-semibold bg-purple-500 border border-fuchsia-500 hover:bg-purple-600 rounded-full">
                Beli Sekarang
              </button>
            </div>
          </div>
        </div>
        <div className="w-full flex flex-col gap-3 py-6 px-3 mb-24">
          <div className="w-full border-b border-purple-500">
            <p className="inline-block h-full py-2 px-5 text-base font-bold text-purple-500 border-b-2 border-purple-500">
              Spesifikasi Produk
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <div className="w-full md:w-1/2 flex flex-col gap-1 pt-1">
              <div className="flex items-center">
                <div className="w-1/4">
                  <p className="font-medium uppercase">Brand</p>
                </div>
                <div className="w-3/4">
                  <p>: Samsung</p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="w-1/4">
                  <p className="font-medium uppercase">Model</p>
                </div>
                <div className="w-3/4">
                  <p>: Samsung Galaxy A21</p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="w-1/4">
                  <p className="font-medium uppercase">Chipset</p>
                </div>
                <div className="w-3/4">
                  <p>: Exynos 1xxx</p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="w-1/4">
                  <p className="font-medium uppercase">RAM</p>
                </div>
                <div className="w-3/4">
                  <p>: 6GB</p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="w-1/4">
                  <p className="font-medium uppercase">Storage</p>
                </div>
                <div className="w-3/4">
                  <p>: 128GB</p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="w-1/4">
                  <p className="font-medium uppercase">Main Camera</p>
                </div>
                <div className="w-3/4">
                  <p>: 50 Mega Pixel</p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="w-1/4">
                  <p className="font-medium uppercase">Front Camera</p>
                </div>
                <div className="w-3/4">
                  <p>: 15 Mega Pixel</p>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full border-b border-purple-500">
            <p className="inline-block h-full py-2 px-5 text-base font-bold text-purple-500 border-b-2 border-purple-500">
              Deskripsi Produk
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <p>
              {detail.item_gift_description}
            </p>
          </div>
        </div>
      </section>
  );
};

export default GiftDetail;
