import { useState } from "react";
import { RadioGroup } from "@headlessui/react";
import { useDispatch } from "react-redux";
import { AiFillStar } from "react-icons/ai";
import { Rating } from "@/lib/types/details";
import { ratings } from "@/lib/constant/reviewfilter";
import { setReviewFilter } from "@/lib/redux/slice/detailSlice";

export default function ReviewsFilter() {
  const [selected, setSelected] = useState<Rating | null>(null);
  const dispatch = useDispatch();
  const RatingFilter = (rating: Rating | null) => {
    setSelected(rating === null ? null : rating);

    const convertTextToString = (text: number | number[]) => {
      if (Array.isArray(text)) {
        return text.join(",");
      }
      return text.toString();
    };
    const newFilter = {
      init: rating === null ? "" : rating?.init,
      column: "review_rating",
      text: rating === null ? "" : convertTextToString(rating.text),
      operator: rating === null ? "" : rating.operator,
    };

    dispatch(setReviewFilter(newFilter));
  };
  return (
    <div className="w-full sm:w-max px-3 sm:px-6">
      <div className="mx-auto w-full sm:max-w-md">
        <RadioGroup
          value={selected}
          id="reviewfilter"
          onChange={(e) => RatingFilter(e)}
        >
          <RadioGroup.Label id="reviewfilter" className="sr-only">
            Reviews Sort
          </RadioGroup.Label>
          <div className="flex flex-wrap sm:flex-nowrap gap-3 py-3">
            {ratings &&
              ratings
                .map((rating, idx) => (
                  <RadioGroup.Option
                    key={rating.init}
                    id={rating.init.toLocaleLowerCase()}
                    value={rating}
                    className={({ active, checked }) =>
                      `
                  ${checked ? "bg-purple-500" : "bg-purple-100"}
                    relative flex cursor-pointer rounded-lg px-3 sm:px-4 py-2 sm:py-3 shadow-md focus:outline-none`
                    }
                  >
                    {({ active, checked }) => (
                      <>
                        <div className="flex w-full items-center justify-between">
                          <div className="flex items-center">
                            <div className="text-sm">
                              <RadioGroup.Label
                                as="p"
                                id={rating.init.toLocaleLowerCase()}
                                className={`font-semibold flex gap-1 items-center ${
                                  checked ? "text-white" : "text-purple-600"
                                }`}
                                onClick={() => RatingFilter(null)}
                              >
                                {typeof rating.text !== "object" ? (
                                  <AiFillStar className={"text-amber-500"} />
                                ) : (
                                  ""
                                )}
                                {rating.init}
                              </RadioGroup.Label>
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                  </RadioGroup.Option>
                ))
                .reverse()}
          </div>
        </RadioGroup>
      </div>
    </div>
  );
}
