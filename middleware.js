import { NextResponse } from "next/server";

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
    // ✅ Removed JWT verification - let the backend handle it via API calls
  }

  if (pathname.startsWith("/dashboard")) {
    if (!token) {
      return NextResponse.redirect(new URL("/account/signin?reason=not-logged-in", req.url));
    }
    // ✅ Removed JWT verification - let the backend handle it via API calls
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