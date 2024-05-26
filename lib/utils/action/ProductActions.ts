"use server";

import {
  productMin,
  productDetail,
  productDetailVariant,
} from "@/lib/types/product";
import { axiosAuthServer } from "@/lib/axios";

export const getProductCards = async (params?: string) => {
  try {
    const res = await axiosAuthServer.get(`/products?${params}`);
    const datas: productMin = res.data;
    const parse = productMin.safeParse(datas);
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

export const getProductDetail = async (params: string) => {
  try {
    const res = await axiosAuthServer.get(`/products/slugs/${params}`);
    const datas: productDetail = res.data.data;
    const parse = productDetail.safeParse(datas);
    if (parse.success) {
      return parse.data;
    }
    console.log(parse.error);
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
};

export const getProductVariantDetail = async (params: string) => {
  try {
    const res = await axiosAuthServer.get(`/variants/slugs/${params}`);
    const datas: productDetailVariant = res.data.data;
    const parse = productDetailVariant.safeParse(datas);
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
      return error.response.data;
    } else if (error.request) {
      console.log(`API request failed: No response received`);
    } else {
      console.log(`Unexpected error: ${error.message}`);
    }
  }
};
