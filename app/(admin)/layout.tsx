import "../globals.css";
import "../nprogress.css";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Admin Bakti Shop",
  description: "Selamat datang Halaman Admin Toko Online BaktiShop",
};
export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body className={poppins.className}>{children}</body>
    </html>
  );
}
