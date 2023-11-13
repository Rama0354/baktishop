import { options } from "@/app/api/auth/[...nextauth]/options";
import WishlistClient from "@/app/components/client/WishlistClient";
import axios from "axios";
import { getServerSession } from "next-auth";
import React from "react";

async function getWishlist({ page }: { page: number }) {
  const session = await getServerSession(options);
  const res = await axios
    .get(`${process.env.BACKEND_API}/gifts/wishlist?page=${page}&per_page=3`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session?.accessToken}`,
      },
    })
    .then((res) => res.data)
    .catch((err) => err.message);
  return res;
}

export default async function WishlistPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const searchPage = searchParams.page;
  const wishlistData = await getWishlist({
    page: searchPage ? parseInt(searchPage as string) : 1,
  });
  return <WishlistClient wishlist={wishlistData} />;
}
