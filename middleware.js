import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function middleware(request) {
 
  const cookieStore = await cookies();
  
  const accessToken = cookieStore.get('access_token');

  if (!accessToken) {
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }

  
  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*',
   '/:path*/dashboard',
   '/',
  ],  
};
