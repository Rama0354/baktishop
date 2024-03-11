import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { getResiHistory } from "@/lib/utils/action/OrderActions";
import Link from "next/link";
import React from "react";
import { MdArrowBack } from "react-icons/md";

export default async function TrackingResiPage({
  params,
  searchParams,
}: {
  params: {
    resi: string;
  };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const exp = searchParams.courier;
  const resiHistory = await getResiHistory({
    resi: params.resi,
    courier: exp as string,
  });

  const expName = [
    { id: "jnt", name: "J&T Express" },
    { id: "jne", name: "JNE Express" },
    { id: "tiki", name: "TIKI Express" },
    { id: "pos", name: "POS Indonesia" },
  ];

  return (
    <section className="w-full p-3 flex flex-col gap-3">
      <div className="flex items-center">
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
            Lacak Resi. #{params.resi}
          </h1>
        </div>
      </div>
      <Card>
        <CardHeader className="py-3 border-b">
          <CardTitle>
            Expedisi {expName.find((k) => k.id === exp)?.name}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="relative">
            {resiHistory ? (
              resiHistory.map((r, idx: number) => (
                <li
                  key={idx}
                  className="border-l px-3 py-2 flex flex-col justify-center"
                >
                  <div
                    className={cn("absolute -left-2 w-4 h-4 rounded-full", {
                      "bg-green-600": idx === 0,
                      "bg-secondary": idx !== 0,
                    })}
                  ></div>
                  <span className="dark:text-white/50 text-xs">{r.date}</span>
                  <p className="font-medium">{r.desc}</p>
                  <span className="text-xs">{r.location}</span>
                </li>
              ))
            ) : (
              <li>Resi tidak ditemukan</li>
            )}
          </ul>
        </CardContent>
      </Card>
    </section>
  );
}
