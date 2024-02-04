"use client";

import { AnimatePresence } from "framer-motion";
import React, { useState } from "react";
import { MdModeEditOutline } from "react-icons/md";
import { AddressData, FullAddressData } from "@/lib/types/address";
import EditAddressForm from "./EditAddress";
import { Button } from "@/components/ui/button";

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
      <Button variant={"ghost"} onClick={() => openModal(data)}>
        <MdModeEditOutline className={"w-6 h-6"} />
      </Button>

      <AnimatePresence>
        {isModalOpen && (
          <EditAddressForm onClose={closeModal} data={selectedData} />
        )}
      </AnimatePresence>
    </>
  );
}
