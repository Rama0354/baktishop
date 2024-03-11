export const dynamic = "force-dynamic";

import React from "react";
import { MdOutlineShoppingCart } from "react-icons/md";
import { getCarts } from "@/lib/utils/action/CartsActions";
import { cartsSort } from "@/lib/types/cart";
import CartPageContent from "@/components/cart/cart-page-content";

export default async function CartPage() {
  const res = await getCarts();
  const cartItems: cartsSort = res;

  return (
    <section className="container px-3 mt-3 mb-12 min-h-screen flex flex-col border border-border rounded-md shadow-md">
      <div className="w-full flex items-center gap-3 border-b-2 border-border py-1 px-6 md:py-2">
        <MdOutlineShoppingCart className=" w-6 h-6" />
        <h1 className="py-2 font-semibold text-xl ">Keranjang</h1>
      </div>
      {cartItems && <CartPageContent cartItems={cartItems} />}
    </section>
  );
}
