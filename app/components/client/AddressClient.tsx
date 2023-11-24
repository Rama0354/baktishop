import { FullAddressArray } from "@/app/types/address";
import React from "react";
import { AiOutlineEnvironment } from "react-icons/ai";
import AddressDnD from "./AddressDnD";

export default function AddressClient({
  address,
}: {
  address: FullAddressArray | undefined;
}) {
  return (
    <section className="w-full py-3">
      <div className="w-full flex items-center gap-3 py-3 px-6 mb-3 border-b-2 border-slate-200">
        <AiOutlineEnvironment className={"text-slate-700 stroke-2 w-6 h-6"} />
        <h2 className="font-semibold text-lg text-slate-700">Daftar Alamat</h2>
      </div>
      <div className="w-full relative">
        <AddressDnD addresses={address} />
      </div>
    </section>
  );
}
