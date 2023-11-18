import React from "react";
import ClientLayout from "../components/layouts/ClientLayout";

export default function CartLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ClientLayout>{children}</ClientLayout>;
}
