import { NextResponse } from "next/server";

export function middleware(req) {
  const url = req.nextUrl.clone(); 
  const dashboardCookie = req.cookies.get("dashboard");

  // Check if the cookie doesn't exist or is invalid
  if (!dashboardCookie || !["admin", "user"].includes(dashboardCookie)) {
    url.pathname = "/"; // Redirect to home or login page if not authorized
    return NextResponse.redirect(url); 
  }

  // If the cookie value is valid, proceed with the next middleware or request
  return NextResponse.next();
}

export const config = {
  matcher: ["/adminDash", "/userDash"], 
};
