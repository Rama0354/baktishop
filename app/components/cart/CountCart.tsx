"use client";

import { useTransition } from "react";
import { useOptimistic } from "react";
import { decQty, incQty } from "../../lib/utils/action/Cartactions";

const CountCart = ({ scale, count, cartId }: any) => {
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
    <div className="flex flex-col">
      <div
        className={`w-48 ${
          scale ? "scale-0 md:scale-" + scale : ""
        } grid grid-cols-3 border border-slate-200 rounded-lg`}
      >
        <button
          type="button"
          disabled={isPending}
          onClick={async () => {
            startTransition(() => setOptimisticQty(optimisticQty.count - 1));
            await decQty(cartId, count);
          }}
          className="bg-slate-200 text-slate-600 font-bold text-xl"
        >
          -
        </button>
        <input
          type="text"
          value={isPending ? optimisticQty.count : count}
          readOnly
          className="appearance-none text-slate-600 text-center font-bold text-lg p-1 pointer-events-none"
        />
        <button
          type="button"
          disabled={isPending}
          onClick={async () => {
            startTransition(() => setOptimisticQty(optimisticQty.count + 1));
            await incQty(cartId, count);
          }}
          className="bg-slate-200 text-slate-600 font-bold text-xl"
        >
          +
        </button>
      </div>
    </div>
  );
};

export default CountCart;
