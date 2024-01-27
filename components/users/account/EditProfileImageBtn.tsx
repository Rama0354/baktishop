"use client";
import { AnimatePresence } from "framer-motion";
import React, { useState } from "react";
import { MdModeEditOutline } from "react-icons/md";
import EditProfileImage from "./EditProfileImage";

export default function EditProfileImageBtn({
  profileId,
  children,
}: {
  profileId: number;
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
    <div className="w-max" onClick={openModal}>
      {/* <button
        className="flex gap-1 items-center px-3 bg-primary-dark hover:bg-secondary-dark text-white text-sm font-semibold rounded-full"
      >
        <MdModeEditOutline />
      </button> */}
      {children}

      <AnimatePresence>
        {isModalOpen && (
          <EditProfileImage profileId={profileId} onClose={closeModal} />
        )}
      </AnimatePresence>
    </div>
  );
}
