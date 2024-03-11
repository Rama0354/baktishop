import Image from "next/image";
import Link from "next/link";
import React from "react";
import { AiOutlineBell } from "react-icons/ai";
import { z } from "zod";

export default function NotificationButton() {
  return (
    <div className="group relative">
      <Link
        href={"/notifications"}
        className="block relative p-2 group-hover:bg-white group-hover:text-primary transition duration-300 ease-in-out rounded-full text-white"
      >
        <AiOutlineBell className=" stroke-2 w-6 h-6" />
        <span
          className={`${
            notifications.length === 0 ? "hidden" : ""
          } absolute top-0 right-0 flex shrink justify-center items-center w-5 h-5 p-0.5 text-xs font-semibold rounded-full`}
        >
          {notifications.length}
        </span>
      </Link>
      <div className="absolute right-0 top-9 group-hover:visible group-hover:pointer-events-auto invisible pointer-events-none transition duration-300 ease-in-out">
        <div className="w-64 mt-3 py-1 px-3 flex flex-col justify-between z-50 rounded-md boeder shadow-md bg-background">
          <div className="w-full py-2 px-3 border-b-2">
            <h2 className=" text-xl font-semibold">Pemberitahuan</h2>
          </div>
          <div className="w-full">
            <ul className="max-h-64 overflow-auto">
              {notifications && notifications.length > 0 ? (
                notifications.map((notif) => (
                  <li
                    key={notif.id}
                    className="py-2 px-3 hover:bg-purple-100 hover:text-purple-600 rounded-md"
                  >
                    <div className="w-full">
                      <p className=" text-sm leading-4 line-clamp-2">
                        {notif.text}
                      </p>
                    </div>
                  </li>
                ))
              ) : (
                <div className="w-full mx-auto">
                  <Image
                    src={"/assets/img/not-found-notification.jpg"}
                    width={200}
                    height={200}
                    alt="notifications"
                  />
                </div>
              )}
            </ul>
          </div>
          {notifications && notifications.length > 0 ? (
            <div className="w-full py-1 px-3 border-t-2 border-slate-100">
              <h2 className="text-purple-500 text-sm font-semibold text-center">
                Lihat semua
              </h2>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

const notificationsSchema = z.array(
  z.object({
    id: z.number(),
    text: z.string(),
  })
);

export const Notificantions = notificationsSchema;
export type Notificantions = z.infer<typeof Notificantions>;

const notifications: Notificantions = [
  // {
  //   id: 1,
  //   text: "semua text pemberitahuan ada disini dan bisa dibaca secara realtime",
  // },
  // {
  //   id: 2,
  //   text: "semua pemberitahuan akan muncul",
  // },
  // {
  //   id: 3,
  //   text: "semua text pemberitahuan ada disini dan bisa dibaca secara realtime",
  // },
  // {
  //   id: 4,
  //   text: "semua pemberitahuan akan muncul",
  // },
  // {
  //   id: 5,
  //   text: "semua text pemberitahuan ada disini dan bisa dibaca secara realtime",
  // },
  // {
  //   id: 6,
  //   text: "semua pemberitahuan akan muncul",
  // },
  // {
  //   id: 7,
  //   text: "semua text pemberitahuan ada disini dan bisa dibaca secara realtime",
  // },
  // {
  //   id: 8,
  //   text: "semua pemberitahuan akan muncul",
  // },
  // {
  //   id: 9,
  //   text: "semua text pemberitahuan ada disini dan bisa dibaca secara realtime",
  // },
  // {
  //   id: 10,
  //   text: "semua pemberitahuan akan muncul",
  // },
  // {
  //   id: 11,
  //   text: "semua text pemberitahuan ada disini dan bisa dibaca secara realtime",
  // },
  // {
  //   id: 12,
  //   text: "semua pemberitahuan akan muncul",
  // },
  // {
  //   id: 13,
  //   text: "semua text pemberitahuan ada disini dan bisa dibaca secara realtime",
  // },
  // {
  //   id: 14,
  //   text: "semua pemberitahuan akan muncul",
  // },
  // {
  //   id: 15,
  //   text: "semua text pemberitahuan ada disini dan bisa dibaca secara realtime",
  // },
  // {
  //   id: 16,
  //   text: "semua pemberitahuan akan muncul",
  // },
];
