import React from "react";
import { MdOutlineShoppingCart } from "react-icons/md";
import { getCarts } from "@/app/lib/utils/action/Cartactions";
import Image from "next/image";
import Link from "next/link";
import CountCart from "@/app/components/cart/CountCart";
import DeleteBtnCart from "@/app/components/cart/DeleteBtnCart";
import ToCheckoutBtn from "@/app/components/cart/ToCheckoutBtn";

export default async function CartPage() {
  const getCartDatas = await getCarts();
  const cartItems = getCartDatas !== undefined ? getCartDatas : undefined;
  const cartData =
    cartItems &&
    cartItems.map((product) => {
      return {
        points: product.variants
          ? product.variants.variant_point
          : product.item_gifts.item_gift_point,
        qtys: product.cart_quantity,
      };
    });
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
  return (
    <section className="container px-3 mt-3 mb-12 min-h-screen flex flex-col bg-white border border-slate-300 rounded-md shadow-md">
      <div className="w-full flex items-center gap-3 border-b-2 border-slate-300 py-1 px-6 md:py-2">
        <MdOutlineShoppingCart className="text-slate-700 w-6 h-6" />
        <h1 className="py-2 font-semibold text-xl text-slate-700">Keranjang</h1>
      </div>
      {/* <CartContainer cartItems={cartData && cartData.data} /> */}
      <div className="w-full py-3 px-0 sm:px-6 flex flex-col lg:flex-row gap-12 sm:gap-3">
        <div className="w-full lg:w-2/3">
          <table className="w-full min-w-min overflow-x-auto text-sm text-left text-gray-500 border border-slate-200">
            <thead className="text-xs text-gray-700 uppercase bg-gray-200">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Produk
                </th>
              </tr>
            </thead>
            <tbody>
              {cartItems && cartItems.length > 0 ? (
                cartItems.map((product, idx: number) => (
                  <tr key={idx} className="bg-white border-b ">
                    <td className="h-full flex items-start sm:items-center justify-between gap-1 sm:gap-3 px-1 sm:px-6 py-3 text-slate-700">
                      <div className="shrink-0 max-h-20 w-12 sm:w-20">
                        <Image
                          src={
                            product && product.variants !== null
                              ? product.variants.variant_image.image_url
                              : product.item_gifts.item_gift_images[0]
                                  .item_gift_image_url &&
                                product.item_gifts.item_gift_images[0]
                                  .item_gift_image_url !== ""
                              ? product.item_gifts.item_gift_images[0]
                                  .item_gift_image_url
                              : "/assets/img/no-image.jpg"
                          }
                          width={64}
                          height={64}
                          alt="cart-picture"
                        />
                      </div>
                      <div className="w-full flex flex-col gap-3 md:flex-row justify-between">
                        <div className="w-full">
                          <h2 className="text-sm sm:text-lg font-medium">
                            {product && product.item_gifts.item_gift_name}
                          </h2>
                          {product && product.variants !== null ? (
                            <p className="text-xs font-medium py-1 px-2 w-max bg-slate-100 rounded-md">
                              {product.variants.variant_name}
                            </p>
                          ) : null}
                          <p className="font-semibold text-base text-amber-500">
                            {product && product.variants !== null
                              ? product.variants.fvariant_point
                              : product.item_gifts.fitem_gift_point !== ""
                              ? product.item_gifts.fitem_gift_point
                              : "Rp 0"}
                          </p>
                        </div>
                        <div className="flex items-center">
                          <CountCart
                            scale={75}
                            count={product.cart_quantity}
                            cartId={product.id}
                          />
                        </div>
                      </div>
                      <div className="flex items-start">
                        <DeleteBtnCart cartid={product.id} />
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr className="bg-white border-b ">
                  <td
                    scope="row"
                    className="flex items-center justify-center gap-3 px-6 py-3 text-slate-700"
                  >
                    <p className=" italic">Tidak ada Barang yang dipesan</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="w-full lg:w-1/3 flex flex-col gap-1">
          <div className="flex justify-between items-center text-slate-700">
            <p className="font-medium text-sm">Total Sementara</p>
            <p>{rupiahCurrency(subTotal)}</p>
          </div>
          <div className="flex justify-between items-center text-slate-700">
            <p className="font-medium text-sm">Jumlah</p>
            <p>{qtyTotal}</p>
          </div>
          <div className="flex my-3 justify-between items-center text-slate-700 border-t-2 border-slate-500">
            <p className="font-semibold text-base">Harga Total</p>
            <p className="font-semibold text-base">
              {rupiahCurrency(subTotal)}
            </p>
          </div>
          <div className="flex gap-3">
            <Link
              href={"/"}
              className="w-full py-1 px-3 font-semibold bg-white text-center text-primary-dark border-2 border-primary-dark rounded-md"
            >
              Lanjut Belanja
            </Link>
            <ToCheckoutBtn cartCount={cartItems ? cartItems.length : 0} />
          </div>
        </div>
      </div>
    </section>
  );
}
