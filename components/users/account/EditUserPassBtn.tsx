import { AnimatePresence } from "framer-motion";
import React, { useState } from "react";
import EditUserPassword from "./EditUserPass";
import { MdModeEdit } from "react-icons/md";

export default function EditUserPassBtn() {
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
        onClick={openModal}
        className="flex gap-1 items-center px-3 bg-primary hover:bg-secondary-dark text-white text-sm font-semibold rounded-full"
      >
        <MdModeEdit /> Edit Password
      </button>

      <AnimatePresence>
        {isModalOpen && <EditUserPassword onClose={closeModal} />}
      </AnimatePresence>
    </>
  );
}
