"use client";
import { UserData } from "@/app/lib/types/user";
import Image from "next/image";
import React from "react";
import { AiOutlineIdcard } from "react-icons/ai";
import { MdModeEdit } from "react-icons/md";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import EditProfile from "./EditProfile";

export default function AccountClient({ userData }: { userData: UserData }) {
  const [modalOpen, setModalOpen] = useState(false);

  const close = () => setModalOpen(false);
  const open = () => setModalOpen(true);

  return (
    <section className="w-full py-3 relative">
      <div className="w-full flex items-center gap-3 py-3 px-6 border-b-2 border-slate-200">
        <AiOutlineIdcard className={"text-slate-700 stroke-2 w-6 h-6"} />
        <h2 className="font-semibold text-lg text-slate-700">Akun</h2>
      </div>
      <div className="w-full">
        <div className="w-full px-6">
          <div className="w-full flex justify-between p-1">
            <h2 className="text-xl text-slate-700 font-semibold">Profile</h2>
            <button
              onClick={() => (modalOpen ? close() : open())}
              className="flex gap-1 items-center px-3 bg-sky-400 hover:bg-sky-600 text-white text-sm font-semibold"
            >
              <MdModeEdit /> Edit Profile
            </button>
          </div>
          <div className="w-full flex justify-between flex-col-reverse sm:flex-row">
            <div className="max-w-md grid grid-cols-[160px_1fr] text-slate-500">
              <p>Username</p>
              <p>
                :{" "}
                {userData && userData.username !== "" ? userData.username : ""}
              </p>
              <p>Email</p>
              <p className=" whitespace-nowrap">
                : {userData && userData.email !== "" ? userData.email : ""}
              </p>
              <p className="font-semibold">Nama</p>
              <p>
                :{" "}
                {userData && userData.profile.name !== ""
                  ? userData.profile.name
                  : ""}
              </p>
              <p className="font-semibold">Tgl. Lahir</p>
              <p>
                :{" "}
                {userData && userData.profile.birthdate !== ""
                  ? userData.profile.birthdate
                  : ""}
              </p>
              <p className="font-semibold">No. Telp</p>
              <p>
                :{" "}
                {userData && userData.profile.phone_number !== ""
                  ? userData.profile.phone_number
                  : ""}
              </p>
            </div>
            <div className="relative w-full p-3 sm:p-0 flex justify-center sm:w-max">
              <div className="relative group transition-all duration-500  border border-purple-500 cursor-pointer">
                <Image
                  src={
                    userData && userData.profile.avatar_url !== ""
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
            </div>
          </div>
        </div>
      </div>
      <AnimatePresence>
        {modalOpen && <EditProfile onClose={close} data={userData.profile} />}
      </AnimatePresence>
    </section>
  );
}
