"use client";
import { useRouter } from "next/navigation";
import React from "react";

export default function ToCheckoutBtn({ cartCount }: { cartCount: number }) {
  const router = useRouter();
  return (
    <button
      disabled={cartCount === 0}
      onClick={() => router.push("/checkout")}
      className="w-full py-1 px-3 font-semibold bg-primary-dark disabled:bg-slate-500 disabled:pointer-events-none text-white border-2 border-primary-dark hover:bg-secondary-dark hover:border-secondary-dark rounded-md"
    >
      Checkout
    </button>
  );
}
