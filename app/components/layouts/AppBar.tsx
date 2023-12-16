import Link from "next/link";
import React from "react";
import SigninButton from "../SigninButton";
import Image from "next/image";
import CartButton from "../CartButton";
import NotificationButton from "../NotificationButton";
import SearchForm from "../SearchForm";
import ProgressBar from "../Progressbar";
import EmailNotification from "../email_verification/EmailNotification";

const AppBar = () => {
  return (
    <>
      <EmailNotification />
      <ProgressBar />
      <header className="w-full px-1 bg-gradient-to-b from-secondary-dark to-primary-dark text-white sticky top-0 z-40">
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
                <h1 className="hidden lg:block font-semibold text-2xl py-1">
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
            <div className="hidden md:flex lg:w-full shrink-0 lg:shrink justify-end gap-3">
              <NotificationButton />
              {/* <MessageButton /> */}
              <CartButton />
              <SigninButton />
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default AppBar;
