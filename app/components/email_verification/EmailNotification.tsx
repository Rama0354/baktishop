"use client";
import React, { useEffect } from "react";
import toast from "react-hot-toast";
import { MdClose, MdInfo } from "react-icons/md";

export default function EmailNotification() {
  useEffect(() => {
    return () => {
      toast.custom(
        (t) => (
          <div
            className={`${
              t.visible ? "animate-enter" : "animate-leave"
            } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
          >
            <div className="flex-1 w-0 p-4">
              <div className="flex items-start">
                <div className="ml-3 flex-1">
                  <p className="flex gap-1 items-center text-sm font-medium text-blue-600">
                    <MdInfo className="w-6 h-6" />
                    <span>Verifikasi E-mail </span>
                  </p>
                  <p className="mt-1 text-sm text-gray-500">
                    Anda belum melakukan verifikasi email anda!
                  </p>
                </div>
              </div>
            </div>
            <div className="flex border-l border-gray-200">
              <button
                onClick={() => toast.dismiss(t.id)}
                className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-rose-600 hover:text-rose-500 focus:outline-none focus:ring-2 focus:ring-rose-500"
              >
                <MdClose className="w-6 h-6" />
              </button>
            </div>
          </div>
        ),
        {
          duration: Infinity,
          position: "top-center",
        }
      );
    };
  }, []);
  return null;
}
