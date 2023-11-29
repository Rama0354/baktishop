"use client";
import React, { useEffect, useState } from "react";
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "@hello-pangea/dnd";
import { AddressArray } from "@/app/lib/types/address";
import { reorder } from "@/app/lib/utils/withAddressDnD";
import EditAddressBtn from "./EditAddressBtn";
import DeleteAddressBtn from "./DeleteAddressBtn";
import { changeAddress } from "@/app/lib/utils/action/AddressActions";

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
    changeAddress({
      id: newDndData[0].id,
      is_main: newDndData[0].is_main,
    }).catch(() => setDndData(dndData));
  };

  return (
    <div>
      <DragDropContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
        <Droppable droppableId="droppable">
          {(droppableProvided) => (
            <div
              className="flex flex-col max-w-max"
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
                      <div
                        className="py-1"
                        role="cell"
                        {...draggableProvided.draggableProps}
                        {...draggableProvided.dragHandleProps}
                        ref={draggableProvided.innerRef}
                      >
                        <div
                          className={`w-full max-w-lg py-2 px-3 flex gap-3 items-center justify-between border bg-white shadow-md rounded-md ${
                            address && address.is_main === 1
                              ? "border-l-4 border-lime-500"
                              : null
                          }`}
                        >
                          <div className="flex flex-col">
                            <div className="flex gap-3 justify-between">
                              <div className="flex flex-col">
                                <p className="font-medium text-sm text-slate-500">
                                  <span className="font-bold">Penerima : </span>
                                  {`${
                                    address.person_name !== ""
                                      ? address.person_name
                                      : "Unknown"
                                  } `}
                                </p>
                                <p className="font-medium text-sm text-slate-500">
                                  <span className="font-bold">Nomor : </span>
                                  {`${
                                    address.person_phone !== ""
                                      ? address.person_phone
                                      : "Unknown"
                                  } `}
                                </p>
                                <p className="font-medium text-sm text-slate-500">
                                  <span className="font-bold">Alamat : </span>
                                  {`${
                                    address.address !== ""
                                      ? address.address
                                      : ""
                                  }, 
                                  ${
                                    address.subdistrict.subdistrict_name !== ""
                                      ? address.subdistrict.subdistrict_name
                                      : ""
                                  }, 
                                  ${
                                    address.city.city_name !== ""
                                      ? address.city.city_name
                                      : ""
                                  }, 
                                  ${
                                    address.province.province_name !== ""
                                      ? address.province.province_name
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
                                <DeleteAddressBtn id={address.id} />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </Draggable>
                ))}
              {droppableProvided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}
