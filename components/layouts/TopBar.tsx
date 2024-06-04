import Link from "next/link";
import React from "react";
import Image from "next/image";
import CartButton from "../cart/CartButton";
import NotificationButton from "../NotificationButton";
import SearchForm from "../SearchForm";
import ProgressBar from "../Progressbar";
import StatusCheck from "../status/status-check";
import { ModeToggle } from "../mode-toggle";
import AccountButton from "../AccountButton";

const TopBar = () => {
  return (
    <>
      <StatusCheck />
      <ProgressBar />
      <header className="w-full px-1 bg-primary sticky top-0 z-40">
        <div className="container flex gap-1 lg:gap-4 py-2 px-1 lg:px-3 mx-auto">
          <div className="w-full flex gap-3 justify-between items-center">
            <div className="relative lg:w-full flex shrink-0 lg:shrink">
              <Link
                href={"/"}
                className="flex items-center gap-1 object-contain lg:items-end px-1"
              >
                <div className="relative w-8 h-8 sm:w-12 sm:h-12">
                  <Image
                    src={"/assets/icon/logo.png"}
                    alt="logo"
                    width={50}
                    height={50}
                    className="w-full h-full brightness-0 invert"
                    priority
                  />
                </div>
                <h1 className="hidden lg:block font-semibold text-2xl text-white py-1">
                  Shop
                </h1>
              </Link>
            </div>
            <div className="w-full flex items-center gap-1 lg:gap-3">
              <SearchForm />
              {/* <MobileFilter /> */}
              <div className="sm:hidden">
                <CartButton />
              </div>
            </div>
            <div className="hidden md:flex lg:w-full shrink-0 lg:shrink justify-end items-center gap-3">
              <ModeToggle textMode="light" />
              <NotificationButton />
              {/* <MessageButton /> */}
              <CartButton />
              <AccountButton />
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default TopBar;
