import React from "react";
import Image from "next/image";
import { MdLogout, MdMenu } from "react-icons/md";
import { getProfie } from "@/lib/utils/action/profileAction";
import UsersNavigation from "@/components/users/UsersNavigation";
import AuthenticationButton from "@/components/AuthenticationButton";

export default async function UsersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const profileData = await getProfie();
  return (
    <section className="w-full px-0 container h-auto min-h-screen flex">
      <div className="h-auto sm:w-1/4 sm:px-2 shrink-0 bg-accent sm:border-r-2">
        {/* <button className="block sm:hidden p-3 text-slate-600 rounded-full hover:bg-slate-100">
          <MdMenu className="w-6 h-6 " />
        </button> */}
        <div className="w-full md:px-3 shrink-0">
          <div className="w-full py-6 flex flex-col items-center gap-2">
            <div className="w-10 h-10 sm:w-20 sm:h-20 shrink-0 flex justify-center items-center bg-primary/25 rounded-full overflow-hidden ring-2 ring-primary">
              {profileData && profileData ? (
                profileData.profile.avatar_url !== null ? (
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
            <div className="hidden sm:block text-center">
              <h2 className="font-semibold">
                {profileData ? profileData.profile.name : "Guest"}
              </h2>
              <p className="text-sm text-primary dark:text-white">
                {profileData ? "@" + profileData.username : "@unknown"}
              </p>
            </div>
          </div>
          <div>
            <UsersNavigation />
          </div>
          <div className="sm:hidden">
            <AuthenticationButton type="logout" />
          </div>
        </div>
      </div>
      <div className="w-full h-full flex flex-col sm:flex-row bg-secondary/25">
        {children}
      </div>
    </section>
  );
}
