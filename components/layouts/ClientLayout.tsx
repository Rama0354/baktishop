import React from "react";
import Footer from "../Footer";
import { Toaster } from "react-hot-toast";
import MobileNavigation from "./MobileNavigation";
import TopBar from "./TopBar";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <TopBar />
      <main className="w-full min-h-screen pb-12 flex flex-col items-center mx-auto bg-primary-light">
        {children}
      </main>
      <Toaster position="top-center" />
      <Footer />
      <MobileNavigation />
    </>
  );
}
