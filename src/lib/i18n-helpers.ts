import { i18n, type Locale } from '@/i18n/config';

/**
 * Generate hreflang links for SEO
 * Use this in page metadata or head
 */
export function getHreflangLinks(pathname: string, includeDefault = true): Array<{
  rel: 'alternate';
  hrefLang: Locale | 'x-default';
  href: string;
}> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://finradar.ua';

  // Remove any existing locale from pathname
  let cleanPath = pathname;
  for (const locale of i18n.locales) {
    if (cleanPath.startsWith(`/${locale}`)) {
      cleanPath = cleanPath.substring(3);
      break;
    }
  }

  const links: Array<{
    rel: 'alternate';
    hrefLang: Locale | 'x-default';
    href: string;
  }> = i18n.locales.map((locale) => ({
    rel: 'alternate' as const,
    hrefLang: locale,
    href: `${baseUrl}/${locale}${cleanPath}`,
  }));

  if (includeDefault) {
    links.push({
      rel: 'alternate',
      hrefLang: 'x-default',
      href: `${baseUrl}/${i18n.defaultLocale}${cleanPath}`,
    });
  }

  return links;
}

/**
 * Get alternate languages for sitemap
 */
export function getAlternateLanguages(path: string) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://finradar.ua';

  return Object.fromEntries(
    i18n.locales.map((locale) => [
      locale,
      `${baseUrl}/${locale}${path}`,
    ])
  );
}

/**
 * Detect locale from pathname
 */
export function getLocaleFromPathname(pathname: string): Locale {
  for (const locale of i18n.locales) {
    if (pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`) {
      return locale;
    }
  }
  return i18n.defaultLocale;
}

/**
 * Remove locale from pathname
 */
export function removeLocaleFromPathname(pathname: string): string {
  for (const locale of i18n.locales) {
    if (pathname.startsWith(`/${locale}/`)) {
      return pathname.substring(3);
    }
    if (pathname === `/${locale}`) {
      return '/';
    }
  }
  return pathname;
}

/**
 * Add locale to pathname
 */
export function addLocaleToPathname(pathname: string, locale: Locale): string {
  const cleanPath = removeLocaleFromPathname(pathname);
  return `/${locale}${cleanPath === '/' ? '' : cleanPath}`;
}
