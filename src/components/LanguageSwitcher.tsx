'use client';

import { i18n, type Locale, localeNames, localeFlags } from '@/i18n/config';
import { usePathname, useRouter } from 'next/navigation';
import { Globe } from 'lucide-react';
import { useState } from 'react';
import { cookies } from '@/lib/cookies';

interface LanguageSwitcherProps {
  currentLang?: Locale;
  mode?: 'path' | 'cookie'; // 'path' for /uk/ /ru/, 'cookie' for cookie-based
}

export default function LanguageSwitcher({
  currentLang,
  mode = 'path'
}: LanguageSwitcherProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  // Determine current language
  const activeLang = currentLang || i18n.defaultLocale;

  const switchLanguage = (newLang: Locale) => {
    setIsOpen(false);

    if (mode === 'path' && currentLang) {
      // Path-based: /uk/page -> /ru/page
      const segments = pathname.split('/');
      if (segments[1] && i18n.locales.includes(segments[1] as Locale)) {
        segments[1] = newLang;
        router.push(segments.join('/'));
      } else {
        router.push(`/${newLang}${pathname}`);
      }
    } else {
      // Cookie-based: set cookie and refresh
      cookies.set('NEXT_LOCALE', newLang, 365);

      // Add lang parameter to URL for SEO
      const url = new URL(window.location.href);
      url.searchParams.set('lang', newLang);
      router.push(url.pathname + url.search);
      router.refresh();
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white border border-gray-200 hover:bg-gray-50 hover:border-gray-300 transition-all shadow-sm"
        aria-label="Switch language"
      >
        <Globe className="w-4 h-4 text-gray-600" />
        <span className="text-xl">{localeFlags[activeLang]}</span>
        <span className="text-sm font-semibold text-gray-700">
          {localeNames[activeLang]}
        </span>
        <svg
          className={`w-4 h-4 text-gray-500 transition-transform ${
            isOpen ? 'rotate-180' : ''
          }`}
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />

          {/* Dropdown */}
          <div className="absolute right-0 mt-2 py-1 bg-white rounded-lg shadow-2xl border border-gray-200 z-50 min-w-[200px]">
            {i18n.locales.map((locale) => (
              <button
                key={locale}
                onClick={() => switchLanguage(locale)}
                className={`w-full px-4 py-3 text-left hover:bg-gray-50 flex items-center gap-3 transition-colors ${
                  locale === activeLang
                    ? 'bg-blue-50 text-blue-600 font-semibold'
                    : 'text-gray-700'
                }`}
              >
                <span className="text-2xl">{localeFlags[locale]}</span>
                <span className="font-medium">{localeNames[locale]}</span>
                {locale === activeLang && (
                  <svg
                    className="w-5 h-5 ml-auto text-blue-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
