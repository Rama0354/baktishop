import React from "react";
import {
  AiOutlineDelete,
  AiOutlineEdit,
  AiOutlineEnvironment,
} from "react-icons/ai";

export default function AddressClient() {
  return (
    <>
      <div className="w-full flex items-center gap-3 py-3 px-6 mb-3 border-b border-slate-200">
        <AiOutlineEnvironment className={"text-slate-700 stroke-2 w-6 h-6"} />
        <h2 className="font-semibold text-lg text-slate-700">Daftar Alamat</h2>
      </div>
      <div className="w-full relative">
        <ul className="md:px-6">
          <li className="py-1">
            <div className="w-full max-w-lg py-2 px-3 flex gap-3 items-center justify-between border border-slate-200 shadow-md rounded-md">
              <div>
                <h2 className="font-semibold text-base text-slate-700">
                  Alamat Utama
                </h2>
                <p className="font-medium text-sm text-slate-500">
                  Jl. Raya Menganti no.33, Menganti, Gresik, Jawa Timur, 61174
                </p>
                <div className="w-full flex justify-center gap-6 py-2">
                  <p className="py-1 px-3 flex items-center hover:bg-blue-100 cursor-pointer gap-3 text-sm text-blue-500 font-semibold rounded-md">
                    <AiOutlineEdit className={"stroke-2 w-6 h-6"} /> Edit
                  </p>
                  <p className="py-1 px-3 flex items-center hover:bg-rose-100 cursor-pointer gap-3 text-sm text-rose-500 font-semibold rounded-md">
                    <AiOutlineDelete className={"stroke-2 w-6 h-6"} /> Hapus
                  </p>
                </div>
              </div>
            </div>
          </li>
          <li className="py-1">
            <div className="w-full max-w-lg py-2 px-3 flex gap-3 items-center justify-between border border-slate-200 shadow-md rounded-md">
              <div>
                <h2 className="font-semibold text-base text-slate-700">
                  Alamat Lain
                </h2>
                <p className="font-medium text-sm text-slate-500">
                  Jl. Raya Menganti no.33, Menganti, Gresik, Jawa Timur, 61174
                </p>
                <div className="w-full flex justify-center gap-6 py-2">
                  <p className="py-1 px-3 flex items-center hover:bg-blue-100 cursor-pointer gap-3 text-sm text-blue-500 font-semibold rounded-md">
                    <AiOutlineEdit className={"stroke-2 w-6 h-6"} /> Edit
                  </p>
                  <p className="py-1 px-3 flex items-center hover:bg-rose-100 cursor-pointer gap-3 text-sm text-rose-500 font-semibold rounded-md">
                    <AiOutlineDelete className={"stroke-2 w-6 h-6"} /> Hapus
                  </p>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </>
  );
}
