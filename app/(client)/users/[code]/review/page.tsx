import FormReviews from "@/components/users/transactions/form-reviews";
import { getTransByCode } from "@/lib/utils/action/OrderActions";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";
import { MdArrowBack } from "react-icons/md";

export default async function ReviewPage({
  params,
}: {
  params: { code: string };
}) {
  const res = await getTransByCode(params.code);

  if (res) {
    const items = res.redeem_item_gifts;
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
            <h1 className="font-medium text-sm sm:text-lg">Penilaian Produk</h1>
            <p className="text-xs sm:text-sm">
              Mohon beri penilaian pada produk kami
            </p>
          </div>
        </div>
        <FormReviews items={items} />
      </section>
    );
  } else {
    redirect("/users");
  }
}
