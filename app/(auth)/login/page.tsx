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
  FormDescription,
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

export default function Login() {
  const router = useRouter();
  const form = useForm<LoginForm>({
    resolver: zodResolver(LoginFom),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const isLoading = form.formState.isSubmitting;
  const onSubmit = async (data: LoginForm) => {
    try {
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
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Card className="w-80 shadow-md">
      <CardHeader>
        <CardTitle>
          <Link
            href={"/"}
            className="w-full flex justify-center items-end px-1"
          >
            <Image
              src={"/assets/icon/logo.png"}
              alt="logo"
              width={250}
              height={250}
              className="object-contain w-16 lg:w-24"
            />
            <h1 className="font-semibold text-2xl py-1">Shop</h1>
          </Link>
        </CardTitle>
        <CardDescription className="text-center text-xl font-bold">
          Login
        </CardDescription>
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
            <Button
              size={"lg"}
              className="w-full"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? "Proses" : "Masuk"}
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="w-full flex justify-center">
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
      </CardFooter>
    </Card>
  );
}
