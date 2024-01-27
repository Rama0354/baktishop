"use client";
import React, { ReactNode } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/redux/store";

export default function QuerysComtainer({ children }: { children: ReactNode }) {
  const querys = useSelector((state: RootState) => state.filter.querys);
  return <>{children}</>;
}
