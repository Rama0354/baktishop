import React from "react";
import AppBar from "./AppBar";
import Footer from "../Footer";
import { Toaster } from "react-hot-toast";
import MobileNavigation from "./MobileNavigation";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AppBar />
      <main className="w-full min-h-screen pb-12 flex flex-col items-center mx-auto bg-primary-light">
        {children}
      </main>
      <Toaster position="top-center" />
      <Footer />
      <MobileNavigation />
    </>
  );
}
