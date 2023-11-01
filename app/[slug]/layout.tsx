import ClientLayout from "../components/layouts/ClientLayout";

export default function SlugLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ClientLayout>{children}</ClientLayout>;
}
