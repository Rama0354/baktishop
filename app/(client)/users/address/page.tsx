import AddAddressBtn from "@/components/users/address/AddAddressBtn";
import AddressDnD from "@/components/users/address/AddressDnD";
import { getAddresses } from "@/lib/utils/action/AddressActions";
import React from "react";
import { AiOutlineEnvironment } from "react-icons/ai";
import { MdCreate } from "react-icons/md";

export default async function AddressPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const searchPage = searchParams.page;
  const addressData = await getAddresses();
  const addressDataSort =
    addressData !== undefined
      ? addressData?.sort((a, b) => b.is_main - a.is_main)
      : [];
  return (
    <section className="w-full h-screen">
      <div className="w-full flex items-center justify-between gap-3 py-3 px-1 sm:px-6 mb-3 border-b-2 bg-secondary/50">
        <div className="flex items-center gap-3">
          <AiOutlineEnvironment className={" stroke-2 w-6 h-6"} />
          <h2 className="font-semibold text-lg">Daftar Alamat</h2>
        </div>
        <AddAddressBtn>
          <button className="w-max h-max p-2 gap-1 flex items-center hover:bg-primary-light bg-primary cursor-pointer text-sm text-white font-semibold rounded-full">
            <MdCreate className={"w-6 h-6"} />
            <p className="hidden sm:block">Buat</p>
          </button>
        </AddAddressBtn>
      </div>
      <div className="w-full relative px-3">
        <AddressDnD addresses={addressDataSort} />
      </div>
    </section>
  );
}
