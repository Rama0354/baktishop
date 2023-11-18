"use client";
import React, { useState } from "react";
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "@hello-pangea/dnd";
import { AddressData } from "@/app/types/address";
import {
  MdCheckCircleOutline,
  MdModeEditOutline,
  MdOutlineDeleteOutline,
} from "react-icons/md";
import { reorder } from "@/app/utils/withAddressDnD";
import { ChangedAddressMain } from "@/app/utils/action/ChangedAddressMain";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { revalidatePath } from "next/cache";
import { redirect, usePathname, useRouter } from "next/navigation";

export default function AddressDnD({
  addresses,
}: {
  addresses: AddressData[];
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [dndData, setDndData] = useState<AddressData[]>(addresses);
  const handleDragStart = () => {
    if (window.navigator.vibrate) window.navigator.vibrate(100);
  };
  const handleDragEnd = (result: DropResult) => {
    if (result.combine) {
      const newDndData: AddressData[] = [...dndData];
      newDndData.splice(result.source.index, 1);
      setDndData(newDndData);
      return;
    }
    if (!result.destination) return;
    if (result.destination.index === result.source.index) return;

    const newDndData = reorder(
      dndData,
      result.source.index,
      result.destination.index
    );
    // if (newDndData[0].is_main === 0) {
    //   const userId = newDndData[0].users.id;
    //   const addressId = newDndData[0].id;
    //   mutation.mutate({ user_id: userId, address_id: addressId });
    // }
    setDndData(newDndData);
  };

  const mutation = useMutation({
    mutationFn: async ({
      user_id,
      address_id,
    }: {
      user_id: number;
      address_id: number;
    }) => {
      return await axios.post(`/api/address`, {
        user_id,
        address_id,
      });
    },
    onSuccess: () => {
      revalidatePath("/users/address");
    },
  });

  return (
    <DragDropContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <Droppable droppableId="droppable">
        {(droppableProvided) => (
          <ul
            className="flex flex-col gap-4 max-w-max"
            {...droppableProvided.droppableProps}
            ref={droppableProvided.innerRef}
          >
            {dndData &&
              dndData.map((address, index) => (
                <Draggable
                  draggableId={address.id.toString()}
                  index={index}
                  key={address.id}
                >
                  {(draggableProvided) => (
                    <li
                      className="py-1"
                      {...draggableProvided.draggableProps}
                      {...draggableProvided.dragHandleProps}
                      ref={draggableProvided.innerRef}
                    >
                      <div className="w-full max-w-lg py-2 px-3 flex gap-3 items-center justify-between border bg-white border-slate-200 shadow-md rounded-md">
                        <div className="flex flex-col">
                          {address && address.is_main === 1 ? (
                            <div className="w-full flex justify-start gap-1 items-center text-lime-500 border-b border-slate-100">
                              <MdCheckCircleOutline className={"w-6 h-6"} />
                              <p className="font-semibold">Utama</p>
                            </div>
                          ) : null}

                          <div className="flex gap-3 justify-between">
                            <div className="flex flex-col">
                              <p className="font-medium text-sm text-slate-500">
                                {`Penerima : ${
                                  address.person_name !== ""
                                    ? address.person_name
                                    : "Unknown"
                                } `}
                              </p>
                              <p className="font-medium text-sm text-slate-500">
                                {`${
                                  address.address !== "" ? address.address : ""
                                }, 
                                          ${
                                            address.subdistrict
                                              .subdistrict_name !== ""
                                              ? address.subdistrict
                                                  .subdistrict_name
                                              : ""
                                          }, 
                                          ${
                                            address.city.city_name !== ""
                                              ? address.city.city_name
                                              : ""
                                          }, 
                                          ${
                                            address.province.province_name !==
                                            ""
                                              ? address.province.province_name
                                              : ""
                                          }, 
                                          ${
                                            address.postal_code !== 0
                                              ? address.postal_code
                                              : ""
                                          }`}
                              </p>
                            </div>
                            <div className="w-max flex justify-center gap-6 py-2">
                              <button className="w-max h-max p-3 flex items-center bg-blue-100 hover:bg-blue-200 cursor-pointer gap-3 text-sm text-blue-500 font-semibold rounded-full">
                                <MdModeEditOutline className={"w-6 h-6"} />
                              </button>
                              <button className="w-max h-max p-3 flex items-center bg-rose-100 hover:bg-rose-200 cursor-pointer gap-3 text-sm text-rose-500 font-semibold rounded-full">
                                <MdOutlineDeleteOutline className={"w-6 h-6"} />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                  )}
                </Draggable>
              ))}
            {droppableProvided.placeholder}
          </ul>
        )}
      </Droppable>
    </DragDropContext>
  );
}
