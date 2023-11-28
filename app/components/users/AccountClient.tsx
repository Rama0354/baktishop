"use client";
import { UserData } from "@/app/lib/types/user";
import Image from "next/image";
import React from "react";
import { AiOutlineIdcard } from "react-icons/ai";
import { MdModeEdit } from "react-icons/md";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import ModalContent from "../ModalContent";
import { FormEditProfile } from "@/app/lib/types/profile";
import { editProfile } from "@/app/lib/utils/action/profileAction";

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
        {modalOpen && (
          <EditProfileForm onClose={close} data={userData.profile} />
        )}
      </AnimatePresence>
    </section>
  );
}

const EditProfileForm = ({
  onClose,
  data,
}: {
  onClose: () => void;
  data: FormEditProfile;
}) => {
  return (
    <ModalContent closeModal={onClose} title="Ubah Profile">
      <form action={editProfile}>
        <input
          type="text"
          id="profileid"
          name="profileid"
          defaultValue={data.id}
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
            defaultValue={data.name}
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
              name="phone"
              id="phone"
              defaultValue={data.phone_number}
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
              defaultValue={data.birthdate}
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              required
            />
          </div>
        </div>
        <div className="w-full flex justify-end gap-6">
          <button
            type="submit"
            className="text-white bg-primary-dark hover:bg-secondary-dark focus:ring-4 focus:outline-none focus:ring-slate-300 font-bold rounded-lg text-sm w-full sm:w-auto px-9 py-2.5 text-center"
          >
            Simpan
          </button>
        </div>
      </form>
    </ModalContent>
  );
};
