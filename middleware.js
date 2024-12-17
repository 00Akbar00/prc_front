import { NextResponse } from 'next/server';
import { parse } from 'cookie';

export function middleware(req) {
  const cookies = parse(req.headers.get('cookie') || ''); // Get and parse cookies
  const user = cookies.user ? JSON.parse(cookies.user) : null; // Parse user cookie
  const role = cookies.role; // Get role cookie

  const url = req.url;

  // Redirect to login if the user is not logged in
  if (!user || !user.id) {
    // Clear cookies if the user is not logged in
    const response = NextResponse.redirect(new URL('/', req.url));
    response.cookies.set('user', '', { path: '/', maxAge: -1 }); // Expire user cookie
   response.cookies.set('role', '', { path: '/', maxAge: -1 }); // Expire role cookie
    return response;
  }

  // Role-based access control
  if ((url.includes('/userDash') && role !== 'User') || 
      (url.includes('/adminDash') && role !== 'Admin')) {
    // Expire cookies if unauthorized access is attempted
    const response = new NextResponse(
      JSON.stringify({ message: 'You are not authorized to access this page.', status: 403 }),
      {
        status: 403, // Forbidden
        headers: { 'Content-Type': 'application/json' },
      }
    );
    response.cookies.set('user', '', { path: '/', maxAge: -1 }); // Expire user cookie
    response.cookies.set('role', '', { path: '/', maxAge: -1 }); // Expire role cookie
    return response;
  }

  return NextResponse.next(); // Allow the request to proceed
}

export const config = {
  matcher: ['/userDash', '/adminDash'], // Protect these routes
};
