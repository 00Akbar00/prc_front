import { NextResponse } from 'next/server';
import { parse } from 'cookie';

export function middleware(req) {
  const cookies = parse(req.headers.get('cookie') || ''); // Get and parse cookies
  const user = cookies.user ? JSON.parse(cookies.user) : null; // Parse user cookie
  const role = cookies.role; // Get role cookie

  const url = req.url;

  // Check if the user is logged in
  if (!user || !user.id) {
    return NextResponse.redirect(new URL('/', req.url)); // Redirect to login
  }

  // Role-based access control
  if ((url.includes('/userDash') && role !== 'user') || 
      (url.includes('/adminDash') && role !== 'admin')) {
    // Respond with a JSON message instead of redirecting
    return new NextResponse(
      JSON.stringify({ message: 'You are not authorized to access this page.' ,status:403}),
      {
        status: 403, // Forbidden
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }

  return NextResponse.next(); // Allow the request to proceed
}

export const config = {
  matcher: ['/adminDash', '/userDash'], // Protect these routes
};
