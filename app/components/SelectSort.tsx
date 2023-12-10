"use client";
import { Fragment, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { AiFillCaretDown, AiOutlineCheck } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { setSort } from "../lib/redux/slice/filterSlice";
import { RootState } from "../lib/redux/store";
import { useRouter } from "next/navigation";

const sorts = [
  { id: 1, name: "Terbaru", value: "" },
  { id: 2, name: "Nama (A-Z)", value: "nameUp" },
  { id: 3, name: "Nama (Z-A)", value: "nameDown" },
  { id: 4, name: "Termurah", value: "low" },
  { id: 5, name: "Termahal", value: "high" },
];

type SortOption = {
  id: number;
  name: string;
  value: string;
};

export default function SelectSort() {
  const sort = useSelector((state: RootState) => state.filter.sort);
  const sortState = sort !== null ? `${sort.column}-${sort.type}` : "";
  const sortSet = sorts.findIndex((f) => f.value === sortState);
  const [selected, setSelected] = useState(sorts[sortSet]);
  const dispatch = useDispatch();
  const router = useRouter();

  const setSorting = (event: SortOption) => {
    setSelected(event);
    router.replace(`?sort=${event.value}`, { scroll: false });
    // const newSort = {
    //   column: newValue[0],
    //   type: newValue[1],
    // };
    // dispatch(setSort(newSort));
  };
  return (
    <div className="relative w-full md:w-64">
      <Listbox value={selected} onChange={(e) => setSorting(e)}>
        <div className="relative mt-1">
          <Listbox.Button
            id="1"
            className="relative w-full cursor-default rounded-full bg-white py-2 pl-3 pr-10 text-left focus:outline-none border-2 focus-visible:border-indigo-500 focus:border-purple-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-fuchsia-300 sm:text-sm"
          >
            <span className="block truncate">{selected.name}</span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <AiFillCaretDown
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {sorts.map((sort) => (
                <Listbox.Option
                  key={sort.id}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                      active ? "bg-purple-100 text-purple-900" : "text-gray-900"
                    }`
                  }
                  value={sort}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? "font-medium" : "font-normal"
                        }`}
                      >
                        {sort.name}
                      </span>
                      {selected ? (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-purple-600">
                          <AiOutlineCheck
                            className="h-5 w-5"
                            aria-hidden="true"
                          />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
}
