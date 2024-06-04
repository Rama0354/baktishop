"use server";

import { auth } from "@/lib/auth";
import axios, { axiosAuthServer } from "@/lib/axios";
import {
  formReview,
  formReviews,
  reviewsDataTS,
  reviewsList,
} from "@/lib/types/review";
import { revalidatePath } from "next/cache";
import * as z from "zod";

const getReviewsType = z.object({
  id: z.number(),
  page: z.number().optional(),
  params: z.string().optional(),
});

const getAllReviewsType = z.object({
  page: z.string().optional(),
  params: z.string().optional(),
});

export const getReviews = async ({
  id,
  page,
  params,
}: z.infer<typeof getReviewsType>) => {
  try {
    const res = await axios.get(
      `/reviews?page=${
        page ? page : 1
      }&per_page=5&search_column[0]=product_id&search_text[0]=${id}&search_operator[0]==${
        params !== undefined ? "&" + params : ""
      }`
    );
    const datas: reviewsDataTS = res.data;
    const parse = reviewsDataTS.safeParse(datas);
    if (parse.success) {
      return parse.data;
    } else {
      console.log(parse.error);
      return;
    }
  } catch (error: any) {
    if (error.response) {
      console.log(
        `API request failed: ${error.response.status} - ${error.response.data.message}`
      );
    } else if (error.request) {
      console.log(`API request failed: No response received`);
    } else {
      console.log(`Unexpected error: ${error.message}`);
    }
  }
};

export const getAllReviews = async ({
  page,
  params,
}: z.infer<typeof getAllReviewsType>) => {
  try {
    const user = await auth();
    const user_id = user?.user.id;
    const res = await axiosAuthServer.get(
      `/reviews?page=${
        page ? page : 1
      }&per_page=5&search_column[0]=user_id&search_text[0]=${user_id}&search_operator[0]==${
        params !== undefined ? "&" + params : ""
      }`
    );
    const datas: reviewsList = res.data;
    const parse = reviewsList.safeParse(datas);
    if (parse.success) {
      return parse.data;
    }
    console.log(parse.error);
    return;
  } catch (error: any) {
    if (error.response) {
      console.log(
        `API request failed: ${error.response.status} - ${error.response.data.message}`
      );
    } else if (error.request) {
      console.log(`API request failed: No response received`);
    } else {
      console.log(`Unexpected error: ${error.message}`);
    }
  }
};

export async function createReviews(data: formReviews) {
  try {
    const res = await axiosAuthServer.post(`/reviews/bulk`, data);
    return res.data;
  } catch (error: any) {
    if (error.response) {
      console.log(
        `API request failed: ${error.response.status} - ${error.response.data.message}`
      );
      return error.response.data;
    } else if (error.request) {
      console.log(`API request failed: No response received`);
    } else {
      console.log(`Unexpected error: ${error.message}`);
    }
  }
}

export async function editReview(id: number, data: formReview) {
  try {
    const res = await axiosAuthServer.put(`/reviews/${id}`, data);
    return res.data;
  } catch (error: any) {
    if (error.response) {
      console.log(
        `API request failed: ${error.response.status} - ${error.response.data.message}`
      );
      return error.response.data;
    } else if (error.request) {
      console.log(`API request failed: No response received`);
    } else {
      console.log(`Unexpected error: ${error.message}`);
    }
  } finally {
    revalidatePath("/users/reviews");
  }
}
