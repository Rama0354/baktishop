import { AddressData } from "@/app/types/address";
import React from "react";
import {
  AiOutlineDelete,
  AiOutlineEdit,
  AiOutlineEnvironment,
} from "react-icons/ai";

type addressClientProps = {
  address: {
    data: AddressData[];
  };
};

export default function AddressClient({ address }: addressClientProps) {
  return (
    <section className="w-full pb-6">
      <div className="w-full flex items-center gap-3 py-3 px-6 mb-3 border-b border-slate-200">
        <AiOutlineEnvironment className={"text-slate-700 stroke-2 w-6 h-6"} />
        <h2 className="font-semibold text-lg text-slate-700">Daftar Alamat</h2>
      </div>
      <div className="w-full relative">
        <ul className="md:px-6">
          {address && address.data.length !== 0
            ? address.data.map((a, idx: number) => (
                <li key={idx} className="py-1">
                  <div className="w-full max-w-lg py-2 px-3 flex gap-3 items-center justify-between border border-slate-200 shadow-md rounded-md">
                    <div>
                      <h2 className="font-semibold text-base text-slate-700">
                        {a.is_main === 1 ? "Alamat Utama" : "Alamat Lain"}
                      </h2>
                      <p className="font-medium text-sm text-slate-500">
                        {`${a.address !== "" ? a.address : ""}, 
                          ${
                            a.subdistrict.subdistrict_name !== ""
                              ? a.subdistrict.subdistrict_name
                              : ""
                          }, 
                          ${a.city.city_name !== "" ? a.city.city_name : ""}, 
                          ${
                            a.province.province_name !== ""
                              ? a.province.province_name
                              : ""
                          }, 
                          ${a.postal_code !== 0 ? a.postal_code : ""}`}
                      </p>
                      <div className="w-full flex justify-center gap-6 py-2">
                        <p className="py-1 px-3 flex items-center hover:bg-blue-100 cursor-pointer gap-3 text-sm text-blue-500 font-semibold rounded-md">
                          <AiOutlineEdit className={"stroke-2 w-6 h-6"} /> Edit
                        </p>
                        <p className="py-1 px-3 flex items-center hover:bg-rose-100 cursor-pointer gap-3 text-sm text-rose-500 font-semibold rounded-md">
                          <AiOutlineDelete className={"stroke-2 w-6 h-6"} />{" "}
                          Hapus
                        </p>
                      </div>
                    </div>
                  </div>
                </li>
              ))
            : null}
        </ul>
      </div>
    </section>
  );
}
