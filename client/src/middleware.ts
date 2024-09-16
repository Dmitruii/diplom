import { NextFetchEvent, NextResponse, type NextRequest } from "next/server";
import client from "./directus/api";
import { readItems } from "@directus/sdk";
import { entities } from "./lib/data";

// auth middleware
export function middleware(req: NextRequest, event: NextFetchEvent) {
  // const { pathname } = req.nextUrl;

  // // Skip middleware for static files
  // if (pathname.startsWith("/_next") || pathname.includes(".")) {
  //   return NextResponse.next();
  // }

  // const fetch = async () => {
  //   const d = await client.getToken();
  //   console.log(d);
  //   console.log("-------------------------------------------------");
  // };

  // event.waitUntil(fetch());

  // const cook: any = req.cookies.get("directus_session_token");

  // // If the user is not authenticated, redirect to the sign-in page
  // if (!cook?.value && pathname !== "/signin") {
  //   return NextResponse.redirect(new URL("/signin", req.url));
  // }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|signin|signup).*)"],
};
