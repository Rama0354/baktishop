"use client";

import { useReducer, type ChangeEvent } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const options = [
  { label: "Asc", value: "asc" },
  { label: "Desc", value: "desc" },
];

const initialState = {
  selected: "",
};

function sortReducer(state: any, action: any) {
  switch (action.type) {
    case "SELECT_SORT":
      return { selected: action.payload };
    default:
      return state;
  }
}

export const Sorts = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [state, dispatch] = useReducer(sortReducer, initialState);
  const { selected } = state;

  const onSelect = (event: ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value.trim();
    const current = new URLSearchParams(Array.from(searchParams.entries()));

    dispatch({ type: "SELECT_SORT", payload: value });

    if (!value || value === "-select-") {
      current.delete("sort");
    } else {
      current.set("sort", value);
    }

    const search = current.toString();
    const query = search ? `?${search}` : "";

    router.push(`${pathname}${query}`);
  };

  return (
    <>
      <select value={selected} onChange={onSelect}>
        <option>-select-</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </>
  );
};
