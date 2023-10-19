import React from "react";
import { AiOutlineSchedule } from "react-icons/ai";

export default function DashboardClient() {
  return (
    <>
      <div className="w-full flex gap-3 items-center py-3 px-6 mb-3 border-b border-slate-200">
        <AiOutlineSchedule className={"w-6 h-6 stroke-2 text-slate-700"} />
        <h2 className="font-semibold text-lg text-slate-700">
          Riwayat Pesanan
        </h2>
      </div>
      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-500 border border-slate-200">
          <thead className="text-xs text-gray-700 uppercase bg-gray-200">
            <tr>
              <th scope="col" className="px-6 py-3">
                Nama Produk
              </th>
              <th scope="col" className="px-6 py-3">
                Tanggal Pesan
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                Harga
              </th>
              <th scope="col" className="px-6 py-3">
                Status
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
              <td className="px-6 py-4 whitespace-nowrap">Rabu, 5 Apr 2023</td>
              <td className="px-6 py-4 text-right whitespace-nowrap">
                Rp 23.999.000
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center">
                  <div className="h-2.5 w-2.5 rounded-full bg-green-500 mr-2"></div>{" "}
                  Selesai
                </div>
              </td>
            </tr>
            <tr className="bg-white border-b ">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
              >
                Build PC Ryzen 9 H series & Nvidia RTX 4080
              </th>
              <td className="px-6 py-4 whitespace-nowrap">
                Senin, 18 Sep 2023
              </td>
              <td className="px-6 py-4 text-right whitespace-nowrap">
                Rp 32.500.000
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center">
                  <div className="h-2.5 w-2.5 rounded-full bg-amber-500 mr-2"></div>{" "}
                  Pending
                </div>
              </td>
            </tr>
            <tr className="bg-white">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
              >
                Magic Mouse 2
              </th>
              <td className="px-6 py-4 whitespace-nowrap">Jumat, 7 Okt 2023</td>
              <td className="px-6 py-4 text-right whitespace-nowrap">
                Rp 430.000
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center">
                  <div className="h-2.5 w-2.5 rounded-full bg-rose-500 mr-2"></div>{" "}
                  Gagal
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}
