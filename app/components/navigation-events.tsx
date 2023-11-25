"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { resetAllSearch } from "../lib/redux/slice/filterSlice";
import { RootState } from "../lib/redux/store";
import { resetDetail } from "../lib/redux/slice/detailSlice";

export function NavigationEvents() {
  const pathname = usePathname();
  const dispatch = useDispatch();
  const queryfiter = useSelector((state: RootState) => state.filter.querys);
  const urldetail = useSelector((state: RootState) => state.detail.urldetail);

  useEffect(() => {
    if (pathname !== "/search") {
      if (queryfiter !== "") {
        dispatch(resetAllSearch());
      }
    }
    if (pathname !== urldetail) {
      dispatch(resetDetail());
    }
  }, [pathname, dispatch, queryfiter, urldetail]);

  return null;
}
