import { withAuth, NextRequestWithAuth } from "next-auth/middleware";
import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

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
        if (req.nextUrl.pathname === "/dashboard") {
          return token?.roles[0] === "admin";
        }
        if (
          req.nextUrl.pathname === "/users" ||
          req.nextUrl.pathname === "/users/(.*)" ||
          req.nextUrl.pathname === "/message" ||
          req.nextUrl.pathname === "/cart"
        ) {
          return token?.email !== null;
        }
        // `/account` only requires the user to be logged in
        // return !!token;
        return !!token;
      },
    },
  }
);

export const config = {
  matcher: ["/users", "/users/(.*)", "/message", "/cart", "/dashboard"],
};
