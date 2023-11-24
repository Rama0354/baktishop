import React, { ReactNode } from "react";
import CategoryListContainer from "../category/CategoryListContainer";
import Sidebar from "../Sidebar";
import SelectSort from "../SelectSort";
import BrandListContainer from "../BrandListContainer";
import Image from "next/image";

export default function CatAndBrLayout({
  children,
  layoutType,
}: {
  children: ReactNode;
  layoutType?: string;
}) {
  return (
    <div className="container px-3 md:px-9 min-h-screen">
      <div className="w-full bg-gradient-to-r from-purple-500 to-purple-300">
        <div className="w-full flex gap-3 h-48 p-6 text-white">
          <Image
            src={"/assets/img/no-image.jpg"}
            width={100}
            height={100}
            alt="category"
            className="w-48 h-full object-cover shadow-md"
          />
          <div>
            {layoutType === "cat" ? (
              <>
                <h2 className="font-semibold text-3xl">Handphone</h2>
                <p className="font-thin text-xl">Category</p>
              </>
            ) : (
              <>
                <h2 className="font-semibold text-3xl">Apple</h2>
                <p className="font-thin text-xl">Brand</p>
              </>
            )}
          </div>
        </div>
      </div>
      {layoutType === "cat" && <CategoryListContainer />}
      <div id="maincontent" className="w-full flex gap-6 text-slate-700 mb-12">
        <Sidebar />
        <div className="w-full">
          {/* main content */}
          <div className="w-full sticky top-16 lg:top-20 z-30 flex items-center justify-between p-3 border-b-2 bg-white border-slate-200">
            <div className="w-full">
              <p className="font-semibold text-base">Product List</p>
            </div>
            <div className="flex justify-end gap-3 items-center w-1/2 md:w-full">
              <SelectSort />
            </div>
          </div>
          <div className="w-full pb-12">
            {layoutType === "cat" ? (
              <BrandListContainer />
            ) : (
              <CategoryListContainer />
            )}
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
