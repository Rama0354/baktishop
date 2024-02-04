"use client";
import { useRouter } from "next/navigation";
import React from "react";
import { Button } from "@/components/ui/button";

export default function ToCheckoutBtn({ cartCount }: { cartCount: number }) {
  const router = useRouter();
  return (
    <Button
      variant={"default"}
      disabled={cartCount === 0}
      onClick={() => router.push("/checkout")}
    >
      Checkout
    </Button>
  );
}
