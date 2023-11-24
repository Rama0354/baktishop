"use client";
import {
  getAllCity,
  getAllProvince,
  getAllSubdistrict,
} from "@/app/utils/action/AddressActions";
import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { DevTool } from "@hookform/devtools";
import {
  FormEditAddress,
  FormEditAddressSchema,
  FullAddress,
  FullAddressData,
} from "@/app/types/address";

type ProvinceData = {
  province_id: number;
  province_name: string;
};
type CityData = {
  city_id: number;
  city_name: string;
};
type SubdistrictData = {
  subdistrict_id: number;
  subdistrict_name: string;
};
export default function AddressModalForm({
  isOpen,
  onClose,
  data,
}: {
  isOpen: boolean;
  onClose: () => void;
  data: FullAddressData | null;
}) {
  const [provinces, setProvinces] = useState<ProvinceData[]>([]);
  const [cities, setCities] = useState<CityData[]>([]);
  const [subdistricts, setSubdistricts] = useState<SubdistrictData[]>([]);
  const [provinceSelected, setProvinceSelected] = useState<number>(0);
  const [citySelected, setCitySelected] = useState<number>(0);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitSuccessful, isSubmitting },
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
  }, [cities, subdistricts, provinceSelected, citySelected]);

  useEffect(() => {
    // Fetch provinces from API
    const fetchProvinces = async () => {
      try {
        const res = await getAllProvince();
        setProvinces(res.data);
      } catch (error) {
        console.error("Error fetching provinces:", error);
      }
    };

    fetchProvinces();
  }, []);
  useEffect(() => {
    // Fetch cities based on selected province
    const fetchCities = async (id: number) => {
      try {
        const res = await getAllCity(id);
        setCities(res.data);
      } catch (error) {
        console.error("Error fetching cities:", error);
      }
    };
    if (data !== null && data.province.id !== 0) {
      fetchCities(data.province.id);
    }
    if (provinceSelected) {
      fetchCities(provinceSelected);
    } else {
      setCities([]);
    }
  }, [data, provinceSelected]);

  useEffect(() => {
    // Fetch subdistricts based on selected city
    const fetchSubdistricts = async (id: number) => {
      try {
        const res = await getAllSubdistrict(id);
        setSubdistricts(res.data);
      } catch (error) {
        console.error("Error fetching subdistricts:", error);
      }
    };
    if (data !== null && data.city.id !== 0) {
      fetchSubdistricts(data.city.id);
    }
    if (citySelected) {
      fetchSubdistricts(citySelected);
    } else {
      setSubdistricts([]);
    }
  }, [data, citySelected]);

  const onSubmit = (data: FormEditAddress) => {
    console.log(data);
    // if (isSubmitSuccessful) {
    //   reset();
    //   setCities([]);
    //   setSubdistricts([]);
    // }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed top-0 left-0 z-40 bg-black/50 w-full h-full flex justify-center items-start overflow-y-auto">
          <motion.div
            className="mt-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="relative bg-white rounded-lg shadow max-w-md w-md">
              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
                <h3 className="text-xl font-semibold text-gray-900">
                  Ubah Alamat
                </h3>
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    setProvinceSelected(0);
                    setCitySelected(0);
                  }}
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
                  data-modal-hide="default-modal"
                >
                  <svg
                    className="w-3 h-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>
              <div className="p-4 md:p-5 space-y-4">
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
                              <option
                                key={idx}
                                value={subdistrict.subdistrict_id}
                              >
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

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center "
                  >
                    Submit
                  </button>
                </form>
                <DevTool control={control} />
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
