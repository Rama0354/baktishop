import React from "react";
import { BiLogoFacebook, BiLogoInstagram, BiLogoTwitter } from "react-icons/bi";

export default function Footer() {
  return (
    <footer className="bg-slate-900 w-full mx-auto px-24">
      <div className="w-full h-16 flex items-center justify-between bg-slate-900 text-white">
        <div className="flex gap-2">
          <BiLogoInstagram size={"1.3rem"} />
          <BiLogoFacebook size={"1.3rem"} />
          <BiLogoTwitter size={"1.3rem"} />
        </div>
        <p className="text-[14px]">
          Teams and Condition | Copyright &copy; All rights reserved BaktiWeb
        </p>
      </div>
    </footer>
  );
}
