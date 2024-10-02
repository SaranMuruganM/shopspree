import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(request) {

  const token = request.cookies.get("auth-token");
  

  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  try {
    const { payload } = await jwtVerify(
      token.value,
      new TextEncoder().encode(process.env.JWT_SECRET)
    );

    

    if (
      request.nextUrl.pathname.startsWith("/admin") &&
      payload.role !== "admin"
    ) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    } else if (request.nextUrl.pathname.startsWith("/dashboard")) {
      return NextResponse.next();
    }

    return NextResponse.next();
  } catch (error) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: ["/dashboard/:path*", "/admin/:path*"],
};
