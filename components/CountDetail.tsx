"use client";
import { useEffect, useState } from "react";

type Props = {
  scale?: number;
  count: number;
  setCountItem: (count: number) => void;
};

const CountDetail = ({ count, setCountItem, scale }: Props) => {
  const handleIncrement = () => {
    setCountItem(count + 1);
  };

  const handleDecrement = () => {
    if (count > 0) {
      setCountItem(count - 1);
    }
  };

  return (
    <div
      className={`w-48 ${
        scale ? "scale-0 md:scale-" + scale : ""
      } grid grid-cols-3 border border-slate-200 rounded-lg`}
    >
      <button
        type="button"
        onClick={handleDecrement}
        className="bg-slate-200 text-slate-600 font-bold text-xl"
      >
        -
      </button>
      <input
        type="text"
        value={count}
        id="jumlah"
        name="jumlah"
        readOnly
        className="appearance-none text-slate-600 text-center font-bold text-lg p-1 pointer-events-none"
      />
      <button
        type="button"
        onClick={handleIncrement}
        className="bg-slate-200 text-slate-600 font-bold text-xl"
      >
        +
      </button>
    </div>
  );
};

export default CountDetail;
