import ClientLayout from "../../components/layouts/ClientLayout";

export default function CategoryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ClientLayout>{children}</ClientLayout>;
}
