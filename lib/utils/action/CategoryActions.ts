"use server";
import { singleCategory, categoriesList } from "@/lib/types/category";
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
    if (error.response) {
      console.log(
        `API Get Categories request failed: ${error.response.status} - ${error.response.data.message}`
      );
    } else if (error.request) {
      console.log(`API request failed: No response received`);
    } else {
      console.log(`Unexpected error: ${error.message}`);
    }
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
    if (error.response) {
      console.log(
        `API Get Category request failed: ${error.response.status} - ${error.response.data.message}`
      );
    } else if (error.request) {
      console.log(`API request failed: No response received`);
    } else {
      console.log(`Unexpected error: ${error.message}`);
    }
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
    if (error.response) {
      console.log(
        `API Get Product By Category request failed: ${error.response.status} - ${error.response.data.message}`
      );
    } else if (error.request) {
      console.log(`API request failed: No response received`);
    } else {
      console.log(`Unexpected error: ${error.message}`);
    }
  }
}
