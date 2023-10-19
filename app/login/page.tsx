"use client";
import { useState, ChangeEvent, FormEvent } from "react";
import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

interface InputText {
  email: string;
  password: string;
}

const Login = () => {
  const [credentials, setCredentials] = useState<InputText>({
    email: "",
    password: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    signIn("credentials", {
      email: credentials.email,
      password: credentials.password,
      redirect: true,
      callbackUrl: "/",
    });
  };
  return (
    <div className="w-full min-h-screen flex justify-center items-center bg-gradient-to-tl from-purple-300 via-white to-fuchsia-300">
      <div className=" py-6 px-3 flex flex-col gap-3 items-center justify-center bg-white rounded-md border border-purple-300 shadow-md">
        <Link href={"/"} className="w-full flex justify-center items-end px-1 text-slate-700">
          <Image
            src={"/assets/img/logo2.png"}
            alt="logo"
            width={250}
            height={250}
            className="object-contain w-16 lg:w-24"
          />
          <h1 className="font-semibold text-2xl py-1">
            Shop
          </h1>
        </Link>
        <form
          onSubmit={handleSubmit}
          className="w-64 flex flex-col py-3 gap-3 border-t border-slate-200"
        >
          <div className="group flex flex-col gap-1">
            <label htmlFor="email" className="text-sm group-focus:text-purple-500">
              E-Mail
            </label>
            <input
              type="text"
              name="email"
              value={credentials.email}
              onChange={handleChange}
              id="username"
              // autoComplete="off"
              className="border border-purple-500 outline-fuchsia-500 px-2 py-1 rounded-md"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="password" className="text-sm">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={credentials.password}
              onChange={handleChange}
              id="password"
              className="border border-purple-500 outline-fuchsia-500 px-2 py-1 rounded-md"
            />
          </div>
          <div className="bg-slate-200 mt-3">
            <button
              type="submit"
              className="w-full bg-purple-500 focus:bg-fuchsia-500 rounded-md px-3 py-2 text-center text-white font-bold"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
