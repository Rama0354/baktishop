"use client";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function AuthSuccess() {
  const [isLoading, setIsloading] = useState(true);
  const router = useRouter();
  const searchParams = useSearchParams();
  useEffect(() => {
    const email = searchParams.get("email");
    const token = searchParams.get("google_access_token");
    const isRegister = searchParams.get("is_register");
    const auth = async () => {
      try {
        await signIn("credentials", {
          grant_type: "social",
          provider: "google",
          username: email,
          access_token: token,
          is_register: isRegister,
          client_id: process.env.NEXT_PUBLIC_BACKEND_CLIENT_ID,
          client_secret: process.env.NEXT_PUBLIC_BACKEND_CLIENT_SECRET,
          redirect: false,
          callbackUrl: "/",
        }).then((res) => {
          if (res && res?.ok) {
            toast.success("Berhasil login");
            setIsloading(false);
            router.push("/");
          } else {
            toast.error(res!.error as string);
          }
        });
      } catch (error) {
        console.log("ada masalah");
      }
    };
    if (email !== undefined && token) {
      auth();
    }
    return () => {};
  }, [searchParams, router]);

  if (isLoading) {
    return <div>Loading...</div>;
  } else {
    return <div>Login Berhasil</div>;
  }
}
