"use client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useEffect } from "react";
import GiftCard from "./GiftCard";
import { Gifts } from "../types/gifts";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import {
  resetAllSearch,
  setFilter,
  setQuery,
  setUrls,
} from "../redux/slice/filterSlice";
import { SkeletonCard } from "./Skeleton";

export default function GiftSearchContainer() {
  const router = useRouter();
  const dispatch = useDispatch();
  const sort = useSelector((state: RootState) => state.filter.sort);
  const filter = useSelector((state: RootState) => state.filter.filters);
  const urls = useSelector((state: RootState) => state.filter.urls);
  const querys = useSelector((state: RootState) => state.filter.querys);
  const searchParams = useSearchParams();
  const searchText = searchParams.get("st");

  useEffect(() => {
    if (searchText !== null) {
      dispatch(resetAllSearch());
      const newFilter = {
        column: "item_gift_name",
        text: searchText,
        operator: "like",
      };
      dispatch(setFilter(newFilter));
    } else {
      dispatch(resetAllSearch());
    }
  }, [searchParams, dispatch, searchText]);

  useEffect(() => {
    const filterParams = filter.map((filter) => ({
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
        const newFilter = `search_column[${index}]=${filters.search_column}&search_text[${index}]=${filters.search_text}&search_operator[${index}]=${filters.search_operator}`;
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
    dispatch(setQuery(allQuery));

    const urlfilters = queryFilter
      .map((filters, index) => {
        const newFilter =
          filters.search_column === "item_gift_name"
            ? `st=${filters.search_text}`
            : "" + filters.search_column === "page"
            ? `page=${filters.search_text}`
            : "" + filters.search_column === "total_rating"
            ? `ratingFilter=${filters.search_text}`
            : "";
        return newFilter;
      })
      .join("&");
    const urlsorts = querySort
      .map((sort, index) => {
        const newFilter =
          sort.sort_column === "item_gift_slug"
            ? `SortBy=${sort.sort_type === "asc" ? "nameUp" : "nameDown"}`
            : "" + sort.sort_column === "item_gift_point"
            ? `SortBy=${sort.sort_type === "asc" ? "priceUp" : "priceDown"}`
            : "" + sort.sort_column === "total_rating";
        return newFilter;
      })
      .join("&");
    const allUrlQuery =
      urlfilters && urlsorts
        ? [urlfilters, urlsorts].join("&")
        : urlfilters
        ? urlfilters
        : urlsorts;
    dispatch(setUrls(allUrlQuery));
    // router.replace(allUrlQuery);
  }, [filter, sort, router, searchParams, dispatch]);

  const { data, isError, error, isLoading } = useQuery({
    queryKey: [`search`, urls],
    queryFn: async () => {
      const res = await axios.get(`api/itemgift?` + querys);
      return res.data.data;
    },
    onError: (error) => {
      console.log("Data not found");
    },
  });
  const skeleton = [...Array(5)];

  return (
    <section className="w-full grid grid-cols-2 md:grid-cols-4 2xl:grid-cols-5 gap-3 py-3 justify-center">
      {isLoading ? (
        skeleton.map((_, id) => <SkeletonCard key={id} />)
      ) : data ? (
        data.map((gift: Gifts) => <GiftCard key={gift.id} gift={gift} />)
      ) : (
        <p>Not Found</p>
      )}
    </section>
  );
}
