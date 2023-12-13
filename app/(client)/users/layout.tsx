import React from "react";
import UsersNavigation from "@/app/components/users/UsersNavigation";
import Image from "next/image";
import { getProfie } from "@/app/lib/utils/action/profileAction";
import { MdLogout, MdMenu } from "react-icons/md";
import AuthenticationhButton from "@/app/components/AuthenticationButton";
import AuthenticationButton from "@/app/components/AuthenticationButton";

export default async function UsersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const profileData = await getProfie();
  return (
    <section className="container h-full mt-3 min-h-screen flex border border-slate-300 overflow-hidden rounded-md shadow-md bg-gradient-to-br from-white to-slate-200">
      <div className="w-max sm:w-1/4 py-1 px-0 sm:px-2 shrink-0">
        <button className="block sm:hidden p-3 text-slate-600 rounded-full hover:bg-slate-100">
          <MdMenu className="w-6 h-6 " />
        </button>
        <div className="w-full md:px-3 shrink-0">
          <div className="w-full py-6 flex flex-col items-center">
            <div className="w-10 h-10 sm:w-20 sm:h-20 shrink-0 flex justify-center items-center bg-primary-dark rounded-full overflow-hidden ring-2 ring-primary-dark">
              {profileData ? (
                profileData.profile.avatar_url !== "" ? (
                  <Image
                    src={profileData.profile.avatar_url}
                    width={100}
                    height={100}
                    alt={`${profileData.username}-avatar`}
                  />
                ) : (
                  <p className="text-white font-medium text-xl">
                    {profileData.profile.name.charAt(0)}
                  </p>
                )
              ) : (
                <p className="text-white font-medium text-xl">G</p>
              )}
            </div>
            <div className="hidden sm:block">
              <h2 className="font-semibold text-slate-600">
                {profileData ? profileData.profile.name : "Guest"}
              </h2>
              <p className="text-sm text-slate-600">
                {profileData ? "@" + profileData.username : "@unknown"}
              </p>
            </div>
          </div>
          <div>
            <UsersNavigation />
          </div>
          <div className="sm:hidden bg-white rounded-md mt-6 px-1 py-2 flex justify-center items-center text-rose-600 hover:bg-rose-100 cursor-pointer">
            <AuthenticationButton type="logout" />
          </div>
        </div>
      </div>
      <div className="w-full flex flex-col sm:flex-row">{children}</div>
    </section>
  );
}
