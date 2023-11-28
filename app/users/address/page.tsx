import AddAddressBtn from "@/app/components/users/address/AddAddressBtn";
import AddressDnD from "@/app/components/users/address/AddressDnD";
import { getAddresses } from "@/app/lib/utils/action/AddressActions";
import React from "react";
import { AiOutlineEnvironment } from "react-icons/ai";

export default async function AddressPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const searchPage = searchParams.page;
  const addressData = await getAddresses();
  const addressDataSort = addressData?.sort((a, b) => b.is_main - a.is_main);
  return (
    <section className="w-full py-3">
      <div className="w-full flex items-center justify-between gap-3 py-3 px-6 mb-3 border-b-2 border-slate-200">
        <div className="flex items-center gap-3">
          <AiOutlineEnvironment className={"text-slate-700 stroke-2 w-6 h-6"} />
          <h2 className="font-semibold text-lg text-slate-700">
            Daftar Alamat
          </h2>
        </div>
        <AddAddressBtn />
      </div>
      <div className="w-full relative">
        <AddressDnD addresses={addressDataSort} />
      </div>
    </section>
  );
}
