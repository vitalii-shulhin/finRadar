# Multi-Language SEO Implementation Guide

## 🌍 Two Approaches to Choose From

You have two options for implementing multi-language support:

### **Option A: Path-Based (Recommended for SEO)** ✅
- URLs: `/uk/`, `/ru/`
- Better for SEO (separate URLs for each language)
- Requires restructuring `src/app/` folder
- **Effort**: High (1-2 days)
- **SEO Benefit**: Maximum

### **Option B: Cookie/Query-Based (Quick Implementation)**
- URLs: `/?lang=uk`, `/?lang=ru` or same URL with cookie
- Easier to implement (no restructuring)
- Less ideal for SEO
- **Effort**: Low (few hours)
- **SEO Benefit**: Medium

---

## 📁 What's Already Created

I've prepared the i18n infrastructure for you:

```
src/i18n/
├── config.ts              # Language configuration
├── dictionaries/
│   ├── index.ts           # Dictionary loader
│   ├── uk.ts              # Ukrainian translations
│   └── ru.ts              # Russian translations
src/middleware.ts          # Language detection & routing
```

---

## 🚀 Option A: Path-Based Implementation (Recommended)

### Step 1: Restructure App Directory

**Current structure:**
```
src/app/
├── layout.tsx
├── page.tsx
├── credits/
│   └── page.tsx
├── cards/
│   └── page.tsx
└── ...
```

**New structure:**
```
src/app/
├── [lang]/
│   ├── layout.tsx         # Move from src/app/layout.tsx
│   ├── page.tsx           # Move from src/app/page.tsx
│   ├── credits/
│   │   └── page.tsx       # Move from src/app/credits/page.tsx
│   ├── cards/
│   │   └── page.tsx
│   └── ...
├── robots.ts              # Keep at root
├── sitemap.ts             # Keep at root
└── opengraph-image.tsx    # Keep at root
```

### Step 2: Update Root Layout

Create `src/app/[lang]/layout.tsx`:

```typescript
import { getDictionary } from '@/i18n/dictionaries';
import { i18n, type Locale } from '@/i18n/config';
import { Metadata } from 'next';
import LanguageSwitcher from '@/components/LanguageSwitcher';

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

export async function generateMetadata({
  params,
}: {
  params: { lang: Locale };
}): Promise<Metadata> {
  const dict = getDictionary(params.lang);

  return {
    title: {
      default: dict.meta.home.title,
      template: `%s | FinRadar`,
    },
    description: dict.meta.home.description,
    // ... rest of metadata
  };
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: Locale };
}) {
  const dict = getDictionary(params.lang);

  return (
    <html lang={params.lang}>
      <head>
        {/* Hreflang tags */}
        {i18n.locales.map((locale) => (
          <link
            key={locale}
            rel="alternate"
            hrefLang={locale}
            href={`${process.env.NEXT_PUBLIC_SITE_URL}/${locale}`}
          />
        ))}
        <link
          rel="alternate"
          hrefLang="x-default"
          href={`${process.env.NEXT_PUBLIC_SITE_URL}/${i18n.defaultLocale}`}
        />
      </head>
      <body>
        <LanguageSwitcher currentLang={params.lang} />
        <Header dict={dict} />
        <main>{children}</main>
        <Footer dict={dict} />
      </body>
    </html>
  );
}
```

### Step 3: Update All Pages

Example for `src/app/[lang]/credits/page.tsx`:

```typescript
import { getDictionary } from '@/i18n/dictionaries';
import { type Locale } from '@/i18n/config';
import { Metadata } from 'next';

export async function generateMetadata({
  params,
}: {
  params: { lang: Locale };
}): Promise<Metadata> {
  const dict = getDictionary(params.lang);

  return {
    title: dict.meta.credits.title,
    description: dict.meta.credits.description,
  };
}

export default function CreditsPage({
  params,
}: {
  params: { lang: Locale };
}) {
  const dict = getDictionary(params.lang);

  return (
    <div>
      <h1>{dict.credits.title}</h1>
      <p>{dict.credits.subtitle}</p>
      {/* Use dict throughout the component */}
    </div>
  );
}
```

### Step 4: Update Links

Change all `Link` components to include language:

```typescript
// Before
<Link href="/credits">Кредити</Link>

// After
<Link href={`/${params.lang}/credits`}>{dict.nav.credits}</Link>
```

---

## ⚡ Option B: Cookie-Based Implementation (Quick)

### Step 1: Update Middleware (Simpler Version)

Replace the existing middleware with a simpler cookie-based approach:

```typescript
// src/middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { i18n, type Locale } from './i18n/config';

export function middleware(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const langParam = searchParams.get('lang') as Locale;

  if (langParam && i18n.locales.includes(langParam)) {
    const response = NextResponse.next();
    response.cookies.set('NEXT_LOCALE', langParam, {
      maxAge: 60 * 60 * 24 * 365,
      path: '/',
    });
    return response;
  }

  return NextResponse.next();
}
```

### Step 2: Create Language Context

```typescript
// src/contexts/LanguageContext.tsx
'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { getDictionary, type Dictionary } from '@/i18n/dictionaries';
import { i18n, type Locale } from '@/i18n/config';
import Cookies from 'js-cookie';

const LanguageContext = createContext<{
  lang: Locale;
  dict: Dictionary;
  setLanguage: (lang: Locale) => void;
} | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Locale>(i18n.defaultLocale);
  const dict = getDictionary(lang);

  useEffect(() => {
    const savedLang = Cookies.get('NEXT_LOCALE') as Locale;
    if (savedLang && i18n.locales.includes(savedLang)) {
      setLang(savedLang);
    }
  }, []);

  const setLanguage = (newLang: Locale) => {
    setLang(newLang);
    Cookies.set('NEXT_LOCALE', newLang, { expires: 365 });
  };

  return (
    <LanguageContext.Provider value={{ lang, dict, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within LanguageProvider');
  return context;
};
```

### Step 3: Wrap App with Provider

```typescript
// src/app/layout.tsx
import { LanguageProvider } from '@/contexts/LanguageContext';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body>
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
```

### Step 4: Use in Components

```typescript
'use client';

import { useLanguage } from '@/contexts/LanguageContext';

export default function CreditsPage() {
  const { dict } = useLanguage();

  return (
    <div>
      <h1>{dict.credits.title}</h1>
      <p>{dict.credits.subtitle}</p>
    </div>
  );
}
```

**⚠️ SEO Limitation**: Option B requires client-side JavaScript, which is less optimal for SEO and initial render. Google can handle it, but Option A is better.

---

## 🔧 Language Switcher Component

This works for both options:

```typescript
// src/components/LanguageSwitcher.tsx
'use client';

import { i18n, type Locale, localeNames, localeFlags } from '@/i18n/config';
import { usePathname, useRouter } from 'next/navigation';
import { Globe } from 'lucide-react';

export default function LanguageSwitcher({
  currentLang
}: {
  currentLang?: Locale
}) {
  const pathname = usePathname();
  const router = useRouter();

  const switchLanguage = (newLang: Locale) => {
    // For Option A (path-based)
    if (currentLang) {
      const newPathname = pathname.replace(`/${currentLang}`, `/${newLang}`);
      router.push(newPathname);
      return;
    }

    // For Option B (cookie-based)
    document.cookie = `NEXT_LOCALE=${newLang}; path=/; max-age=31536000`;
    router.refresh();
  };

  return (
    <div className="relative group">
      <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white border hover:bg-gray-50">
        <Globe className="w-4 h-4" />
        <span>{localeFlags[currentLang || 'uk']}</span>
        <span className="text-sm font-medium">
          {localeNames[currentLang || 'uk']}
        </span>
      </button>

      <div className="absolute right-0 mt-2 py-2 bg-white rounded-lg shadow-xl border opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
        {i18n.locales.map((locale) => (
          <button
            key={locale}
            onClick={() => switchLanguage(locale)}
            className={`w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center gap-3 ${
              locale === currentLang ? 'bg-blue-50 text-blue-600' : ''
            }`}
          >
            <span className="text-xl">{localeFlags[locale]}</span>
            <span className="font-medium">{localeNames[locale]}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
```

---

## 📊 SEO: Hreflang Tags

### For Option A (Path-Based)

Add to `src/app/[lang]/layout.tsx` in `<head>`:

```typescript
{i18n.locales.map((locale) => (
  <link
    key={locale}
    rel="alternate"
    hrefLang={locale}
    href={`${process.env.NEXT_PUBLIC_SITE_URL}/${locale}${pathname}`}
  />
))}
<link
  rel="alternate"
  hrefLang="x-default"
  href={`${process.env.NEXT_PUBLIC_SITE_URL}/${i18n.defaultLocale}${pathname}`}
/>
```

### For Option B (Cookie-Based)

Add language indicator in URL for SEO:

```typescript
// In metadata
alternates: {
  languages: {
    'uk-UA': '/?lang=uk',
    'ru-RU': '/?lang=ru',
  },
}
```

---

## 🗺️ Update Sitemap for Multi-Language

```typescript
// src/app/sitemap.ts
import { i18n } from '@/i18n/config';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://finradar.com.ua';

  const routes = ['', '/credits', '/cards', '/insurance', '/crypto', '/news'];

  // Generate for each language
  const entries = i18n.locales.flatMap((locale) =>
    routes.map((route) => ({
      url: `${baseUrl}/${locale}${route}`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: route === '' ? 1 : 0.8,
      alternates: {
        languages: Object.fromEntries(
          i18n.locales.map((lang) => [
            lang,
            `${baseUrl}/${lang}${route}`,
          ])
        ),
      },
    }))
  );

  return entries;
}
```

---

## ✅ Recommendation

**For maximum SEO benefit, use Option A (Path-Based).**

### Why Option A is better:
✅ Separate URLs for each language
✅ Better indexing by search engines
✅ Hreflang tags work perfectly
✅ Users can bookmark language-specific pages
✅ No JavaScript required for initial render
✅ Clear structure in analytics

### Effort vs. Benefit:
- **Initial Effort**: 1-2 days to restructure
- **Long-term Benefit**: Better SEO, cleaner architecture, easier to maintain
- **User Experience**: Faster initial page loads, better accessibility

---

## 📋 Implementation Checklist

### Phase 1: Setup (Done ✅)
- [x] Create i18n configuration
- [x] Create Ukrainian dictionary
- [x] Create Russian dictionary
- [x] Create middleware for language detection

### Phase 2: Choose Your Approach
- [ ] **Option A**: Restructure to `[lang]` folder
  - [ ] Move all routes to `app/[lang]/`
  - [ ] Update all layouts and pages
  - [ ] Add `generateStaticParams` to layouts
  - [ ] Update all internal links
  - [ ] Add hreflang tags

- [ ] **Option B**: Use cookie/context approach
  - [ ] Create LanguageContext
  - [ ] Wrap app with LanguageProvider
  - [ ] Update components to use `useLanguage`
  - [ ] Update metadata for language alternatives

### Phase 3: Components
- [ ] Create Language Switcher component
- [ ] Add to Header/Navigation
- [ ] Test language switching
- [ ] Update Header with translations
- [ ] Update Footer with translations

### Phase 4: SEO
- [ ] Update sitemap for multi-language
- [ ] Add hreflang tags
- [ ] Update robots.txt if needed
- [ ] Update structured data for both languages
- [ ] Test with Google Search Console

### Phase 5: Testing
- [ ] Test all routes in both languages
- [ ] Test language switching
- [ ] Test SEO tags with validators
- [ ] Test on mobile devices
- [ ] Test browser language detection

---

## 🔍 SEO Keywords by Language

### Ukrainian Keywords
- фінанси України
- курс валют
- кредити онлайн
- банківські картки України
- страхування ОСЦПВ

### Russian Keywords
- финансы Украины
- курс валют
- кредиты онлайн
- банковские карты Украины
- страхование ОСАГО

---

## 📚 Resources

- [Next.js Internationalization](https://nextjs.org/docs/app/building-your-application/routing/internationalization)
- [Google Multi-regional and multilingual sites](https://developers.google.com/search/docs/specialty/international/managing-multi-regional-sites)
- [Hreflang Tags Guide](https://developers.google.com/search/docs/specialty/international/localized-versions)

---

**Status**: Infrastructure Ready ✅
**Next Step**: Choose Option A or B and start implementation
**Estimated Time**: Option A: 1-2 days | Option B: 4-6 hours

Need help with implementation? Follow the steps above or ask for specific guidance!
