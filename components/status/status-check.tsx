"use client";
import {
  ResendEmailVerificationAction,
  VerifedStatus,
  refreshTokenApiCall,
} from "@/lib/utils/action/AuthActions";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import toast from "react-hot-toast";
import { MdClose, MdOutlineWarningAmber } from "react-icons/md";

export default function StatusCheck() {
  const { data: session, status, update } = useSession();
  const router = useRouter();
  useEffect(() => {
    if (status === "authenticated") {
      const emailCheck = async () => {
        const verifed = await VerifedStatus(session.user.id);
        if (verifed === "unverified") {
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
                        Link verifikasi hanya berlaku 1x24 jam bila ingin
                        mengirim verifikasi ulang silahkan klik berikut
                      </p>
                      <button
                        onClick={async () => {
                          await ResendEmailVerificationAction(
                            session.user.email
                          )
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
      };
      emailCheck();
    }
    return () => {};
  }, [status, session, update, router]);
  useEffect(() => {
    if (status === "authenticated") {
      let dateNow = Date.now();
      if (dateNow > session.expires_at + 4000) {
        const refresh = async () => {
          await refreshTokenApiCall(session.refresh_token).then((res) => {
            console.log(res);
            if (res.status_code === 200) {
              update({
                ...session,
                refresh_token: res.data.refresh_token,
                access_token: res.data.access_token,
                expires_at: Math.ceil(dateNow + res.data.expires_in * 1000),
              });
              router.refresh();
            } else {
              console.log(res);
              signOut();
            }
          });
        };
        refresh();
      }
    }
    return () => {};
  }, [router, session, status, update]);
  return null;
}
