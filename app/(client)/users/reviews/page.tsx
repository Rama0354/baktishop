import ReviewsList from "@/components/reviews/reviews-list";
import { getAllReviews } from "@/lib/utils/action/ReviewsActions";
import Link from "next/link";
import { AiOutlineSchedule } from "react-icons/ai";
import { MdArrowBack } from "react-icons/md";

export default async function ReviewsPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const reviews = await getAllReviews({
    page: searchParams.page !== undefined ? searchParams.page : (1 as any),
    params: "",
  });

  return (
    <section className="w-full h-full min-h-screen">
      <div className="w-full flex gap-3 items-center py-2 px-1 sm:px-6 mb-3 border-b-2 bg-secondary/50">
        <div className="flex items-center">
          <Link
            href={"/users"}
            className="flex justify-center items-center w-9 h-9 sm:w-12 sm:h-12 hover:bg-secondary/50 rounded-full"
          >
            <MdArrowBack className={"w-6 h-6 sm:w-9 sm:h-9"} />
          </Link>
        </div>
        <AiOutlineSchedule className={"w-6 h-6 stroke-2"} />
        <h2 className="font-semibold text-lg">Semua Ulasan</h2>
      </div>
      <div className="relative w-full px-1 sm:px-3 ">
        {reviews && reviews.data.length !== 0 ? (
          <ReviewsList reviews={reviews} />
        ) : (
          <p>tidak ada review</p>
        )}
      </div>
    </section>
  );
}
