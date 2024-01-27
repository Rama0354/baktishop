"use client";

import { AnimatePresence } from "framer-motion";
import React, { useState } from "react";
import { MdModeEditOutline } from "react-icons/md";
import { AddressData, FullAddressData } from "@/lib/types/address";
import EditAddressForm from "./EditAddress";

export default function EditAddressBtn({ data }: { data: AddressData }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedData, setSelectedData] = useState<AddressData | null>(null);

  // Fungsi untuk membuka modal dan mengatur data yang akan diedit
  const openModal = (data: any) => {
    setSelectedData(data);
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <button
        aria-label="ubah alamat"
        onClick={() => openModal(data)}
        className="w-max h-max p-2 flex items-center hover:bg-primary-light cursor-pointer gap-3 text-sm text-primary-dark font-semibold rounded-full"
      >
        <MdModeEditOutline className={"w-6 h-6"} />
      </button>

      <AnimatePresence>
        {isModalOpen && (
          <EditAddressForm onClose={closeModal} data={selectedData} />
        )}
      </AnimatePresence>
    </>
  );
}
