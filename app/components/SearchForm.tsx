"use client";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setFilter } from "../redux/slice/filterSlice";
import { AiOutlineSearch } from "react-icons/ai";
import { useRouter } from "next/navigation";

export default function SearchForm() {
  const dispatch = useDispatch();
  const router = useRouter();

  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    // if (e.target.value === "") {
    //   const newFilter = {
    //     column: "item_gift_slug",
    //     text: "",
    //   };
    // dispatch(setFilter(newFilter));
    // }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const name = inputValue
      .replace(/[`~!@#$%^&*()_\-+=\[\]{};:'"\\|\/,.<>?\s]/g, "-")
      .toLowerCase();
    router.push(`/search?${name ? "st=" + name : ""}`);
  };
  return (
    <form onSubmit={handleSubmit} className="relative w-full">
      {/* search input */}
      <input
        type="text"
        name="searchtext"
        value={inputValue}
        onChange={handleInputChange}
        className="w-full py-2 pl-6 pr-12 border-1 border-white text-slate-800 text-base tracking-wide outline-primary-dark rounded-full"
        placeholder="Cari..."
      />
      <button
        type="submit"
        aria-label="search button"
        id="searchbutton"
        name="searchbutton"
        className="absolute top-1 right-1 p-2 bg-primary-dark hover:bg-secondary-dark transition duration-300 ease-in-out rounded-full object-contain"
      >
        <AiOutlineSearch className="text-white stroke-2" />
      </button>
    </form>
  );
}
