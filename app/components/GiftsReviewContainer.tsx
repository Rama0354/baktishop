"use client";
import Image from "next/image";
import React, { useEffect } from "react";
import GiftRating from "./GiftRating";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

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
  const { data: reviews } = useQuery(["review"], async () => {
    const res = await axios.get(`api/giftreviews/${productId}`);
    return res.data;
  });
  return (
    <section className="w-full">
      <div className="w-full border-b border-purple-500">
        <h2 className="inline-block h-full py-2 px-5 text-base font-bold text-purple-500 border-b-2 border-purple-500">
          Penilaian Produk
        </h2>
      </div>
      <div className="flex w-full">
        <div className="w-1/4">
          <ul className="grid w-full gap-1 md:grid-cols-1 p-3">
            <li>
              <input
                type="radio"
                id="newreview"
                name="review"
                value="new"
                className="hidden peer"
                required
                defaultChecked
              />
              <label
                htmlFor="newreview"
                className="inline-flex items-center justify-between w-full py-2 px-3 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer peer-checked:border-transparent peer-checked:bg-purple-100 peer-checked:text-purple-500 hover:text-gray-600 hover:bg-gray-100"
              >
                <div className="w-full text-base font-semibold">Terbaru</div>
              </label>
            </li>
            <li>
              <input
                type="radio"
                id="oldreview"
                name="review"
                value="old"
                className="hidden peer"
                required
              />
              <label
                htmlFor="oldreview"
                className="inline-flex items-center justify-between w-full py-2 px-3 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer peer-checked:border-transparent peer-checked:bg-purple-100 peer-checked:text-purple-500 hover:text-gray-600 hover:bg-gray-100"
              >
                <div className="w-full text-base font-semibold">Terlama</div>
              </label>
            </li>
            <li>
              <input
                type="radio"
                id="positivereview"
                name="review"
                value="positive"
                className="hidden peer"
                required
              />
              <label
                htmlFor="positivereview"
                className="inline-flex items-center justify-between w-full py-2 px-3 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer peer-checked:border-transparent peer-checked:bg-purple-100 peer-checked:text-purple-500 hover:text-gray-600 hover:bg-gray-100"
              >
                <div className="w-full text-base font-semibold">Positif</div>
              </label>
            </li>
            <li>
              <input
                type="radio"
                id="negativereview"
                name="review"
                value="negative"
                className="hidden peer"
                required
              />
              <label
                htmlFor="negativereview"
                className="inline-flex items-center justify-between w-full py-2 px-3 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer peer-checked:border-transparent peer-checked:bg-purple-100 peer-checked:text-purple-500 hover:text-gray-600 hover:bg-gray-100"
              >
                <div className="w-full text-base font-semibold">Kritis</div>
              </label>
            </li>
          </ul>
        </div>
        <div className="w-3/4">
          <div>
            <ul className="flex w-full gap-1 md:grid-cols-1 p-3">
              <li>
                <input
                  type="radio"
                  id="five"
                  name="rating"
                  value="5"
                  className="hidden peer"
                  required
                />
                <label
                  htmlFor="five"
                  className="inline-flex items-center justify-between w-full py-2 px-3 gap-1 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer peer-checked:border-transparent peer-checked:bg-purple-100 hover:text-gray-600 hover:bg-gray-100"
                >
                  <svg
                    className="w-6 h-6 text-yellow-300 mr-1"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 22 20"
                  >
                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                  </svg>
                  <div className="w-full text-base font-semibold">5</div>
                </label>
              </li>
              <li>
                <input
                  type="radio"
                  id="four"
                  name="rating"
                  value="4"
                  className="hidden peer"
                  required
                />
                <label
                  htmlFor="four"
                  className="inline-flex items-center justify-between w-full py-2 px-3 gap-1 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer peer-checked:border-transparent peer-checked:bg-purple-100 hover:text-gray-600 hover:bg-gray-100"
                >
                  <svg
                    className="w-6 h-6 text-yellow-300 mr-1"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 22 20"
                  >
                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                  </svg>
                  <div className="w-full text-base font-semibold">4</div>
                </label>
              </li>
              <li>
                <input
                  type="radio"
                  id="three"
                  name="rating"
                  value="3"
                  className="hidden peer"
                  required
                />
                <label
                  htmlFor="three"
                  className="inline-flex items-center justify-between w-full py-2 px-3 gap-1 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer peer-checked:border-transparent peer-checked:bg-purple-100 hover:text-gray-600 hover:bg-gray-100"
                >
                  <svg
                    className="w-6 h-6 text-yellow-300 mr-1"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 22 20"
                  >
                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                  </svg>
                  <div className="w-full text-base font-semibold">3</div>
                </label>
              </li>
              <li>
                <input
                  type="radio"
                  id="two"
                  name="rating"
                  value="2"
                  className="hidden peer"
                  required
                />
                <label
                  htmlFor="two"
                  className="inline-flex items-center justify-between w-full py-2 px-3 gap-1 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer peer-checked:border-transparent peer-checked:bg-purple-100 hover:text-gray-600 hover:bg-gray-100"
                >
                  <svg
                    className="w-6 h-6 text-yellow-300 mr-1"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 22 20"
                  >
                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                  </svg>
                  <div className="w-full text-base font-semibold">2</div>
                </label>
              </li>
              <li>
                <input
                  type="radio"
                  id="one"
                  name="rating"
                  value="1"
                  className="hidden peer"
                  required
                />
                <label
                  htmlFor="one"
                  className="inline-flex items-center justify-between w-full py-2 px-3 gap-1 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer peer-checked:border-transparent peer-checked:bg-purple-100 hover:text-gray-600 hover:bg-gray-100"
                >
                  <svg
                    className="w-6 h-6 text-yellow-300 mr-1"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 22 20"
                  >
                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                  </svg>
                  <div className="w-full text-base font-semibold">1</div>
                </label>
              </li>
            </ul>
          </div>
          <div className="w-full p-3">
            {reviews && reviews.data ? (
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
