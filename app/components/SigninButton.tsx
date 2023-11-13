import Link from "next/link";
import Image from "next/image";
import "../nprogress.css";
import { getServerSession } from "next-auth";
import { options } from "../api/auth/[...nextauth]/options";
import AuthenticationhButton from "./AuthenticationButton";

const SigninButton = async () => {
  const session = await getServerSession(options);
  return (
    <div className="flex relative">
      {session ? (
        session.user && (
          <>
            <button className="peer p-2 object-contain hover:bg-purple-100/50 transition duration-300 ease-in-out rounded-full">
              <div className="w-6 h-6 shrink-0 flex justify-center items-start bg-purple-500 rounded-full overflow-hidden">
                {session.user.avatar_url !== null ? (
                  <Image
                    src={session.user.avatar_url}
                    width={100}
                    height={100}
                    alt={session.user.username}
                  />
                ) : (
                  <p className="text-white font-medium text-xl">
                    {session.user.name.charAt(0)}
                  </p>
                )}
              </div>
            </button>
            <div
              className={`invisible peer-hover:visible hover:visible absolute right-0 top-12 min-w-64 py-1 px-3 flex flex-col justify-between bg-white z-50 rounded-md boeder border-slate-200 shadow-md transition-all duration-200 ease`}
            >
              <div className="w-72 py-2 px-3 text-slate-700 flex items-start gap-3">
                <div className="w-9 h-9 mt-1 shrink-0 flex justify-center items-start bg-purple-500 rounded-full overflow-hidden">
                  {session.user.avatar_url !== null ? (
                    <Image
                      src={session.user.avatar_url}
                      width={100}
                      height={100}
                      alt={session.user.username}
                    />
                  ) : (
                    <p className="text-white font-medium text-xl">
                      {session.user.name.charAt(0)}
                    </p>
                  )}
                </div>
                <div className="w-full">
                  <h2 className="text-lg font-semibold">{session.user.name}</h2>
                  <p className=" text-sm">@{session.user.username}</p>
                </div>
              </div>
              <div className="w-full py-1 flex justify-around border-t border-slate-300">
                <Link
                  href={"/users"}
                  className="text-blue-500 font-medium py-1 px-2 rounded-md hover:bg-blue-200"
                >
                  Info Akun
                </Link>
                <AuthenticationhButton type="logout" />
              </div>
            </div>
          </>
        )
      ) : (
        <AuthenticationhButton type="" />
      )}
    </div>
  );
};

export default SigninButton;
