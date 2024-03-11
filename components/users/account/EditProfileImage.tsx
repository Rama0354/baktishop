"use client";
import { z } from "zod";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import ModalContent from "@/components/ModalContent";
import { DevTool } from "@hookform/devtools";
import { FormChangeAvatar } from "@/lib/types/profile";
import { changeAvatarProfile } from "@/lib/utils/action/profileAction";
import fs from "fs";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";

export default function EditProfileImage({
  id,
  onClose,
}: {
  id: number;
  onClose: () => void;
}) {
  const {
    register,
    handleSubmit,
    control,
    watch,
    reset,
    formState: { errors, isSubmitting, isSubmitSuccessful, isDirty },
  } = useForm<FormChangeAvatar>({
    resolver: zodResolver(FormChangeAvatar),
    defaultValues: {
      id: id !== 0 ? id : 0,
      avatar: undefined,
    },
  });

  const image = watch("avatar");
  const imagePreview = image ? URL.createObjectURL(image[0]) : null;

  useEffect(() => {
    return () => {
      if (imagePreview !== null) URL.revokeObjectURL(imagePreview);
    };
  }, [imagePreview]);

  const onSubmitHandler = async (data: FormChangeAvatar) => {
    // build FormData for uploading image
    const formData = new FormData();
    formData.append("avatar", data.avatar[0]);
    const requestData = {
      id: data.id,
      avatar: formData,
    };
    const res = await changeAvatarProfile(requestData)
      .then((res) => {
        toast.success("Avatar Berhasil Dirubah");
        onClose();
      })
      .catch((err) => {
        toast.error("Ada masalah!");
        console.log(err.message);
      });
    reset();
    return res;
  };

  return (
    <ModalContent closeModal={onClose} title="Ubah Foto Profile">
      <form
        onSubmit={handleSubmit(onSubmitHandler)}
        className="flex flex-col gap-3"
      >
        <input {...register("id")} className="hidden" />
        {errors.id && <span>{errors.id.message}</span>}

        <div className="w-full flex justify-center">
          {imagePreview && (
            <Image src={imagePreview} width={150} height={150} alt="preview" />
          )}
        </div>

        <Controller
          name="avatar"
          control={control}
          render={({ field: { ref, name, onBlur, onChange } }) => (
            <div className="flex items-center justify-center w-full">
              <label
                htmlFor="dropzone-file"
                className="flex flex-col items-center justify-center w-full h-28 border-2 border-dashed rounded-lg cursor-pointer bg-background hover:bg-secondary "
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <svg
                    className="w-8 h-8 mb-4 "
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 16"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                    />
                  </svg>
                  <p className="mb-2 text-sm ">
                    <span className="font-semibold">Click to upload</span> or
                    drag and drop
                  </p>
                  <p className="text-xs text-gray-500">
                    SVG, PNG, JPG or GIF (MAX. 800x400px)
                  </p>
                </div>
                <input
                  type="file"
                  id="dropzone-file"
                  className="hidden"
                  ref={ref}
                  name={name}
                  onBlur={onBlur}
                  onChange={(e) => {
                    onChange(e.target.files);
                  }}
                />
              </label>
            </div>
          )}
        />

        {errors.avatar && <span>{errors.avatar.message as string}</span>}

        <Button type="submit" disabled={!isDirty || isSubmitting}>
          {isSubmitting ? "Submitting..." : "Submit"}
        </Button>
      </form>
      <DevTool control={control} />
    </ModalContent>
  );
}
