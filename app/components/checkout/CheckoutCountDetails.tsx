"use client";
import { getCart } from "@/app/lib/redux/slice/cartSlice";
import { RootState } from "@/app/lib/redux/store";
import { createCheckout } from "@/app/lib/utils/action/CheckoutActions";
import { useRouter } from "next/navigation";
import React, { useEffect, useTransition } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

export default function CheckoutCountDetails({
  cartData,
  weight,
}: {
  cartData: any;
  weight: number;
}) {
  const router = useRouter();
  const dispatch = useDispatch();
  const [isPending, startTransition] = useTransition();
  const checkotData = useSelector((state: RootState) => state.checkout);
  const ongkir = useSelector(
    (state: RootState) => state.checkout.shipping_details.shipping_cost
  );
  const subTotal = cartData
    ? cartData.reduce(
        (acc: number, item: { points: number; qtys: number }) =>
          acc + item.points * item.qtys,
        0
      )
    : 0;
  const qtyTotal = cartData
    ? cartData.reduce(
        (acc: number, item: { qtys: number }) => acc + item.qtys,
        0
      )
    : 0;

  function rupiahCurrency(x: number) {
    return x.toLocaleString("id-ID", { style: "currency", currency: "IDR" });
  }

  useEffect(() => {
    const midtransScriptUrl = "https://app.sandbox.midtrans.com/snap/snap.js";

    let scriptTag = document.createElement("script");
    scriptTag.src = midtransScriptUrl;

    const myMidtransClientKey = `${process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY}`;
    scriptTag.setAttribute("data-client-key", myMidtransClientKey);

    document.body.appendChild(scriptTag);

    return () => {
      document.body.removeChild(scriptTag);
    };
  }, []);

  const handlePay = (snap: string) => {
    window.snap.pay(snap, {
      onSuccess: function (result: any) {
        /* You may add your own implementation here */
        alert("payment success!");
        console.log(result);
      },
      onPending: function (result: any) {
        /* You may add your own implementation here */
        alert("wating your payment!");
        console.log(result);
      },
      onError: function (result: any) {
        /* You may add your own implementation here */
        alert("payment failed!");
        console.log(result);
      },
      onClose: function () {
        /* You may add your own implementation here */
        alert(
          "Pesananmu Berhasil dibuat anda dapat membayarnya nanti pada halaman detail Transaksi"
        );
        router.push("/users");
      },
    });
  };
  return (
    <>
      <div className="flex justify-between items-center text-slate-700">
        <p className="font-medium text-sm">Subtotal</p>
        <p>{rupiahCurrency(subTotal)}</p>
      </div>
      <div className="flex justify-between items-center text-slate-700">
        <p className="font-medium text-sm">Jumlah</p>
        <p>{qtyTotal}</p>
      </div>
      <div className="flex justify-between items-center text-slate-700">
        <p className="font-medium text-sm">Berat</p>
        <p>{weight} Gram</p>
      </div>
      <div className="flex justify-between items-center text-slate-700">
        <p className="font-medium text-sm">Pengiriman</p>
        <p>{rupiahCurrency(ongkir)}</p>
      </div>
      <div className="flex my-3 justify-between items-center text-slate-700 border-t-2 border-slate-500">
        <p className="font-semibold text-base">Harga Total</p>
        <p className="font-semibold text-base">
          {rupiahCurrency(subTotal + ongkir)}
        </p>
      </div>
      <div className="flex gap-3">
        <button
          disabled={isPending || ongkir === 0}
          onClick={() => {
            startTransition(
              async () =>
                await createCheckout(checkotData)
                  .then((res: any) => {
                    dispatch(getCart() as any);
                    if (res !== undefined) {
                      handlePay(res.data.snap_token);
                    } else {
                      toast.error("ada masalah");
                    }
                  })
                  .catch((error) => {
                    toast.error(error.response.message);
                  })
            );
          }}
          className="w-full py-1 px-3 font-semibold bg-primary-dark disabled:bg-slate-500 disabled:pointer-events-none text-white border-2 border-primary-dark hover:bg-secondary-dark hover:border-secondary-dark rounded-md"
        >
          {isPending ? "Proses.." : "Pesan Sekarang"}
        </button>
      </div>
    </>
  );
}
