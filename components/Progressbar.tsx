"use client";
import { useEffect } from "react";
import NProgress from "nprogress";
// import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";

function ProgressBar() {
  // const { status } = useSession();
  const pathname = usePathname();
  useEffect(() => {
    NProgress.configure({
      showSpinner: false,
      speed: 1000,
    });
    NProgress.start();
    NProgress.set(0.8);
    NProgress.done();
    // if (status !== "loading") {
    //   NProgress.done();
    // }
  }, [pathname]);
  return <div role="alert" aria-busy="true"></div>;
}

export default ProgressBar;
