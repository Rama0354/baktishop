export const dynamic = "force-dynamic";

import React from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { getCarts } from "@/lib/utils/action/CartsActions";
import CheckoutClient from "@/components/checkout/CheckoutClient";
import { getAddresses } from "@/lib/utils/action/AddressActions";
import CheckoutCountDetails from "@/components/checkout/CheckoutCountDetails";
import AddAddressBtn from "@/components/users/address/AddAddressBtn";
import CheckoutItems from "@/components/checkout/CheckoutItems";
import { Button } from "@/components/ui/button";
import { cartsSort } from "@/lib/types/cart";

export default async function CheckoutPage() {
  const data = await getCarts();
  const getAddress = await getAddresses();
  const addresses = !getAddress.error
    ? getAddress.sort((a: any, b: any) => b.is_main - a.is_main)
    : [];
  const cartItems: cartsSort | undefined = data;
  const cartData =
    cartItems &&
    !data.error &&
    cartItems.data.map((product) => {
      return {
        points: product.variants
          ? product.variants.point
          : product.products.point,
        weights: product.variants
          ? product.variants.weight
          : product.products.weight,
        qtys: product.quantity,
      };
    });
  const cartCheckout =
    cartItems && !data.error
      ? cartItems.data.map((item) => {
          return {
            variant_id: item.variants !== null ? item.variants.id : null,
            product_id: item.products.id,
            quantity: item.quantity,
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
    <section className="container px-3 mt-3 mb-12 min-h-screen flex flex-col bg-secondary/25 border border-border rounded-md shadow-md">
      <div className="w-full flex items-center gap-3 border-b-2 py-1 px-6 md:py-2">
        <AiOutlineShoppingCart className="stroke-2 w-6 h-6" />
        <h1 className="py-2 font-semibold text-xl ">Checkout</h1>
      </div>
      <div className="w-full py-3 px-6 flex flex-col sm:flex-row gap-12 sm:gap-3">
        <div className="w-full sm:1/2 md:w-2/3">
          {cartItems && (
            <CheckoutItems
              cartItems={cartItems && !data.error ? cartItems : null}
            />
          )}
          {addresses.length !== 0 ? (
            <CheckoutClient
              address={addresses}
              weights={weightTotal}
              products={cartCheckout}
            />
          ) : (
            <div className="w-full px-3 py-2">
              <p className="italic">
                Anda Belum memiliki alamat pengiriman silahkan buat alamat
                terlebih dahulu
              </p>
              <AddAddressBtn>
                <Button size={"sm"}>Buat Alamat</Button>
              </AddAddressBtn>
            </div>
          )}
        </div>
        <div className="w-full sm:1/2 md:w-1/3 flex flex-col gap-1 py-1 px-3 border-primary border-t border-l-0 sm:border-l sm:border-t-0 mb-12">
          {cartData && (
            <CheckoutCountDetails cartData={cartData} weight={weightTotal} />
          )}
        </div>
      </div>
    </section>
  );
}
