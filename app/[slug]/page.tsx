import React from "react";
import GiftDetail from "../components/GiftDetail";
import axios from "axios";
import { getQueryClient } from "../lib/getQueryClient";
import { options } from "../api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import { dehydrate } from "@tanstack/react-query";
import Hydrate from "../lib/Hydrate";
import { notFound } from "next/navigation";
import ClientLayout from "../components/layouts/ClientLayout";

export async function generateStaticParams() {
  const res = await axios
    .get(`${process.env.BACKEND_API}/gifts`)
    .then((res) => res.data);
  return res.data.map((data: any) => ({
    slug: data.item_gift_slug,
  }));
}
async function getDetail(slug: string) {
  const session = await getServerSession(options);
  if (session) {
    const res = await axios
      .get(`${process.env.BACKEND_API}/gifts/slug/${slug}`, {
        headers: {
          "Content-Type": "Application/json",
          Authorization: `Bearer ${session?.accessToken}`,
        },
      })
      .then((res) => res.data)
      .catch((error) => notFound());
    return res;
  } else {
    const res = await axios
      .get(`${process.env.BACKEND_API}/gifts/slug/${slug}`, {
        headers: {
          "Content-Type": "Application/json",
        },
      })
      .then((res) => res.data)
      .catch((error) => notFound());
    return res;
  }
}

export async function generateMetadata({
  params: { slug },
}: {
  params: { slug: string };
}) {
  const res = await axios
    .get(`${process.env.BACKEND_API}/gifts/slug/${slug}`)
    .then((res) => res.data)
    .catch(() => "not-found");
  if (res === "not-found") notFound();
  return {
    title: res.data.item_gift_name,
  };
}

export default async function SlugPage({
  params,
}: {
  params: { slug: string };
}) {
  const slug = params.slug;
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery(["detail", `${slug}`], async () => {
    const res = await getDetail(slug);
    return res.data;
  });
  const dehydratedState = dehydrate(queryClient);
  return (
    <ClientLayout>
      <Hydrate state={dehydratedState}>
        <GiftDetail slug={slug} />
      </Hydrate>
    </ClientLayout>
  );
}
