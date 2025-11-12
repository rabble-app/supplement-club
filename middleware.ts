/**
 * @format
 */

import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  if (process.env.NODE_ENV !== "production") {
    return NextResponse.next();
  }

  const xForwardedProto = request.headers.get("x-forwarded-proto");

  if (xForwardedProto && xForwardedProto.split(",")[0].trim() === "https") {
    return NextResponse.next();
  }

  const url = request.nextUrl.clone();
  url.protocol = "https";

  return NextResponse.redirect(url, 301);
}

export const config = {
  matcher: "/:path*",
};

