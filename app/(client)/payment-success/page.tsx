import Link from "next/link";
import React from "react";

export default function ThanksPage() {
  return (
    <div className="container w-full flex items-center bg-secondary/25 h-screen">
      <div className="bg-secondary p-6  md:mx-auto">
        <svg
          viewBox="0 0 24 24"
          className="text-green-600 w-16 h-16 mx-auto my-6"
        >
          <path
            fill="currentColor"
            d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z"
          ></path>
        </svg>
        <div className="text-center">
          <h3 className="md:text-2xl text-base font-semibold text-center">
            Pembayaran Berhasil!
          </h3>
          <p className=" my-2">
            Terima Kasih telah belanja di tempat kami, Kami akan segera
            memproses pesanan anda.
          </p>
          <p> Semoga hari anda menyenangkan! </p>
          <div className="w-full py-10 text-center flex items-center justify-center gap-3">
            <Link
              href={"/"}
              className="px-12 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3"
            >
              Lanjut Belanja
            </Link>
            <Link
              href={"/users"}
              className="px-12 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3"
            >
              Kembali Ke Dashboard
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
