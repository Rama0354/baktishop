"use client";

import RatingButton from "./RatingButton";

const Sidebar = () => {
  return (
    <div className="w-64 hidden lg:block">
      {/* siebar */}
      <div className="w-full py-2 px-3 sticky top-20 z-30 flex items-center border-b-2 bg-white border-slate-200">
        <p className="font-bold text-base p-3">Filter</p>
      </div>
      <div className="w-full py-3 px-1">
        <RatingButton />
      </div>
    </div>
  );
};

export default Sidebar;
