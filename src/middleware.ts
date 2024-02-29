import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export function middleware(request: NextRequest) {}
export const config = {
  matcher: "/dashboard/:path*",
};
