"use client";
import { Button } from "@/components/ui/button";
import { FormDeleteAddress } from "@/lib/types/address";
import { deleteAddress } from "@/lib/utils/action/AddressActions";
import React, { useTransition } from "react";
import toast from "react-hot-toast";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { useDispatch } from "react-redux";

export default function DeleteAddressBtn(id: FormDeleteAddress) {
  const [isPending, startTransition] = useTransition();
  const dispatch = useDispatch();

  return (
    <Button
      disabled={isPending}
      variant={"ghost"}
      onClick={async () => {
        startTransition(
          async () =>
            await deleteAddress(id).then((res) => {
              if (res.error === 0) {
                toast.success("Berhasil dihapus");
              } else {
                toast.error(res.error.error);
              }
            })
        );
      }}
    >
      <MdOutlineDeleteOutline className={"w-6 h-6"} />
    </Button>
  );
}
