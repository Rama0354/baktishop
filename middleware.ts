// import { withAuth, NextRequestWithAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";

export default auth((req) => {
  console.log("request :", req.nextUrl.pathname);
  if (!req.auth && req.nextUrl.pathname !== "/login") {
    const newUrl = new URL("/login", req.nextUrl.origin);
    return NextResponse.redirect(newUrl);
  }
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
    // "/((?!api|_next/static|_next/image|favicon.ico).*)",
    "/users",
    "/users/:path*",
    "/cart",
    "/messages",
    "/notifications",
    "/checkout",
    "/dashboard",
  ],
};
