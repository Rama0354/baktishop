// import { withAuth, NextRequestWithAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
import { auth as middleware } from "@/lib/auth";

export default middleware((req) => {
  console.log("request :", req.nextUrl.pathname);
  if (
    req.nextUrl.pathname.startsWith("/dashboard") &&
    req.auth?.user?.roles[0] !== "admin"
  ) {
    return NextResponse.rewrite(new URL("/unauthorized", req.url));
  }
});

// export default withAuth(
//   // `withAuth` augments your `Request` with the user's token.
//   // refresh the token if it's expired

//   function middleware(req: NextRequestWithAuth) {
//     console.log(req.nextUrl.pathname);
//     if (
//       req.nextUrl.pathname.startsWith("/dashboard") &&
//       req.nextauth.token?.role !== "admin"
//     ) {
//       return NextResponse.rewrite(new URL("/unauthorized", req.url));
//     }
//   },
//   {
//     callbacks: {
//       authorized: ({ token }) => !!token,
//     },
//   }
// );

export const config = {
  matcher: [
    "/users",
    "/users/:path*",
    "/cart",
    "/messages",
    "/notifications",
    "/checkout",
    "/dashboard",
  ],
};
