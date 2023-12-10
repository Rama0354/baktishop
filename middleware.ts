import { withAuth, NextRequestWithAuth } from "next-auth/middleware";
import { redirect } from "next/navigation";
import { NextRequest } from "next/server";

export default withAuth(
  function middleware(request: NextRequest) {
    // console.log(request.headers);
    // const requestHeaders = new Headers(request.headers)
    // console.log(requestHeaders)
  },
  {
    callbacks: {
      authorized({ req, token }) {
        // `/admin` requires admin role
        if (req.nextUrl.pathname === "/admin") {
          return token?.roles[0] === "admin";
        }
        // `/account` only requires the user to be logged in
        // return !!token;
        return !!token;
      },
    },
  }
);

export const config = {
  matcher: ["/users","/users/(.*)", "/message", "/cart", "/dashboard"],
};
