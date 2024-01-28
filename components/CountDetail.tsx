"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "./ui/input";

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
      } grid grid-cols-3`}
    >
      <Button type="button" onClick={handleDecrement}>
        -
      </Button>
      <Input
        type="text"
        value={count}
        id="jumlah"
        name="jumlah"
        readOnly
        className="appearance-none text-center font-bold pointer-events-none"
      />
      <Button type="button" onClick={handleIncrement}>
        +
      </Button>
    </div>
  );
};

export default CountDetail;
