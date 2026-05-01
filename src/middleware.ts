import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { i18n, type Locale } from './i18n/config';

function getLocale(request: NextRequest): Locale {
  // 1. Check cookie
  const localeCookie = request.cookies.get('NEXT_LOCALE')?.value as Locale;
  if (localeCookie && i18n.locales.includes(localeCookie)) {
    return localeCookie;
  }

  // 2. Check Accept-Language header
  const acceptLanguage = request.headers.get('accept-language');
  if (acceptLanguage) {
    const preferredLocale = acceptLanguage
      .split(',')
      .map((lang) => lang.split(';')[0].trim().toLowerCase())
      .find((lang) => {
        // Match exact locale or language code (uk, ru, uk-UA, ru-RU, etc.)
        return i18n.locales.some(
          (locale) => locale === lang || lang.startsWith(locale)
        );
      });

    if (preferredLocale) {
      const matchedLocale = i18n.locales.find(
        (locale) => locale === preferredLocale || preferredLocale.startsWith(locale)
      );
      if (matchedLocale) return matchedLocale;
    }
  }

  // 3. Default locale
  return i18n.defaultLocale;
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Skip for static files, API routes, and special Next.js files
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/static') ||
    pathname.includes('.') || // has file extension
    pathname.startsWith('/robots') ||
    pathname.startsWith('/sitemap') ||
    pathname.startsWith('/opengraph-image') ||
    pathname.startsWith('/icon') ||
    pathname.startsWith('/apple-icon')
  ) {
    return NextResponse.next();
  }

  // Check if pathname already has a locale
  const pathnameHasLocale = i18n.locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  // If pathname already has locale, just continue
  if (pathnameHasLocale) {
    // Extract locale from pathname and set cookie
    const pathLocale = i18n.locales.find(
      (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
    );

    if (pathLocale) {
      const response = NextResponse.next();
      response.cookies.set('NEXT_LOCALE', pathLocale, {
        maxAge: 60 * 60 * 24 * 365,
        path: '/',
      });
      // Add pathname header for root layout
      response.headers.set('x-pathname', pathname);
      return response;
    }

    const response = NextResponse.next();
    response.headers.set('x-pathname', pathname);
    return response;
  }

  // Redirect to locale-prefixed URL
  const locale = getLocale(request);
  const newUrl = new URL(`/${locale}${pathname}`, request.url);

  // Preserve query parameters
  newUrl.search = request.nextUrl.search;

  const response = NextResponse.redirect(newUrl);

  // Set locale cookie
  response.cookies.set('NEXT_LOCALE', locale, {
    maxAge: 60 * 60 * 24 * 365,
    path: '/',
  });

  return response;
}

export const config = {
  matcher: [
    // Match all pathnames except:
    // - API routes
    // - _next (Next.js internals)
    // - static files
    '/((?!api|_next/static|_next/image|_next/data|favicon.ico|robots.txt|sitemap.xml|opengraph-image|icon|apple-icon).*)',
  ],
};
