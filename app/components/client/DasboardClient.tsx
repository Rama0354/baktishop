import { AiOutlineSchedule } from "react-icons/ai";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";

export default function DashboardClient() {
  let [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }
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
              <th scope="col" className="px-6 py-3"></th>
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
              <td className="px-6 py-4">
                <button
                  type="button"
                  onClick={openModal}
                  className="rounded-md bg-black bg-opacity-20 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
                >
                  Open dialog
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
    </>
  );
}
