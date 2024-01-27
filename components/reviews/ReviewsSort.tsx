import { useState } from "react";
import { RadioGroup } from "@headlessui/react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/lib/redux/store";
import { setReviewSort } from "@/lib/redux/slice/detailSlice";

type Sort = {
  init: string;
  column: string;
  type: string;
};

const reviews: Sort[] = [
  {
    init: "Terbaru",
    column: "review_date",
    type: "desc",
  },
  {
    init: "Terlama",
    column: "review_date",
    type: "asc",
  },
];

export default function ReviewsSort() {
  const [selected, setSelected] = useState<Sort | null>(null);
  const reviewFilters = useSelector(
    (state: RootState) => state.detail.reviewfiter.sort
  );
  const dispatch = useDispatch();
  const RatingFilter = (review: Sort | null) => {
    setSelected(review === null ? null : review);

    const newFilter = {
      init: review === null ? "" : review.init,
      column: review === null ? "" : review?.column,
      type: review === null ? "" : review.type,
    };

    dispatch(setReviewSort(newFilter));
  };
  return (
    <div className="w-full px-3">
      <div className="mx-auto w-full max-w-md">
        <RadioGroup
          id="reviewsort"
          value={selected}
          onChange={(e) => RatingFilter(e)}
        >
          <RadioGroup.Label id="reviewsort" className="sr-only">
            Reviews Sort
          </RadioGroup.Label>
          <div className="flex flex-row sm:flex-col gap-3 py-3">
            {reviews.map((review) => (
              <RadioGroup.Option
                key={review.init}
                id={review.init.toLocaleLowerCase()}
                value={review}
                className={({ active, checked }) =>
                  `
                  ${checked ? "bg-purple-500" : "bg-purple-100"}
                    w-full relative flex cursor-pointer rounded-lg px-4 py-3 shadow-md focus:outline-none`
                }
              >
                {({ active, checked }) => (
                  <>
                    <div className="flex w-full items-center justify-between">
                      <div className="flex items-center">
                        <div className="text-sm">
                          <RadioGroup.Label
                            as="p"
                            id={review.init.toLocaleLowerCase()}
                            className={`font-semibold  ${
                              checked ? "text-white" : "text-purple-500"
                            }`}
                          >
                            {review.init}
                          </RadioGroup.Label>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </RadioGroup.Option>
            ))}
          </div>
        </RadioGroup>
      </div>
    </div>
  );
}
