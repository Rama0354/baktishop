"use client";
import React, { useState } from "react";
import Image from "next/image";
import { StarFilledIcon } from "@radix-ui/react-icons";
import { reviewsDataTS, reviewsList } from "@/lib/types/review";
import FormEditReview from "@/components/users/transactions/form-review";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function ReviewsList({ reviews }: { reviews: reviewsList }) {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleForm = (idx: any) => {
    setActiveIndex(idx === activeIndex ? null : idx);
  };
  return (
    <div className="flex flex-col gap-3">
      {reviews.data.map((review, idx: number) => (
        <div key={idx}>
          <Card className="w-full">
            <CardHeader className="border-b py-3">
              <CardTitle className="flex justify-between">
                {review.products.name}
                <span className="text-sm">{review.fdate}</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="py-3 flex flex-col gap-3">
              <div className="flex gap-3">
                <div>
                  <Image
                    src={"/assets/img/no-image.jpg"}
                    width={100}
                    height={100}
                    alt={review.products.slug}
                  />
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center text-sm">
                    {[...Array(review.rating)].map((s, idx: number) => (
                      <StarFilledIcon
                        key={idx}
                        className="h-4 w-4 text-amber-500"
                      />
                    ))}
                    ({review.rating})
                  </div>
                  <p>{review.text}</p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end border-t py-3">
              {activeIndex === idx ? (
                <FormEditReview item={review} closeForm={toggleForm} />
              ) : (
                <Button onClick={() => toggleForm(idx)}>Ubah</Button>
              )}
            </CardFooter>
          </Card>
        </div>
      ))}
    </div>
  );
}
