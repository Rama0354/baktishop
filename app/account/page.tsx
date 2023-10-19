"use client";
import React, { Fragment, useState } from "react";
import ClientLayout from "../components/ClientLayout";
import { Tab } from "@headlessui/react";
import DashboardClient from "../components/client/DasboardClient";
import WishlistClient from "../components/client/WishlistClient";
import AddressClient from "../components/client/AddressClient";
import AccountClient from "../components/client/AccountClient";
import { AiOutlineUser } from "react-icons/ai";

export default function Account() {
  let [navigation] = useState({
    name: [
      {
        id: 1,
        name: "dashboard",
        title: "Dashboard",
      },
      {
        id: 1,
        name: "favorit",
        title: "Wishlist",
      },
      {
        id: 1,
        name: "alamat",
        title: "Alamat",
      },
      {
        id: 1,
        name: "akun",
        title: "Akun",
      },
    ],
  });
  return (
    <ClientLayout>
      <section className="container px-3 mt-3 mb-12 min-h-screen flex flex-col border border-slate-300 rounded-md shadow-md">
        <div className="w-full flex items-center gap-3 border-b-2 border-slate-300 py-1 px-6 md:py-2">
          <AiOutlineUser className="text-slate-700 stroke-2 w-6 h-6" />
          <h1 className="py-2 font-semibold text-xl text-slate-700">
            Info Akun
          </h1>
        </div>
        <div className="w-full flex flex-col sm:flex-row">
          <Tab.Group>
            <div className="w-full sm:w-1/4 md:px-3 shrink-0">
              <div className="w-full py-6 flex flex-col items-center">
                <div className="w-20 h-20 shrink-0 flex justify-center items-center bg-purple-500 rounded-full">
                  <p className="text-white font-medium text-xl">A</p>
                </div>
                <h2 className="font-semibold text-slate-600">Administrator</h2>
                <p className="py-1 px-3 text-sm text-blue-500 bg-blue-100 rounded-md">
                  Admin
                </p>
              </div>
              <Tab.List
                className={
                  "w-full py-2 flex sm:flex-col border-t border-l-slate-100"
                }
              >
                {navigation.name.map((nav, idx) => (
                  <Tab
                    key={idx}
                    id={nav.name}
                    as={"div"}
                    className={"w-full text-center sm:text-left"}
                  >
                    {({ selected }) => (
                      <div
                        className={`w-full py-2 px-3 font-medium rounded-md cursor-pointer outline-none
                          ${
                            selected
                              ? "text-white bg-purple-500"
                              : "text-slate-700 hover:bg-purple-200"
                          }`}
                      >
                        {nav.title}
                      </div>
                    )}
                  </Tab>
                ))}
              </Tab.List>
            </div>
            <Tab.Panels className="w-full sm:w-3/4">
              <Tab.Panel id={"dashboard"}>
                <DashboardClient />
              </Tab.Panel>
              <Tab.Panel id={"wishlist"}>
                <WishlistClient />
              </Tab.Panel>
              <Tab.Panel id={"address"}>
                <AddressClient />
              </Tab.Panel>
              <Tab.Panel id={"account"}>
                <AccountClient />
              </Tab.Panel>
            </Tab.Panels>
          </Tab.Group>
        </div>
      </section>
    </ClientLayout>
  );
}
