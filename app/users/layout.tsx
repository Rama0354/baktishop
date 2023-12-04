import React from "react";
import ClientLayout from "../components/layouts/ClientLayout";
import UsersNavigation from "../components/users/UsersNavigation";
import Image from "next/image";
import { getProfie } from "../lib/utils/action/profileAction";

export default async function UsersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const profileData = await getProfie();
  return (
    <ClientLayout>
      <section className="container h-full mt-3 min-h-screen flex flex-col border border-slate-300 overflow-hidden rounded-md shadow-md bg-gradient-to-br from-white to-slate-200">
        <div className="w-full flex flex-col sm:flex-row">
          <div className="w-full sm:w-1/4 md:px-3 shrink-0">
            <div className="w-full py-6 flex flex-col items-center">
              <div className="w-20 h-20 shrink-0 flex justify-center items-center bg-primary-dark rounded-full overflow-hidden ring-2 ring-primary-dark">
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
