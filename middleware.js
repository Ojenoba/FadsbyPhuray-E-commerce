import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(req) {
  const token = req.cookies.get("token")?.value;
  const { pathname } = req.nextUrl;

  if (pathname === "/admin/login" || pathname === "/account/signin") {
    return NextResponse.next();
  }

  if (pathname.startsWith("/admin")) {
    if (!token) {
      return NextResponse.redirect(new URL("/admin/login?reason=not-logged-in", req.url));
    }
    try {
      const secret = new TextEncoder().encode(process.env.JWT_SECRET);
      const { payload } = await jwtVerify(token, secret);
      if (payload.role !== "admin") {
        return NextResponse.redirect(new URL("/account/signin?reason=not-admin", req.url));
      }
    } catch {
      return NextResponse.redirect(new URL("/admin/login?reason=invalid-token", req.url));
    }
  }

  if (pathname.startsWith("/dashboard")) {
    if (!token) {
      return NextResponse.redirect(new URL("/account/signin?reason=not-logged-in", req.url));
    }
    try {
      const secret = new TextEncoder().encode(process.env.JWT_SECRET);
      await jwtVerify(token, secret);
    } catch {
      return NextResponse.redirect(new URL("/account/signin?reason=invalid-token", req.url));
    }
  }

  if (pathname.startsWith("/account") && !pathname.startsWith("/account/signin")) {
    if (!token) {
      return NextResponse.redirect(new URL("/account/signin?reason=not-logged-in", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/dashboard/:path*", "/account/:path*"],
};