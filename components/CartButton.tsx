"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { AiOutlineDelete, AiOutlineShoppingCart } from "react-icons/ai";
import { RootState } from "../lib/redux/store";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import { getCart } from "@/lib/redux/slice/cartSlice";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";
import DeleteBtnCart from "./cart/DeleteBtnCart";

export default function CartButton() {
  const [cartBtn, setCartBtn] = useState(false);
  const cartItems = useSelector((state: RootState) => state.cart.cartItems);
  const dispatch = useDispatch();
  function rupiahCurrency(x: number) {
    return x.toLocaleString("id-ID", { style: "currency", currency: "IDR" });
  }
  const totalCartQty = cartItems.reduce((sum: number, item) => {
    return sum + item.product_quantity;
  }, 0);

  useEffect(() => {
    dispatch(getCart() as any);
  }, [dispatch]);

  return (
    <div className=" group relative">
      <Link
        href={"/cart"}
        aria-label="keranjang belanja"
        className="block p-2 group-hover:bg-primary-light transition duration-300 ease-in-out rounded-full"
      >
        <AiOutlineShoppingCart className="text-white stroke-2 w-6 h-6" />
        <span
          className={`${
            cartItems.length === 0 ? "hidden" : ""
          } absolute top-0 right-0 flex shrink-0 justify-center items-center w-5 h-5 p-0.5 text-xs font-semibold rounded-full text-primary-dark bg-white`}
        >
          {/* {totalAmount(cartItems)} */}
          {totalCartQty}
        </span>
      </Link>
      <div className="absolute right-0 top-9 sm:group-hover:visible group-hover:pointer-events-auto invisible pointer-events-none transition duration-300 ease-in-out">
        <div className="w-96 mt-3 py-1 px-3 flex flex-col justify-between bg-white z-50 rounded-md boeder border-slate-200 shadow-md">
          <div className="w-full py-2 px-3 border-b-2 border-slate-100">
            <h2 className="text-slate-600 text-xl font-semibold">Keranjang</h2>
          </div>

          <div className="w-full py-2 px-3">
            <ul className="max-h-72 overflow-y-auto">
              {cartItems.length > 0 ? (
                cartItems.map((cart, idx) => (
                  <li key={idx} className="py-1">
                    <div className="w-full flex items-start justify-between gap-3">
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
                      <div>
                        <DeleteBtnCart cartid={cart.cart_id} />
                      </div>
                    </div>
                  </li>
                ))
              ) : (
                <li>
                  <div className="w-full flex flex-col items-center justify-center">
                    <Image
                      src={"/assets/img/empty-cart.png"}
                      width={200}
                      height={200}
                      alt="empty-cart"
                    />
                  </div>
                </li>
              )}
            </ul>
            {cartItems.length > 0 && (
              <div className="w-full border-t border-slate-100">
                <Link
                  href={"/cart"}
                  className="block pt-2 px-3 font-medium text-center text-sm text-purple-500"
                >
                  Lihat semua
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
