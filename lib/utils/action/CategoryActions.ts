"use server";
import {
  GiftCardsByCategory,
  singleCategory,
  categoriesList,
} from "@/lib/types/category";
import axios, { axiosAuthServer } from "@/lib/axios";
import { productMin } from "@/lib/types/product";

export async function getCategoryList() {
  try {
    const res = await axios.get(`/categories`);
    const datas: categoriesList = res.data;
    const parse = categoriesList.safeParse(datas);
    if (parse.success) {
      return parse.data;
    }
    console.log(parse.error);
  } catch (error: any) {
    console.log(error.response.data);
  }
}
export async function getCategoryBySlug(slug: string) {
  try {
    const res = await axios.get(`/categories/slugs/${slug}`);
    const data: singleCategory = res.data.data;
    const parse = singleCategory.safeParse(data);
    if (parse.success) {
      return parse.data;
    }
    console.log(parse.error);
  } catch (error: any) {
    console.log(error.response.data);
  }
}

export async function getProductByCategory(slug: string) {
  try {
    const res = await axiosAuthServer.get(`/products/categories/${slug}`);
    const data: productMin = res.data;
    const parse = productMin.safeParse(data);
    if (parse.success) {
      return parse.data;
    }
    console.log(parse.error);
  } catch (error: any) {
    console.log(error.response.data);
  }
}
