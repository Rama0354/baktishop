import TransactionClient from "@/components/users/transactions/TransactionClient";
import { OrdersDataFull } from "@/lib/types/order";
import { getOrdersByUser } from "@/lib/utils/action/OrderActions";
import Image from "next/image";
import Link from "next/link";
import { AiOutlineSchedule } from "react-icons/ai";

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const searchPage = searchParams.page;
  const datas = await getOrdersByUser({
    page: searchPage ? parseInt(searchPage as string) : 1,
    params: "",
  });

  const orders: OrdersDataFull = datas;
  const metapage = orders && !datas.error ? orders.meta : null;
  const pNumber = metapage !== null ? [...Array(metapage.last_page)] : [];
  return (
    <section className="w-full h-full min-h-screen">
      <div className="w-full flex gap-3 items-center py-4 px-1 sm:px-6 mb-3 border-b-2 bg-secondary/50">
        <AiOutlineSchedule className={"w-6 h-6 stroke-2"} />
        <h2 className="font-semibold text-lg">Riwayat Transaksi</h2>
      </div>
      <div className="relative w-full mt-0 px-1 sm:px-3 ">
        {orders && !datas.error ? (
          <TransactionClient orders={orders} />
        ) : (
          <div className="w-full h-full flex justify-center items-center">
            <Image
              src={"/assets/img/not-found-order.png"}
              width={200}
              height={200}
              className="sm:w-64"
              alt="product-not-found"
            />
          </div>
        )}
      </div>
      {metapage && metapage.total > metapage.per_page ? (
        <nav className="w-full py-6 px-3 flex gap-3 mb-0 mt-3 justify-center">
          <Link
            className={`${
              metapage.current_page === 1
                ? " pointer-events-none bg-secondary border-transparent text-slate-600"
                : ""
            } block py-1 px-3 border border-primary text-base font-semibold text-primary hover:bg-primary/10 rounded-md hover:shadow-md`}
            href={`?page=${metapage.current_page - 1}`}
          >
            Prev
          </Link>
          {pNumber && pNumber.length !== 0
            ? pNumber.map((_, idx) => (
                <Link
                  key={idx}
                  className={`${
                    metapage.current_page === idx + 1
                      ? "bg-primary text-white hover:bg-primary/80"
                      : ""
                  } block py-1 px-3 border border-primary text-base font-semibold text-primary rounded-md hover:shadow-md`}
                  href={`?page=${idx + 1}`}
                >
                  {idx + 1}
                </Link>
              ))
            : null}
          <Link
            className={`${
              metapage.current_page === metapage.last_page
                ? " pointer-events-none bg-secondary border-transparent text-slate-600"
                : ""
            } block py-1 px-3 border border-primary text-base font-semibold text-primary hover:bg-primary/10 rounded-md hover:shadow-md`}
            href={`?page=${metapage.current_page + 1}`}
          >
            Next
          </Link>
        </nav>
      ) : null}
    </section>
  );
}
