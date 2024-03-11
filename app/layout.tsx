import "@/app/globals.css";
import "@/app/nprogress.css";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import AuthProvider from "@/lib/context/AuthProviders";
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});
import StoreProvider from "@/lib/redux/StoreProvider";
import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "@/components/theme-providers";

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
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>
            <StoreProvider>{children}</StoreProvider>
          </AuthProvider>
          <Toaster position="top-center" />
        </ThemeProvider>
      </body>
    </html>
  );
}
