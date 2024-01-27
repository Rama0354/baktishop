"use client";
import { FormDeleteAddress } from "@/lib/types/address";
import { deleteAddress } from "@/lib/utils/action/AddressActions";
import React, { useTransition } from "react";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { useDispatch } from "react-redux";

export default function DeleteAddressBtn(id: FormDeleteAddress) {
  const [isPending, startTransition] = useTransition();
  const dispatch = useDispatch();

  return (
    <button
      disabled={isPending}
      aria-label="hapus alamat"
      onClick={async () => {
        startTransition(async () => await deleteAddress(id));
      }}
      className="w-max h-max p-2 flex items-center hover:bg-primary-light disabled:text-primary-light cursor-pointer disabled:pointer-events-none gap-3 text-sm text-primary-dark font-semibold rounded-full"
    >
      <MdOutlineDeleteOutline className={"w-6 h-6"} />
    </button>
  );
}
