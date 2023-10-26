// ProgressBar.js
import { useEffect } from "react";
import NProgress from "nprogress";

function ProgressBar() {
  useEffect(() => {
    NProgress.configure({ showSpinner: false });
    NProgress.start();
    console.log("start");

    return () => {
      console.log("end");
      NProgress.done();
    };
  }, []);

  return null;
}

export default ProgressBar;
