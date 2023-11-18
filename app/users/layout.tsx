import React from "react";
import ClientLayout from "../components/layouts/ClientLayout";
import { AiOutlineUser } from "react-icons/ai";
import UsersNavigation from "../components/client/UsersNavigation";
import Image from "next/image";
import { getProfie } from "../utils/action/profileAction";

export default async function UsersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const profileData = await getProfie();
  return (
    <ClientLayout>
      <section className="container px-3 mt-3 mb-12 min-h-screen flex flex-col border border-slate-300 rounded-md shadow-md">
        <div className="w-full flex items-center gap-3 border-b-2 border-slate-300 py-1 px-6 md:py-2">
          <AiOutlineUser className="text-slate-700 stroke-2 w-6 h-6" />
          <h1 className="py-2 font-semibold text-xl text-slate-700">
            Info Akun
          </h1>
        </div>
        <div className="w-full flex flex-col sm:flex-row">
          <div className="w-full sm:w-1/4 md:px-3 shrink-0">
            <div className="w-full py-6 flex flex-col items-center">
              <div className="w-20 h-20 shrink-0 flex justify-center items-center bg-purple-500 rounded-full overflow-hidden ring-2 ring-purple-500">
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
              <h2 className="font-semibold text-slate-600">
                {profileData ? profileData.profile.name : "Guest"}
              </h2>
              <p className="text-sm text-slate-600">
                {profileData ? "@" + profileData.username : "@unknown"}
              </p>
            </div>
            <UsersNavigation />
          </div>
          {children}
        </div>
      </section>
    </ClientLayout>
  );
}
