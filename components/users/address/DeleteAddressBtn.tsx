"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { FormDeleteAddress } from "@/lib/types/address";
import { deleteAddress } from "@/lib/utils/action/AddressActions";
import {
  AlertDialogDescription,
  AlertDialogTrigger,
} from "@radix-ui/react-alert-dialog";
import React, { useTransition } from "react";
import toast from "react-hot-toast";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { useDispatch } from "react-redux";

export default function DeleteAddressBtn(id: FormDeleteAddress) {
  const [isPending, startTransition] = useTransition();
  const dispatch = useDispatch();

  return (
    <>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button size={"sm"} variant={"ghost"}>
            <MdOutlineDeleteOutline className={"w-6 h-6"} />
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Apakah anda yakin?</AlertDialogTitle>
            <AlertDialogDescription>
              Apakah anda yakin ingin menghapus alamat ini.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Batal</AlertDialogCancel>
            <AlertDialogAction asChild>
              <Button
                disabled={isPending}
                variant={"destructive"}
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
                Hapus
              </Button>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
