"use client";
import { getCart } from "@/lib/redux/slice/cartSlice";
import { RootState } from "@/lib/redux/store";
import { createCheckout } from "@/lib/utils/action/CheckoutActions";
import { redirect, useRouter } from "next/navigation";
import React, { useEffect, useTransition } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "../ui/button";

export default function CheckoutCountDetails({
  cartData,
  weight,
}: {
  cartData: { points: number; weights: number; qtys: number }[];
  weight: number;
}) {
  const router = useRouter();
  const dispatch = useDispatch();
  const [isPending, startTransition] = useTransition();
  const checkoutData = useSelector((state: RootState) => state.checkout);
  const singleCartData = useSelector(
    (state: RootState) => state.cart.singleCart
  );
  const ongkir = useSelector(
    (state: RootState) => state.checkout.shipping_details.cost
  );
  const subTotal =
    singleCartData && singleCartData.length
      ? singleCartData[0].product_point * singleCartData[0].quantity
      : cartData
      ? cartData.reduce(
          (acc: number, item: { points: number; qtys: number }) =>
            acc + item.points * item.qtys,
          0
        )
      : 0;
  const qtyTotal =
    singleCartData && singleCartData.length
      ? singleCartData[0].quantity
      : cartData
      ? cartData.reduce(
          (acc: number, item: { qtys: number }) => acc + item.qtys,
          0
        )
      : 0;
  const weightTotal =
    singleCartData && singleCartData.length
      ? singleCartData[0].quantity * singleCartData[0].product_weight
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
        router.push("/payment-success");
        dispatch(getCart() as any);
        // console.log("result on success : ", result);
      },
      onPending: function (result: any) {
        /* You may add your own implementation here */
        toast.loading("Pembayaran anda sedang kami proses mohon bersabar!");
        router.push("/users");
        // console.log("result on pending : ", result);
      },
      onError: function (result: any) {
        /* You may add your own implementation here */
        toast.error(
          "Pembayaran anda Gagal!,\n pastikan anda melakukan langkah- langkah pembayaran dengan benar!"
        );
        // console.log("Result onError ", result);
      },
      onClose: function () {
        /* You may add your own implementation here */
        toast.success(
          "Pesananmu Berhasil dibuat anda dapat membayarnya nanti pada halaman detail Transaksi"
        );
        // console.log("customer closed the popup without finishing the payment");
        router.push("/users");
      },
    });
  };
  return (
    <div className="text-sm">
      <div className="flex justify-between items-center ">
        <p className="font-medium">Subtotal</p>
        <p>{rupiahCurrency(subTotal)}</p>
      </div>
      <div className="flex justify-between items-center ">
        <p className="font-medium">Jumlah</p>
        <p>{qtyTotal}</p>
      </div>
      <div className="flex justify-between items-center ">
        <p className="font-medium">Berat</p>
        <p>
          {singleCartData && singleCartData.length ? weightTotal : weight} Gram
        </p>
      </div>
      <div className="flex justify-between items-center ">
        <p className="font-medium">Pengiriman</p>
        <p>{rupiahCurrency(ongkir)}</p>
      </div>
      <div className="flex my-3 justify-between items-center  border-t-2 border-slate-500">
        <p className="font-semibold text-base">Harga Total</p>
        <p className="font-semibold text-base">
          {rupiahCurrency(subTotal + ongkir)}
        </p>
      </div>
      <div className="flex gap-3">
        <Button
          disabled={isPending || ongkir === 0}
          onClick={() => {
            startTransition(async () => {
              await createCheckout(checkoutData)
                .then((res) => {
                  if (res.status_code === 200) {
                    toast.success(res.message);
                    handlePay(res.data.snap_token);
                    // router.push("/users");
                  } else {
                    toast.error(`${res.error.message}`);
                  }
                })
                .catch((error) => {
                  toast.error("ada masalah");
                });
            });
          }}
          className="w-full"
        >
          {isPending ? "Proses.." : "Pesan Sekarang"}
        </Button>
      </div>
    </div>
  );
}
