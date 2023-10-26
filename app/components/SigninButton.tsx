"use client";
import axios from "axios";
import { signIn, signOut, useSession } from "next-auth/react";
import { AiOutlineUser } from "react-icons/ai";
import { useEffect, useState } from "react";
import Link from "next/link";
import ProgressBar from "./Progressbar";
import NProgress from "nprogress";
import "../nprogress.css";

const SigninButton = () => {
  const { data: session, status } = useSession();
  const [menu, setMenu] = useState(false);
  const handleLogout = async () => {
    const res = await axios.post("/api/logout").then((res) => {
      signOut({ callbackUrl: "/login" });
    });
    return res;
  };
  // console.log(status);
  // if (status === "loading") {
  //   // NProgress.start();
  //   return (
  //     <div role="status">
  //       <svg
  //         aria-hidden="true"
  //         className="w-8 h-8 mr-2 text-transparent animate-spin fill-white"
  //         viewBox="0 0 100 101"
  //         fill="none"
  //         xmlns="http://www.w3.org/2000/svg"
  //       >
  //         <path
  //           d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
  //           fill="currentColor"
  //         />
  //         <path
  //           d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
  //           fill="currentFill"
  //         />
  //       </svg>
  //       <span className="sr-only">Loading...</span>
  //     </div>
  //   );
  // }

  const handleMenu = () => {
    setMenu((prev) => !prev);
  };

  useEffect(() => {
    NProgress.configure({ showSpinner: false, speed: 1000 });
    NProgress.start();
    NProgress.set(0.8);
    if (status !== "loading") {
      NProgress.done();
    }
  }, [status]);
  return (
    <div className="flex relative">
      {status === "authenticated" ? (
        session.user && (
          <>
            <button
              onClick={status === "authenticated" ? handleMenu : () => signIn()}
              className="p-2 object-contain hover:bg-purple-100/50 transition duration-300 ease-in-out rounded-full"
            >
              <AiOutlineUser className="text-white stroke-2 w-6 h-6" />
            </button>
            <div
              onMouseLeave={handleMenu}
              className={`${
                menu
                  ? "visible opacity-1 pointer-events-auto"
                  : "invisible opacity-0 pointer-events-none"
              } absolute right-0 top-12 min-w-64 py-1 px-3 flex flex-col justify-between bg-white z-50 rounded-md boeder border-slate-200 shadow-md transition-all duration-200 ease`}
            >
              <div className="w-full py-1 text-slate-700 flex items-center gap-3">
                <div className="w-9 h-9 shrink-0 flex justify-center items-center bg-purple-500 rounded-full">
                  <p className="text-white font-medium text-xl">
                    {session.user.name.charAt(0)}
                  </p>
                </div>
                <div className="w-full pb-3">
                  <h2 className="text-lg font-semibold">{session.user.name}</h2>
                  <div className="flex gap-1">
                    {session.user.roles.map((role, index) => (
                      <p
                        key={index}
                        className={`${
                          index === 1
                            ? "bg-blue-100 text-blue-600"
                            : "bg-emerald-100 text-emerald-600"
                        } text-xs font-medium uppercase py-1 px-2 rounded-md`}
                      >
                        {role}
                      </p>
                    ))}
                  </div>
                  <p className=" text-sm">{session.user.email}</p>
                </div>
              </div>
              <div className="w-full py-1 flex justify-around border-t border-slate-300">
                <Link
                  href={"/account"}
                  className="text-blue-500 font-medium py-1 px-2 rounded-md hover:bg-blue-200"
                >
                  Info Akun
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-rose-500 font-medium py-1 px-2 rounded-md hover:bg-rose-200"
                >
                  Log Out
                </button>
              </div>
            </div>
          </>
        )
      ) : (
        <button
          onClick={() => signIn()}
          disabled={status === "loading"}
          className="p-2 object-contain hover:bg-purple-100/50 transition duration-300 ease-in-out rounded-full"
        >
          <AiOutlineUser className="text-white stroke-2 w-6 h-6" />
        </button>
      )}
    </div>
  );
};

export default SigninButton;
