"use client";
import { ResendEmailVerificationAction } from "@/lib/utils/action/AuthActions";
import { useSession } from "next-auth/react";
import React, { useEffect } from "react";
import toast from "react-hot-toast";
import { MdClose, MdInfo, MdOutlineWarningAmber } from "react-icons/md";

export default function EmailNotification() {
  const { data: session, status } = useSession();
  useEffect(() => {
    if (status === "authenticated") {
      if (session.email_status === "unverified") {
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
                    <p className="flex gap-1 items-center text-sm font-medium text-amber-600">
                      <MdOutlineWarningAmber className="w-6 h-6" />
                      <span>E-Mail anda Belum Terverifikasi</span>
                    </p>
                    <p className="mt-1 text-xs text-gray-500">
                      Link verifikasi hanya berlaku 1x24 jam bila ingin mengirim
                      verifikasi ulang silahkan klik berikut
                    </p>
                    <button
                      onClick={async () => {
                        await ResendEmailVerificationAction(session.user.email)
                          .then(() => {
                            toast.success(
                              "Email verifikasi baru telah dikirimkan ke alamat anda"
                            );
                            return toast.dismiss(t.id);
                          })
                          .catch((err) => {
                            toast.error("ada masalah server!");
                            toast.dismiss(t.id);
                          });
                      }}
                      className="py-1 px-3 text-xs text-white bg-blue-500 hover:bg-blue-600 rounded-md"
                    >
                      Kirim Ulang
                    </button>
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
            duration: 5000,
            position: "top-center",
          }
        );
      }
    }
    return () => {};
  }, [status]);
  return null;
}
