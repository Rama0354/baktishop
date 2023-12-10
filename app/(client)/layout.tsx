import "@/app/globals.css";
import "@/app/nprogress.css";
import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import AuthProvider from "@/app/lib/context/AuthProviders";
const inter = Inter({ subsets: ["latin"] });
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});
import QueryProvider from "@/app/lib/context/QueryProvider";
import StoreProvider from "@/app/lib/redux/StoreProvider";
import { NavigationEvents } from "@/app/components/navigation-events";
import { Suspense } from "react";
import AppBar from "../components/layouts/AppBar";
import { Toaster } from "react-hot-toast";
import Footer from "../components/Footer";
import MobileNavigation from "../components/layouts/MobileNavigation";

export const metadata: Metadata = {
  title: "Bakti Shop",
  description:
    "Selamat datang di toko online kami, Kami menyediakan berbagai macam kebutuhan mulai dari fashon, gadget, dan sampai peralatan rumah tangga. silahkan menikmati fasilitas yang tersedia, salam Happy Shopping 😀",
};

export default function ClientRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <QueryProvider>
          <AuthProvider>
            <StoreProvider>
              <AppBar />
              <main className="w-full min-h-screen pb-12 flex flex-col items-center mx-auto bg-primary-light">
                {children}
              </main>
              <Toaster position="top-center" />
              <Footer />
              <MobileNavigation />
              {/* <Suspense fallback={null}>
                <NavigationEvents />
              </Suspense> */}
            </StoreProvider>
          </AuthProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
