import { options } from "@/app/api/auth/[...nextauth]/options";
import AddressDnD from "@/app/components/users/AddressDnD";
import { FullAddressArray } from "@/app/lib/types/address";
import { getAddresses } from "@/app/lib/utils/action/AddressActions";
import axios from "axios";
import { getServerSession } from "next-auth";
import React from "react";
import { AiOutlineEnvironment } from "react-icons/ai";

export default async function AddressPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const searchPage = searchParams.page;
  const addressData = await getAddresses();
  return (
    <section className="w-full py-3">
      <div className="w-full flex items-center gap-3 py-3 px-6 mb-3 border-b-2 border-slate-200">
        <AiOutlineEnvironment className={"text-slate-700 stroke-2 w-6 h-6"} />
        <h2 className="font-semibold text-lg text-slate-700">Daftar Alamat</h2>
      </div>
      <div className="w-full relative">
        <AddressDnD addresses={addressData} />
      </div>
    </section>
  );
}
