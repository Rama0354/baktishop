import "@/app/globals.css";
import "@/app/nprogress.css";
import { ModeToggle } from "@/components/mode-toggle";
import { auth } from "@/lib/auth";
import type { Metadata } from "next";
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
  const session = await auth();

  if (session) {
    return redirect("/");
  }
  return (
    <section className="relative w-full min-h-screen flex justify-center items-center bg-secondary">
      {children}
      <div className="absolute bottom-3 right-3">
        <ModeToggle />
      </div>
    </section>
  );
}
