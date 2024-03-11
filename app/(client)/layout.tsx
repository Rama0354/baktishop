import { Suspense } from "react";
import AppBar from "@/components/layouts/TopBar";
import Footer from "@/components/Footer";
import MobileNavigation from "@/components/layouts/MobileNavigation";
import { NavigationEvents } from "@/components/navigation-events";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="w-full h-auto">
      <AppBar />
      <main className="w-full h-full min-h-screen flex flex-col items-center mx-auto bg-background">
        {children}
      </main>
      <Footer />
      <MobileNavigation />
      <Suspense fallback={null}>
        <NavigationEvents />
      </Suspense>
    </section>
  );
}
