"use client";

import { AnimatePresence } from "framer-motion";
import React, { useState } from "react";
import AddAddressForm from "./AddAddress";

export default function AddAddressBtn({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <div onClick={() => openModal()}>{children}</div>

      <AnimatePresence>
        {isModalOpen && <AddAddressForm onClose={closeModal} />}
      </AnimatePresence>
    </>
  );
}
