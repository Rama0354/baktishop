import React from "react";
import ClientLayout from "../components/layouts/ClientLayout";
import { AiOutlineDelete, AiOutlineShoppingCart } from "react-icons/ai";
import Count from "../components/Count";
import Link from "next/link";

const products = [
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

export default function CartPage() {
  return (
    <ClientLayout>
      <section className="container px-3 mt-3 mb-12 min-h-screen flex flex-col border border-slate-300 rounded-md shadow-md">
        <div className="w-full flex items-center gap-3 border-b-2 border-slate-300 py-1 px-6 md:py-2">
          <AiOutlineShoppingCart className="text-slate-700 stroke-2 w-6 h-6" />
          <h1 className="py-2 font-semibold text-xl text-slate-700">
            Keranjang
          </h1>
        </div>
        <div className="w-full py-3 px-6 flex flex-col sm:flex-row gap-3">
          <div className="w-full sm:w-2/3">
            <table className="w-full min-w-min overflow-x-auto text-sm text-left text-gray-500 border border-slate-200">
              <thead className="text-xs text-gray-700 uppercase bg-gray-200">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Produk
                  </th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id} className="bg-white border-b ">
                    <td
                      scope="row"
                      className="flex items-center justify-between gap-3 px-6 py-3 text-slate-700"
                    >
                      <div className="w-full flex flex-col sm:flex-row justify-between">
                        <div className="w-full">
                          <p className="text-lg font-medium">
                            {product.product_name}
                          </p>
                          <p className="font-semibold text-sm text-amber-500">
                            {product.fprice}
                          </p>
                        </div>
                        <Count value={product.qty} scale={75} />
                      </div>
                      <div className="flex items-center">
                        <button className="py-1 px-3 flex gap-1 items-center hover:bg-rose-100 rounded-md">
                          <AiOutlineDelete
                            className={"text-rose-500 stroke-2 w-6 h-6"}
                          />
                          <p className="font-medium text-sm text-rose-500">
                            Hapus
                          </p>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="w-full sm:w-1/3 flex flex-col gap-1">
            <div className="flex justify-between items-center text-slate-700">
              <p className="font-semibold text-sm">Total Sementara</p>
              <p>Rp 850.000</p>
            </div>
            <div className="flex justify-between items-center text-slate-700">
              <p className="font-semibold text-sm">Potongan Harga</p>
              <p>Rp 0</p>
            </div>
            <div className="flex justify-between items-center text-slate-700">
              <p className="font-semibold text-base">Jumlah</p>
              <p>4</p>
            </div>
            <div className="flex my-3 justify-between items-center text-slate-700 border-t-2 border-slate-500">
              <p className="font-semibold text-base">Harga Total</p>
              <p>Rp 850.000</p>
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
