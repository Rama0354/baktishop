"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormForgotPass } from "@/lib/types/auth";
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
import Image from "next/image";
import { ForgotPasswordActions } from "@/lib/utils/action/AuthActions";
import toast from "react-hot-toast";

export default function ForgotPassword() {
  const router = useRouter();
  const form = useForm<FormForgotPass>({
    resolver: zodResolver(FormForgotPass),
  });
  const isLoading = form.formState.isLoading;
  const onSubmit = async (data: FormForgotPass) => {
    try {
      await ForgotPasswordActions(data)
        .then((res) => {
          if (res.status === 200) {
            toast.success(res.message);
          } else {
            toast.error(res.message);
          }
        })
        .catch((err: any) => {
          console.log(err);
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
          Lupa Password
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
            <Button
              size={"lg"}
              className="w-full"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? "Proses" : "Kirim"}
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="w-full flex justify-center">
        <p className="text-sm">
          Ingat akun?{" "}
          <Link
            className="font-bold text-primary dark:text-white"
            href={"/login"}
          >
            Masuk
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}
