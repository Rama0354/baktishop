"use client";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { AiOutlineSearch } from "react-icons/ai";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

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
    router.replace(`/search/${name}`);
    setInputValue("");
  };
  return (
    <form onSubmit={handleSubmit} className="relative w-full">
      {/* search input */}
      <input
        type="text"
        name="searchtext"
        value={inputValue}
        onChange={handleInputChange}
        className="w-full py-2 pl-6 pr-12 bg-background dark:bg-secondary border-1 text-base tracking-wide outline-white rounded-full"
        placeholder="Cari..."
      />
      <Button
        type="submit"
        aria-label="search button"
        id="searchbutton"
        name="searchbutton"
        className="absolute top-1 right-1 py-1 px-2 bg-primary hover:bg-primary/80 transition duration-300 ease-in-out rounded-full w-8 h-8"
      >
        <AiOutlineSearch className="stroke-2 font-bold" />
      </Button>
    </form>
  );
}
