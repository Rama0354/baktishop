"use client";
import { AiOutlineSchedule } from "react-icons/ai";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import Link from "next/link";

export default function DashboardClient({ redeem }: any) {
  let [isOpen, setIsOpen] = useState(false);
  const metapage = redeem ? redeem.meta : null;
  const pNumber = [...Array(metapage.last_page)];
  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }
  return (
    <section className="w-full pb-6">
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
                    {r.total_amount}
                  </td>
                  <td className="px-6 py-4">
                    {r.redeem_status === "success" ? (
                      <div className="flex items-center">
                        <div className="h-2.5 w-2.5 rounded-full bg-green-500 mr-2"></div>
                        {r.redeem_status}
                      </div>
                    ) : r.redeem_status === "pending" ? (
                      <div className="flex items-center">
                        <div className="h-2.5 w-2.5 rounded-full bg-amber-500 mr-2"></div>
                        {r.redeem_status}
                      </div>
                    ) : r.redeem_status === "failure" ? (
                      <div className="flex items-center">
                        <div className="h-2.5 w-2.5 rounded-full bg-rose-500 mr-2"></div>
                        {r.redeem_status}
                      </div>
                    ) : (
                      <div className="flex items-center">
                        <div className="h-2.5 w-2.5 rounded-full bg-slate-500 mr-2"></div>
                        Unknown
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <button
                      type="button"
                      onClick={openModal}
                      className="px-4 py-2 text-sm font-medium bg-white border-2 border-purple-500 text-purple-500 hover:bg-purple-100"
                    >
                      Bayar
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
        {metapage && metapage.total > metapage.per_page ? (
          <nav className="w-full py-2 px-3 flex gap-3">
            <Link
              className={`${
                metapage.current_page === 1
                  ? " pointer-events-none text-slate-300 border-slate-300"
                  : ""
              } block py-1 px-3 border border-purple-500 text-base font-semibold text-purple-500 rounded-md hover:shadow-mds`}
              href={`?page=${metapage.current_page - 1}`}
            >
              Prev
            </Link>
            {pNumber.map((_, idx) => (
              <Link
                key={idx}
                className={`${
                  metapage.current_page === idx + 1
                    ? "bg-purple-500 text-white hover:bg-purple-600"
                    : ""
                } block py-1 px-3 border border-purple-500 text-base font-semibold text-purple-500 rounded-md hover:bg-purple-100 hover:shadow-md`}
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
              } block py-1 px-3 border border-purple-500 text-base font-semibold text-purple-500 rounded-md hover:shadow-mds`}
              href={`?page=${metapage.current_page + 1}`}
            >
              Next
            </Link>
          </nav>
        ) : null}
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Payment successful
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Your payment has been successfully submitted. We’ve sent
                      you an email with all of the details of your order.
                    </p>
                  </div>

                  <div className="mt-4">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={closeModal}
                    >
                      Got it, thanks!
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </section>
  );
}
