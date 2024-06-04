"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { PasswordInput } from "@/components/ui/password-input";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { ResetPasswordActions } from "@/lib/utils/action/AuthActions";
import toast from "react-hot-toast";
import { FormResetPass } from "@/lib/types/auth";

export default function ResetPasswordPage() {
  const searchparams = useSearchParams();
  const router = useRouter();
  const tokens = searchparams.get("token");
  const form = useForm<FormResetPass>({
    resolver: zodResolver(FormResetPass),
  });
  useEffect(() => {
    if (tokens) {
      form.setValue("token", tokens);
    }
  }, [tokens, form]);
  const isLoading = form.formState.isLoading;
  const onSubmit = async (data: FormResetPass) => {
    try {
      await ResetPasswordActions(data)
        .then((res) => {
          if (res.status === 200) {
            toast.success(res.message);
            router.push("/login");
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
    <Card className="w-[]660px] shadow-md">
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
          Reset Password
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
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
            <FormField
              control={form.control}
              name="password_confirmation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
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
              {form.formState.isSubmitting ? "Proses" : "Simpan"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
