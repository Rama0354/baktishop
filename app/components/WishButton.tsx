"use client";
import Image from "next/image";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { signIn, useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import toast from "react-hot-toast";

interface FavoriteProps {
  id: number;
  isWishlist: number;
}

const WishButton = ({ id, isWishlist }: FavoriteProps) => {
  const searchParams = useSearchParams();
  const queryClient = useQueryClient();
  const { status } = useSession();
  const [isChecked, setIsChecked] = useState(
    isWishlist !== 0 ? true : false || false
  );

  const handleCheckboxChange = () => {
    if (status === "authenticated") {
      mutation.mutate();
    } else {
      signIn();
    }
  };

  const mutation = useMutation({
    mutationFn: async () => {
      return axios
        .post(`/api/wishlist?id=${id}`)
        .then((res) => {
          if (res.data.status !== 500) {
            if (res.data.error === 0) {
              toast.success(res.data.message);
              setIsChecked(!isChecked);
            } else {
              toast.error(res.data.error.message);
            }
          } else {
            toast.error(`Error ${res.data.status}`);
          }
        })
        .catch((err) => console.log(err));
    },
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
  });
  return (
    <div className="relative">
      <input
        className="invisible absolute"
        type="checkbox"
        checked={isChecked}
        onChange={handleCheckboxChange}
      />
      <Image
        src={`/assets/img/${isChecked ? `onlike` : `offlike`}.svg`}
        alt="favorite"
        width={54}
        height={32}
        onClick={handleCheckboxChange}
        className=" object-contain hover:cursor-pointer"
      />
    </div>
  );
};

export default WishButton;
