import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { OrdersData } from "@/lib/types/order";
import { cn } from "@/lib/utils";
import { getTransByCode } from "@/lib/utils/action/OrderActions";
import Image from "next/image";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import React from "react";
import { MdArrowBack } from "react-icons/md";

export default async function TransDetailPage({
  params,
}: {
  params: { code: string };
}) {
  const data = await getTransByCode(params.code);
  const detail: OrdersData | undefined = data;

  if (detail !== undefined) {
    const items = detail.order_products;
    const address = detail.users.address;
    const payment = detail.payments;
    const shipping = detail.shippings;
    return (
      <section className="w-full p-3 flex flex-col gap-3">
        <div className="flex">
          <div className="flex items-center">
            <Link
              href={"/users"}
              className="flex justify-center items-center w-9 h-9 sm:w-12 sm:h-12 hover:bg-secondary/50 rounded-full"
            >
              <MdArrowBack className={"w-6 h-6 sm:w-9 sm:h-9"} />
            </Link>
          </div>
          <div className="flex-1 w-full px-3">
            <h1 className="font-medium text-sm sm:text-lg">
              Order #{params.code.toUpperCase()}
            </h1>
            <p className="text-sm">{detail.fdate}</p>
          </div>
          <div className="min-w-max">
            {detail.status === "success" ? (
              <Badge variant={"success"}>Selesai</Badge>
            ) : detail.status === "shipped" &&
              detail.shippings.status === "on progress" ? (
              <Badge variant={"warning"}>Diproses</Badge>
            ) : detail.status === "shipped" &&
              detail.shippings.status === "on delivery" ? (
              <Badge variant={"warning"}>Dikirim</Badge>
            ) : detail.status === "cancelled" ? (
              <Badge variant={"destructive"}>Dibatalkan</Badge>
            ) : (detail.status === "pending" && detail.payments === null) ||
              (detail.payments && detail.payments.status === "pending") ? (
              <Badge variant={"warning"}>Belum Dibayar</Badge>
            ) : (
              <Badge variant={"outline"}>Unknown</Badge>
            )}
          </div>
        </div>
        <Card>
          <CardHeader className="border-b py-3">
            <CardTitle>Alamat Pengirim</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col text-sm sm:text-base">
            <p>{detail.users.address.person_name}</p>
            <p>{detail.users.address.person_phone}</p>
            <p>{`${address.street}, ${address.subdistrict.name}, ${address.city.name}, ${address.province.name}, ${address.postal_code}`}</p>
          </CardContent>
        </Card>
        {detail.note !== "" && (
          <Card>
            <CardHeader className="border-b py-3">
              <CardTitle>Catatan</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col py-3">
              <p>{detail.note}</p>
            </CardContent>
          </Card>
        )}
        <Card>
          <CardHeader className="border-b py-3">
            <CardTitle>Pengiriman</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col py-3">
            <p>{`${shipping.courier.toUpperCase()} ${shipping.description}`}</p>
            {shipping.resi && (
              <div className="flex flex-col">
                <p>No. Resi {shipping.resi}</p>
                <Link
                  href={`/users/${params.code}/tracking/${shipping.resi}?courier=${shipping.courier}`}
                >
                  Detail pengiriman
                </Link>
              </div>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="border-b py-3">
            <CardTitle>Produk</CardTitle>
          </CardHeader>
          <CardContent className="py-3">
            <ul>
              {items.map((item, idx: number) => {
                const imageVariants =
                  item.variants !== null
                    ? item.products.product_images.findIndex(
                        (im) => im.variant_id === item.variants!.id
                      )
                    : 0;
                return (
                  <li key={idx} className="flex gap-3 py-2">
                    <div className="w-24">
                      <Image
                        src={
                          item.variants !== null
                            ? item.products.product_images[imageVariants]
                                .image_url
                            : item.products.product_images.length !== 0
                            ? item.products.product_images[0].image_url
                            : `/assets/img/no-image.jpg`
                        }
                        width={96}
                        height={96}
                        alt="item"
                      />
                    </div>
                    <div className="flex flex-col flex-1">
                      <h2 className="font-bold text-primary">
                        {item.products.name}{" "}
                        <span className="text-sm font-normal text-secondary dark:text-white">
                          x{item.quantity}
                        </span>
                      </h2>
                      {item.variants !== null && (
                        <div>
                          <Badge variant={"secondary"}>
                            {item.variants.name}
                          </Badge>
                        </div>
                      )}
                      <p className="text-sm">
                        {item.products.weight * item.quantity} Gram
                      </p>
                      <p className="text-amber-600">{item.fpoint}</p>
                    </div>
                  </li>
                );
              })}
              {/* <li className="flex gap-3 py-2">
                <div className="w-24">
                  <Image
                    src={`/assets/img/no-image.jpg`}
                    width={96}
                    height={96}
                    alt="item"
                  />
                </div>
                <div className="flex flex-col flex-1">
                  <h2 className="font-bold text-primary">
                    Product Title{" "}
                    <span className="text-sm font-normal text-secondary dark:text-white">
                      x1
                    </span>
                  </h2>
                  <p className="text-sm">120 Gram</p>
                  <p className="text-amber-600">Rp 50.000</p>
                </div>
              </li>
              <li className="flex gap-3">
                <div className="w-24">
                  <Image
                    src={`/assets/img/no-image.jpg`}
                    width={96}
                    height={96}
                    alt="item"
                  />
                </div>
                <div className="flex flex-col flex-1">
                  <h2 className="font-bold text-primary">
                    Product Title <Badge variant={"secondary"}>Variant</Badge>{" "}
                    <span className="text-sm font-normal text-black dark:text-white">
                      x1
                    </span>
                  </h2>
                  <p className="text-sm">120 Gram</p>
                  <p className="text-amber-600">Rp 50.000</p>
                </div>
              </li> */}
            </ul>
          </CardContent>
          <CardFooter className="flex justify-between items-center border-t py-2">
            <p>Total</p>
            <p className="text-amber-600">{detail.ftotal_point}</p>
          </CardFooter>
        </Card>
        {payment && (
          <Card>
            <CardHeader className="border-b py-3">
              <CardTitle>Pembayaran</CardTitle>
            </CardHeader>
            <CardContent className="flex justify-between py-3">
              {payment.type === "qris" ? (
                <p className="capitalize">
                  <span className="font-bold uppercase">{payment.type}</span>{" "}
                  {payment.raw_response.acquirer}
                </p>
              ) : (
                <p className="capitalize">
                  <span className="font-bold uppercase">
                    {payment.raw_response.va_numbers &&
                      payment.raw_response.va_numbers[0].bank}
                  </span>{" "}
                  Bank Transfer
                </p>
              )}
              <p
                className={cn(
                  "font-bold",
                  {
                    "text-green-600": payment.status === "settlement",
                  },
                  {
                    "text-amber-600": payment.status === "pending",
                  },
                  {
                    "text-rose-600":
                      payment.status !== "pending" &&
                      payment.status !== "settlement",
                  }
                )}
              >
                {payment.status === "settlement"
                  ? "Terbayar"
                  : payment.status === "pending"
                  ? "Belum Dibayar"
                  : "Dibatalkan"}
              </p>
            </CardContent>
          </Card>
        )}
        <Card>
          <CardHeader className="border-b py-3">
            <CardTitle>Summary</CardTitle>
          </CardHeader>
          <CardContent className="py-3">
            <ul>
              <li className="flex justify-between">
                <p>Berat</p>
                <p>{shipping.fweight}</p>
              </li>
              <li className="flex justify-between">
                <p>Harga</p>
                <p>{detail.ftotal_point}</p>
              </li>
              <li className="flex justify-between">
                <p>Pengiriman</p>
                <p>{detail.fshipping_fee}</p>
              </li>
              <li className="flex justify-between">
                <p>Diskon</p>
                <p>Rp 0</p>
              </li>
              <li className="flex justify-between">
                <p>Biaya Penanganan</p>
                <p>Rp 0</p>
              </li>
            </ul>
          </CardContent>
          <CardFooter className="flex justify-between py-3 border-t">
            <p>Total</p>
            <p className="text-amber-600 font-bold">{detail.ftotal_amount}</p>
          </CardFooter>
        </Card>
      </section>
    );
  } else {
    redirect("/users");
  }
}
