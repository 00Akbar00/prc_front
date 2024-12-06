import { NextResponse } from 'next/server';
import { parse } from 'cookie'; // For parsing cookies

export function middleware(req) {
  const cookies = parse(req.headers.get('cookie') || ''); // Get and parse cookies
  const user = cookies.user ? JSON.parse(cookies.user) : null; // Parse user cookie
  const role = cookies.role; // Get role cookie
  
  const url = req.url;
  
  // Check if the user is logged in and has the correct role
  if (!user || !user.id) {
    // Redirect to login if user is not logged in
    return NextResponse.redirect(new URL('/', req.url));
  }

  // Example: If the user is logged in and you want to reset the cookie
  // Reset the cookies for user and role if necessary
  if (user.id) {
    const response = NextResponse.next();

    // Reset the user and role cookies
    response.cookies.set('user', '', { path: '/', maxAge: -1 });
    response.cookies.set('role', '', { path: '/', maxAge: -1 });

    return response; // Return the response with the reset cookies
  }

  // Role-based access control
  if ((url.includes('/userDash') && role !== 'user') || 
      (url.includes('/adminDash') && role !== 'admin')) {
    // Redirect if the role does not match
    return NextResponse.redirect(new URL('/', req.url));
  }

  return NextResponse.next(); // Allow the request to proceed if everything checks out
}

export const config = {
  matcher: ['/adminDash', '/userDash'], // Protect these routes
};
