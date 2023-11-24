import React from "react";
import { AiOutlineBell } from "react-icons/ai";

export default function NotificationButton() {
  return (
    <div className="group relative">
      <button className="relative p-2 group-hover:bg-primary-light transition duration-300 ease-in-out rounded-full">
        <AiOutlineBell className="text-white stroke-2 w-6 h-6" />
        <span
          className={`${
            notifications.length === 0 ? "hidden" : ""
          } absolute top-0 right-0 flex shrink justify-center items-center w-5 h-5 p-0.5 text-xs font-semibold rounded-full bg-white text-primary-dark`}
        >
          {notifications.length}
        </span>
      </button>
      <div className="absolute right-0 top-9 group-hover:visible group-hover:pointer-events-auto invisible pointer-events-none transition duration-300 ease-in-out">
        <div className="w-64 mt-3 py-1 px-3 flex flex-col justify-between bg-white z-50 rounded-md boeder border-slate-200 shadow-md">
          <div className="w-full py-2 px-3 border-b-2 border-slate-100">
            <h2 className="text-slate-600 text-xl font-semibold">
              Pemberitahuan
            </h2>
          </div>
          <div className="w-full text-slate-600">
            <ul className="max-h-64 overflow-auto">
              {notifications.map((notif) => (
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
              ))}
            </ul>
          </div>
          <div className="w-full py-1 px-3 border-t-2 border-slate-100">
            <h2 className="text-purple-500 text-sm font-semibold text-center">
              Lihat semua
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
}

const notifications = [
  {
    id: 1,
    text: "semua text pemberitahuan ada disini dan bisa dibaca secara realtime",
  },
  {
    id: 2,
    text: "semua pemberitahuan akan muncul",
  },
  {
    id: 3,
    text: "semua text pemberitahuan ada disini dan bisa dibaca secara realtime",
  },
  {
    id: 4,
    text: "semua pemberitahuan akan muncul",
  },
  {
    id: 5,
    text: "semua text pemberitahuan ada disini dan bisa dibaca secara realtime",
  },
  {
    id: 6,
    text: "semua pemberitahuan akan muncul",
  },
  {
    id: 7,
    text: "semua text pemberitahuan ada disini dan bisa dibaca secara realtime",
  },
  {
    id: 8,
    text: "semua pemberitahuan akan muncul",
  },
  {
    id: 9,
    text: "semua text pemberitahuan ada disini dan bisa dibaca secara realtime",
  },
  {
    id: 10,
    text: "semua pemberitahuan akan muncul",
  },
  {
    id: 11,
    text: "semua text pemberitahuan ada disini dan bisa dibaca secara realtime",
  },
  {
    id: 12,
    text: "semua pemberitahuan akan muncul",
  },
  {
    id: 13,
    text: "semua text pemberitahuan ada disini dan bisa dibaca secara realtime",
  },
  {
    id: 14,
    text: "semua pemberitahuan akan muncul",
  },
  {
    id: 15,
    text: "semua text pemberitahuan ada disini dan bisa dibaca secara realtime",
  },
  {
    id: 16,
    text: "semua pemberitahuan akan muncul",
  },
];
