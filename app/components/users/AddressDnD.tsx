"use client";
import React, { useEffect, useState } from "react";
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "@hello-pangea/dnd";
import {
  AddressArray,
  CityArray,
  FormEditAddress,
  FormEditAddressSchema,
  FullAddressData,
  ProvinceArray,
  SubdistrictArray,
} from "@/app/lib/types/address";
import {
  editAddress,
  getAllCity,
  getAllProvince,
  getAllSubdistrict,
} from "@/app/lib/utils/action/AddressActions";
import { MdModeEditOutline, MdOutlineDeleteOutline } from "react-icons/md";
import { reorder } from "@/app/lib/utils/withAddressDnD";
import AddressModalForm from "./AddressModalForm";
import { AnimatePresence } from "framer-motion";
import ModalContent from "../ModalContent";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import toast from "react-hot-toast";

export default function AddressDnD({
  addresses,
}: {
  addresses: AddressArray | undefined;
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedData, setSelectedData] = useState<FullAddressData | null>(
    null
  );

  // Fungsi untuk membuka modal dan mengatur data yang akan diedit
  const openModal = (data: any) => {
    setSelectedData(data);
    setIsModalOpen(true);
  };

  // Fungsi untuk menutup modal
  const closeModal = () => {
    // setSelectedData(null);
    setIsModalOpen(false);
  };
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
  };

  return (
    <div>
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
                                            address.postal_code !== ""
                                              ? address.postal_code
                                              : ""
                                          }`}
                                </p>
                              </div>
                              <div className="w-max flex justify-center gap-6 py-2">
                                <button
                                  onClick={() => openModal(address)}
                                  className="w-max h-max p-3 flex items-center bg-blue-100 hover:bg-blue-200 cursor-pointer gap-3 text-sm text-blue-500 font-semibold rounded-full"
                                >
                                  <MdModeEditOutline className={"w-6 h-6"} />
                                </button>
                                <button className="w-max h-max p-3 flex items-center bg-rose-100 hover:bg-rose-200 cursor-pointer gap-3 text-sm text-rose-500 font-semibold rounded-full">
                                  <MdOutlineDeleteOutline
                                    className={"w-6 h-6"}
                                  />
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
      {/* <AddressModalForm
        isOpen={isModalOpen}
        onClose={closeModal}
        data={selectedData}
      /> */}
      <AnimatePresence>
        {isModalOpen && (
          <EditModalForm onClose={closeModal} data={selectedData} />
        )}
      </AnimatePresence>
    </div>
  );
}

const EditModalForm = ({
  onClose,
  data,
}: {
  onClose: () => void;
  data: FullAddressData | null;
}) => {
  const [provinces, setProvinces] = useState<ProvinceArray>([]);
  const [cities, setCities] = useState<CityArray>([]);
  const [subdistricts, setSubdistricts] = useState<SubdistrictArray>([]);
  const [provinceSelected, setProvinceSelected] = useState<number>(0);
  const [citySelected, setCitySelected] = useState<number>(0);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitSuccessful, isSubmitting, isSubmitted },
    setValue,
    watch,
    reset,
  } = useForm<FormEditAddress>({
    resolver: zodResolver(FormEditAddressSchema),
  });

  useEffect(() => {
    if (data !== null) {
      setValue("id", data.id);
      setValue("person_name", data.person_name);
      setValue("person_phone", data.person_phone);
      if (provinceSelected !== 0) {
        setValue("province_id", provinceSelected);
      } else {
        setValue("province_id", data.province.id);
      }
      setValue("postal_code", data.postal_code);
      setValue("address", data.address);
      if (cities.length !== 0 && provinceSelected === 0 && citySelected === 0) {
        setValue("city_id", data.city.id);
      } else {
        setValue("city_id", citySelected);
      }
      if (
        subdistricts.length !== 0 &&
        provinceSelected === 0 &&
        citySelected === 0
      ) {
        setValue("subdistrict_id", data.subdistrict.id);
      } else {
        setValue("subdistrict_id", 0);
      }
    }
  }, [cities, subdistricts, provinceSelected, citySelected, data, setValue]);

  useEffect(() => {
    getAllProvince()
      .then((res) => {
        if (res !== undefined) {
          setProvinces(res);
        }
      })
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    // Fetch cities based on selected province
    if (data !== null && data.province.id !== 0) {
      getAllCity(data.province.id)
        .then((res) => {
          if (res !== undefined) {
            setCities(res);
          }
        })
        .catch((error) => console.log(error));
    }
    if (provinceSelected) {
      getAllCity(provinceSelected)
        .then((res) => {
          if (res !== undefined) {
            setCities(res);
          }
        })
        .catch((error) => console.log(error));
    } else {
      setCities([]);
    }
  }, [data, provinceSelected]);

  useEffect(() => {
    // Fetch subdistricts based on selected city
    if (data !== null && data.city.id !== 0) {
      getAllSubdistrict(data.city.id)
        .then((res) => {
          if (res !== undefined) {
            setSubdistricts(res);
          }
        })
        .catch((error) => console.log(error));
    }
    if (citySelected) {
      getAllSubdistrict(citySelected)
        .then((res) => {
          if (res !== undefined) {
            setSubdistricts(res);
          }
        })
        .catch((error) => console.log(error));
    } else {
      setSubdistricts([]);
    }
  }, [data, citySelected]);

  useEffect(() => {
    setProvinceSelected(0);
    setCitySelected(0);
  }, [onClose]);

  const onSubmit = async (data: FormEditAddress) => {
    if (isSubmitSuccessful) {
      await editAddress(data)
        .then(() => {
          toast.success("Berhasil Diubah");
          onClose();
        })
        .catch((error) => {
          console.log(error);
          toast.error("Ada Masalah");
        });
    }
  };
  return (
    <ModalContent closeModal={onClose} title="Ubah Alamat">
      <div className="py-3 space-y-4">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-6 mb-6 md:grid-cols-2">
            <input
              type="text"
              {...register("id")}
              className="hidden pointer-events-none"
            />
            <div>
              <label
                htmlFor="person_name"
                className="block mb-2 text-sm font-medium text-gray-900 "
              >
                Nama Penerima
              </label>
              <input
                type="text"
                id="person_name"
                {...register("person_name")}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                placeholder="John"
              />
              {errors.person_name && (
                <p className="text-xs italic text-red-500 mt-2">
                  {" "}
                  {errors.person_name?.message}
                </p>
              )}
            </div>
            <div>
              <label
                htmlFor="person_phone"
                className="block mb-2 text-sm font-medium text-gray-900 "
              >
                Nomor Telp
              </label>
              <input
                type="text"
                id="person_phone"
                {...register("person_phone")}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                placeholder="081300000000"
              />
              {errors.person_phone && (
                <p className="text-xs italic text-red-500 mt-2">
                  {" "}
                  {errors.person_phone?.message}
                </p>
              )}
            </div>
            <div>
              <label
                htmlFor="province"
                className="block mb-2 text-sm font-medium text-gray-900 "
              >
                Provinsi
              </label>
              {/* <ProvinceFormSelect
                        provinces={provinces}
                        setProvinceSelected={setProvinceSelected}
                        register={register}
                        setValue={setValue}
                        defaultSelect={data ? data.province.id : undefined}
                      /> */}
              <select
                id="province"
                {...register("province_id", { valueAsNumber: true })}
                onChange={(e) => {
                  setProvinceSelected(parseInt(e.target.value));
                  setValue("city_id", 0);
                  setValue("subdistrict_id", 0);
                }}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              >
                <option value="0">Pilih Provinsi</option>
                {provinces && provinces.length !== 0
                  ? provinces.map((province, idx: number) => (
                      <option key={idx} value={province.province_id}>
                        {province.province_name}
                      </option>
                    ))
                  : null}
              </select>
              {errors.province_id && (
                <p className="text-xs italic text-red-500 mt-2">
                  {" "}
                  {errors.province_id.message}
                </p>
              )}
            </div>
            <div>
              <label
                htmlFor="city"
                className="block mb-2 text-sm font-medium text-gray-900 "
              >
                Kota
              </label>
              <select
                id="city"
                {...register("city_id", { valueAsNumber: true })}
                onChange={(e) => {
                  setCitySelected(parseInt(e.target.value));
                  setValue("subdistrict_id", 0);
                }}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              >
                <option value="0">Pilih Kota</option>
                {cities && cities.length !== 0
                  ? cities.map((city, idx: number) => (
                      <option key={idx} value={city.city_id}>
                        {city.city_name}
                      </option>
                    ))
                  : null}
              </select>
              {errors.city_id && (
                <p className="text-xs italic text-red-500 mt-2">
                  {" "}
                  {errors.city_id.message}
                </p>
              )}
            </div>
            <div>
              <label
                htmlFor="subdistrict"
                className="block mb-2 text-sm font-medium text-gray-900 "
              >
                Kecamatan
              </label>
              <select
                id="subdistrict"
                {...register("subdistrict_id", { valueAsNumber: true })}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              >
                <option value="0">Pilih Kecamatan</option>
                {subdistricts && subdistricts.length !== 0
                  ? subdistricts.map((subdistrict, idx: number) => (
                      <option key={idx} value={subdistrict.subdistrict_id}>
                        {subdistrict.subdistrict_name}
                      </option>
                    ))
                  : null}
              </select>
              {errors.subdistrict_id && (
                <p className="text-xs italic text-red-500 mt-2">
                  {" "}
                  {errors.subdistrict_id.message}
                </p>
              )}
            </div>
            <div>
              <label
                htmlFor="postal_code"
                className="block mb-2 text-sm font-medium text-gray-900 "
              >
                Kode Pos
              </label>
              <input
                type="text"
                id="postal_code"
                {...register("postal_code")}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                placeholder="61174"
              />
              {errors.postal_code && (
                <p className="text-xs italic text-red-500 mt-2">
                  {" "}
                  {errors.postal_code?.message}
                </p>
              )}
            </div>
          </div>
          <div className="mb-6">
            <label
              htmlFor="address"
              className="block mb-2 text-sm font-medium text-gray-900 "
            >
              Alamat Lengkap
            </label>
            <input
              type="text"
              id="address"
              {...register("address")}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              placeholder="Jl. Raya Menganti No. 133, menganti"
            />
            {errors.address && (
              <p className="text-xs italic text-red-500 mt-2">
                {" "}
                {errors.address?.message}
              </p>
            )}
          </div>
          <div className="w-full flex justify-center">
            <button
              type="submit"
              disabled={isSubmitting}
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 disabled:bg-slate-500 font-medium rounded-lg text-sm w-full sm:max-w-xs px-5 py-2.5 text-center "
            >
              {isSubmitting ? "Menyimpan" : "Simpan"}
            </button>
          </div>
        </form>
      </div>
      <DevTool control={control} />
    </ModalContent>
  );
};
