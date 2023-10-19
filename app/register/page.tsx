"use client";
import { useState, ChangeEvent, FormEvent } from "react";
import Image from "next/image";
import Link from "next/link";

interface InputText {
  name:string,
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const Register = () => {
  const [data, setData] = useState<InputText>({
    name:"",
    username:"",
    email: "",
    password: "",
    confirmPassword:"",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(data)
    setData({
      name:"",
      username:"",
      email: "",
      password: "",
      confirmPassword:"",
    })
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
            Register
          </h1>
        </Link>
        <form
          onSubmit={handleSubmit}
          className="w-64 flex flex-col py-3 gap-3 border-t border-slate-200"
        >
          <div className="group flex flex-col gap-1">
            <label htmlFor="name" className="text-sm group-focus:text-purple-500">
              Nama
            </label>
            <input
              type="text"
              name="name"
              value={data.name}
              onChange={handleChange}
              id="name"
              autoComplete="off"
              className="border border-purple-500 outline-fuchsia-500 px-2 py-1 rounded-md"
            />
          </div>
          <div className="group flex flex-col gap-1">
            <label htmlFor="username" className="text-sm group-focus:text-purple-500">
              Username
            </label>
            <input
              type="text"
              name="username"
              value={data.username}
              onChange={handleChange}
              id="username"
              autoComplete="off"
              className="border border-purple-500 outline-fuchsia-500 px-2 py-1 rounded-md"
            />
          </div>
          <div className="group flex flex-col gap-1">
            <label htmlFor="email" className="text-sm group-focus:text-purple-500">
              E-Mail
            </label>
            <input
              type="email"
              name="email"
              value={data.email}
              onChange={handleChange}
              id="email"
              autoComplete="off"
              className="peer border border-purple-500 outline-fuchsia-500 px-2 py-1 rounded-md"
            />
            <p className="mt-2 hidden peer-invalid:block text-pink-600 text-sm">
              Please provide a valid email address.
            </p>
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="password" className="text-sm">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={data.password}
              onChange={handleChange}
              id="password"
              className="border border-purple-500 outline-fuchsia-500 px-2 py-1 rounded-md"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="confirmpass" className="text-sm">
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={data.confirmPassword}
              onChange={handleChange}
              id="confirmpass"
              className="border border-purple-500 outline-fuchsia-500 px-2 py-1 rounded-md"
            />
          </div>
          <div className="border-t border-slate-200 pt-3">
            <button
              type="submit"
              disabled={false}
              className="w-full disabled:bg-slate-500 bg-purple-500 focus:bg-fuchsia-500 rounded-md px-3 py-2 text-center text-white font-bold"
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
