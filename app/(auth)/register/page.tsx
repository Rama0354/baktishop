"use client";

import { FormRegister } from "@/app/lib/types/auth";
import { RegisterAction } from "@/app/lib/utils/action/AuthActions";
import { DevTool } from "@hookform/devtools";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

export default function Register() {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<FormRegister>({
    resolver: zodResolver(FormRegister),
  });
  const onSubmit = async (data: FormRegister) => {
    if (isSubmitSuccessful) {
      await RegisterAction(data)
        .then((res) => {
          toast.success(res.message);
        })
        .catch((err: any) => {
          toast.error(err.message);
        });
    }
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full max-w-lg flex flex-col py-3 gap-3 border-t border-slate-200"
    >
      <div className="sm:grid grid-cols-2 gap-3">
        <div className="group flex flex-col gap-1 py-1">
          <label
            htmlFor="name"
            className="text-sm group-focus:text-primary-dark"
          >
            Nama
          </label>
          <input
            type="text"
            id="name"
            {...register("name")}
            autoComplete="off"
            className="border border-primary-dark outline-secondary-dark px-3 py-2 rounded-md"
          />
          {errors.name && (
            <p className="text-xs italic text-red-500 mt-2">
              {" "}
              {errors.name?.message}
            </p>
          )}
        </div>
        <div className="group flex flex-col gap-1 py-1">
          <label
            htmlFor="username"
            className="text-sm group-focus:text-primary-dark"
          >
            Username
          </label>
          <input
            type="text"
            id="username"
            {...register("username")}
            autoComplete="off"
            className="border border-primary-dark outline-secondary-dark px-3 py-2 rounded-md"
          />
          {errors.username && (
            <p className="text-xs italic text-red-500 mt-2">
              {" "}
              {errors.username?.message}
            </p>
          )}
        </div>
        <div className="group flex flex-col gap-1 py-1">
          <label
            htmlFor="email"
            className="text-sm group-focus:text-primary-dark"
          >
            E-Mail
          </label>
          <input
            type="email"
            id="email"
            {...register("email")}
            autoComplete="off"
            className="peer border border-primary-dark outline-secondary-dark px-3 py-2 rounded-md"
          />
          {errors.email && (
            <p className="text-xs italic text-red-500 mt-2">
              {" "}
              {errors.email?.message}
            </p>
          )}
        </div>
        <div className="group flex flex-col gap-1 py-1">
          <label
            htmlFor="birthdate"
            className="text-sm group-focus:text-primary-dark"
          >
            Tgl. Lahir
          </label>
          <input
            type="date"
            id="birthdate"
            {...register("birthdate")}
            className="peer border border-primary-dark outline-secondary-dark px-3 py-2 rounded-md"
          />
          {errors.birthdate && (
            <p className="text-xs italic text-red-500 mt-2">
              {" "}
              {errors.birthdate?.message}
            </p>
          )}
        </div>
        <div className="flex flex-col gap-1 py-1">
          <label htmlFor="password" className="text-sm">
            Password
          </label>
          <input
            type="password"
            id="password"
            {...register("password")}
            className="border border-primary-dark outline-secondary-dark px-3 py-2 rounded-md"
          />
          {errors.password && (
            <p className="text-xs italic text-red-500 mt-2">
              {" "}
              {errors.password?.message}
            </p>
          )}
        </div>
        <div className="flex flex-col gap-1 py-1">
          <label htmlFor="confirmpass" className="text-sm">
            Confirm Password
          </label>
          <input
            type="password"
            id="confirmpass"
            {...register("password_confirmation")}
            className="border border-primary-dark outline-secondary-dark px-3 py-2 rounded-md"
          />
          {errors.password_confirmation && (
            <p className="text-xs italic text-red-500 mt-2">
              {" "}
              {errors.password_confirmation?.message}
            </p>
          )}
        </div>
      </div>
      <div className="border-t border-slate-200 pt-3">
        <button
          type="submit"
          disabled={isSubmitting}
          className="text-white bg-primary-dark hover:bg-secondary-dark focus:ring-4 focus:outline-none focus:ring-blue-300 disabled:bg-slate-500 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center "
        >
          {isSubmitting ? "Proses" : "Daftar"}
        </button>
      </div>
      <DevTool control={control} />
    </form>
  );
}
