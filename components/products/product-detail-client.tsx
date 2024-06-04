"use client";
import React, { useState } from "react";
import WishBtn from "./WishBtn";
import { signIn, useSession } from "next-auth/react";
import { addCart } from "@/lib/utils/action/CartsActions";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { getCart, setSingleCart } from "@/lib/redux/slice/cartSlice";
import { useRouter } from "next/navigation";
import CountDetail from "../CountDetail";
import { productDetail, productDetailVariant } from "@/lib/types/product";
import { Button } from "../ui/button";
import { RootState } from "@/lib/redux/store";
import Link from "next/link";
import Image from "next/image";

type giftDetailClientType = {
  detail: productDetail | null;
  varDetail: productDetailVariant | null;
};

export default function ProductDetailClient({
  detail,
  varDetail,
}: giftDetailClientType) {
  const router = useRouter();
  const { status: loginStatus } = useSession();
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.cartItems);
  const [countItem, setCountItem] = useState(1);

  const handleAddToCart = () => {
    if (loginStatus === "unauthenticated") {
      signIn();
    } else {
      if (detail) {
        if (countItem !== 0) {
          if (detail.variants !== null && detail.variants.length !== 0) {
            toast.error("Mohon pilih varian");
          } else {
            if (cartItems !== undefined) {
              const cartQty =
                cartItems.length !== 0 && cartItems !== undefined
                  ? cartItems.find((item) => item.product_id === detail.id)
                      ?.quantity
                  : 0;
              if (cartQty !== undefined) {
                if (countItem > detail.quantity || cartQty >= detail.quantity) {
                  toast.error("Jumlah melebihi stok yang tersedia");
                } else if (countItem + cartQty > detail.quantity) {
                  toast.error(
                    "Mohon pilih jumlah yang lebih kecil dari jumlah yang tersedia"
                  );
                } else {
                  addCart({
                    product_id: detail.id,
                    quantity: countItem,
                    variant_id: null,
                  })
                    .then(() => {
                      toast.success("berhasil ditambahkan");
                      dispatch(getCart() as any);
                    })
                    .catch(() => {
                      toast.error("ada masalah");
                    });
                }
              } else {
                if (countItem > detail.quantity) {
                  toast.error("Jumlah melebihi stok yang tersedia");
                } else {
                  addCart({
                    product_id: detail.id,
                    quantity: countItem,
                    variant_id: null,
                  })
                    .then(() => {
                      toast.success("berhasil ditambahkan");
                      dispatch(getCart() as any);
                    })
                    .catch(() => {
                      toast.error("ada masalah");
                    });
                }
              }
            }
          }
        } else {
          toast.error("Mohon atur jumlah barang");
        }
      } else if (varDetail) {
        if (countItem !== 0) {
          if (cartItems !== undefined) {
            const cartQty =
              cartItems.length !== 0 && cartItems !== undefined
                ? cartItems.find(
                    (item) => item.product_id === varDetail.products.id
                  )?.quantity
                : 0;
            if (cartQty !== undefined) {
              if (
                countItem > varDetail.quantity ||
                cartQty >= varDetail.quantity
              ) {
                toast.error("Jumlah melebihi stok yang tersedia");
              } else if (countItem + cartQty > varDetail.quantity) {
                toast.error(
                  "Mohon pilih jumlah yang lebih kecil dari jumlah yang tersedia"
                );
              } else {
                addCart({
                  product_id: varDetail.products.id,
                  quantity: countItem,
                  variant_id: varDetail.id,
                })
                  .then(() => {
                    toast.success("berhasil ditambahkan");
                    dispatch(getCart() as any);
                  })
                  .catch(() => {
                    toast.error("ada masalah");
                  });
              }
            } else {
              if (countItem > varDetail.quantity) {
                toast.error("Jumlah melebihi stok yang tersedia");
              } else {
                addCart({
                  product_id: varDetail.products.id,
                  quantity: countItem,
                  variant_id: varDetail.id,
                })
                  .then(() => {
                    toast.success("berhasil ditambahkan");
                    dispatch(getCart() as any);
                  })
                  .catch(() => {
                    toast.error("ada masalah");
                  });
              }
            }
          }
          // if (countItem > varDetail.quantity) {
          //   toast.error("Mohon maaf jumlah melebihi stok");
          // } else {
          //   addCart({
          //     product_id: varDetail.products.id,
          //     quantity: countItem,
          //     variant_id: varDetail.id,
          //   })
          //     .then(() => {
          //       toast.success("berhasil ditambahkan");
          //       dispatch(getCart() as any);
          //     })
          //     .catch(() => {
          //       toast.error("ada masalah");
          //     });
          // }
        } else {
          toast.error("Mohon atur jumlah barang");
        }
      }
    }
  };
  const handleAddToCheckout = () => {
    if (loginStatus === "unauthenticated") {
      signIn();
    } else {
      if (countItem !== 0) {
        if (detail !== null) {
          if (detail.variants !== null && detail.variants.length !== 0) {
            toast.error("Mohon pilih variant");
          } else {
            if (countItem > detail.quantity) {
              toast.error("Mohon maaf jumlah melebihi stok");
            } else {
              dispatch(
                setSingleCart({
                  id: "1",
                  product_id: detail.id,
                  product_image:
                    detail.product_images.length !== 0
                      ? detail.product_images[0].image_url
                      : "/assets/img/no-image.jpg",
                  product_name: detail.name,
                  product_point: detail.point,
                  product_weight: detail.weight,
                  quantity: countItem,
                })
              );
              router.push("/checkout");
            }
          }
        } else if (varDetail !== null) {
          if (countItem > varDetail.quantity) {
            toast.error("Mohon maaf jumlah melebihi stok");
          } else {
            dispatch(
              setSingleCart({
                id: "1",
                product_id: varDetail.id,
                product_image:
                  varDetail.variant_images !== null &&
                  varDetail.variant_images.image_url !== null
                    ? varDetail.variant_images.image_url
                    : varDetail.products.product_images.length !== 0
                    ? varDetail.products.product_images[0].image_url
                    : "/assets/img/no-image.jpg",
                product_name: varDetail.products.name,
                product_point: varDetail.point,
                quantity: countItem,
                product_weight: varDetail.weight,
                variant_id: varDetail.id,
                variant_name: varDetail.name,
              })
            );
            router.push("/checkout");
          }
        }
      } else {
        toast.error("Mohon atur jumlah barang");
      }
    }
  };
  return (
    <>
      <div className="flex flex-col gap-1">
        <p className="text-sm">Jumlah</p>
        <CountDetail count={countItem} setCountItem={setCountItem} />
      </div>
      <div className="flex gap-3">
        {loginStatus === "authenticated" && detail ? (
          <WishBtn productId={detail.id} is_wishlist={detail.is_wishlist} />
        ) : loginStatus === "authenticated" && varDetail ? (
          <WishBtn
            productId={varDetail.products.id}
            is_wishlist={varDetail.products.is_wishlist}
          />
        ) : (
          <div className="relative">
            <Link type="checkbox" href={"/login"}>
              <Image
                src={`/assets/img/offlike.svg`}
                alt="favorite"
                width={54}
                height={32}
                className={`object-contain hover:cursor-pointer`}
              />
            </Link>
          </div>
        )}
        {detail ? (
          <>
            <Button disabled={detail.quantity <= 0} onClick={handleAddToCart}>
              + Keranjang
            </Button>
            <Button
              disabled={detail.quantity <= 0}
              onClick={handleAddToCheckout}
              variant={"outline"}
            >
              Beli Sekarang
            </Button>
          </>
        ) : varDetail ? (
          <>
            <Button
              disabled={varDetail.quantity <= 0}
              onClick={handleAddToCart}
            >
              + Keranjang
            </Button>
            <Button
              disabled={varDetail.quantity <= 0}
              onClick={handleAddToCheckout}
              variant={"outline"}
            >
              Beli Sekarang
            </Button>
          </>
        ) : null}
      </div>
    </>
  );
}
