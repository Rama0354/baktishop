"use client";
import { AiOutlineSchedule } from "react-icons/ai";
import {
  MdInfo,
  MdLocalShipping,
  MdMap,
  MdPaid,
  MdPayments,
  MdShoppingBag,
  MdSpeakerNotes,
} from "react-icons/md";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, ReactNode, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import ModalContent from "../ModalContent";

export default function DashboardClient({ redeem }: any) {
  let [isOpen, setIsOpen] = useState(false);
  let [details, setDetails] = useState<any | null>(null);
  const metapage = redeem ? redeem.meta : null;
  const pNumber = [...Array(metapage.last_page)];
  function closeModal() {
    setIsOpen(false);
  }

  function openModal(data: any) {
    setDetails(data);
    setIsOpen(true);
  }
  return (
    <section className="w-full py-3">
      <div className="w-full flex gap-3 items-center py-3 px-6 mb-3 border-b-2 border-slate-200">
        <AiOutlineSchedule className={"w-6 h-6 stroke-2 text-slate-700"} />
        <h2 className="font-semibold text-lg text-slate-700">
          Riwayat Transaksi
        </h2>
      </div>
      <div className="relative md:max-w-lg lg:max-w-full overflow-x-auto">
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
              <th scope="col" className="px-6 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {redeem && redeem.data.length !== 0 ? (
              redeem.data.map((r: any, idx: number) => (
                <tr key={idx} className="bg-white border-b ">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                  >
                    {r.redeem_item_gifts &&
                      r.redeem_item_gifts
                        .map((rname: any) => rname.item_gifts.item_gift_name)
                        .join(", ")}
                  </th>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {r.fredeem_date}
                  </td>
                  <td className="px-6 py-4 text-right whitespace-nowrap">
                    {r.ftotal_amount}
                  </td>
                  <td className="px-6 py-4">
                    {r.redeem_status === "success" ? (
                      <div className="flex items-center">
                        <div className="h-2.5 w-2.5 rounded-full bg-green-500 mr-2"></div>
                        Selesai
                      </div>
                    ) : r.redeem_status === "shipped" &&
                      r.shippings.shipping_status === "on progress" ? (
                      <div className="flex items-center">
                        <div className="h-2.5 w-2.5 rounded-full bg-amber-500 mr-2"></div>
                        Diproses
                      </div>
                    ) : r.redeem_status === "shipped" &&
                      r.shippings.shipping_status === "on delivery" ? (
                      <div className="flex items-center">
                        <div className="h-2.5 w-2.5 rounded-full bg-amber-500 mr-2"></div>
                        Dikirim
                      </div>
                    ) : (r.redeem_status === "pending" &&
                        r.payments === null) ||
                      (r.payments &&
                        r.payments.payment_status === "pending") ? (
                      <div className="flex items-center">
                        <div className="h-2.5 w-2.5 rounded-full bg-amber-500 mr-2"></div>
                        Belum Dibayar
                      </div>
                    ) : r.redeem_status === "failure" ? (
                      <div className="flex items-center">
                        <div className="h-2.5 w-2.5 rounded-full bg-rose-500 mr-2"></div>
                        Batal
                      </div>
                    ) : r.redeem_status === "canceled" ? (
                      <div className="flex items-center">
                        <div className="h-2.5 w-2.5 rounded-full bg-rose-500 mr-2"></div>
                        Dibatalkan
                      </div>
                    ) : (
                      <div className="flex items-center">
                        <div className="h-2.5 w-2.5 rounded-full bg-slate-500 mr-2"></div>
                        Unknown
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 flex gap-3 float-right">
                    {r.redeem_status === "pending" ||
                    r.redeem_status === "failure" ? (
                      <Link
                        href={r.snap_url}
                        className="block w-max px-3 py-1 text-sm font-medium text-white bg-rose-600 hover:bg-rose-800 rounded-full"
                      >
                        Bayar
                      </Link>
                    ) : null}
                    <button
                      type="button"
                      onClick={() => openModal(r)}
                      className="px-3 py-1 text-sm font-medium text-white bg-primary-dark hover:bg-secondary-dark rounded-full"
                    >
                      Detail
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5}>
                  <p className="w-full py-2 px-3 mx-auto text-center text-base font-semibold italic">
                    Belum ada Pesanan
                  </p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {metapage && metapage.total > metapage.per_page ? (
        <nav className="w-full py-2 px-3 flex gap-3">
          <Link
            className={`${
              metapage.current_page === 1
                ? " pointer-events-none text-slate-300 border-slate-300"
                : ""
            } block py-1 px-3 border border-primary-dark text-base font-semibold text-primary-dark rounded-md hover:shadow-mds`}
            href={`?page=${metapage.current_page - 1}`}
          >
            Prev
          </Link>
          {pNumber.map((_, idx) => (
            <Link
              key={idx}
              className={`${
                metapage.current_page === idx + 1
                  ? "bg-primary-dark text-white hover:bg-secondary-dark"
                  : ""
              } block py-1 px-3 border border-primary-dark text-base font-semibold text-primary-dark rounded-md hover:bg-primary-light hover:shadow-md`}
              href={`?page=${idx + 1}`}
            >
              {idx + 1}
            </Link>
          ))}
          <Link
            className={`${
              metapage.current_page === metapage.last_page
                ? " pointer-events-none text-slate-300 border-slate-300"
                : ""
            } block py-1 px-3 border border-primary-dark text-base font-semibold text-primary-dark rounded-md hover:shadow-mds`}
            href={`?page=${metapage.current_page + 1}`}
          >
            Next
          </Link>
        </nav>
      ) : null}

      <AnimatePresence>
        {isOpen && <CheckoutDetail closeModal={closeModal} details={details} />}
      </AnimatePresence>
    </section>
  );
}

const CheckoutDetail = ({
  details,
  closeModal,
}: {
  details: any;
  closeModal: () => void;
}) => {
  function transformText(inputText: string) {
    // Mengganti underscore menjadi spasi
    let stringWithSpaces = inputText.replace(/_/g, " ");

    // Mengubah huruf awal menjadi kapital
    let finalString = stringWithSpaces.replace(/\b\w/g, (match) =>
      match.toUpperCase()
    );

    return finalString;
  }
  function rupiahCurrency(x: number) {
    return x.toLocaleString("id-ID", { style: "currency", currency: "IDR" });
  }
  return (
    <ModalContent closeModal={closeModal} title="Detail Pesanan">
      <div>
        <div className="mt-3">
          <h2 className="flex gap-1 items-center py-1 px-3 font-semibold text-base text-slate-600 border border-slate-200">
            <MdInfo /> No Pesanan
          </h2>
          <div className="w-full flex justify-between px-1">
            <p className="text-sm text-gray-500">
              {details && details.redeem_code !== "" && details.redeem_code}
            </p>
          </div>
        </div>
        <div className="mt-3">
          <h2 className="flex gap-1 items-center py-1 px-3 font-semibold text-base text-slate-600 border border-slate-200">
            <MdLocalShipping /> Info Pengiriman
          </h2>
          <div className="w-full flex justify-between px-1">
            <p className="text-sm text-gray-500">Metode Pengiriman</p>
            <p className="text-sm text-gray-500 flex gap-1">
              <span className="uppercase">
                {details &&
                details.shippings &&
                details.shippings.shipping_courier !== ""
                  ? details.shippings.shipping_courier
                  : "unknown"}
              </span>
              {details &&
              details.shippings &&
              details.shippings.shipping_description !== ""
                ? details.shippings.shipping_description
                : "unknown"}
            </p>
          </div>
        </div>
        <div className="mt-3">
          <h2 className="flex gap-1 items-center py-1 px-3 font-semibold text-base text-slate-600 border border-slate-200">
            <MdMap /> Alamat Pengiriman
          </h2>
          <p className="text-sm text-gray-500 px-1">
            <span className="font-semibold">Penerima : </span>
            {`${
              details !== null && details.users.address.person_name !== ""
                ? details.users.address.person_name
                : ""
            }`}
          </p>
          <p className="text-sm text-gray-500 px-1">
            <span className="font-semibold">Nomor : </span>
            {`${
              details !== null &&
              details.users &&
              details.users.address.person_phone !== ""
                ? details.users.address.person_phone
                : ""
            }`}
          </p>
          <p className="text-sm text-gray-500 px-1">
            <span className="font-semibold">Alamat : </span>
            {`${
              details !== null && details.users.address.address !== ""
                ? details.users.address.address
                : ""
            }, 
            ${
              details !== null &&
              details.users.address.subdistrict.subdistrict_name !== ""
                ? details.users.address.subdistrict.subdistrict_name
                : ""
            }, 
            ${
              details !== null && details.users.address.city.city_name !== ""
                ? details.users.address.city.city_name
                : ""
            }, 
            ${
              details !== null &&
              details.users.address.province.province_name !== ""
                ? details.users.address.province.province_name
                : ""
            }, 
            ${
              details !== null && details.users.address.postal_code !== 0
                ? details.users.address.postal_code
                : ""
            }`}
          </p>
        </div>
        <div className="mt-3">
          <h2 className="flex gap-1 items-center py-1 px-3 font-semibold text-base text-slate-600 border border-slate-200">
            <MdSpeakerNotes /> Catatan
          </h2>
          <div className="w-full px-1">
            <p className="text-sm text-gray-500">
              {details && details.note !== null ? details.note : "no note"}
            </p>
          </div>
        </div>
        <div className="mt-3">
          <h2 className="flex gap-1 items-center py-1 px-3 font-semibold text-base text-slate-600 border border-slate-200">
            <MdShoppingBag /> Daftar Produk
          </h2>
          <ul className="border-2 border-slate-100">
            {details && details.redeem_item_gifts.length !== 0 ? (
              details.redeem_item_gifts.map((r: any, idx: number) => (
                <li key={idx} className="flex gap-1 py-1 px-3">
                  <Image
                    className="shrink-0"
                    src={
                      r.item_gifts && r.item_gifts.item_gift_images.length !== 0
                        ? r.item_gifts.item_gift_images[0].item_gift_image_url
                        : "/assets/img/no-image.jpg"
                    }
                    width={100}
                    height={100}
                    alt="product"
                  />
                  <div className="w-full">
                    <div className="w-full flex justify-between items-start text-slate-700">
                      <p className="text-sm font-semibold">
                        {r.item_gifts && r.item_gifts.item_gift_name !== ""
                          ? r.item_gifts.item_gift_name
                          : "No Name"}
                      </p>
                      <p>
                        {r.redeem_quantity && r.redeem_quantity !== 0
                          ? r.redeem_quantity
                          : 0}
                        x
                      </p>
                    </div>
                    {r.variants && (
                      <p className="text-xs py-1 px-2 bg-slate-100 text-slate-700 rounded-md w-max">
                        {r.variants.variant_name !== ""
                          ? r.variants.variant_name
                          : ""}
                      </p>
                    )}
                    <p className="font-semibold text-amber-500">
                      {r.variants && r.variants.fvariant_point !== ""
                        ? r.variants.fvariant_point
                        : r.item_gifts && r.item_gifts.fitem_gift_point !== ""
                        ? r.item_gifts.fitem_gift_point
                        : ""}
                    </p>
                  </div>
                </li>
              ))
            ) : (
              <li className="flex justify-center py-2">
                <p>Tidak ada Barang</p>
              </li>
            )}
            <li className="flex justify-between items-center gap-1 py-2 px-3 border-t border-slate-100">
              <p className="font-semibold text-sm text-slate-700">
                Subtotal Produk
              </p>
              <p className="font-bold text-base text-amber-500">
                {rupiahCurrency(
                  details && details.total_point !== 0 ? details.total_point : 0
                )}
              </p>
            </li>
          </ul>
        </div>
        <div className="mt-3">
          <h2 className="flex gap-1 items-center py-1 px-3 font-semibold text-base text-slate-600 border border-slate-200">
            <MdPayments /> Metode Pembayaran
          </h2>
          <div className="w-full flex justify-between items-center py-1 px-3">
            <p className="text-sm text-gray-500">
              {details && details.payments !== null
                ? transformText(details.payments.payment_type)
                : "Belum memilih pembayaran"}
            </p>
            {details && details.payments !== null && (
              <p className="text-sm text-gray-500">
                {details && details.payments.payment_status === "settlement"
                  ? "Terbayar"
                  : details && details.payments.payment_status === "pending"
                  ? "Belum Dibayar"
                  : "Gagal Dibayar"}
              </p>
            )}
          </div>
        </div>
        <div className="mt-3">
          <h2 className="flex gap-1 items-center py-1 px-3 font-semibold text-base text-slate-600 border border-slate-200">
            <MdPaid /> Total Pembayaran
          </h2>
          <div className="w-full flex justify-between items-center py-1 px-3">
            <p className="text-sm text-gray-500">Sub Total</p>
            <p className="text-sm text-gray-500">
              {details && details.ftotal_point}
            </p>
          </div>
          <div className="w-full flex justify-between items-center py-1 px-3">
            <p className="text-sm text-gray-500">Diskon</p>
            <p className="text-sm text-gray-500">Rp 0</p>
          </div>
          <div className="w-full flex justify-between items-center py-1 px-3">
            <p className="text-sm text-gray-500">Pengiriman</p>
            <p className="text-sm text-gray-500">
              {details && details.fshipping_fee}
            </p>
          </div>
          <div className="w-full flex justify-between items-center py-1 px-3 border-t border-slate-100">
            <p className="text-base font-semibold text-gray-500">Semua Total</p>
            <p className="text-base font-semibold text-gray-500">
              {details && details.ftotal_amount}
            </p>
          </div>
        </div>
      </div>
    </ModalContent>
  );
};
