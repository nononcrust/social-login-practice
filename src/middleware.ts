import { NextRequest, NextResponse } from "next/server";
import { ROUTE } from "./constants/route";
import { STORAGE_KEY } from "./constants/storage";

export function middleware(request: NextRequest) {
  const accessToken = request.cookies.get(STORAGE_KEY.ACCESS_TOKEN)?.value;

  const isLoggedIn = !!accessToken;

  if (request.nextUrl.pathname === ROUTE.LOGIN && isLoggedIn) {
    return NextResponse.redirect(new URL(ROUTE.HOME, request.url));
  }
}
