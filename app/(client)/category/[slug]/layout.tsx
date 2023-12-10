import ClientLayout from "@/app/components/layouts/ClientLayout";

export default function CategoryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ClientLayout>{children}</ClientLayout>;
}
