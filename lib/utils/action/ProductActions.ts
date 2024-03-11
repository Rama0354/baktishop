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
    if (error.response !== undefined) {
      console.log(error.response.data);
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
    console.log(error.response.data);
    return error.response.data;
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
    console.log(error.response.data);
    return error.response.data;
  }
};
