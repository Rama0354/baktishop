"use client";
import { useState } from "react";

type Props = {
  scale?: number;
  value: number;
};

const Count = ({ value, scale }: Props) => {
  const [count, setCount] = useState(value | 0);

  const handleIncrement = () => {
    setCount(count + 1);
  };

  const handleDecrement = () => {
    if (count > 0) {
      setCount(count - 1);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(`Jumlah produk: ${count}`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div
        className={`w-48 ${
          scale ? "scale-" + scale : ""
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
          readOnly
          className="appearance-none text-slate-600 text-center font-bold text-lg p-1"
        />
        <button
          type="button"
          onClick={handleIncrement}
          className="bg-slate-200 text-slate-600 font-bold text-xl"
        >
          +
        </button>
      </div>
    </form>
  );
};

export default Count;
