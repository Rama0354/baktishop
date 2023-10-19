import React, { ReactNode } from "react";
import CategoryListContainer from "../CategoryListContainer";
import Sidebar from "../Sidebar";
import SelectSort from "../SelectSort";

export default function HomeLayout({ children }: { children: ReactNode }) {
  return (
    <div className="container px-3 md:px-9 min-h-screen">
      <div className="w-full bg-purple-100">
        <div className="w-full h-48 md:h-96"></div>
      </div>
      <CategoryListContainer />
      <div id="maincontent" className="w-full flex gap-6 text-slate-700 mb-12">
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
          <div className="w-full pb-12">{children}</div>
        </div>
      </div>
    </div>
  );
}
