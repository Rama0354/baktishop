import React from "react";
import { AiOutlineMessage } from "react-icons/ai";

export default function MessagePage() {
  return (
    <section className="container px-3 mt-3 mb-12 min-h-screen flex flex-col border border-slate-300 rounded-md shadow-md">
      <div className="w-full flex items-center gap-3 border-b-2 border-slate-300 py-1 px-6 md:py-2">
        <AiOutlineMessage className="text-slate-700 stroke-2 w-6 h-6" />
        <h1 className="py-2 font-semibold text-xl text-slate-700">Pesan</h1>
      </div>
      <div className="w-full py-3 px-6 flex gap-3">konten pesan</div>
    </section>
  );
}
