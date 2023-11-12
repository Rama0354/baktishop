import React from "react";
import { AiOutlineIdcard } from "react-icons/ai";

export default async function AccountClient() {
  return (
    <section className="w-full pb-6">
      <div className="w-full flex items-center gap-3 py-3 px-6 mb-3 border-b border-slate-200">
        <AiOutlineIdcard className={"text-slate-700 stroke-2 w-6 h-6"} />
        <h2 className="font-semibold text-lg text-slate-700">Akun</h2>
      </div>
      <div className="w-full relative">
        <form>
          <div className="relative z-0 w-full mb-6 group">
            <label
              htmlFor="username"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="users"
              required
            />
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="name@flowbite.com"
              required
            />
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="********"
              required
            />
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <label
              htmlFor="confirmpassword"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmpassword"
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="********"
              required
            />
          </div>
          <div className="grid md:grid-cols-2 md:gap-6">
            <div className="relative z-0 w-full mb-6 group">
              <label
                htmlFor="firstname"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                First Name
              </label>
              <input
                type="text"
                id="firstname"
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="John"
                required
              />
            </div>
            <div className="relative z-0 w-full mb-6 group">
              <label
                htmlFor="lastname"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Last Name
              </label>
              <input
                type="text"
                id="lastname"
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Doe"
                required
              />
            </div>
          </div>
          <div className="grid md:grid-cols-2 md:gap-6">
            <div className="relative z-0 w-full mb-6 group">
              <label
                htmlFor="phone"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                No. Telp
              </label>
              <input
                type="tel"
                pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                id="phone"
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="081 0000 0000"
                required
              />
            </div>
            <div className="relative z-0 w-full mb-6 group">
              <label
                htmlFor="birthdate"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Tanggal Lahir
              </label>
              <input
                type="date"
                id="birthdate"
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                required
              />
            </div>
          </div>
          <button
            type="submit"
            className="text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
          >
            Simpan
          </button>
        </form>
      </div>
    </section>
  );
}
