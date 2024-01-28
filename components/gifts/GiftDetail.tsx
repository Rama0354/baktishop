"use client";
import Image from "next/image";
import GiftRating from "../GiftRating";
import Link from "next/link";
import { Fragment, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/lib/redux/store";
import { setUrlDetail } from "@/lib/redux/slice/detailSlice";
import { usePathname, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { getCart, setSingleCart } from "@/lib/redux/slice/cartSlice";
import CountDetail from "../CountDetail";
import GiftsReviewContainer from "../reviews/GiftsReviewContainer";
import { signIn, useSession } from "next-auth/react";
import { addCart } from "@/lib/utils/action/Cartactions";
import WishBtn from "./WishBtn";

type DetailImage = {
  id: number;
  item_gift_id: number;
  variant_id: number | null;
  item_gift_image: string;
  item_gift_image_url: string;
  item_gift_image_thumb_url: string;
};
type DetailImages = DetailImage[];

const GiftDetail = ({
  slug,
  selectedVariants,
}: {
  slug: string;
  filterDetail?: any;
  selectedVariants?: any;
}) => {
  const { status: loginStatus } = useSession();
  const dispatch = useDispatch();
  const singleCartData = useSelector(
    (state: RootState) => state.cart.singleCart
  );
  const router = useRouter();
  const pathname = usePathname();
  const [countItem, setCountItem] = useState(1);
  const { data: detail } = useQuery({
    queryKey: ["detail", `${slug}`],
    queryFn: async () => {
      const res = await axios.get(`api/detailgift/${slug}`);
      return res.data.data;
    },
    onError: (error) => {
      console.log("Data not found");
    },
  });
  const images = detail
    ? detail.item_gift_images.map((image: DetailImage) => ({
        variant_id: image.variant_id,
        image_url: image.item_gift_image_url,
      }))
    : [];
  const findVarImage =
    selectedVariants !== undefined
      ? images.find((f: any) => f.variant_id === selectedVariants.id)
      : undefined;
  const [selectedVariantImage, setSelectedVariantImage] = useState(
    selectedVariants && selectedVariants.id !== 0
      ? findVarImage !== undefined
        ? findVarImage.image_url
        : images[0].image_url
      : images[0] !== undefined
      ? images[0].image_url
      : "/assets/img/no-image.jpg"
  );
  const handleClickImage = (image: any) => {
    setSelectedVariantImage(
      image.item_gift_image_url !== undefined
        ? image.item_gift_image_url
        : "/assets/img/no-image.jpg"
    );
  };
  function rupiahCurrency(x: number) {
    return x.toLocaleString("id-ID", { style: "currency", currency: "IDR" });
  }
  useEffect(() => {
    dispatch(setUrlDetail(pathname));
  }, [pathname, dispatch]);

  const handleAddToCart = () => {
    if (loginStatus === "unauthenticated") {
      signIn();
    } else {
      if (countItem !== 0) {
        if (detail.variants.length !== 0) {
          toast.error("Mohon pilih varian");
        } else {
          addCart({
            item_gift_id: detail.id,
            cart_quantity: countItem,
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
        toast.error("Mohon atur jumlah barang");
      }
    }
  };
  const handleAddToCheckout = () => {
    if (loginStatus === "unauthenticated") {
      signIn();
    } else {
      if (countItem !== 0) {
        if (detail.variants.length !== 0) {
          toast.error("Mohon pilih varian");
        } else {
          dispatch(
            setSingleCart({
              cart_id: "1",
              product_id: detail.id,
              product_image: selectedVariantImage,
              product_name: detail.item_gift_name,
              product_price: detail.item_gift_point,
              product_quantity: countItem,
              product_weight: detail.item_gift_weight,
              varian_id: null,
              varian_name: null,
            })
          );
          router.push("/checkout");
          // addCart({
          //   item_gift_id: detail.id,
          //   cart_quantity: countItem,
          //   variant_id: null,
          // })
          //   .then(() => {
          //     toast.success("berhasil ditambahkan");
          //     dispatch(getCart() as any);
          //     router.push("/checkout");
          //   })
          //   .catch(() => {
          //     toast.error("ada masalah");
          //   });
        }
      } else {
        toast.error("Mohon atur jumlah barang");
      }
    }
  };
  return (
    <section id="maincontent" className="container">
      {/* breadcrumb */}
      <div className="w-full h-12 px-6 py-3 mb-3 border-b border-border">
        <Link href={"/"}>Product</Link>
        {` > ${detail ? detail.item_gift_name : ""}`}
      </div>
      <div className="w-full flex flex-col md:flex-row gap-3 lg:gap-6 justify-center items-start">
        <div className="w-full md:w-2/4 lg:w-1/4 px-3 flex flex-col shrink gap-3 justify-center">
          <div className="h-72 object-contain mx-auto">
            <Image
              src={selectedVariantImage}
              alt="product"
              width={100}
              height={100}
              style={{ width: "auto", height: "100%" }}
              sizes="(max-width: 425px) 50vw,75vw"
            />
          </div>
          <div className="relative mx-auto">
            <div className="flex overflow-x-auto w-full sm:max-w-[216px] gap-3 py-3 scrollbar-style">
              {/* gambar */}
              {detail &&
                detail.item_gift_images.map((image: any) => (
                  <div
                    key={image.id}
                    className={`relative w-16 h-16 shrink-0 border-2 rounded-md cursor-pointer overflow-hidden ${
                      selectedVariantImage === image.item_gift_image_url
                        ? "border-primary"
                        : "border-border"
                    }`}
                  >
                    <Image
                      src={
                        image.item_gift_image_url !== undefined
                          ? image.item_gift_image_url
                          : "/assets/img/no-image.jpg"
                      }
                      alt="product"
                      width={64}
                      height={64}
                      className="object-contain"
                      onClick={() => handleClickImage(image)}
                    />
                  </div>
                ))}
            </div>
          </div>
        </div>
        <div className="px-3 md:2/4 lg:w-3/4 flex flex-col gap-3">
          <p className="font-bold text-2xl">
            {`${
              detail
                ? selectedVariants !== undefined &&
                  selectedVariants.variant_name !== ""
                  ? detail.item_gift_name +
                    " - " +
                    selectedVariants.variant_name
                  : detail.item_gift_name
                : ""
            }`}
          </p>
          <div className="flex gap-3 items-center">
            <GiftRating
              stars={detail ? detail.total_rating : 0}
              reviews={detail ? detail.total_reviews : 0}
              scale={20}
            />
            <div className="w-full">
              <p className="text-sm">
                {detail && detail.total_reviews} reviewers
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <p className="font-bold text-2xl text-primary">
              {detail
                ? selectedVariants !== undefined &&
                  selectedVariants.variant_point !== 0
                  ? rupiahCurrency(selectedVariants.variant_point)
                  : detail.fitem_gift_point
                : 0}
            </p>
          </div>
          <div className="w-full">
            <div className="w-min py-0.5 border-b border-border">
              <h2 className="font-semibold text-lg">Detail</h2>
            </div>
            <div className="flex flex-col gap-1 pt-1">
              <div className="flex gap-3">
                <div className="w-20">
                  <p className="font-medium uppercase">Brand</p>
                </div>
                <p>
                  {detail && detail.brand ? detail.brand.brand_name : "Unknown"}
                </p>
              </div>
              <div className="flex gap-3">
                <div className="w-20">
                  <p className="font-medium uppercase">Kategori</p>
                </div>
                <p>
                  {detail && detail.category
                    ? detail.category.category_name
                    : "Unknown"}
                </p>
              </div>
              <div className="flex gap-3">
                <div className="w-20">
                  <p className="font-medium uppercase">Berat</p>
                </div>
                <p>
                  {detail
                    ? selectedVariants !== undefined &&
                      selectedVariants.fvariant_weight !== 0
                      ? selectedVariants.fvariant_weight
                      : detail.fitem_gift_weight
                    : "0 Gram"}
                </p>
              </div>
              <div className="flex gap-3">
                <div className="w-20">
                  <p className="font-medium uppercase">Stok</p>
                </div>
                <p>
                  {detail
                    ? selectedVariants !== undefined &&
                      selectedVariants.variant_quantity !== 0
                      ? selectedVariants.variant_quantity
                      : detail.item_gift_quantity > 0
                      ? detail.item_gift_quantity
                      : "Stok Habis"
                    : 0}
                </p>
              </div>
              {detail && detail.variants[0] === undefined ? (
                ""
              ) : (
                <div className="flex gap-3">
                  <div className="w-20">
                    <p className="font-medium uppercase">Varian</p>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {detail &&
                      detail.variants.map((v: any, idx: number) => {
                        return v.variant_slug !== null ? (
                          <Link
                            key={idx}
                            href={`${v.variant_slug}`}
                            className={`${
                              pathname === "/" + v.variant_slug
                                ? "border-primary"
                                : "border-border"
                            } py-1 px-3 shrink-0 border-2 hover:border-primary rounded-md hover:shadow-md`}
                          >
                            {v.variant_name}
                          </Link>
                        ) : (
                          <Link
                            key={idx}
                            href={`${detail.item_gift_slug}`}
                            className={`${
                              pathname === "/" + v.variant_slug
                                ? "border-primary"
                                : "border-border"
                            } py-1 px-3 shrink-0 border-2 hover:border-primary rounded-md hover:shadow-md`}
                          >
                            {v.variant_name}
                          </Link>
                        );
                      })}
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-sm">Jumlah</p>
            <CountDetail count={countItem} setCountItem={setCountItem} />
          </div>
          <div className="flex gap-3">
            <WishBtn
              giftId={detail && detail.id}
              is_wishlist={detail && detail.is_wishlist}
            />
            <button
              onClick={handleAddToCart}
              className="px-3 py-1.5 text-white text-sm font-semibold bg-fuchsia-500 border border-purple-500 hover:bg-fuchsia-600 rounded-full"
            >
              + Keranjang
            </button>
            <button
              onClick={handleAddToCheckout}
              className="px-3 py-1.5 text-white text-sm font-semibold bg-purple-500 border border-fuchsia-500 hover:bg-purple-600 rounded-full"
            >
              Beli Sekarang
            </button>
          </div>
        </div>
      </div>
      <div className="w-full flex flex-col gap-3 py-6 px-3 mb-24">
        {detail && detail.item_gift_spesification.length > 0 ? (
          <div className="relative w-full">
            <div className="w-full border-b border-primary">
              <p className="inline-block h-full py-2 px-5 text-base font-bold text-primary border-b-2 border-primary">
                Spesifikasi Produk
              </p>
            </div>
            <div className="flex flex-col gap-3 p-3">
              <div className="w-full md:w-1/2 grid grid-cols-[25%_75%] gap-1 pt-1">
                {detail.item_gift_spesification.map(
                  (spec: any, idx: number) => (
                    <Fragment key={idx}>
                      <div className="w-full">
                        <p className="font-medium uppercase">{spec.key}</p>
                      </div>
                      <div className="w-full">
                        <p>: {spec.value}</p>
                      </div>
                    </Fragment>
                  )
                )}
              </div>
            </div>
          </div>
        ) : null}

        <div className="relative w-full">
          <div className="w-full border-b border-primary">
            <p className="inline-block h-full py-2 px-5 text-base font-bold text-primary border-b-2 border-primary">
              Deskripsi Produk
            </p>
          </div>
          <div className="flex flex-col gap-3 p-3">
            <p>{detail && detail.item_gift_description}</p>
          </div>
        </div>
        <GiftsReviewContainer productId={detail && detail.id} />
      </div>
    </section>
  );
};

export default GiftDetail;
