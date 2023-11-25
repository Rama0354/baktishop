"use client";
import { UserData } from "@/app/lib/types/user";
import Image from "next/image";
import React, { Fragment } from "react";
import { AiOutlineIdcard } from "react-icons/ai";
import { MdModeEdit } from "react-icons/md";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import ModalMain from "./ModalMain";
import { editProfile } from "./action";

type FormData = {
  profileId: string;
  profilename: string;
  birthdate: string;
  phone: string;
};

export default function AccountClient({ userData }: { userData: UserData }) {
  const [modalOpen, setModalOpen] = useState(false);

  const close = () => setModalOpen(false);
  const open = () => setModalOpen(true);

  return (
    <section className="w-full py-3 relative">
      <div className="w-full flex items-center gap-3 py-3 px-6 mb-3 border-b-2 border-slate-200">
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
      <AnimatePresence
        initial={false}
        // exitBeforeEnter={true}
        // onExitComplete={() => null}
      >
        {modalOpen && (
          <ModalMain handleClose={close}>
            <div className="relative bg-white rounded-lg shadow ">
              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
                <h3 className="text-xl font-semibold text-gray-900">
                  Edit Profile
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
                <form action={editProfile} onSubmit={close}>
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
                </form>
              </div>
            </div>
          </ModalMain>
        )}
      </AnimatePresence>
    </section>
  );
}
