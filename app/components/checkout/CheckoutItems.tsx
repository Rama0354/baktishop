"use client";
import { RootState } from "@/app/lib/redux/store";
import Image from "next/image";
import { redirect, useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";

export default function CheckoutItems({ cartItems }: { cartItems: any }) {
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
      <h2 className="py-1 px-3 text-primary-dark text-sm font-medium">
        Semua Produk
      </h2>
      <ul className="flex flex-col gap-2">
        {singleCartData.length !== 0 ? (
          singleCartData.map((product, idx: number) => (
            <li
              key={idx}
              className="flex gap-1 border-primary-light text-primary-dark border rounded-md overflow-hidden py-1 px-3 shadow-md"
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
                  {product && product.varian_id !== null ? (
                    <p className="text-xs font-medium py-1 px-2 w-max bg-slate-100 rounded-md">
                      {product.varian_name}
                    </p>
                  ) : null}
                  <p className="font-semibold text-base text-amber-500">
                    {product && product.product_price !== 0
                      ? rupiahCurrency(product.product_price)
                      : "Rp 0"}
                  </p>
                </div>
                <div className="w-full text-right font-semibold">
                  <p className="text-base">
                    {product && product.product_quantity !== 0
                      ? product.product_quantity
                      : 0}
                    x
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
        ) : cartItems && cartItems.length > 0 ? (
          cartItems.map((product: any, idx: number) => (
            <li
              key={idx}
              className="flex gap-1 border-primary-light text-primary-dark border rounded-md overflow-hidden py-1 px-3 shadow-md"
            >
              <div className="shrink-0 max-h-20 w-20">
                <Image
                  src={
                    product &&
                    product.variants !== null &&
                    product.variants.variant_image !== null
                      ? product.variants.variant_image.image_url
                      : product.item_gifts.item_gift_images[0]
                          .item_gift_image_url &&
                        product.item_gifts.item_gift_images[0]
                          .item_gift_image_url !== ""
                      ? product.item_gifts.item_gift_images[0]
                          .item_gift_image_url
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
                    {product && product.item_gifts.item_gift_name}
                  </h2>
                  {product && product.variants !== null ? (
                    <p className="text-xs font-medium py-1 px-2 w-max bg-slate-100 rounded-md">
                      {product.variants.variant_name}
                    </p>
                  ) : null}
                  <p className="font-semibold text-base text-amber-500">
                    {product && product.variants !== null
                      ? product.variants.fvariant_point
                      : product.item_gifts.fitem_gift_point !== ""
                      ? product.item_gifts.fitem_gift_point
                      : "Rp 0"}
                  </p>
                </div>
                <div className="w-full text-right font-semibold">
                  <p className="text-base">
                    {product && product.cart_quantity !== 0
                      ? product.cart_quantity
                      : 0}
                    x
                  </p>
                  <p className="text-sm">
                    {product && product.variants !== null
                      ? product.variants.fvariant_weight
                      : product.item_gifts.fitem_gift_weight !== ""
                      ? product.item_gifts.fitem_gift_weight
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
