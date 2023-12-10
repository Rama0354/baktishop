import React from "react";
import ClientLayout from "@/app/components/layouts/ClientLayout";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { getCarts } from "@/app/lib/utils/action/Cartactions";
import Image from "next/image";
import CheckoutClient from "@/app/components/checkout/CheckoutClient";
import { getAddresses } from "@/app/lib/utils/action/AddressActions";
import CheckoutCountDetails from "@/app/components/checkout/CheckoutCountDetails";
import Link from "next/link";

export default async function CheckoutPage() {
  const getCartDatas = await getCarts();
  const getAddress = await getAddresses();
  const addresses =
    getAddress !== undefined
      ? getAddress.sort((a, b) => b.is_main - a.is_main)
      : undefined;
  const cartItems = getCartDatas !== undefined ? getCartDatas : undefined;
  const cartData =
    cartItems &&
    cartItems.map((product) => {
      return {
        points: product.variants
          ? product.variants.variant_point
          : product.item_gifts.item_gift_point,
        weights: product.variants
          ? product.variants.variant_weight
          : product.item_gifts.item_gift_weight,
        qtys: product.cart_quantity,
      };
    });
  const cartCheckout = cartItems
    ? cartItems.map((item) => {
        return {
          item_gift_id: item.item_gifts.id,
          redeem_quantity: item.cart_quantity,
          variant_id: item.variants !== null ? item.variants.id : null,
        };
      })
    : [];
  const weightTotal = cartData
    ? cartData.reduce(
        (acc: number, item: { weights: number; qtys: number }) =>
          acc + item.weights * item.qtys,
        0
      )
    : 0;
  return (
    <section className="container px-3 mt-3 mb-12 min-h-screen flex flex-col bg-white border border-slate-300 rounded-md shadow-md">
      <div className="w-full flex items-center gap-3 border-b-2 border-slate-300 py-1 px-6 md:py-2">
        <AiOutlineShoppingCart className="text-slate-700 stroke-2 w-6 h-6" />
        <h1 className="py-2 font-semibold text-xl text-slate-700">Checkout</h1>
      </div>
      <div className="w-full py-3 px-6 flex flex-col sm:flex-row gap-12 sm:gap-3">
        <div className="w-full sm:1/2 md:w-2/3">
          <div className="py-1">
            <h2 className="py-1 px-3 text-primary-dark text-sm font-medium">
              Semua Produk
            </h2>
            <ul className="flex flex-col gap-2">
              {cartItems && cartItems.length > 0 ? (
                cartItems.map((product, idx: number) => (
                  <li
                    key={idx}
                    className="flex gap-1 border-primary-light text-primary-dark border rounded-md overflow-hidden py-1 px-3 shadow-md"
                  >
                    <div className="shrink-0 max-h-20 w-20">
                      <Image
                        src={
                          product && product.variants !== null
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
          {addresses !== undefined ? (
            <CheckoutClient
              address={addresses}
              weights={weightTotal}
              gifts={cartCheckout}
            />
          ) : (
            <p className="italic">
              Anda Belum memiliki alamat pengiriman silahkan buat alamat
              terlebih dahulu <Link href={"/users/address"}>disini</Link>
            </p>
          )}
        </div>
        <div className="w-full sm:1/2 md:w-1/3 flex flex-col gap-1 py-1 px-3 border-primary-light border-t border-l-0 sm:border-l sm:border-t-0 mb-12">
          <CheckoutCountDetails cartData={cartData} weight={weightTotal} />
        </div>
      </div>
    </section>
  );
}
