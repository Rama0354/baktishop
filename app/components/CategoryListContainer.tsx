import axios from 'axios'
import React from 'react'
import { getQueryClient } from '../lib/getQueryClient'
import { getServerSession } from 'next-auth'
import { options } from '../api/auth/[...nextauth]/options'
import { dehydrate } from '@tanstack/react-query'
import Hydrate from '../lib/Hydrate'
import CategoryList from './CategoryList'

const getListCategory =async () => {
    const session = await getServerSession(options);
  if (session) {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_API}/category`,
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
      `${process.env.NEXT_PUBLIC_BACKEND_API}/category`,
      {
        headers: {
          "Content-Type": "Application/json",
        },
      }
    );
    return res.data;
  }
}
export default async function CategoryListContainer() {
    const queryClient = getQueryClient();
    await queryClient.prefetchQuery(["category"], async () => {
        const res = await getListCategory();
        return res.data;
    });
  const dehydratedState = dehydrate(queryClient);
  return (
    <div>
      <Hydrate state={dehydratedState}>
        <CategoryList/>
      </Hydrate>
    </div>
  )
}
