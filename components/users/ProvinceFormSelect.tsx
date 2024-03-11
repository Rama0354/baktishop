import { Province, ProvinceArray } from "@/lib/types/address";
import { Combobox, Transition } from "@headlessui/react";
import React, { Fragment, useEffect, useState } from "react";
import { MdCheck, MdOutlineUnfoldMore } from "react-icons/md";

export default function ProvinceFormSelect({
  provinces,
  setProvinceSelected,
  register,
  setValue,
  defaultSelect,
}: {
  provinces: ProvinceArray;
  setProvinceSelected: (province_id: number) => void;
  register: any;
  setValue: any;
  defaultSelect?: number;
}) {
  const [selected, setSelected] = useState(
    defaultSelect !== undefined
      ? provinces.find((p) => p.id === defaultSelect)
      : provinces[0]
  );
  const [query, setQuery] = useState("");
  const filteredProvince =
    query === ""
      ? provinces
      : provinces.filter((p) =>
          p.name
            .toLowerCase()
            .replace(/\s+/g, "")
            .includes(query.toLowerCase().replace(/\s+/g, ""))
        );
  const handleChange = (e: Province) => {
    setSelected(e);
    setProvinceSelected(e.id);
    setValue("province_id", e.id);
  };
  return (
    <Combobox value={selected} onChange={handleChange}>
      <div className="relative mt-1">
        <div className="relative w-full cursor-default rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
          <Combobox.Input
            {...register("province_id", { valueAsNumber: true })}
            className="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0"
            displayValue={(p: Province) => p.name}
            onChange={(event) => setQuery(event.target.value)}
          />
          <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
            <MdOutlineUnfoldMore
              className="h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
          </Combobox.Button>
        </div>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
          afterLeave={() => setQuery("")}
        >
          <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
            {filteredProvince.length === 0 && query !== "" ? (
              <div className="relative cursor-default select-none px-4 py-2 text-gray-700">
                Nothing found.
              </div>
            ) : (
              filteredProvince.map((province) => (
                <Combobox.Option
                  key={province.id}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                      active ? "bg-teal-600 text-white" : "text-gray-900"
                    }`
                  }
                  value={province}
                >
                  {({ selected, active }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? "font-medium" : "font-normal"
                        }`}
                      >
                        {province.name}
                      </span>
                      {selected ? (
                        <span
                          className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                            active ? "text-white" : "text-teal-600"
                          }`}
                        >
                          <MdCheck className="h-5 w-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Combobox.Option>
              ))
            )}
          </Combobox.Options>
        </Transition>
      </div>
    </Combobox>
  );
}
