"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { FormRegister } from "@/lib/types/auth";
import { RegisterAction } from "@/lib/utils/action/AuthActions";
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
import ReCAPTCHA from "react-google-recaptcha";
import { AiFillGoogleCircle } from "react-icons/ai";
import { signIn } from "next-auth/react";

export default function Register() {
  const router = useRouter();
  const form = useForm<FormRegister>({
    resolver: zodResolver(FormRegister),
  });
  const isLoading = form.formState.isLoading;
  const onSubmit = async (data: FormRegister) => {
    // const newData = {
    //   ...data,
    //   birthdate: format(data.birthdate, "yyyy/MM/dd"),
    // };
    if (form.watch("g-recaptcha-response") !== "") {
      try {
        await RegisterAction(data)
          .then((res) => {
            if (res.status === 200) {
              toast.success(res.message);
            } else {
              toast.error(res.message);
            }
            router.push("/login");
          })
          .catch((err: any) => {
            toast.error(err.message);
          });
      } catch (error) {
        console.log(error);
      }
    } else {
      toast.error("Harap isi captcha");
    }
  };
  function padTo2Digits(num: any) {
    return num.toString().padStart(2, "0");
  }
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
          Daftar
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
            <div className="grid sm:grid-cols-2 gap-3">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nama</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isLoading}
                        placeholder="John Doe"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isLoading}
                        placeholder="john123"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
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
                name="birthdate"
                render={({ field }) => (
                  <FormItem className="">
                    <FormLabel>Date of birth</FormLabel>
                    <Input disabled={isLoading} type="date" {...field} />
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
            </div>
            <FormField
              control={form.control}
              name="g-recaptcha-response"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Captcha</FormLabel>
                  <FormControl>
                    <ReCAPTCHA
                      sitekey="6LethIQpAAAAAF8dEedS-q0Z5jnVH6cKXH9UzMle"
                      onChange={field.onChange}
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
              {form.formState.isSubmitting ? "Proses" : "Daftar"}
            </Button>
          </form>
        </Form>
        <div className="flex flex-col py-3">
          <CardDescription>with media:</CardDescription>
          <Button onClick={() => signIn("google")} className="gap-1">
            <AiFillGoogleCircle className="text-2xl" /> Google
          </Button>
          {/* <Button onClick={() => getCaptcha()}>captcha</Button> */}
        </div>
      </CardContent>
      <CardFooter className="w-full flex justify-center">
        <p className=" text-sm">
          Sudah punya akun?{" "}
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
