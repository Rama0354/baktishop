"use client";
import React, { useState } from "react";
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "@hello-pangea/dnd";
import { AddressArray, FullAddressData } from "@/app/types/address";
import { MdModeEditOutline, MdOutlineDeleteOutline } from "react-icons/md";
import { reorder } from "@/app/utils/withAddressDnD";
import AddressModalForm from "./AddressModalForm";

export default function AddressDnD({
  addresses,
}: {
  addresses: AddressArray | undefined;
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedData, setSelectedData] = useState<FullAddressData | null>(
    null
  );

  // Fungsi untuk membuka modal dan mengatur data yang akan diedit
  const openModal = (data: any) => {
    setSelectedData(data);
    setIsModalOpen(true);
  };

  // Fungsi untuk menutup modal
  const closeModal = () => {
    setSelectedData(null);
    setIsModalOpen(false);
  };
  const [dndData, setDndData] = useState<AddressArray>(
    addresses ? addresses : []
  );
  const handleDragStart = () => {
    if (window.navigator.vibrate) window.navigator.vibrate(100);
  };
  const handleDragEnd = (result: DropResult) => {
    if (result.combine) {
      const newDndData: AddressArray = [...dndData];
      newDndData.splice(result.source.index, 1);
      setDndData(newDndData);
      return;
    }
    if (!result.destination) return;
    if (result.destination.index === result.source.index) return;

    const newDndData = reorder(
      dndData,
      result.source.index,
      result.destination.index
    );
    setDndData(newDndData);
  };

  return (
    <div>
      <DragDropContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
        <Droppable droppableId="droppable">
          {(droppableProvided) => (
            <ul
              className="flex flex-col gap-4 max-w-max"
              {...droppableProvided.droppableProps}
              ref={droppableProvided.innerRef}
            >
              {dndData &&
                dndData.map((address, index) => (
                  <Draggable
                    draggableId={address.id.toString()}
                    index={index}
                    key={address.id}
                  >
                    {(draggableProvided) => (
                      <li
                        className="py-1"
                        {...draggableProvided.draggableProps}
                        {...draggableProvided.dragHandleProps}
                        ref={draggableProvided.innerRef}
                      >
                        <div className="w-full max-w-lg py-2 px-3 flex gap-3 items-center justify-between border bg-white border-slate-200 shadow-md rounded-md">
                          <div className="flex flex-col">
                            <div className="flex gap-3 justify-between">
                              <div className="flex flex-col">
                                <p className="font-medium text-sm text-slate-500">
                                  {`Penerima : ${
                                    address.person_name !== ""
                                      ? address.person_name
                                      : "Unknown"
                                  } `}
                                </p>
                                <p className="font-medium text-sm text-slate-500">
                                  {`${
                                    address.address !== ""
                                      ? address.address
                                      : ""
                                  }, 
                                          ${
                                            address.subdistrict
                                              .subdistrict_name !== ""
                                              ? address.subdistrict
                                                  .subdistrict_name
                                              : ""
                                          }, 
                                          ${
                                            address.city.city_name !== ""
                                              ? address.city.city_name
                                              : ""
                                          }, 
                                          ${
                                            address.province.province_name !==
                                            ""
                                              ? address.province.province_name
                                              : ""
                                          }, 
                                          ${
                                            address.postal_code !== ""
                                              ? address.postal_code
                                              : ""
                                          }`}
                                </p>
                              </div>
                              <div className="w-max flex justify-center gap-6 py-2">
                                <button
                                  onClick={() => openModal(address)}
                                  className="w-max h-max p-3 flex items-center bg-blue-100 hover:bg-blue-200 cursor-pointer gap-3 text-sm text-blue-500 font-semibold rounded-full"
                                >
                                  <MdModeEditOutline className={"w-6 h-6"} />
                                </button>
                                <button className="w-max h-max p-3 flex items-center bg-rose-100 hover:bg-rose-200 cursor-pointer gap-3 text-sm text-rose-500 font-semibold rounded-full">
                                  <MdOutlineDeleteOutline
                                    className={"w-6 h-6"}
                                  />
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </li>
                    )}
                  </Draggable>
                ))}
              {droppableProvided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
      <AddressModalForm
        isOpen={isModalOpen}
        onClose={closeModal}
        data={selectedData}
      />
      {/* <AnimatePresence initial={false}>
        {modalOpen && (
          <ModalMain handleClose={close}>
            <div className="relative bg-white rounded-lg shadow ">
              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
                <h3 className="text-xl font-semibold text-gray-900">
                  Ubah Alamat
                </h3>
                <button
                  type="button"
                  onClick={() => close()}
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
                  data-modal-hide="default-modal"
                >
                  <svg
                    className="w-3 h-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>
              <div className="p-4 md:p-5 space-y-4">
                
              </div>
            </div>
          </ModalMain>
        )}
      </AnimatePresence> */}
      {/* <form action={editProfile} onSubmit={close}>
                  <input
                    type="text"
                    id="profileid"
                    name="profileid"
                    defaultValue={userData.profile.id}
                    className="hidden"
                    required
                  />
                  <div className="relative z-0 w-full mb-6 group">
                    <label
                      htmlFor="name"
                      className="block mb-2 text-sm font-medium text-gray-900"
                    >
                      Nama
                    </label>
                    <input
                      type="text"
                      id="profilename"
                      name="profilename"
                      defaultValue={userData.profile.name}
                      className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                      placeholder="John"
                      required
                    />
                  </div>
                  <div className="grid md:grid-cols-2 md:gap-6">
                    <div className="relative z-0 w-full mb-6 group">
                      <label
                        htmlFor="phone"
                        className="block mb-2 text-sm font-medium text-gray-900"
                      >
                        No. Telp
                      </label>
                      <input
                        type="tel"
                        // pattern="[0-9]{3}-[0-9]{4}-[0-9]{4}-[0-9]{1}"
                        name="phone"
                        id="phone"
                        defaultValue={userData.profile.phone_number}
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        placeholder="081-0000-0000-0"
                        required
                      />
                    </div>
                    <div className="relative z-0 w-full mb-6 group">
                      <label
                        htmlFor="birthdate"
                        className="block mb-2 text-sm font-medium text-gray-900"
                      >
                        Tanggal Lahir
                      </label>
                      <input
                        type="date"
                        name="birthdate"
                        id="birthdate"
                        defaultValue={userData.profile.birthdate}
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        required
                      />
                    </div>
                  </div>
                  <div className="w-full flex justify-end gap-6">
                    <button
                      onClick={close}
                      className="text-rose-500 bg-white-700 hover:bg-rose-100 focus:ring-4 focus:outline-none focus:ring-rose-300 font-bold rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center border border-rose-600"
                    >
                      Batal
                    </button>
                    <button
                      type="submit"
                      className="text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 font-bold rounded-lg text-sm w-full sm:w-auto px-9 py-2.5 text-center"
                    >
                      Simpan
                    </button>
                  </div>
                </form> */}
    </div>
  );
}
