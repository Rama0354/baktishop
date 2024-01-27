import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Bakti Shop",
  description: "Selamat datang Halaman Admin Toko Online BaktiShop",
};
export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div>{children}</div>;
}
