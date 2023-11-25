import { getServerSession } from "next-auth";
import { options } from "../api/auth/[...nextauth]/options";
import axios from "axios";
import DashboardClient from "../components/users/DasboardClient";

async function getRedeem({ page }: { page: number }) {
  const session = await getServerSession(options);
  const res = await axios
    .get(`${process.env.BACKEND_API}/gifts/redeem?page=${page}&per_page=5`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session?.accessToken}`,
      },
    })
    .then((res) => res.data)
    .catch((err) => err.message);
  return res;
}

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const searchPage = searchParams.page;
  const redeemData = await getRedeem({
    page: searchPage ? parseInt(searchPage as string) : 1,
  });
  return <DashboardClient redeem={redeemData} />;
}
