"use client";
import { RootState } from "@/lib/redux/store";
import Image from "next/image";
import { redirect, useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Badge } from "@/components/ui/badge";
import { cartsSort } from "@/lib/types/cart";

export default function CheckoutItems({
  cartItems,
}: {
  cartItems: cartsSort | null;
}) {
  const router = useRouter();
  const singleCartData = useSelector(
    (state: RootState) => state.cart.singleCart
  );
  function rupiahCurrency(x: number) {
    return x.toLocaleString("id-ID", { style: "currency", currency: "IDR" });
  }
  useEffect(() => {
    if (singleCartData && singleCartData.length === 0) {
      if (cartItems === null) {
        redirect("/");
      }
    }
  }, [cartItems, router, singleCartData]);
  return (
    <div className="py-1">
      <h2 className="py-1 px-3 text-sm font-medium">Semua Produk</h2>
      <ul className="flex flex-col gap-2">
        {singleCartData.length !== 0 ? (
          singleCartData.map((product, idx: number) => (
            <li
              key={idx}
              className="flex gap-1 dark:bg-secondary border rounded-md overflow-hidden py-2 px-3 shadow-md"
            >
              <div className="shrink-0 max-h-20 w-20">
                <Image
                  src={
                    product && product.product_image !== null
                      ? product.product_image
                      : "/assets/img/no-image.jpg"
                  }
                  width={64}
                  height={64}
                  alt="cart-picture"
                />
              </div>
              <div className="w-full flex flex-col sm:flex-row justify-between items-center">
                <div className="w-full">
                  <h2 className="text-base font-medium">
                    {product && product.product_name}
                  </h2>
                  {product && product.variant_id ? (
                    <Badge>{product.variant_name}</Badge>
                  ) : null}
                  <p className="font-semibold text-base text-amber-500">
                    {product && product.product_point !== 0
                      ? rupiahCurrency(product.product_point)
                      : "Rp 0"}
                  </p>
                </div>
                <div className="w-full text-right font-semibold">
                  <p className="text-base">
                    {product && product.quantity !== 0 ? product.quantity : 0}x
                  </p>
                  <p className="text-sm">
                    {product && product.product_weight !== 0
                      ? product.product_weight + " Gram"
                      : "0 Gram"}
                  </p>
                </div>
              </div>
            </li>
          ))
        ) : cartItems !== null && cartItems.data.length > 0 ? (
          cartItems.data.map((item, idx: number) => (
            <li
              key={idx}
              className="flex gap-1 dark:bg-secondary border rounded-md overflow-hidden p-3 shadow-md"
            >
              <div className="shrink-0 max-h-20 w-20">
                <Image
                  src={
                    item &&
                    item.variants !== null &&
                    item.variants.variant_images !== null
                      ? item.variants.variant_images.image_url
                      : item.products.product_images.length &&
                        item.products.product_images[0].image_url &&
                        item.products.product_images[0].image_url !== ""
                      ? item.products.product_images[0].image_url
                      : "/assets/img/no-image.jpg"
                  }
                  width={64}
                  height={64}
                  alt="cart-picture"
                />
              </div>
              <div className="w-full flex flex-col sm:flex-row justify-between items-center">
                <div className="w-full">
                  <h2 className="text-base font-medium">
                    {item && item.products.name}
                  </h2>
                  {item && item.variants !== null ? (
                    <Badge>{item.variants.name}</Badge>
                  ) : null}
                  <p className="font-semibold text-base text-amber-500">
                    {item && item.variants !== null
                      ? item.variants.fpoint
                      : item.products.fpoint !== ""
                      ? item.products.fpoint
                      : "Rp 0"}
                  </p>
                </div>
                <div className="w-full text-right font-semibold">
                  <p className="text-base">
                    {item && item.quantity !== 0 ? item.quantity : 0}x
                  </p>
                  <p className="text-sm">
                    {item && item.variants !== null
                      ? item.variants.fweight
                      : item.products.fweight !== ""
                      ? item.products.fweight
                      : "0 Gram"}
                  </p>
                </div>
              </div>
            </li>
          ))
        ) : (
          <li className="bg-white border-b ">
            <div className="flex items-center justify-center gap-3 px-6 py-3 text-slate-700">
              <p className=" italic">Tidak ada Barang yang dipesan</p>
            </div>
          </li>
        )}
      </ul>
    </div>
  );
}
