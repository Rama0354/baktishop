"use client";
import React, { useState } from "react";
import ClientLayout from "../components/layouts/ClientLayout";
import { AiOutlineDelete, AiOutlineShoppingCart } from "react-icons/ai";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import Image from "next/image";
import {
  changeCartItems,
  getCart,
  removeCartItem,
} from "../redux/slice/cartSlice";
import { CartType } from "../types/cart";
import CountCart from "../components/CountCart";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import axios from "axios";

export default function CartPage() {
  const cartItems = useSelector((state: RootState) => state.cart.cartItems);
  const dispatch = useDispatch();
  const router = useRouter();

  const changeQty = useMutation({
    mutationFn: async ({
      cart_id,
      cart_quantity,
    }: {
      cart_id: string;
      cart_quantity: number;
    }) => {
      return await axios
        .put(`api/cart/${cart_id}`, {
          cart_quantity,
        })
        .then((res) => {
          if (res.data.status !== 500) {
            if (res.status === 200) {
              toast.success(`Jumlah berubah menjadi ${cart_quantity}`);
            } else if (res.data.status === 400) {
              toast.error("Maaf, Jumlah yang anda masukkan melebihi stok!");
            } else {
              toast.error(res.data.error.message);
            }
          } else {
            toast.error(`Error ${res.data.status}`);
          }
        })
        .catch((err) => console.log(err));
    },
    onSuccess: () => {
      dispatch(getCart() as any);
    },
  });

  const mutation = useMutation({
    mutationFn: async ({ cart_id }: { cart_id: string }) => {
      return await axios
        .delete(`api/cart/${cart_id}`)
        .then((res) => {
          if (res.data.status !== 500) {
            if (res.data.error === 0) {
              toast.success("Produk telah dihapus dari Keranjang");
            } else {
              toast.error(res.data.error.message);
            }
          } else {
            toast.error(`Error ${res.data.status}`);
          }
        })
        .catch((err) => console.log(err));
    },
    onSuccess: () => {
      dispatch(getCart() as any);
    },
  });

  const handleDeleteCart = (item: any) => {
    mutation.mutate({ cart_id: item.cart_id });
  };

  const totalQty = cartItems.reduce(
    (sum, item) => sum + item.product_quantity,
    0
  );
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.product_price * item.product_quantity,
    0
  );
  function rupiahCurrency(x: number) {
    return x.toLocaleString("id-ID", { style: "currency", currency: "IDR" });
  }
  return (
    <ClientLayout>
      <section className="container px-3 mt-3 mb-12 min-h-screen flex flex-col border border-slate-300 rounded-md shadow-md">
        <div className="w-full flex items-center gap-3 border-b-2 border-slate-300 py-1 px-6 md:py-2">
          <AiOutlineShoppingCart className="text-slate-700 stroke-2 w-6 h-6" />
          <h1 className="py-2 font-semibold text-xl text-slate-700">
            Keranjang
          </h1>
        </div>
        <div className="w-full py-3 px-6 flex flex-col md:flex-row gap-3">
          <div className="w-full md:w-2/3">
            <table className="w-full min-w-min overflow-x-auto text-sm text-left text-gray-500 border border-slate-200">
              <thead className="text-xs text-gray-700 uppercase bg-gray-200">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Produk
                  </th>
                </tr>
              </thead>
              <tbody>
                {cartItems.length > 0 ? (
                  cartItems.map((product, idx) => (
                    <tr key={idx} className="bg-white border-b ">
                      <td className="flex items-center justify-between gap-3 px-6 py-3 text-slate-700">
                        <div className="shrink-0">
                          <Image
                            src={
                              product.product_image
                                ? product.product_image
                                : "/assets/img/no-image.jpg"
                            }
                            width={100}
                            height={100}
                            alt="cart-picture"
                            className="w-12 sm:w-20 object-contain"
                          />
                        </div>
                        <div className="w-full flex flex-col sm:flex-row justify-between">
                          <div className="w-full">
                            <h2 className="text-lg font-medium">
                              {product.product_name}
                            </h2>
                            {product.varian_id !== undefined ? (
                              <p className="text-sm font-medium py-1 px-2 w-max bg-slate-100 rounded-md">
                                {product.varian_name}
                              </p>
                            ) : null}
                            <p className="font-semibold text-sm text-amber-500">
                              {rupiahCurrency(product.product_price)}
                            </p>
                          </div>
                          <div className="flex items-center">
                            <CountCart
                              scale={75}
                              count={product.product_quantity}
                              setCount={(newCount) => {
                                const updatedCartItems = cartItems.map(
                                  (item, i) => {
                                    if (i === idx) {
                                      return {
                                        ...item,
                                        product_quantity: newCount,
                                      };
                                    }
                                    return item;
                                  }
                                );
                                changeQty.mutate({
                                  cart_id: updatedCartItems[idx].cart_id,
                                  cart_quantity:
                                    updatedCartItems[idx].product_quantity,
                                });
                                // dispatch(
                                //   changeCartItems(updatedCartItems[idx])
                                // );
                              }}
                            />
                          </div>
                        </div>
                        <div className="flex items-center">
                          <button
                            onClick={() => handleDeleteCart(product)}
                            className="py-2 px-3 flex gap-1 items-center bg-rose-100 sm:bg-white hover:bg-rose-100 rounded-md"
                          >
                            <AiOutlineDelete
                              className={"text-rose-500 stroke-2 w-6 h-6"}
                            />
                            <p className="hidden sm:block font-medium text-sm text-rose-500">
                              Hapus
                            </p>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr className="bg-white border-b ">
                    <td
                      scope="row"
                      className="flex items-center justify-center gap-3 px-6 py-3 text-slate-700"
                    >
                      <p className=" italic">Tidak ada Barang</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="w-full md:w-1/3 flex flex-col gap-1">
            <div className="flex justify-between items-center text-slate-700">
              <p className="font-semibold text-sm">Total Sementara</p>
              <p>{rupiahCurrency(totalPrice)}</p>
            </div>
            <div className="flex justify-between items-center text-slate-700">
              <p className="font-semibold text-base">Jumlah</p>
              <p>{totalQty}</p>
            </div>
            <div className="flex my-3 justify-between items-center text-slate-700 border-t-2 border-slate-500">
              <p className="font-semibold text-base">Harga Total</p>
              <p>{rupiahCurrency(totalPrice)}</p>
            </div>
            <div className="flex gap-3">
              <Link
                href={"/"}
                className="w-1/3 py-1 px-3 font-semibold bg-white text-center text-purple-500 border-2 border-purple-500 rounded-md"
              >
                Lanjut Belanja
              </Link>
              <button className="w-2/3 py-1 px-3 font-semibold bg-purple-500 text-white border-2 border-purple-500 rounded-md">
                Checkout Sekarang
              </button>
            </div>
          </div>
        </div>
      </section>
    </ClientLayout>
  );
}
