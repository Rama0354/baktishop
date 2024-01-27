import { Suspense } from "react";
import AppBar from "@/components/layouts/AppBar";
import Footer from "@/components/Footer";
import MobileNavigation from "@/components/layouts/MobileNavigation";
import { NavigationEvents } from "@/components/navigation-events";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <AppBar />
      <main className="w-full min-h-screen flex flex-col items-center mx-auto bg-background">
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
