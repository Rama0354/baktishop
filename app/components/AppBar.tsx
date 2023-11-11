import Link from "next/link";
import React from "react";
import SigninButton from "./SigninButton";
import Image from "next/image";
import { AiOutlineFilter } from "react-icons/ai";
import CartButton from "./CartButton";
import MessageButton from "./MessageButton";
import NotificationButton from "./NotificationButton";
import SearchForm from "./SearchForm";

const AppBar = () => {
  return (
    <header className="w-full px-1 bg-gradient-to-b from-purple-600 to-fuchsia-500 text-white sticky top-0 z-40">
      <div className="container flex gap-1 lg:gap-4 py-2 px-1 lg:px-3 mx-auto">
        <div className="w-full flex gap-3 justify-between items-center">
          <div className="relative lg:w-full flex shrink-0 lg:shrink">
            <Link href={"/"} className="flex object-contain lg:items-end px-1">
              <div className="relative w-12 h-12 sm:w-16 sm:h-16">
                <Image
                  src={"/assets/img/logo2.png"}
                  alt="logo"
                  width={80}
                  height={80}
                  className="brightness-0 invert"
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
            <div className="lg:hidden">
              <button className="p-2 hover:bg-purple-100/50 transition duration-300 ease-in-out rounded-full">
                <AiOutlineFilter className="text-white stroke-2 w-6 h-6" />
              </button>
            </div>
          </div>
          <div className="hidden md:flex lg:w-full shrink-0 lg:shrink justify-end gap-3">
            <NotificationButton />
            <MessageButton />
            <CartButton />
            <SigninButton />
          </div>
        </div>
      </div>
    </header>
  );
};

export default AppBar;
