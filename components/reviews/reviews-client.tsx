"use client";
import { StarFilledIcon, StarIcon } from "@radix-ui/react-icons";

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useEffect, useState } from "react";
import { reviewsDataTS } from "@/lib/types/review";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { getReviews } from "@/lib/utils/action/ReviewsActions";

const ratings = [1, 2, 3, 4, 5];

export function ReviewsClient({ id }: { id: number }) {
  const [reviews, setReviews] = useState<reviewsDataTS>();
  const [selectedRate, setSelectedRate] = useState<string[]>([]);
  const [sort, setSort] = useState("");

  // const buildSearchParams = (selectedRate: string[]): string => {
  //   let params: string[] = [];
  //   selectedRate.forEach((rate, index) => {
  //     const searchColumn = `search_column[${index + 1}]=review_rating`;
  //     const searchText = `search_text[${index + 1}]=${rate}`;
  //     const searchOperator = `search_operator[${index + 1}]==`;
  //     params.push(searchColumn, searchText, searchOperator);
  //   });
  //   return params.join("&");
  // };
  const buildSearchParams = (selectedRate: string[]): string => {
    if (selectedRate.length !== 0) {
      return `search_column[1]=rating&search_text[1]=${selectedRate.join(
        ","
      )}&search_operator[1]=in`;
    } else {
      return "";
    }
    // let params: string[] = [];
    // selectedRate.forEach((rate, index) => {
    //   const searchColumn = `search_column[${index + 1}]=review_rating`;
    //   const searchText = `search_text[${index + 1}]=${rate}`;
    //   const searchOperator = `search_operator[${index + 1}]==`;
    //   params.push(searchColumn, searchText, searchOperator);
    // });
    // return params.join("&");
  };
  const searchRate = buildSearchParams(selectedRate);
  const searchParams = searchRate + sort;

  useEffect(() => {
    const getData = async () => {
      await getReviews({ id, params: searchParams }).then((res) => {
        setReviews(res);
      });
    };
    getData();
    return () => {};
  }, [id, searchParams]);

  const click = (value: string[]) => {
    setSelectedRate(value);
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="w-full border-b border-purple-500">
        <h2 className="inline-block h-full py-2 px-5 text-base font-bold text-purple-500 border-b-2 border-purple-500">
          Penilaian Produk
        </h2>
      </div>

      <div className="flex justify-between items-center">
        <ToggleGroup
          type="multiple"
          onValueChange={(value) => {
            click(value);
          }}
        >
          {ratings.map((r, idx: number) => (
            <ToggleGroupItem
              key={idx}
              value={r.toString()}
              aria-label={`Rating ${r}`}
            >
              {selectedRate.find((val) => val === r.toString()) ? (
                <StarFilledIcon className="w-4 h-4 sm:w-6 sm:h-6 text-amber-400" />
              ) : (
                <StarIcon className="w-4 h-4 sm:w-6 sm:h-6" />
              )}
              {r}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
        <Select
          onValueChange={(v) =>
            v === "new"
              ? setSort("&sort_column[0]=date&sort_type[0]=desc")
              : v === "old"
              ? setSort("&sort_column[0]=date&sort_type[0]=asc")
              : setSort("")
          }
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Urut" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="new">Baru</SelectItem>
            <SelectItem value="old">Lama</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="flex flex-col gap-1">
        {reviews && reviews.data.length ? (
          reviews.data.map((review) => (
            <Card key={review.id}>
              <CardHeader className="flex flex-row gap-3">
                <Avatar>
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="@shadcn"
                  />
                  <AvatarFallback>
                    {review.users.username.charAt(0).toLocaleUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col gap-1 w-full border-b">
                  <CardTitle className="flex justify-between items-center">
                    {review.users.profile.name}
                    <span className="text-sm">{review.fdate}</span>
                  </CardTitle>
                  <CardDescription className="flex">
                    <span className="flex items-center">
                      {[...Array(review.rating)].map((s, idx: number) => (
                        <StarFilledIcon
                          key={idx}
                          className="h-4 w-4 text-amber-500"
                        />
                      ))}
                      ({review.rating})
                    </span>
                  </CardDescription>
                </div>
              </CardHeader>
              <CardContent>{review.text}</CardContent>
            </Card>
          ))
        ) : (
          <div className="w-full bg-secondary/50 rounded-md py-3">
            <p className="italic px-3 sm:px-6">Belum ada Penilaian...</p>
          </div>
        )}
      </div>
    </div>
  );
}
