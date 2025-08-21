import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Handle TinaCMS admin panel routing
  if (request.nextUrl.pathname.startsWith('/admin')) {
    // Allow admin panel access
    return NextResponse.next();
  }

  // Handle locale routing
  const pathname = request.nextUrl.pathname;
  const pathnameIsMissingLocale = ['tr', 'en'].every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );

  if (pathnameIsMissingLocale) {
    // Redirect to default locale (Turkish)
    return NextResponse.redirect(
      new URL(`/tr${pathname}`, request.url)
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Skip all internal paths (_next)
    '/((?!_next|api|admin).*)',
    // Optional: add public files and api routes
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
