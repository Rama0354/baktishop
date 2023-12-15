import Image from "next/image";
import React from "react";
import { MdNotifications } from "react-icons/md";

export default function NotificationsPage() {
  return (
    <section className="container px-3 mt-3 mb-12 min-h-screen flex flex-col bg-white border border-slate-300 rounded-md shadow-md">
      <div className="w-full flex items-center gap-3 border-b-2 border-slate-300 py-1 px-6 md:py-2">
        <MdNotifications className="text-slate-700 w-6 h-6" />
        <h1 className="py-2 font-semibold text-xl text-slate-700">
          Notifikasi
        </h1>
      </div>
      <div className="w-full py-3 px-6 flex gap-3">
        <div className="w-full flex justify-center">
          <Image
            src={"/assets/img/not-found-notification.jpg"}
            width={300}
            height={300}
            alt="notifications"
          />
        </div>
      </div>
    </section>
  );
}
