"use client";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { RootState } from "../../lib/redux/store";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import { getCart } from "@/lib/redux/slice/cartSlice";
import DeleteBtnCart from "./DeleteBtnCart";
import { Badge } from "../ui/badge";
import { useCartStore } from "@/lib/store/cart";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export default function CartButton() {
  const pathName = usePathname();
  const { setCartItems, cartItems: myCarts } = useCartStore();
  const initialized = useRef(false);
  const [cartBtn, setCartBtn] = useState(false);
  const cartItems = useSelector((state: RootState) => state.cart.cartItems);
  const dispatch = useDispatch();
  function rupiahCurrency(x: number) {
    return x.toLocaleString("id-ID", { style: "currency", currency: "IDR" });
  }
  const totalCartQty = cartItems.reduce((sum: number, item) => {
    return sum + item.quantity;
  }, 0);

  useEffect(() => {
    dispatch(getCart() as any);
    return () => {};
  }, [dispatch]);

  return (
    <div className=" group relative">
      <Link
        href={"/cart"}
        aria-label="keranjang belanja"
        className="block p-2 transition duration-300 ease-in-out rounded-full text-white group-hover:bg-white group-hover:text-primary"
      >
        <AiOutlineShoppingCart className=" stroke-2 w-[1.5rem] h-[1.5rem]" />
        {cartItems && (
          <Badge
            variant={"destructive"}
            className={`${
              cartItems.length === 0 ? "hidden" : ""
            } absolute top-0 right-0 rounded-full`}
          >
            {cartItems.length}
          </Badge>
        )}
      </Link>
      <div
        className={cn(
          "absolute right-0 top-9 sm:group-hover:visible group-hover:pointer-events-auto invisible pointer-events-none transition duration-300 ease-in-out",
          {
            "sm:hidden": pathName === "/checkout",
          }
        )}
      >
        <div className="w-96 mt-3 py-1 px-3 flex flex-col justify-between bg-background z-50 rounded-md boeder border-slate-200 shadow-md">
          <div className="w-full py-2 px-3 border-b-2">
            <h2 className=" text-xl font-semibold">Keranjang</h2>
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
                      <div className="w-full">
                        <p className="font-medium text-sm">
                          {cart.product_name}
                        </p>
                        {cart && cart.variant_id && (
                          <Badge variant={"secondary"}>
                            {cart.variant_name}
                          </Badge>
                        )}
                        <span className="flex gap-3">
                          <p className="font-medium text-sm text-amber-600">
                            {rupiahCurrency(cart.product_point)}
                          </p>
                          <p className="font-medium text-xs">
                            x{cart.quantity}
                          </p>
                        </span>
                      </div>
                      <div>
                        <DeleteBtnCart cartid={cart.id} />
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
              <div className="w-full border-t">
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
