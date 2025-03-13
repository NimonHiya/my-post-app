import { NextResponse } from "next/server";
import { withAuth } from "next-auth/middleware";

export default withAuth(
  function middleware(req) {
    const role = req.nextauth?.token?.role;
    if (req.nextUrl.pathname.startsWith("/dashboard") && role !== "ADMIN") {
      return NextResponse.redirect(new URL("/home", req.url));
    }
  },
  { callbacks: { authorized: ({ token }) => !!token } }
);
