import GiftList from "./components/GiftList";
import Sidebar from "./components/Sidebar";
import { getQueryClient } from "./lib/getQueryClient";
import { dehydrate } from "@tanstack/query-core";
import Hydrate from "./lib/Hydrate";
import axios from "axios";
import SelectSort from "./components/SelectSort";
import ClientLayout from "./components/ClientLayout";
import { getServerSession } from "next-auth";
import { options } from "./api/auth/[...nextauth]/options";
import CategoryList from "./components/CategoryListContainer";
import HomeLayout from "./components/HomeLayout";

async function getGift(params: string) {
  const session = await getServerSession(options);
  if (session) {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_API}/gifts?${params}`,
      {
        headers: {
          "Content-Type": "Application/json",
          Authorization: `Bearer ${session?.accessToken}`,
        },
      }
    );
    return res.data;
  } else {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_API}/gifts?${params}`,
      {
        headers: {
          "Content-Type": "Application/json",
        },
      }
    );
    return res.data;
  }
}

export default async function Home() {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(["gifts", ``], async () => {
    const res = await getGift('');
    return res.data;
  });
  const dehydratedState = dehydrate(queryClient);
  return (
    <ClientLayout>
      <HomeLayout>
        <Hydrate state={dehydratedState}>
          <GiftList />
        </Hydrate>
      </HomeLayout>
    </ClientLayout>
  );
}
