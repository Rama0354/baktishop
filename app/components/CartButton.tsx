"use client";
import Link from "next/link";
import React, { useState } from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { RootState } from "../redux/store";
import { useSelector } from "react-redux";
import Image from "next/image";

export default function CartButton() {
  const [cartBtn, setCartBtn] = useState(false);
  const cartItems = useSelector((state: RootState) => state.cart.cartItems);
  function rupiahCurrency(x: number) {
    return x.toLocaleString("id-ID", { style: "currency", currency: "IDR" });
  }
  const totalCartQty = cartItems.reduce((sum: number, item) => {
    return sum + item.product_quantity;
  }, 0);

  return (
    <div className=" group relative">
      <Link href={"/cart"}>
        <button className="p-2 group-hover:bg-purple-100/50 transition duration-300 ease-in-out rounded-full">
          <AiOutlineShoppingCart className="text-white stroke-2 w-6 h-6" />
          <span
            className={`${
              cartItems.length === 0 ? "hidden" : ""
            } absolute top-0 right-0 flex shrink-0 justify-center items-center w-5 h-5 p-0.5 text-xs rounded-full bg-white text-purple-500`}
          >
            {/* {totalAmount(cartItems)} */}
            {totalCartQty}
          </span>
        </button>
      </Link>
      <div className="absolute right-0 top-9 group-hover:visible group-hover:pointer-events-auto invisible pointer-events-none transition duration-300 ease-in-out">
        <div className="w-72 mt-3 py-1 px-3 flex flex-col justify-between bg-white z-50 rounded-md boeder border-slate-200 shadow-md">
          <div className="w-full py-2 px-3 border-b-2 border-slate-100">
            <h2 className="text-slate-600 text-xl font-semibold">Keranjang</h2>
          </div>

          <div className="w-full py-2 px-3">
            <ul>
              {cartItems.length > 0 ? (
                cartItems.map((cart) => (
                  <li key={cart.product_id} className="py-1">
                    <div className="w-full flex items-center gap-3">
                      <div className="w-12 h-12 flex-shrink-0 bg-purple-500 rounded-md">
                        <Image
                          src={
                            cart.product_image
                              ? cart.product_image
                              : "/assets/img/no-image.jpg"
                          }
                          width={80}
                          height={80}
                          alt="cart-picture"
                          className="h-full object-cover"
                        />
                      </div>
                      <div className="w-full text-slate-700">
                        <p className="font-medium text-sm">
                          {cart.product_name}
                        </p>
                        {cart.varian_id && (
                          <p className="font-medium text-xs px-2 py-1 rounded-md bg-slate-100 w-max">
                            {cart.varian_name}
                          </p>
                        )}
                        <span className="flex gap-3">
                          <p className="font-medium text-sm text-amber-600">
                            {rupiahCurrency(cart.product_price)}
                          </p>
                          <p className="font-medium text-xs">
                            x{cart.product_quantity}
                          </p>
                        </span>
                      </div>
                    </div>
                  </li>
                ))
              ) : (
                <li className="py-1">
                  <div className="w-full flex items-center gap-3">
                    <p className="text-center text-slate-700">
                      tidak ada barang
                    </p>
                  </div>
                </li>
              )}
            </ul>
          </div>
          <div className="w-full py-1 px-3 border-t-2 border-slate-100">
            <Link
              href={"/cart"}
              className="text-purple-500 text-sm font-semibold text-center"
            >
              Lihat semua
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
