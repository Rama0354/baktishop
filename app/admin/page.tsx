import React from "react";
import type { Metadata } from "next";
import AdminLayout from "../components/AdminLayout";

export const metadata: Metadata = {
  title: "Administrator",
  description: "Administrator web page Bakti Shop",
};

export default function Dashboard() {
  return <AdminLayout>Admin Page</AdminLayout>;
}
