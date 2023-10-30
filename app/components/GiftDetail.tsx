"use client";
import Image from "next/image";
import GiftRating from "./GiftRating";
import Link from "next/link";
import WishButton from "./WishButton";
import { Fragment, useEffect, useState } from "react";
import VariantButton from "./VariatButton";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { setUrlDetail, setVariant } from "../redux/slice/detailSlice";
import { usePathname, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { setCartItems } from "../redux/slice/cartSlice";
import CountDetail from "./CountDetail";
import ListReviewContainer from "./ListReviewContainer";

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
  filterDetail,
}: {
  slug: string;
  filterDetail?: any;
}) => {
  const dispatch = useDispatch();
  const pathname = usePathname();
  const variant = useSelector((state: RootState) => state.detail.variant);
  const cartItems = useSelector((state: RootState) => state.cart.cartItems);
  const [countItem, setCountItem] = useState(1);
  const { data: detail } = useQuery({
    queryKey: ["detail", `${slug}`],
    queryFn: async () => {
      const res = await axios.get(`api/detailgift?slug=${slug}`);
      return res.data.data;
    },
    onError: (error) => {
      console.log("Data not found");
    },
  });
  const images = detail.item_gift_images.map((image: DetailImage) => ({
    variant_id: image.variant_id,
    image_url: image.item_gift_image_url,
  }));
  const findIdxImage = images.findIndex(
    (f: any) => f.variant_id === variant.id
  );
  const [mainImage, setMainImage] = useState(
    images[0] !== undefined ? images[0].image_url : "/assets/img/no-image.jpg"
  );
  const [selectedVariantImage, setSelectedVariantImage] = useState(
    images[0] !== undefined ? images[0].image_url : "/assets/img/no-image.jpg"
  );
  const handleClickImage = (image: any) => {
    setMainImage(
      image.item_gift_image_url !== undefined
        ? image.item_gift_image_url
        : "/assets/img/no-image.jpg"
    );
    setSelectedVariantImage(
      image.item_gift_image_url !== undefined
        ? image.item_gift_image_url
        : "/assets/img/no-image.jpg"
    );
  };
  const handleVariantSelect = (variant: any) => {
    dispatch(setVariant(variant));
    const selectedVariant = images.find(
      (image: any) => image.variant_id === variant.id
    );
    if (selectedVariant) {
      setSelectedVariantImage(selectedVariant.image_url);
    }
  };
  function rupiahCurrency(x: number) {
    return x.toLocaleString("id-ID", { style: "currency", currency: "IDR" });
  }
  useEffect(() => {
    dispatch(setUrlDetail(pathname));
  }, [pathname, dispatch]);

  const handleAddToCart = () => {
    if (countItem !== 0) {
      if (detail.variants.length !== 0) {
        if (variant.id !== 0) {
          toast.success(
            `${detail.item_gift_name} varian ${variant.variant_name} Masuk Keranjang`
          );
          dispatch(
            setCartItems({
              product_id: detail.id,
              product_name: detail.item_gift_name,
              product_image: mainImage,
              varian_id: variant.id,
              varian_name: variant.variant_name,
              product_weight: detail.item_gift_weight,
              product_quantity: countItem,
              product_price: variant.variant_point,
            })
          );
        } else {
          toast.error("Mohon pilih varian");
        }
      } else {
        toast.success(`${detail.item_gift_name} Masuk Keranjang`);
        dispatch(
          setCartItems({
            product_id: detail.id,
            product_name: detail.item_gift_name,
            product_image: mainImage,
            product_weight: detail.item_gift_weight,
            product_quantity: countItem,
            product_price: detail.item_gift_point,
          })
        );
      }
    } else {
      toast.error("Mohon atur jumlah barang");
    }
  };
  return (
    <section id="maincontent" className="container text-slate-700">
      {/* breadcrumb */}
      <div className="w-full h-12 px-6 py-3 mb-3 border-b border-slate-200">
        <Link href={"/"}>Product</Link>
        {` > ${detail.item_gift_name}`}
      </div>
      <div className="w-full flex flex-col md:flex-row gap-3 lg:gap-6 justify-center items-start">
        <div className="md:w-2/4 lg:w-1/4 px-3 flex flex-col shrink gap-3 justify-center">
          <Image
            src={selectedVariantImage}
            alt="product"
            width={500}
            height={500}
            className="object-contain"
          />
          <div className="relative mx-auto">
            <div className="grid overflow-x-auto grid-cols-5 md:grid-cols-4 gap-3 py-3">
              {/* gambar */}
              {detail.item_gift_images.map((image: any) => (
                <Image
                  key={image.id}
                  src={
                    image.item_gift_image_url !== undefined
                      ? image.item_gift_image_url
                      : "/assets/img/no-image.jpg"
                  }
                  alt="product"
                  width={500}
                  height={500}
                  className={`w-20 object-contain border-2 cursor-pointer rounded-md ${
                    selectedVariantImage === image.item_gift_image_url
                      ? "border-purple-500"
                      : "border-slate-300"
                  }`}
                  onClick={() => handleClickImage(image)}
                />
              ))}
            </div>
          </div>
        </div>
        <div className="px-3 md:2/4 lg:w-3/4 flex flex-col gap-3">
          <p className="font-bold text-2xl">
            {`${
              variant
                ? variant.variant_name !== ""
                  ? detail.item_gift_name + " - " + variant.variant_name
                  : filterDetail && filterDetail.variant_name !== ""
                  ? detail.item_gift_name + " - " + filterDetail.variant_name
                  : detail.item_gift_name
                : detail.item_gift_name
            }`}
          </p>
          <div className="flex gap-3 items-center">
            <GiftRating
              stars={detail.total_rating}
              reviews={detail.total_reviews}
              scale={2}
            />
            <div className="w-full">
              <p className="text-sm text-slate-400">
                {detail.total_reviews} reviewers
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <p className="font-bold text-2xl text-purple-500">
              {variant
                ? variant.variant_point !== 0
                  ? rupiahCurrency(variant.variant_point)
                  : filterDetail && filterDetail.variant_point !== 0
                  ? rupiahCurrency(filterDetail.variant_point)
                  : detail.fitem_gift_point
                : detail.fitem_gift_point}
            </p>
          </div>
          <div className="w-full">
            <div className="w-min py-0.5 border-b border-slate-700">
              <h2 className="font-semibold text-lg">Detail</h2>
            </div>
            <div className="flex flex-col gap-1 pt-1">
              <div className="flex gap-3">
                <div className="w-20">
                  <p className="font-medium uppercase">Brand</p>
                </div>
                <p>{detail.brand ? detail.brand.brand_name : "Unknown"}</p>
              </div>
              <div className="flex gap-3">
                <div className="w-20">
                  <p className="font-medium uppercase">Kategori</p>
                </div>
                <p>
                  {detail.category ? detail.category.category_name : "Unknown"}
                </p>
              </div>
              <div className="flex gap-3">
                <div className="w-20">
                  <p className="font-medium uppercase">Berat</p>
                </div>
                <p>
                  {detail.fitem_gift_weight
                    ? detail.fitem_gift_weight
                    : "0 Gram"}
                </p>
              </div>
              <div className="flex gap-3">
                <div className="w-20">
                  <p className="font-medium uppercase">Stok</p>
                </div>
                <p>
                  {variant.variant_quantity !== 0
                    ? variant.variant_quantity
                    : filterDetail && filterDetail.variant_quantity !== 0
                    ? filterDetail.variant_quantity
                    : detail.item_gift_quantity > 0
                    ? detail.item_gift_quantity
                    : "Stok Habis"}
                </p>
              </div>
              {detail.variants[0] === undefined ? (
                ""
              ) : (
                <div className="flex gap-3">
                  <div className="w-20">
                    <p className="font-medium uppercase">Varian</p>
                  </div>
                  <VariantButton
                    variants={detail.variants}
                    filterDetail={filterDetail}
                    onVariantSelect={handleVariantSelect}
                  />
                </div>
              )}
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-sm">Jumlah</p>
            <CountDetail count={countItem} setCountItem={setCountItem} />
          </div>
          <div className="flex gap-3">
            <WishButton id={detail.id} isWishlist={detail.is_wishlist} />
            <button
              onClick={handleAddToCart}
              className="px-3 py-1.5 text-white text-sm font-semibold bg-fuchsia-500 border border-purple-500 hover:bg-fuchsia-600 rounded-full"
            >
              + Keranjang
            </button>
            <button className="px-3 py-1.5 text-white text-sm font-semibold bg-purple-500 border border-fuchsia-500 hover:bg-purple-600 rounded-full">
              Beli Sekarang
            </button>
          </div>
        </div>
      </div>
      <div className="w-full flex flex-col gap-3 py-6 px-3 mb-24">
        {detail.item_gift_spesification.length > 0 ? (
          <div className="relative w-full">
            <div className="w-full border-b border-purple-500">
              <p className="inline-block h-full py-2 px-5 text-base font-bold text-purple-500 border-b-2 border-purple-500">
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
          <div className="w-full border-b border-purple-500">
            <p className="inline-block h-full py-2 px-5 text-base font-bold text-purple-500 border-b-2 border-purple-500">
              Deskripsi Produk
            </p>
          </div>
          <div className="flex flex-col gap-3 p-3">
            <p>{detail.item_gift_description}</p>
          </div>
        </div>
        <ListReviewContainer reviewers={detail.reviews} />
      </div>
    </section>
  );
};

export default GiftDetail;
