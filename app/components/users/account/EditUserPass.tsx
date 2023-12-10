"use client";
import { FormEditProfile, Profile } from "@/app/lib/types/profile";
import { DevTool } from "@hookform/devtools";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import ModalContent from "../../ModalContent";
import { editProfile } from "@/app/lib/utils/action/profileAction";
import toast from "react-hot-toast";
import { FormEditPassword } from "@/app/lib/types/user";
import { changePassword } from "@/app/lib/utils/action/UserActions";

export default function EditUserPassword({ onClose }: { onClose: () => void }) {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitSuccessful, isSubmitting },
    setValue,
  } = useForm<FormEditPassword>({
    resolver: zodResolver(FormEditPassword),
  });

  const onSubmit = async (data: FormEditPassword) => {
    if (isSubmitSuccessful) {
      await changePassword(data)
        .then(() => {
          toast.success("Berhasil Diubah");
          onClose();
        })
        .catch((error) => {
          console.log(error);
          toast.error("Ada Masalah");
        });
    }
  };
  return (
    <ModalContent closeModal={onClose} title="Ubah Password">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="relative z-0 w-full mb-6 group">
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Password Baru
          </label>
          <input
            type="password"
            id="password"
            {...register("password")}
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="********"
          />
          {errors.password && (
            <p className="text-xs italic text-red-500 mt-2">
              {" "}
              {errors.password?.message}
            </p>
          )}
        </div>
        <div className="relative z-0 w-full mb-6 group">
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Confirm Password
          </label>
          <input
            type="password"
            id="password"
            {...register("confirmPassword")}
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="********"
          />
          {errors.confirmPassword && (
            <p className="text-xs italic text-red-500 mt-2">
              {" "}
              {errors.confirmPassword?.message}
            </p>
          )}
        </div>
        <div className="w-full flex justify-center">
          <button
            type="submit"
            disabled={isSubmitting}
            className="text-white bg-primary-dark hover:bg-secondary-dark focus:ring-4 focus:outline-none focus:ring-blue-300 disabled:bg-slate-500 font-medium rounded-lg text-sm w-full sm:max-w-xs px-5 py-2.5 text-center "
          >
            {isSubmitting ? "Menyimpan" : "Simpan"}
          </button>
        </div>
        <DevTool control={control} />
      </form>
    </ModalContent>
  );
}
