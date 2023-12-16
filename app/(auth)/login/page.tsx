"use client";
import { LoginFom, LoginForm } from "@/app/lib/types/auth";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import toast from "react-hot-toast";
import Link from "next/link";

export default function Login() {
  const router = useRouter();
  // const { status } = useSession();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitSuccessful, isSubmitting },
    setValue,
  } = useForm<LoginForm>({
    resolver: zodResolver(LoginFom),
  });
  const onSubmit = async (data: LoginForm) => {
    if (isSubmitSuccessful) {
      await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
        callbackUrl: "/",
      }).then((res) => {
        if (res?.ok) {
          toast.success("Berhasil login");
          router.push("/");
        } else {
          toast.error("Email atau password anda salah");
        }
      });
    }
  };

  // useEffect(() => {
  //   if (status === "unauthenticated") {
  //     console.log("No JWT");
  //     //   console.log(status);
  //     //   void signIn("okta");
  //   } else if (status === "authenticated") {
  //     void router.push("/");
  //   }
  // }, [router, status]);

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-64 flex flex-col py-3 gap-3 border-t border-slate-200"
      >
        <div className="group flex flex-col gap-1">
          <label
            htmlFor="email"
            className="text-sm group-focus:text-purple-500"
          >
            E-Mail
          </label>
          <input
            type="text"
            id="email"
            {...register("email")}
            className="border border-primary-dark outline-secondary-dark px-3 py-2 rounded-md"
          />
          {errors.email && (
            <p className="text-xs italic text-red-500 mt-2">
              {" "}
              {errors.email?.message}
            </p>
          )}
        </div>
        <div className="flex flex-col gap-1">
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
        <div className="bg-slate-200 mt-3">
          <button
            type="submit"
            disabled={isSubmitting}
            className="text-white bg-primary-dark hover:bg-secondary-dark focus:ring-4 focus:outline-none focus:ring-blue-300 disabled:bg-slate-500 font-medium rounded-lg text-sm w-full sm:max-w-xs px-5 py-2.5 text-center "
          >
            {isSubmitting ? "Proses" : "Masuk"}
          </button>
        </div>
      </form>
      <div className="w-full mx-auto text-center">
        <p className="font-semibold text-sm text-slate-500">
          Belum punya akun?{" "}
          <Link className="font-bold text-primary-dark" href={"/register"}>
            Daftar
          </Link>
        </p>
      </div>
    </>
  );
}
