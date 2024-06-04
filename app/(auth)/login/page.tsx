"use client";
import { LoginFom, LoginForm } from "@/lib/types/auth";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Link from "next/link";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PasswordInput } from "@/components/ui/password-input";
import { LoginWithGoogle } from "@/lib/utils/action/AuthActions";
import { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { AiFillGoogleCircle } from "react-icons/ai";

export default function Login() {
  const router = useRouter();
  const [cap, setCap] = useState<string | null>(null);
  const form = useForm<LoginForm>({
    resolver: zodResolver(LoginFom),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const isLoading = form.formState.isSubmitting;
  const onSubmit = async (data: LoginForm) => {
    if (cap !== null) {
      try {
        await signIn("credentials", {
          username: data.email,
          password: data.password,
          "g-recaptcha-response": cap,
          grant_type: "password",
          client_id: process.env.NEXT_PUBLIC_BACKEND_CLIENT_ID,
          client_secret: process.env.NEXT_PUBLIC_BACKEND_CLIENT_SECRET,
          redirect: false,
          callbackUrl: "/",
        }).then((res) => {
          if (res?.ok) {
            toast.success("Berhasil login");
            router.push("/");
          } else {
            toast.error(res!.error as string);
          }
        });
      } catch (error) {
        console.log(error);
      }
    } else {
      toast.error("Harap isi captcha");
    }
  };

  // const getCaptcha = () => {
  //   console.log(cap);
  // };

  return (
    <Card>
      <CardHeader>
        <Link href={"/"} className="w-full flex justify-center items-end px-1">
          <Image
            src={"/assets/icon/logo.png"}
            alt="logo"
            width={250}
            height={250}
            className="object-contain w-16 lg:w-24"
          />
          <CardTitle>
            <span className="font-semibold text-2xl py-1">Shop</span>
          </CardTitle>
        </Link>
        <div className="text-center text-xl font-bold text-secondary text-slate-600 dark:text-white py-2 border-b">
          <p>Login</p>
        </div>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      placeholder="example@mail.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <PasswordInput disabled={isLoading} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <ReCAPTCHA
              sitekey="6LethIQpAAAAAF8dEedS-q0Z5jnVH6cKXH9UzMle"
              onChange={(v) => setCap(v)}
            />
            <Button size={"full"} disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting ? "Proses" : "Masuk"}
            </Button>
          </form>
        </Form>
        <div className="flex flex-col py-3">
          <CardDescription>with media:</CardDescription>
          <Button onClick={() => signIn("google")} className="gap-1">
            <AiFillGoogleCircle className="text-2xl" /> Google
          </Button>
        </div>
      </CardContent>
      <CardFooter>
        <div className="w-full flex justify-center">
          <p className="text-sm">
            <Link
              className="font-bold text-primary dark:text-white"
              href={"/register"}
            >
              Daftar
            </Link>{" "}
            atau{" "}
            <Link
              className="font-bold text-primary dark:text-white"
              href={"/forgot-password"}
            >
              Lupa Password?
            </Link>
          </p>
        </div>
      </CardFooter>
    </Card>
  );
}
