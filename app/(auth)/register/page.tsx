"use client";

import { DevTool } from "@hookform/devtools";
import { format } from "date-fns";
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
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "@radix-ui/react-icons";

export default function Register() {
  const router = useRouter();
  const form = useForm<FormRegister>({
    resolver: zodResolver(FormRegister),
  });
  const isLoading = form.formState.isLoading;
  const onSubmit = async (data: FormRegister) => {
    const newData = {
      ...data,
      birthdate: format(data.birthdate, "yyyy/MM/dd"),
    };
    try {
      await RegisterAction(newData)
        .then((res) => {
          console.log(res);
          toast.success(res.message);
          router.push("/login");
        })
        .catch((err: any) => {
          toast.error(err.message);
        });
    } catch (error) {
      console.log(error);
    }
  };
  function padTo2Digits(num: any) {
    return num.toString().padStart(2, "0");
  }
  function formatDate(date: any) {
    return [
      padTo2Digits(date.getDate()),
      padTo2Digits(date.getMonth() + 1),
      date.getFullYear(),
    ].join("/");
  }
  return (
    <>
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
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-full pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="end">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) =>
                              date > new Date() || date < new Date("1900-01-01")
                            }
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
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
              <Button
                size={"lg"}
                className="w-full"
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting ? "Proses" : "Daftar"}
              </Button>
            </form>
          </Form>
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
      {/* <div className="w-full text-center">
        <h1 className="font-semibold text-lg text-slate-600">Daftar Baru</h1>
      </div> */}
      {/* <form
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
              placeholder="John Doe"
              className="border border-primary-dark outline-secondary-dark px-3 py-2 rounded-md placeholder:text-sm"
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
              placeholder="john311"
              className="border border-primary-dark outline-secondary-dark px-3 py-2 rounded-md placeholder:text-sm"
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
              placeholder="example@mail.com"
              className="peer border border-primary-dark outline-secondary-dark px-3 py-2 rounded-md placeholder:text-sm"
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
              className="peer border border-primary-dark outline-secondary-dark px-3 py-2 rounded-md "
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
              placeholder="password min. 8 karakter"
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
      </form> */}
      {/* <div className="w-full mx-auto text-center">
        <p className="font-semibold text-sm text-slate-500">
          Sudah punya akun?{" "}
          <Link className="font-bold text-primary-dark" href={"/login"}>
            Masuk
          </Link>
        </p>
      </div> */}
    </>
  );
}
