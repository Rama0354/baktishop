"use client";
import { Fragment, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { AiFillCaretDown, AiOutlineCheck } from "react-icons/ai";
import { useRouter, useSearchParams } from "next/navigation";

const sorts = [
  { id: 1, name: "Terbaru", value: "new" },
  { id: 2, name: "Nama (A-Z)", value: "a" },
  { id: 3, name: "Nama (Z-A)", value: "z" },
  { id: 4, name: "Termurah", value: "low" },
  { id: 5, name: "Termahal", value: "high" },
];

type SortOption = {
  id: number;
  name: string;
  value: string;
};

export default function SelectSort() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const paramsSort = searchParams.get("sort");
  const defaultSort = paramsSort
    ? sorts.findIndex((f) => f.value === paramsSort)
    : 0;
  const [selected, setSelected] = useState(sorts[defaultSort]);

  const setSorting = (event: SortOption) => {
    setSelected(event);
    router.replace(`?sort=${event.value}`, { scroll: false });
  };
  return (
    <div className="relative w-full md:w-64">
      <Listbox value={selected} onChange={setSorting}>
        <div className="relative mt-1">
          <Listbox.Button
            id="1"
            className="relative w-full cursor-default rounded-full border-primary bg-background/50 py-2 pl-3 pr-10 text-left focus:outline-none border-2 focus-visible:border-indigo-500 focus:border-purple-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-fuchsia-300 sm:text-sm"
          >
            <span className="block truncate">{selected.name}</span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <AiFillCaretDown className="h-5 w-5" aria-hidden="true" />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md py-1 text-base shadow-lg ring-1  ring-opacity-5 focus:outline-none sm:text-sm">
              {sorts.map((sort) => (
                <Listbox.Option
                  key={sort.id}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                      active
                        ? "bg-purple-100 text-purple-900 dark:bg-background dark:text-purple-400 dark:font-bold"
                        : "dark:bg-secondary dark:text-white"
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
