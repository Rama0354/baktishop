import React from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { getCarts } from "@/lib/utils/action/Cartactions";
import CheckoutClient from "@/components/checkout/CheckoutClient";
import { getAddresses } from "@/lib/utils/action/AddressActions";
import CheckoutCountDetails from "@/components/checkout/CheckoutCountDetails";
import AddAddressBtn from "@/components/users/address/AddAddressBtn";
import CheckoutItems from "@/components/checkout/CheckoutItems";

export default async function CheckoutPage() {
  const getCartDatas = await getCarts();
  const getAddress = await getAddresses();
  const addresses =
    getAddress !== undefined
      ? getAddress.sort((a, b) => b.is_main - a.is_main)
      : undefined;
  const cartItems = getCartDatas !== undefined ? getCartDatas : null;
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
          <CheckoutItems cartItems={cartItems} />
          {addresses !== undefined ? (
            <CheckoutClient
              address={addresses}
              weights={weightTotal}
              gifts={cartCheckout}
            />
          ) : (
            <div className="w-full px-3 py-2">
              <p className="italic">
                Anda Belum memiliki alamat pengiriman silahkan buat alamat
                terlebih dahulu
              </p>
              <AddAddressBtn>
                <button className="w-max h-max p-2 gap-3 flex items-center bg-primary-dark cursor-pointer text-sm text-white font-semibold rounded-md">
                  <p className="hidden sm:block">Buat disini</p>
                </button>
              </AddAddressBtn>
            </div>
          )}
        </div>
        <div className="w-full sm:1/2 md:w-1/3 flex flex-col gap-1 py-1 px-3 border-primary-light border-t border-l-0 sm:border-l sm:border-t-0 mb-12">
          <CheckoutCountDetails cartData={cartData} weight={weightTotal} />
        </div>
      </div>
    </section>
  );
}
