"use client";
import { useEffect } from "react";
import NProgress from "nprogress";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";

function ProgressBar() {
  const { status } = useSession();
  useEffect(() => {
    NProgress.configure({ showSpinner: false, speed: 1000 });
    NProgress.start();
    NProgress.set(0.8);
    if (status !== "loading") {
      NProgress.done();
    }
  }, [status]);
  return null;
}

export default ProgressBar;
