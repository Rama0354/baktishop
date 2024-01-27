import ClientLayout from "@/components/layouts/ClientLayout";

export default function BrandLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ClientLayout>{children}</ClientLayout>;
}
