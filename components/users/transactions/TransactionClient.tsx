"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import ReceiveButton from "./receive-button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import CancelTransButton from "./cancel-button";
import { OrdersDataFull } from "@/lib/types/order";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function TransactionClient({
  orders,
}: {
  orders: OrdersDataFull;
}) {
  const router = useRouter();
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
        toast.success("Pemayaran Berhasil");
        router.refresh();
      },
      onPending: function (result: any) {
        /* You may add your own implementation here */
        toast.loading("Pemayaran Diproses");
        console.log(result);
      },
      onError: function (result: any) {
        /* You may add your own implementation here */
        toast.error("Pemayaran Gagaal");
        console.log(result);
      },
      // onClose: function () {
      //   /* You may add your own implementation here */
      //   alert("you closed the popup without finishing the payment");
      // },
    });
  };

  return (
    <ul>
      {orders && orders.data.length !== 0 ? (
        orders.data.map((r, idx: number) => {
          return (
            <li className="py-1" key={idx}>
              <Card>
                <CardHeader className="border-b flex flex-row justify-between items-center py-1">
                  <CardTitle className="text-sm sm:text-base">
                    <Link href={`/users/${r.code}`}>
                      No. {r.code.toUpperCase()}
                    </Link>
                  </CardTitle>
                  <CardDescription className="text-xs sm:text-sm">
                    {r.fdate}
                  </CardDescription>
                </CardHeader>
                <CardContent className="w-full flex justify-around py-3">
                  {r.order_products && r.order_products.length > 1 ? (
                    <Collapsible className="gap-3 w-full flex flex-col flex-1">
                      <div className="flex">
                        <div className="w-12 h-12 shrink-0 p-1">
                          <Image
                            src={
                              r.order_products[0].products.product_images
                                .length !== 0 &&
                              r.order_products[0].products.product_images[0] !==
                                null
                                ? r.order_products[0].products.product_images[0]
                                    .image_url
                                : `/assets/img/no-image.jpg`
                            }
                            width={120}
                            height={80}
                            className="w-full h-full object-cover"
                            alt="product"
                          />
                        </div>
                        <CollapsibleTrigger className="w-full flex flex-col items-start">
                          <h2 className="font-medium">
                            {r.order_products[0].products.name}
                          </h2>
                          {r.order_products[0].variants !== null && (
                            <Badge variant={"secondary"}>
                              {r.order_products[0].variants.name}
                            </Badge>
                          )}
                          <p className="text-sm">
                            {r.order_products[0].products.fweight}
                          </p>
                        </CollapsibleTrigger>
                      </div>

                      <CollapsibleContent className="w-full flex flex-col">
                        <div className="w-full flex">
                          <div className="w-12 h-12 shrink-0 p-1">
                            <Image
                              src={
                                r.order_products[1].products.product_images
                                  .length !== 0 &&
                                r.order_products[1].products
                                  .product_images[0] !== null
                                  ? r.order_products[1].products
                                      .product_images[0].image_url
                                  : `/assets/img/no-image.jpg`
                              }
                              width={120}
                              height={80}
                              className="w-full h-full object-cover"
                              alt="product"
                            />
                          </div>
                          <div className="flex flex-col items-start">
                            <h2 className="font-medium">
                              {r.order_products[1].products.name}
                            </h2>
                            {r.order_products[1].variants !== null && (
                              <Badge variant={"secondary"}>
                                {r.order_products[1].variants.name}
                              </Badge>
                            )}
                            <p className="text-sm">
                              {r.order_products[1].products.fweight}
                            </p>
                          </div>
                        </div>
                        {r.order_products.length > 2 && (
                          <Link
                            href={`/users/${r.code}`}
                            className="ml-1 text-sm text-primary dark:hover:text-white hover:font-bold"
                          >
                            lihat lebih +{r.order_products.length - 2}
                          </Link>
                        )}
                      </CollapsibleContent>
                    </Collapsible>
                  ) : (
                    <div className="flex flex-1">
                      <div className="w-12 h-12 shrink-0 p-1">
                        <Image
                          src={
                            r.order_products[0].products.product_images
                              .length !== 0 &&
                            r.order_products[0].products.product_images[0] !==
                              null
                              ? r.order_products[0].products.product_images[0]
                                  .image_url
                              : `/assets/img/no-image.jpg`
                          }
                          width={120}
                          height={80}
                          className="w-full h-full object-cover"
                          alt="product"
                        />
                      </div>
                      <div className="flex flex-col">
                        <h2 className="font-medium">
                          {r.order_products[0].products.name}
                        </h2>
                        {r.order_products[0].variants !== null && (
                          <Badge variant={"secondary"}>
                            {r.order_products[0].variants.name}
                          </Badge>
                        )}
                        <p className="text-sm">
                          {r.order_products[0].products.fweight}
                        </p>
                      </div>
                    </div>
                  )}
                  <div className="flex items-start">
                    {r.status === "success" ? (
                      <Badge variant={"success"}>Selesai</Badge>
                    ) : r.status === "shipped" &&
                      r.shippings.status === "on progress" ? (
                      <Badge variant={"warning"}>Diproses</Badge>
                    ) : r.status === "shipped" &&
                      r.shippings.status === "on delivery" ? (
                      <Badge variant={"warning"}>Dikirim</Badge>
                    ) : r.status === "cancelled" ? (
                      <Badge variant={"destructive"}>Dibatalkan</Badge>
                    ) : (r.status === "pending" && r.payments === null) ||
                      (r.payments && r.payments.status === "pending") ? (
                      <Badge variant={"warning"}>Belum Dibayar</Badge>
                    ) : (
                      <Badge variant={"outline"}>Unknown</Badge>
                    )}
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between items-center border-t py-1">
                  <p className="font-bold text-amber-400">{r.ftotal_amount}</p>
                  <div className="flex gap-2">
                    {r.status === "success" ? (
                      r.order_products.map((ritem) => {
                        const revData =
                          ritem.products.reviews.length !== 0 &&
                          ritem.products.reviews.filter(
                            (rv: any) =>
                              rv.id === r.id && rv.users.id === r.users.id
                          );
                        return revData && revData.length !== 0 ? (
                          <Link href={`/users/reviews`}>
                            <Button size={"sm"}>Ubah Ulasan</Button>
                          </Link>
                        ) : (
                          <Link href={`/users/${r.code}/review`}>
                            <Button size={"sm"}>Beri Ulasan</Button>
                          </Link>
                        );
                      })[0]
                    ) : (r.status === "pending" && r.payments === null) ||
                      (r.payments && r.payments.status === "pending") ? (
                      <>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button size={"sm"} variant={"destructive"}>
                              Batalkan
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>
                                Apakah anda yakin?
                              </AlertDialogTitle>
                              <AlertDialogDescription>
                                Apakah anda yakin ingin membatalkan pesanan ini.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Batal</AlertDialogCancel>
                              <AlertDialogAction asChild>
                                <CancelTransButton checkoutId={r.id} />
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                        <Button
                          onClick={() => handlePay(r.snap_token)}
                          size={"sm"}
                        >
                          Bayar
                        </Button>
                      </>
                    ) : r.status === "pending" &&
                      r.shippings.status === "on progress" ? (
                      <Link href={`/users/${r.code}`}>
                        <Button size={"sm"}>Detail</Button>
                      </Link>
                    ) : r.status === "shipped" &&
                      r.shippings.status === "on delivery" ? (
                      <>
                        <Link
                          href={`/users/${r.code}/tracking/${r.shippings.resi}?courier=${r.shippings.courier}`}
                        >
                          <Button size={"sm"}>Cek Resi</Button>
                        </Link>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button size={"sm"}>Terima</Button>
                          </AlertDialogTrigger>
                          {r.shippings && r.shippings.resi !== null && (
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>
                                  Apakah anda yakin telah menerimanya?
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                  Apakah anda telah menerima paket anda dengan
                                  selamat, silahkan konfirmasi bahwa anda telah
                                  menerimanaya.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Batal</AlertDialogCancel>
                                <AlertDialogAction asChild>
                                  <ReceiveButton
                                    checkoutId={r.id}
                                    noResi={r.shippings.resi}
                                  />
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          )}
                        </AlertDialog>
                      </>
                    ) : r.status === "cancelled" ? (
                      <></>
                    ) : (
                      <></>
                    )}
                  </div>
                </CardFooter>
              </Card>
            </li>
          );
        })
      ) : (
        <p>belum ada pesanan</p>
      )}
    </ul>
  );
}
