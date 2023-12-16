import Image from "next/image";
import React from "react";

export default function EmailVerificationSuccessPage() {
  return (
    <section className="container w-full flex justify-center mx-auto min-h-screen bg-white rounded-lg">
      <div className="w-full max-w-lg h-full px-3 flex flex-col gap-1 justify-center items-center text-center text-slate-600">
        <Image
          src={"/assets/img/verification-success.png"}
          width={300}
          height={300}
          className="w-52 sm:w-80"
          alt="product-not-found"
        />
        <h1 className="text-emerald-500 text-2xl font-bold">
          Yay, Akun anda sudah Terverifikasi!
        </h1>
        <p className="text-base">
          Sekarang anda dapat bertransaksi dangan aman dan nyaman, anda juga
          dapat menggunakan fasilitas yang kami berikan
        </p>
        <p className="text-sm p-1 rounded-md bg-slate-100">
          <span className="font-bold">NB:</span> Bila anda sendang dalam posisi
          login silahkan logout terlebih dahulu kemudian login ulang
        </p>
        <p className="font-semibold">Happy Shopping 😁</p>
      </div>
    </section>
  );
}
