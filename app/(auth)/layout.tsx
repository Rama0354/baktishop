import "@/app/globals.css";
import "@/app/nprogress.css";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});
import Link from "next/link";
import Image from "next/image";
import AuthProvider from "../lib/context/AuthProviders";
import { getServerSession } from "next-auth";
import { options } from "../api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";
import { Toaster } from "react-hot-toast";

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
    <html lang="en">
      <body className={poppins.className}>
        <AuthProvider>
          <section className="w-full min-h-screen flex justify-center items-center bg-gradient-to-tl from-primary-light via-white to-secondary-light">
            <div className=" py-6 px-3 flex flex-col gap-3 items-center justify-center bg-white rounded-md border border-primary-light shadow-md">
              <Link
                href={"/"}
                className="w-full flex justify-center items-end px-1 text-slate-700"
              >
                <Image
                  src={"/assets/icon/logo.png"}
                  alt="logo"
                  width={250}
                  height={250}
                  className="object-contain w-16 lg:w-24"
                />
                <h1 className="font-semibold text-2xl py-1">Shop</h1>
              </Link>
              {children}
            </div>
          </section>
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}
