"use client";
import Link from "next/link";
import React, { useState } from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";

export default function CartButton() {
  const [cartBtn, setCartBtn] = useState(false);

  return (
    <div className=" group relative">
      <Link href={"/cart"}>
        <button className="p-2 group-hover:bg-purple-100/50 transition duration-300 ease-in-out rounded-full">
          <AiOutlineShoppingCart className="text-white stroke-2 w-6 h-6" />
          <span
            className={`${
              carts.length === 0 ? "hidden" : ""
            } absolute top-0 right-0 flex shrink-0 justify-center items-center w-5 h-5 p-0.5 text-xs rounded-full bg-white text-purple-500`}
          >
            {carts.length}
          </span>
        </button>
      </Link>
      <div className="absolute right-0 top-9 group-hover:visible group-hover:pointer-events-auto invisible pointer-events-none transition duration-300 ease-in-out">
        <div className="w-64 mt-3 py-1 px-3 flex flex-col justify-between bg-white z-50 rounded-md boeder border-slate-200 shadow-md">
          <div className="w-full py-2 px-3 border-b-2 border-slate-100">
            <h2 className="text-slate-600 text-xl font-semibold">Cart</h2>
          </div>

          <div className="w-full py-2 px-3">
            <ul>
              {carts.map((cart) => (
                <li key={cart.id} className="py-1">
                  <div className="w-full flex items-center gap-3">
                    <div className="w-12 h-12 flex-shrink-0 bg-purple-500 rounded-md"></div>
                    <div className="w-full text-slate-700">
                      <p className="font-medium text-sm">{cart.product_name}</p>
                      <span className="flex gap-3">
                        <p className="font-medium text-xs text-amber-600">
                          {cart.fprice}
                        </p>
                        <p className="font-medium text-xs">x{cart.qty}</p>
                      </span>
                    </div>
                  </div>
                </li>
              ))}
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

const carts = [
  {
    id: 1,
    product_name: "Kabel Data 1M 6A",
    price: 100000,
    fprice: "Rp 100.000",
    qty: 2,
  },
  {
    id: 2,
    product_name: "Fan Cooler Matrix USB C",
    price: 200000,
    fprice: "Rp 200.000",
    qty: 1,
  },
  {
    id: 3,
    product_name: "Xiaomi Stylus Pen 1448Dpi",
    price: 350000,
    fprice: "Rp 350.000",
    qty: 1,
  },
];
