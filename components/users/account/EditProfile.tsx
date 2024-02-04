"use client";
import { FormEditProfile, Profile } from "@/lib/types/profile";
import { DevTool } from "@hookform/devtools";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import ModalContent from "@/components/ModalContent";
import { editProfile } from "@/lib/utils/action/profileAction";
import toast from "react-hot-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function EditProfile({
  onClose,
  data,
}: {
  onClose: () => void;
  data: Profile;
}) {
  const form = useForm<FormEditProfile>({
    resolver: zodResolver(FormEditProfile),
  });
  const isLoading = form.formState.isLoading;

  useEffect(() => {
    if (data !== null) {
      form.setValue("id", data.id);
      form.setValue("name", data.name);
      form.setValue("phone_number", data.phone_number);
      form.setValue("birthdate", data.birthdate);
    }
  }, [data, form]);

  const onSubmit = async (data: FormEditProfile) => {
    await editProfile(data)
      .then(() => {
        toast.success("Berhasil Diubah");
        onClose();
      })
      .catch((error) => {
        console.log(error);
        toast.error("Ada Masalah");
      });
  };
  return (
    <ModalContent closeModal={onClose} title="Ubah Profile">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nama</FormLabel>
                <FormControl>
                  <Input disabled={isLoading} placeholder="Budi" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone_number"
            render={({ field }) => (
              <FormItem>
                <FormLabel>No. Telp</FormLabel>
                <FormControl>
                  <Input
                    disabled={isLoading}
                    placeholder="0813 1231 23123"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="birthdate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tgl. Lahir</FormLabel>
                <FormControl>
                  <Input disabled={isLoading} type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            size={"lg"}
            className="w-full"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? "Proses" : "Simpan"}
          </Button>
        </form>
      </Form>
      {/* <form onSubmit={handleSubmit(onSubmit)}>
        <input type="text" className="hidden" {...register("id")} />
        {errors.id && (
          <p className="text-xs italic text-red-500 mt-2">
            {" "}
            {errors.id?.message}
          </p>
        )}
        <div className="relative z-0 w-full mb-6 group">
          <label
            htmlFor="name"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Nama
          </label>
          <input
            type="text"
            id="name"
            {...register("name")}
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="Admin"
          />
          {errors.name && (
            <p className="text-xs italic text-red-500 mt-2">
              {" "}
              {errors.name?.message}
            </p>
          )}
        </div>
        <div className="grid md:grid-cols-2 md:gap-6">
          <div className="relative z-0 w-full mb-6 group">
            <label
              htmlFor="phone"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Nomor Telepon
            </label>
            <input
              type="tel"
              id="phone"
              {...register("phone_number")}
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="081312341234"
            />
            {errors.phone_number && (
              <p className="text-xs italic text-red-500 mt-2">
                {" "}
                {errors.phone_number?.message}
              </p>
            )}
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
              id="birthdate"
              {...register("birthdate")}
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            />
            {errors.birthdate && (
              <p className="text-xs italic text-red-500 mt-2">
                {" "}
                {errors.birthdate?.message}
              </p>
            )}
          </div>
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
      </form> */}
    </ModalContent>
  );
}
