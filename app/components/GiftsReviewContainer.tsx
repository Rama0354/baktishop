"use client";
import Image from "next/image";
import React, { useEffect } from "react";
import GiftRating from "./GiftRating";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams, useRouter } from "next/navigation";
import { RootState } from "../redux/store";
import {
  setReviewFilter,
  setReviewQuery,
  setReviewSort,
  setReviewUrls,
} from "../redux/slice/detailSlice";
import ReviewsFilter from "./reviews/ReviewsFilter";
import ReviewsSort from "./reviews/ReviewsSort";

type Reviews = {
  id: number;
  users: {
    name: string;
    username: string;
    email: string;
    profile: {
      avatar_url: string;
    };
  };
  item_gift_id: number;
  review_text: string;
  review_rating: number;
  review_date: string;
  freview_date: string;
};
type ReviewsProps = Reviews[];

export default function GiftsReviewContainer({
  productId,
}: {
  productId: number;
}) {
  const dispatch = useDispatch();
  const searchParams = useSearchParams();
  const router = useRouter();
  const sort = useSelector((state: RootState) => state.detail.reviewfiter.sort);
  const filter = useSelector(
    (state: RootState) => state.detail.reviewfiter.filters
  );
  const urls = useSelector((state: RootState) => state.detail.reviewfiter.urls);
  const querys = useSelector(
    (state: RootState) => state.detail.reviewfiter.querys
  );
  useEffect(() => {
    const filterParams = filter.map((filter) => ({
      init: filter.init,
      search_column: filter.column,
      search_text: filter.text,
      search_operator: filter.operator,
    }));
    const sortParams = sort
      ? [
          {
            sort_column: sort.column,
            sort_type: sort.type,
          },
        ]
      : [];
    const queryFilter = [...filterParams];
    const querySort = [...sortParams];
    const filters = queryFilter
      .map((filters, index) => {
        const newFilter =
          filters.search_column === "item_gift_slug"
            ? `search_column[${index}]=${filters.search_column}&search_text[${index}]=${filters.search_text}`
            : `search_column[${index}]=${filters.search_column}&search_text[${index}]=${filters.search_text}&search_operator[${index}]=${filters.search_operator}`;
        return newFilter;
      })
      .join("&");
    const sorts = querySort
      .map((sort, index) => {
        const newFilter = `sort_column[${index}]=${sort.sort_column}&sort_type[${index}]=${sort.sort_type}`;
        return newFilter;
      })
      .join("&");
    const allQuery =
      filters && sorts ? [filters, sorts].join("&") : filters ? filters : sorts;

    const urlfilters = queryFilter
      .map((filters, index) => {
        const newFilter =
          filters.search_column === "page"
            ? `page=${filters.search_text}`
            : "" + filters.search_column === "review_rating"
            ? `ratingFilter=${filters.init}`
            : "";
        return newFilter;
      })
      .join("&");
    const urlsorts = querySort
      .map((sort, index) => {
        const newFilter =
          sort.sort_column === "review_date"
            ? `SortBy=${sort.sort_type === "asc" ? "old" : "new"}`
            : "";
        return newFilter;
      })
      .join("&");
    const allUrlQuery =
      urlfilters && urlsorts
        ? [urlfilters, urlsorts].join("&")
        : urlfilters
        ? urlfilters
        : urlsorts;
    dispatch(setReviewQuery(allQuery));
    dispatch(setReviewUrls(allUrlQuery));
  }, [filter, sort, searchParams, dispatch]);
  const { data: reviews, isLoading } = useQuery(
    ["review", urls !== "" ? urls : ""],
    async () => {
      const res = await axios.get(
        `api/giftreviews/${productId}${querys !== "" ? "/" + querys : ""}`
      );
      return res.data;
    }
  );
  return (
    <section className="w-full">
      <div className="w-full border-b border-purple-500">
        <h2 className="inline-block h-full py-2 px-5 text-base font-bold text-purple-500 border-b-2 border-purple-500">
          Penilaian Produk
        </h2>
      </div>
      <div className="flex w-full mt-3">
        <div className="w-1/4">
          <ReviewsSort />
        </div>
        <div className="w-3/4 border-l-2 border-slate-100">
          <ReviewsFilter />
          <div className="w-full p-3">
            {isLoading ? (
              <>Loading...</>
            ) : reviews && reviews.data ? (
              reviews.data.map((review: Reviews, idx: number) => (
                <article key={idx}>
                  <div className="flex items-center mb-4 space-x-4">
                    <Image
                      width={80}
                      height={80}
                      className="w-10 h-10 rounded-full"
                      src={
                        review.users.profile.avatar_url !== null
                          ? review.users.profile.avatar_url
                          : "/assets/img/no-image.jpg"
                      }
                      alt="avatar"
                    />
                    <div className="space-y-1 font-medium">
                      <p>{review.users.name}</p>
                      <p>@{review.users.username}</p>
                    </div>
                  </div>
                  <div className="flex">
                    <GiftRating
                      stars={review.review_rating}
                      reviews={0}
                      scale={1}
                    />
                  </div>
                  <footer className="mb-3 text-sm text-gray-500">
                    <p className="text-sm">{review.freview_date}</p>
                  </footer>
                  <p className="mb-2 text-gray-500 py-2 px-3 rounded-lg bg-slate-100 border-l-2 border-purple-500">
                    {review.review_text}
                  </p>
                </article>
              ))
            ) : (
              <div className="w-full ">
                <p className="font-medium italic text-slate-700">
                  Belum ada penilaian
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
