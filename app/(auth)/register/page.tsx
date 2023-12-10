"use client";

export default function Register() {
  return (
    <form className="w-64 flex flex-col py-3 gap-3 border-t border-slate-200">
      <div className="group flex flex-col gap-1">
        <label htmlFor="name" className="text-sm group-focus:text-purple-500">
          Nama
        </label>
        <input
          type="text"
          name="name"
          id="name"
          autoComplete="off"
          className="border border-purple-500 outline-fuchsia-500 px-2 py-1 rounded-md"
        />
      </div>
      <div className="group flex flex-col gap-1">
        <label
          htmlFor="username"
          className="text-sm group-focus:text-purple-500"
        >
          Username
        </label>
        <input
          type="text"
          name="username"
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
          id="confirmpass"
          className="border border-purple-500 outline-fuchsia-500 px-2 py-1 rounded-md"
        />
      </div>
      <div className="border-t border-slate-200 pt-3">
        <button
          type="submit"
          className="w-full disabled:bg-slate-500 bg-purple-500 focus:bg-fuchsia-500 rounded-md px-3 py-2 text-center text-white font-bold"
        >
          Register
        </button>
      </div>
    </form>
  );
}
