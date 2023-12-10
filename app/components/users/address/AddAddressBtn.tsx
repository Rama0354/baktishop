"use client";

import { AnimatePresence } from "framer-motion";
import React, { useState } from "react";
import { MdCreate } from "react-icons/md";
import AddAddressForm from "./AddAddress";

export default function AddAddressBtn() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <button
        onClick={() => openModal()}
        className="w-max h-max p-2 gap-3 flex items-center hover:bg-primary-light bg-white cursor-pointer text-sm text-primary-dark font-semibold rounded-full"
      >
        <MdCreate className={"w-6 h-6"} />
        <p className="hidden sm:block">Tambaah</p>
      </button>

      <AnimatePresence>
        {isModalOpen && <AddAddressForm onClose={closeModal} />}
      </AnimatePresence>
    </>
  );
}
