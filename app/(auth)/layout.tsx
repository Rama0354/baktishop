import "@/app/globals.css";
import "@/app/nprogress.css";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Login Bakti Shop",
  description: "Selamat datang di toko online kami, dan Selamat berbelanja",
};

export default async function AuthRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(options);

  if (session) {
    return redirect("/");
  }
  return (
    <section className="w-full min-h-screen flex justify-center items-center bg-secondary">
      {children}
    </section>
  );
}
