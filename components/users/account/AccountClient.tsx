"use client";
import { UserData } from "@/lib/types/user";
import Image from "next/image";
import React from "react";
import { AiOutlineIdcard } from "react-icons/ai";
import { MdModeEdit } from "react-icons/md";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import EditProfile from "./EditProfile";
import EditUserPassBtn from "./EditUserPassBtn";
import EditProfileImageBtn from "./EditProfileImageBtn";

export default function AccountClient({ userData }: { userData: UserData }) {
  const [modalOpen, setModalOpen] = useState(false);

  const close = () => setModalOpen(false);
  const open = () => setModalOpen(true);

  return (
    <section className="relative w-full h-screen">
      <div className="w-full flex items-center gap-3 py-4 px-1 sm:px-6 border-b-2 bg-secondary/50">
        <AiOutlineIdcard className={"stroke-2 w-6 h-6"} />
        <h2 className="font-semibold text-lg">Akun</h2>
      </div>
      <div className="w-full">
        <div className="w-full px-3 pt-3">
          <div className="w-full flex justify-between py-1 px-3">
            <h2 className="text-xl font-semibold border-b">Profile</h2>
            <button
              onClick={() => (modalOpen ? close() : open())}
              className="flex gap-1 items-center px-3 text-white hover:text-primary dark:hover:text-white bg-primary hover:bg-secondary text-sm font-semibold rounded-full hover:ring-1"
            >
              <MdModeEdit /> Edit Profile
            </button>
          </div>
          <div className="w-full flex justify-between flex-col-reverse sm:flex-row rounded-md py-1 px-3">
            <div className="max-w-md">
              <div className="grid grid-cols-[80px_1fr] sm:grid-cols-[160px_1fr]">
                <p className="font-semibold">Nama</p>
                <p>
                  : {userData.profile.name !== "" ? userData.profile.name : ""}
                </p>
                <p className="font-semibold">Tgl. Lahir</p>
                <p>
                  :{" "}
                  {userData.profile.birthdate !== ""
                    ? userData.profile.birthdate
                    : ""}
                </p>
                <p className="font-semibold">No. Telp</p>
                <p>
                  :{" "}
                  {userData.profile.phone_number !== ""
                    ? userData.profile.phone_number
                    : ""}
                </p>
              </div>
            </div>
            <div className="relative w-full p-3 sm:p-0 flex justify-center sm:w-max">
              <EditProfileImageBtn id={userData.profile.id}>
                <div className="relative group transition-all duration-500  border border-purple-500 cursor-pointer">
                  <Image
                    src={
                      userData.profile.avatar_url !== null
                        ? userData.profile.avatar_url
                        : "/assets/img/no-image.jpg"
                    }
                    width={150}
                    height={150}
                    className="group-hover:contrast-50"
                    alt="avatar"
                  />
                  <p className="absolute bottom-0 w-full py-1 bg-purple-500 text-white text-sm text-center invisible group-hover:visible">
                    Edit
                  </p>
                </div>
              </EditProfileImageBtn>
            </div>
          </div>
          <div className="w-full flex justify-between py-1 px-3">
            <h2 className="text-xl font-semibold border-b">Akun</h2>
          </div>
          <div className="w-full flex justify-between flex-col rounded-md py-1 px-3">
            <div className="flex flex-col sm:grid sm:grid-cols-[160px_1fr]">
              <p className="font-semibold">Username</p>
              <p>: {userData.username !== "" ? userData.username : ""}</p>
              <p className="font-semibold">Email</p>
              <p className="text-xs sm:text-base">
                : {userData.email !== "" ? userData.email : ""}
              </p>
              <p className="font-semibold">Password</p>
              <div className="flex-1 flex gap-2">
                <EditUserPassBtn />
              </div>
            </div>
            <div className="flex gap-1"></div>
          </div>
        </div>
      </div>
      <AnimatePresence>
        {modalOpen && <EditProfile onClose={close} data={userData.profile} />}
      </AnimatePresence>
    </section>
  );
}
