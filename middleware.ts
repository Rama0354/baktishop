import { withAuth, NextRequestWithAuth } from "next-auth/middleware";

export default withAuth(
  function middleware(request: NextRequestWithAuth) {
    // console.log(request.nextUrl.pathname);
  },
  {
    callbacks: {
      authorized({ req, token }) {
        // `/admin` requires admin role
        if (req.nextUrl.pathname === "/admin") {
          return token?.roles[0] === "admin";
        }
        // `/account` only requires the user to be logged in
        return !!token;
      },
    },
  }
);

export const config = {
  matcher: ["/account", "/message", "/cart", "/admin", "/admin/(.*)"],
};
