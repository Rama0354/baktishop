import React from "react";
import { AiOutlineHeart, AiOutlineDelete } from "react-icons/ai";

export default function WishlistClient() {
  return (
    <section className="w-full pb-6">
      <div className="w-full flex gap-3 items-center py-3 px-6 mb-3 border-b border-slate-200">
        <AiOutlineHeart className={"text-slate-700 stroke-2 w-6 h-6"} />
        <h2 className="font-semibold text-lg text-slate-700">Barang Favorit</h2>
      </div>
      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-500 border border-slate-200">
          <thead className="text-xs text-gray-700 uppercase bg-gray-200">
            <tr>
              <th scope="col" className="px-6 py-3">
                Nama Produk
              </th>
              <th scope="col" className="px-6 py-3">
                Kategori
              </th>
              <th scope="col" className="px-6 py-3">
                Harga
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                Aksi
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-white border-b ">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
              >
                Apple MacBook Pro 17
              </th>
              <td className="px-6 py-4">Laptop</td>
              <td className="px-6 py-4 text-right whitespace-nowrap">
                Rp 23.999.000
              </td>
              <td className="px-6 py-4 text-center">
                <button className="py-1 px-3 flex gap-1 items-center hover:bg-rose-100 rounded-md">
                  <AiOutlineDelete
                    className={"text-rose-500 stroke-2 w-6 h-6"}
                  />
                  <p className="font-medium text-sm text-rose-500">Hapus</p>
                </button>
              </td>
            </tr>
            <tr className="bg-white border-b ">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
              >
                Build PC Ryzen 9 H series & Nvidia RTX 4080
              </th>
              <td className="px-6 py-4">PC Build</td>
              <td className="px-6 py-4 text-right whitespace-nowrap">
                Rp 32.500.000
              </td>
              <td className="px-6 py-4 text-center">
                <button className="py-1 px-3 flex gap-1 items-center hover:bg-rose-100 rounded-md">
                  <AiOutlineDelete
                    className={"text-rose-500 stroke-2 w-6 h-6"}
                  />{" "}
                  <p className="font-medium text-sm text-rose-500">Hapus</p>
                </button>
              </td>
            </tr>
            <tr className="bg-white">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
              >
                Magic Mouse 2
              </th>
              <td className="px-6 py-4">Accessories</td>
              <td className="px-6 py-4 text-right whitespace-nowrap">
                Rp 430.000
              </td>
              <td className="px-6 py-4 text-center">
                <button className="py-1 px-3 flex gap-1 items-center hover:bg-rose-100 rounded-md">
                  <AiOutlineDelete
                    className={"text-rose-500 stroke-2 w-6 h-6"}
                  />{" "}
                  <p className="font-medium text-sm text-rose-500">Hapus</p>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
}
