import React from "react";
import GiftDetail from "@/components/GiftDetail";
import axios from "axios";
import { getQueryClient } from "@/lib/getQueryClient";
import { options } from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import { dehydrate } from "@tanstack/react-query";
import Hydrate from "@/lib/Hydrate";
import { notFound } from "next/navigation";
import GiftDetailByVariant from "@/components/GiftDetailByVariant";

export async function generateStaticParams() {
  const res = await axios
    .get(`${process.env.BACKEND_API}/gifts`)
    .then((res) => res.data);

  const varSlug = res.data.map((data: any) => {
    return data.variants.length !== 0
      ? data.variants.map((v: any) =>
          v.variant_slug !== null ? { slug: v.variant_slug } : ""
        )
      : "";
  });
  const slug = res.data.map((data: any) => ({
    slug: data.item_gift_slug,
  }));
  const slugArray = varSlug.flat().filter((item: any) => item !== "");
  return [...slug, ...slugArray];
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

async function getDetailByVariant(slug: string) {
  const session = await getServerSession(options);
  if (session) {
    const res = await axios
      .get(`${process.env.BACKEND_API}/variants/slug/${slug}`, {
        headers: {
          "Content-Type": "Application/json",
          Authorization: `Bearer ${session?.accessToken}`,
        },
      })
      .then((res) => res.data)
      .catch((error) => "not-found");
    return res;
  } else {
    const res = await axios
      .get(`${process.env.BACKEND_API}/variants/slug/${slug}`, {
        headers: {
          "Content-Type": "Application/json",
        },
      })
      .then((res) => res.data)
      .catch((error) => notFound());
    return res;
  }
}

async function getSlugType(slug: string) {
  const res = await axios
    .get(`${process.env.BACKEND_API}/variants/slug/${slug}`)
    .then((res) => res.data)
    .catch(() => "not-found");
  if (res === "not-found") {
    return "item";
  }
  return "variant";
}

export async function generateMetadata({
  params: { slug },
}: {
  params: { slug: string };
}) {
  const slugType = await getSlugType(slug);
  if (slugType === "variant") {
    const res = await axios
      .get(`${process.env.BACKEND_API}/variants/slug/${slug}`)
      .then((res) => res.data)
      .catch(() => "not-found");
    if (res === "not-found") notFound();
    return {
      title: `${res.data.item_gifts.item_gift_name} - ${res.data.variant_name}`,
    };
  } else if (slugType === "item") {
    const res = await axios
      .get(`${process.env.BACKEND_API}/gifts/slug/${slug}`)
      .then((res) => res.data)
      .catch(() => "not-found");
    if (res === "not-found") notFound();
    return {
      title: res.data.item_gift_name,
    };
  } else {
    return notFound();
  }
}

export default async function SlugPage({
  params,
}: {
  params: { slug: string };
}) {
  const slug = params.slug;
  const queryClient = getQueryClient();
  const slugType = await getSlugType(slug);

  if (slugType === "variant") {
    await queryClient.prefetchQuery(["detail", `${slug}`], async () => {
      const res = await getDetailByVariant(slug);
      return res.data;
    });
    const dehydratedState = dehydrate(queryClient);
    return (
      <Hydrate state={dehydratedState}>
        <GiftDetailByVariant slug={slug} />
      </Hydrate>
    );
  } else if (slugType === "item") {
    await queryClient.prefetchQuery(["detail", `${slug}`], async () => {
      const res = await getDetail(slug);
      return res.data;
    });
    const dehydratedState = dehydrate(queryClient);

    return (
      <Hydrate state={dehydratedState}>
        <GiftDetail slug={slug} />
      </Hydrate>
    );
  } else {
    return notFound();
  }
}
