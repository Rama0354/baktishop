import { getQueryClient } from "@/app/lib/getQueryClient";
import { dehydrate } from "@tanstack/react-query";
import { options } from "../../api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import React from "react";
import axios from "axios";
import Hydrate from "@/app/lib/Hydrate";
import CatAndBrLayout from "@/app/components/layouts/CatAndBrLayout";
import GiftList from "@/app/components/GiftList";

async function getListByCategory(category: string) {
  const session = await getServerSession(options);
  if (session) {
    const res = await axios.get(
      `${process.env.BACKEND_API}/gifts/category/${category}`,
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
      `${process.env.BACKEND_API}/gifts/category/${category}`,
      {
        headers: {
          "Content-Type": "Application/json",
        },
      }
    );
    return res.data;
  }
}
export default async function CategoryPage({
  params,
}: {
  params: { slug: string };
}) {
  const slug = params.slug;

  const queryClient = getQueryClient();
  await queryClient.prefetchQuery([`b-${slug}`, ``], async () => {
    const res = await getListByCategory(`${slug}`);
    return res.data;
  });
  const dehydratedState = dehydrate(queryClient);
  return (
    <Hydrate state={dehydratedState}>
      <CatAndBrLayout layoutType="cat">
        <GiftList pType={"cat"} sType={`${slug}`} />
      </CatAndBrLayout>
    </Hydrate>
  );
}
