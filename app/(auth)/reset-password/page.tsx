"use client";
import { FormResetPass } from "@/lib/types/auth";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

export default function ResetPasswordPage() {
  const searchparams = useSearchParams();
  const router = useRouter();
  // const { status } = useSession();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitSuccessful, isSubmitting },
    setValue,
  } = useForm<FormResetPass>({
    resolver: zodResolver(FormResetPass),
  });
  const onSubmit = async (data: FormResetPass) => {
    if (isSubmitSuccessful) {
      console.log(data);
    }
  };

  //   console.log(searchparams.get("token"));
  //   console.log(searchparams.get("email"));

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
      <div className="w-full text-center">
        <h1 className="font-semibold text-lg text-slate-600">Reset Password</h1>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-64 flex flex-col py-3 gap-3 border-t border-slate-200"
      >
        <div className="flex flex-col gap-1">
          <label htmlFor="password" className="text-sm">
            Password Baru
          </label>
          <input
            type="password"
            id="password"
            {...register("password")}
            placeholder="password min 8 karakter"
            className="border border-primary-dark outline-secondary-dark px-3 py-2 rounded-md placeholder:text-sm"
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
            placeholder="sama dengan password"
            className="border border-primary-dark outline-secondary-dark px-3 py-2 rounded-md placeholder:text-sm"
          />
          {errors.password_confirmation && (
            <p className="text-xs italic text-red-500 mt-2">
              {" "}
              {errors.password_confirmation?.message}
            </p>
          )}
        </div>
        <div className="bg-slate-200 mt-3">
          <button
            type="submit"
            disabled={isSubmitting}
            className="text-white bg-primary-dark hover:bg-secondary-dark focus:ring-4 focus:outline-none focus:ring-blue-300 disabled:bg-slate-500 font-medium rounded-lg text-sm w-full sm:max-w-xs px-5 py-2.5 text-center "
          >
            {isSubmitting ? "Proses" : "Simpan"}
          </button>
        </div>
      </form>
      <div className="w-full mx-auto text-center">
        <p className="font-semibold text-sm text-slate-500">
          Ingant akun?{" "}
          <Link className="font-bold text-primary-dark" href={"/login"}>
            Masuk
          </Link>
        </p>
      </div>
    </>
  );
}
