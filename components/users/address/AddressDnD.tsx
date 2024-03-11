"use client";
import React, { useEffect, useState } from "react";
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "@hello-pangea/dnd";
import { AddressArray } from "@/lib/types/address";
import { reorder } from "@/lib/utils/withAddressDnD";
import EditAddressBtn from "./EditAddressBtn";
import DeleteAddressBtn from "./DeleteAddressBtn";
import { changeAddress } from "@/lib/utils/action/AddressActions";
import toast from "react-hot-toast";
import Image from "next/image";

export default function AddressDnD({
  addresses,
}: {
  addresses: AddressArray | undefined;
}) {
  const [dndData, setDndData] = useState<AddressArray>(
    addresses ? addresses : []
  );
  useEffect(() => {
    if (addresses !== undefined) {
      setDndData(addresses);
    }
  }, [addresses]);
  const handleDragStart = () => {
    if (window.navigator.vibrate) window.navigator.vibrate(100);
  };
  const handleDragEnd = (result: DropResult) => {
    if (result.combine) {
      const newDndData: AddressArray = [...dndData];
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
    setDndData(newDndData);
    // changeAddress({
    //   id: newDndData[0].id,
    //   is_main: newDndData[0].is_main,
    // })
    //   .then(() => {
    //     toast.success(
    //       `Alamat utama berhasil diatur dengan a/n ${newDndData[0].person_name}`
    //     );
    //   })
    //   .catch(() => {
    //     setDndData(dndData);
    //     toast.error("ada masalah");
    //   });
    if (newDndData[0].is_main !== 1) {
      toast.promise(
        changeAddress({
          id: newDndData[0].id,
          is_main: newDndData[0].is_main,
        }).catch(() => {
          setDndData(dndData);
        }),
        {
          loading: "Mengubah...",
          success: (
            <p>
              Alamat utama berhasil diatur dengan a/n{" "}
              <span className="font-semibold">{newDndData[0].person_name}</span>
            </p>
          ),
          error: <b>Ada masalah!</b>,
        }
      );
    }
  };

  return (
    <div>
      <DragDropContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
        <Droppable droppableId="droppable">
          {(droppableProvided) => (
            <div
              className="flex flex-col max-w-lg"
              {...droppableProvided.droppableProps}
              ref={droppableProvided.innerRef}
            >
              {dndData.length !== 0 ? (
                dndData.map((address, index) => (
                  <Draggable
                    draggableId={address.id.toString()}
                    index={index}
                    key={address.id}
                  >
                    {(draggableProvided) => (
                      <div
                        className="py-1"
                        role="cell"
                        {...draggableProvided.draggableProps}
                        {...draggableProvided.dragHandleProps}
                        ref={draggableProvided.innerRef}
                      >
                        <div
                          className={`w-full py-2 px-3 flex gap-3 items-center justify-between bg-secondary border shadow-md rounded-md ${
                            address && address.is_main === 1
                              ? "border-l-4 border-lime-500"
                              : null
                          }`}
                        >
                          <div className="flex flex-col">
                            <div className="flex gap-3 justify-between">
                              <div className="flex flex-col text-sm">
                                <p>
                                  <span className="font-bold">Penerima : </span>
                                  {`${
                                    address.person_name !== ""
                                      ? address.person_name
                                      : "Unknown"
                                  } `}
                                </p>
                                <p>
                                  <span className="font-bold">Nomor : </span>
                                  {`${
                                    address.person_phone !== ""
                                      ? address.person_phone
                                      : "Unknown"
                                  } `}
                                </p>
                                <p>
                                  <span className="font-bold">Alamat : </span>
                                  {`${
                                    address.street !== "" ? address.street : ""
                                  }, 
                                  ${
                                    address.subdistrict.name !== ""
                                      ? address.subdistrict.name
                                      : ""
                                  }, 
                                  ${
                                    address.city.name !== ""
                                      ? address.city.name
                                      : ""
                                  }, 
                                  ${
                                    address.province.name !== ""
                                      ? address.province.name
                                      : ""
                                  }, 
                                  ${
                                    address.postal_code !== ""
                                      ? address.postal_code
                                      : ""
                                  }`}
                                </p>
                              </div>
                              <div className="w-max flex justify-center items-center gap-3 py-2">
                                <EditAddressBtn data={address} />
                                {address && address.is_main !== 1 ? (
                                  <DeleteAddressBtn id={address.id} />
                                ) : null}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </Draggable>
                ))
              ) : (
                <div className="w-full flex justify-center">
                  <Image
                    src={"/assets/img/not-found-address.png"}
                    width={300}
                    height={300}
                    className="sm:w-80"
                    alt="product-not-found"
                  />
                </div>
              )}
              {droppableProvided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}
