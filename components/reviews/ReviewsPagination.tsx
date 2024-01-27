import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setReviewPage } from "@/lib/redux/slice/detailSlice";
import { RootState } from "@/lib/redux/store";

export default function ReviewsPagination({ reviewsMeta }: any) {
  const dispatch = useDispatch();
  const currenPage = useSelector(
    (state: RootState) => state.detail.reviewpagination.page
  );
  const totalPagination = reviewsMeta.total / reviewsMeta.per_page;
  const Arr = [...Array(totalPagination)];
  return (
    <nav aria-label="Review Pagination" className="px-6">
      <ul className="inline-flex -space-x-px text-base h-10">
        <li>
          <button
            disabled={currenPage === 1}
            onClick={() => dispatch(setReviewPage(currenPage - 1))}
            className="flex items-center justify-center px-4 h-10 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:text-purple-700 hover:bg-purple-100 disabled:hover:bg-white disabled:hover:text-slate-300 disabled:text-slate-300"
          >
            Previous
          </button>
        </li>
        {Arr.map((_, idx) => (
          <li key={idx}>
            <button
              onClick={() => dispatch(setReviewPage(idx + 1))}
              className={`flex items-center justify-center px-4 h-10 leading-tight ${
                currenPage === idx + 1
                  ? "text-purple-500 bg-purple-50 border border-purple-300 hover:text-purple-700 hover:bg-purple-100"
                  : "text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
              }`}
            >
              {idx + 1}
            </button>
          </li>
        ))}
        <li>
          <button
            disabled={currenPage === reviewsMeta.last_page}
            onClick={() => dispatch(setReviewPage(currenPage + 1))}
            className={`flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:text-purple-700 hover:bg-purple-100 disabled:hover:bg-white disabled:hover:text-slate-300 disabled:text-slate-300`}
          >
            Next
          </button>
        </li>
      </ul>
    </nav>
  );
}
