import React from "react";
import ClientLayout from "../components/layouts/ClientLayout";
import GiftDetail from "../components/GiftDetail";
import axios from "axios";
import { getQueryClient } from "../lib/getQueryClient";
import { options } from "../api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import { dehydrate } from "@tanstack/react-query";
import Hydrate from "../lib/Hydrate";
import GiftList from "../components/GiftList";
import CatAndBrLayout from "../components/layouts/CatAndBrLayout";
import { cookies } from "next/headers";

async function getDetail(slug: string) {
  const session = await getServerSession(options);
  if (session) {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_API}/gifts/slug/${slug}`,
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
      `${process.env.NEXT_PUBLIC_BACKEND_API}/gifts/slug/${slug}`,
      {
        headers: {
          "Content-Type": "Application/json",
        },
      }
    );
    return res.data;
  }
}
async function getListByCat(category: string) {
  const session = await getServerSession(options);
  if (session) {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_API}/gifts/category/${category}`,
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
      `${process.env.NEXT_PUBLIC_BACKEND_API}/gifts/category/${category}`,
      {
        headers: {
          "Content-Type": "Application/json",
        },
      }
    );
    return res.data;
  }
}
async function getListByBrand(brand: string) {
  const session = await getServerSession(options);
  if (session) {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_API}/gifts/brand/${brand}`,
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
      `${process.env.NEXT_PUBLIC_BACKEND_API}/gifts/brand/${brand}`,
      {
        headers: {
          "Content-Type": "Application/json",
        },
      }
    );
    return res.data;
  }
}

export default async function SlugPage({
  params,
}: {
  params: { slug: string };
}) {
  const cookie = cookies();
  const getFiltersortDetail = cookie.get("filtersort_detail");
  const filterDetail = getFiltersortDetail
    ? JSON.parse(getFiltersortDetail?.value as any)
    : "";

  const slug = params.slug;

  const queryClient = getQueryClient();
  if (slug.split(".")[0] === "cat") {
    await queryClient.prefetchQuery(
      [`cat-${slug.split(".")[1]}`, ``],
      async () => {
        const res = await getListByCat(`${slug.split(".")[1]}`);
        return res.data;
      }
    );
  } else if (slug.split(".")[0] === "b") {
    await queryClient.prefetchQuery(
      [`b-${slug.split(".")[1]}`, ``],
      async () => {
        const res = await getListByBrand(`${slug.split(".")[1]}`);
        return res.data;
      }
    );
  } else {
    await queryClient.prefetchQuery(["detail", `${slug}`], async () => {
      const res = await getDetail(slug);
      return res.data;
    });
  }
  const dehydratedState = dehydrate(queryClient);
  return (
    <ClientLayout>
      <Hydrate state={dehydratedState}>
        {slug.split(".")[0] === "cat" ? (
          <CatAndBrLayout layoutType="cat">
            <GiftList
              pType={`${slug.split(".")[0]}`}
              sType={`${slug.split(".")[1]}`}
            />
          </CatAndBrLayout>
        ) : slug.split(".")[0] === "b" ? (
          <CatAndBrLayout layoutType="b">
            <GiftList
              pType={`${slug.split(".")[0]}`}
              sType={`${slug.split(".")[1]}`}
            />
          </CatAndBrLayout>
        ) : (
          <GiftDetail slug={slug} filterDetail={filterDetail.variant} />
        )}
      </Hydrate>
    </ClientLayout>
  );
}
