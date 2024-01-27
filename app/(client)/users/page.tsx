import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";
import axios from "axios";
import TransactionClient from "@/components/users/TransactionClient";
import { axiosAuthServer } from "@/lib/axios";

async function getRedeem({ page }: { page: number }) {
  try {
    const session = await getServerSession(options);
    const res = await axiosAuthServer
      .get(
        `/gifts/redeem?page=${page}&per_page=5&search_column[0]=user_id&search_text[0]=${session?.user.id}&search_operator[0]==`
      )
      .then((res) => res.data)
      .catch((err) => err.response.data);
    return res;
  } catch (error) {
    console.log(error);
  }
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
  return (
    <TransactionClient
      redeem={redeemData && !redeemData.error ? redeemData : { data: [] }}
    />
  );
}
