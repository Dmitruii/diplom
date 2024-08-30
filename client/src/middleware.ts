import { NextResponse, type NextRequest } from "next/server";

// auth middleware
export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Skip middleware for static files
  if (pathname.startsWith("/_next") || pathname.includes(".")) {
    return NextResponse.next();
  }

  const cookies: any = req.cookies.get("directus_session_token");

  // If the user is not authenticated, redirect to the sign-in page
  if (!cookies?.value && pathname !== "/signin") {
    return NextResponse.redirect(new URL("/signin", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|signin|signup).*)"],
};
