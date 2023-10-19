"use client";
import GiftCard from "./GiftCard";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Gifts } from "../types/gifts";
import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { setFilter, setSort } from "../redux/filterSlice";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../redux/store";

const GiftList = ({pType,sType}:{pType?:string, sType?:string}) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [params, setParams] = useState("");
  const [urlParams, setUrlParams] = useState("");
  const dispatch = useDispatch();
  const sort = useSelector((state: RootState) => state.filter.sort);
  const filter = useSelector((state: RootState) => state.filter.filters);

  useEffect(() => {
    const keyword = searchParams.get("keyword");
    const page = searchParams.get("page");
    const ratingFilter = searchParams.get("ratingFilter");
    const sortBy = searchParams.get("sortBy");

    if (keyword) {
      dispatch(setFilter({ column: "item_gift_slug", text: keyword }));
    }
    if (page) {
      dispatch(setFilter({ column: "page", text: page }));
    }
    if (ratingFilter) {
      dispatch(
        setFilter({
          column: "total_rating",
          text: ratingFilter,
          operator: parseInt(ratingFilter) < 5 ? ">=" : "=",
        })
      );
    }
    if (sortBy) {
      // Assuming sortBy should be used as a sorting
      if (sortBy === "nameUp") {
        dispatch(setSort({ column: "item_gift_slug", type: "asc" }));
      } else if (sortBy === "nameDown") {
        dispatch(setSort({ column: "item_gift_slug", type: "desc" }));
      } else if (sortBy === "priceUp") {
        dispatch(setSort({ column: "item_gift_point", type: "asc" }));
      } else if (sortBy === "priceDown") {
        dispatch(setSort({ column: "item_gift_point", type: "desc" }));
      }
    }
  }, [searchParams, dispatch]);

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
    setParams(allQuery);
    const urlfilters = queryFilter
      .map((filters, index) => {
        const newFilter =
          filters.search_column === "item_gift_slug"
            ? `keyword=${filters.search_text}`
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
    router.replace("?" + allUrlQuery);
    setUrlParams(allUrlQuery);
  }, [filter, sort, router, searchParams]);
  const { data, isError, error, isLoading } = useQuery({
    queryKey: [pType ? pType === 'cat' ? `cat-${sType}` : `b-${sType}` : "gifts", urlParams],
    queryFn: async () => {
      if(pType === 'cat'){
        const res = await axios.get(`api/getproductscategory?${sType}.${params}`)
        return res.data.data;
      }else if(pType === 'b'){
        const res = await axios.get(`api/getproductsbrand?${sType}.${params}`)
        return res.data.data;
      }else{
        const res = await axios.get(`api/itemgift?${params}`)
        return res.data.data;
      }
    },
    onError: (error) => {
      console.log("Data not found");
    },
  });
  return (
    <>
      <div className="w-full grid grid-cols-2 md:grid-cols-4 2xl:grid-cols-5 gap-3 py-3 justify-center">
        {isLoading ? (
          <div>loading...</div>
        ) : data ? (
          data.map((gift: Gifts) => <GiftCard key={gift.id} gift={gift} />)
        ) : (
          <div>Not Found</div>
        )}
      </div>
    </>
  );
};

export default GiftList;
