import "./globals.css";
import "./nprogress.css";
import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import AuthProvider from "./context/AuthProviders";
const inter = Inter({ subsets: ["latin"] });
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});
import QueryProvider from "./context/QueryProvider";
import StoreProvider from "./redux/StoreProvider";
import { NavigationEvents } from "./components/navigation-events";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Bakti Shop",
  description:
    "Selamat datang di toko online kami, Kami menyediakan berbagai macam kebutuhan mulai dari fashon, gadget, dan sampai peralatan rumah tangga. silahkan menikmati fasilitas yang tersedia, salam Happy Shopping 😀",
};

export default function RootLayout({
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
              {children}
              <Suspense fallback={null}>
                <NavigationEvents />
              </Suspense>
            </StoreProvider>
          </AuthProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
