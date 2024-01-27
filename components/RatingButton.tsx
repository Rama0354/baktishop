import { useState } from "react";
import { RadioGroup } from "@headlessui/react";
import { AiFillStar } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { setFilter } from "@/lib/redux/slice/filterSlice";

const rating = [
  {
    id: 1,
    name: "Bintang 1 Keatas",
    value: 1,
  },
  {
    id: 2,
    name: "Bintang 2 Keatas",
    value: 2,
  },
  {
    id: 3,
    name: "Bintang 3 Keatas",
    value: 3,
  },
  {
    id: 4,
    name: "Bintang 4 Keatas",
    value: 4,
  },
  {
    id: 5,
    name: "Bintang 5",
    value: 5,
  },
];

type RatingOption = {
  id: number;
  name: string;
  value: number;
};

export default function RatingButton() {
  const [selected, setSelected] = useState<RatingOption | null>(null);
  const dispatch = useDispatch();
  const RatingFilter = (rating: RatingOption | null) => {
    setSelected(rating === null ? null : rating);
    const newFilter = {
      column: "total_rating",
      text: rating === null ? 0 : rating.value,
      operator:
        rating?.value === null || rating?.value === undefined
          ? "="
          : rating?.value < 5
          ? ">="
          : "=",
    };

    dispatch(setFilter(newFilter));
  };

  return (
    <div className="w-full px-4 py-3">
      <div className="mx-auto w-full max-w-md">
        <RadioGroup value={selected} id="1" onChange={(e) => RatingFilter(e)}>
          <RadioGroup.Label id="1" className="sr-only">
            Rating
          </RadioGroup.Label>
          <div className="space-y-2">
            {rating
              .map((rate, rateIndex) => (
                <RadioGroup.Option
                  key={rate.id}
                  id={`${rate.id}`}
                  value={rate}
                  className={({ active, checked }) =>
                    `${
                      active
                        ? "ring-2 ring-white ring-opacity-60 ring-offset-2 ring-offset-purple-300"
                        : ""
                    }
                  ${
                    checked
                      ? "bg-purple-900 bg-opacity-75 text-white"
                      : "bg-white"
                  }
                    relative flex cursor-pointer rounded-lg px-5 py-4 shadow-md focus:outline-none`
                  }
                >
                  {({ active, checked }) => (
                    <>
                      <div className="flex w-full items-center justify-between">
                        <div className="flex items-center">
                          <div className="text-sm">
                            <RadioGroup.Label
                              as="p"
                              id={`${rate.id}`}
                              className={`font-medium line-clamp-1  ${
                                checked ? "text-white" : "text-slate-700"
                              }`}
                            >
                              {rate.name}
                            </RadioGroup.Label>
                            <RadioGroup.Description id={`${rate.id}`}>
                              <span
                                className={`shrink-0 flex ${
                                  checked ? "text-white" : ""
                                }`}
                                onClick={() => {
                                  if (selected === rate) {
                                    RatingFilter(null);
                                  } else {
                                    RatingFilter(rate);
                                  }
                                }}
                              >
                                {[...Array(rate.value)].map((_, index) => (
                                  <AiFillStar key={index} className="h-3 w-3" />
                                ))}
                              </span>
                            </RadioGroup.Description>
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
