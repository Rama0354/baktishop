"use client";

import { useTransition, useOptimistic } from "react";
import { useDispatch } from "react-redux";
import { getCart } from "@/lib/redux/slice/cartSlice";
import { decQty, incQty } from "@/lib/utils/action/CartsActions";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import toast from "react-hot-toast";

const CountCart = ({ scale, count, cartId }: any) => {
  const dispatch = useDispatch();
  const [isPending, startTransition] = useTransition();
  const [optimisticQty, setOptimisticQty] = useOptimistic(
    { count, sending: false },
    (state, newCount) => ({
      ...state,
      count: newCount,
      sending: true,
    })
  );
  return (
    <div
      className={`w-48 ${
        scale ? "scale-0 md:scale-" + scale : ""
      } flex items-center`}
    >
      <Button
        disabled={isPending}
        onClick={async () => {
          startTransition(() => setOptimisticQty(optimisticQty.count - 1));
          await decQty(cartId, count).then(dispatch(getCart() as any));
        }}
      >
        -
      </Button>
      <Input
        type="text"
        value={isPending ? optimisticQty.count : count}
        readOnly
        className="appearance-none pointer-events-none text-center"
      />
      <Button
        disabled={isPending}
        onClick={async () => {
          startTransition(() => setOptimisticQty(optimisticQty.count + 1));
          await incQty(cartId, count).then((res) => {
            if (res) {
              if (res.error) {
                toast.error(res.error.message);
              }
            }
            dispatch(getCart() as any);
          });
        }}
      >
        +
      </Button>
    </div>
  );
};

export default CountCart;
