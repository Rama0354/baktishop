import { getServerSession } from "next-auth";
import React from "react";
import { options } from "../api/auth/[...nextauth]/options";
import axios from "axios";
import { getQueryClient } from "../lib/getQueryClient";
import { dehydrate } from "@tanstack/react-query";
import Hydrate from "../lib/Hydrate";
import GiftList from "./GiftList";
import { cookies } from "next/headers";

// async function getGift(params: string) {
//   const session = await getServerSession(options);
//   if (session) {
//     const res = await axios.get(
//       `${process.env.NEXT_PUBLIC_BACKEND_API}/gifts?` + params,
//       {
//         headers: {
//           "Content-Type": "Application/json",
//           Authorization: `Bearer ${session?.accessToken}`,
//         },
//       }
//     );
//     return res.data;
//   } else {
//     const res = await axios.get(
//       `${process.env.NEXT_PUBLIC_BACKEND_API}/gifts?` + params,
//       {
//         headers: {
//           "Content-Type": "Application/json",
//         },
//       }
//     );
//     return res.data;
//   }
// }

export default async function GiftListContainer() {
  // const cookie = cookies();
  // const filtersort = cookie.get("filtersort");
  // const allfilters = filtersort
  //   ? { ...JSON.parse(filtersort?.value as any) }
  //   : {
  //       filters: [],
  //       querys: "",
  //       urls: "",
  //       sort: null,
  //     };
  // const queryClient = getQueryClient();
  // await queryClient.prefetchQuery(["gifts", allfilters.urls], async () => {
  //   const res = await getGift(allfilters.querys);
  //   return res.data;
  // });
  // const dehydratedState = dehydrate(queryClient);
  return (
    // <Hydrate state={dehydratedState}>
    <GiftList />
    // </Hydrate>
  );
}
