import React, { ReactNode } from "react";
import CategoryListContainer from "./CategoryListContainer";
import Sidebar from "./Sidebar";
import SelectSort from "./SelectSort";
import BrandListContainer from "./BrandListContainer";

export default function HomeLayout({
  children,
  hometype,
}: {
  children: ReactNode;
  hometype?: string;
}) {
  return (
    <div className="container px-3 md:px-9 min-h-screen">
      <CategoryListContainer />
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
            <BrandListContainer />
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
