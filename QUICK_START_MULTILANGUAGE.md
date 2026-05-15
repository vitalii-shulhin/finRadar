# Quick Start: Add Language Switcher (No Restructuring)

This guide shows you how to add Ukrainian/Russian language switching **without** restructuring your entire app directory.

---

## ✅ What's Already Done

1. **i18n Configuration** - `src/i18n/config.ts`
2. **Translations** - `src/i18n/dictionaries/uk.ts` and `ru.ts`
3. **Language Switcher Component** - `src/components/LanguageSwitcher.tsx`
4. **Middleware** - `src/middleware.ts` (language detection)
5. **Helper Functions** - `src/lib/i18n-helpers.ts`

---

## 🚀 Quick Implementation (5 Steps)

### Step 1: Add Language Switcher to Header

Update `src/components/Header.tsx`:

```typescript
import LanguageSwitcher from './LanguageSwitcher';

export default function Header() {
  return (
    <header>
      {/* Your existing header code */}

      {/* Add this before closing header tag */}
      <div className="ml-auto">
        <LanguageSwitcher mode="cookie" />
      </div>
    </header>
  );
}
```

**Exact position in your Header**: Add it to the navigation section, next to other nav items.

### Step 2: Create Language Context (Client-Side)

Create `src/contexts/LanguageContext.tsx`:

```typescript
'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { getDictionary, type Dictionary } from '@/i18n/dictionaries';
import { i18n, type Locale } from '@/i18n/config';
import { cookies } from '@/lib/cookies';

interface LanguageContextType {
  lang: Locale;
  dict: Dictionary;
  setLanguage: (lang: Locale) => void;
}

const LanguageContext = createContext<LanguageContextType | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Locale>(() => {
    // Check cookie on initial load
    if (typeof window !== 'undefined') {
      const savedLang = cookies.get('NEXT_LOCALE') as Locale;
      if (savedLang && i18n.locales.includes(savedLang)) {
        return savedLang;
      }
    }
    return i18n.defaultLocale;
  });

  const dict = getDictionary(lang);

  const setLanguage = (newLang: Locale) => {
    setLang(newLang);
    cookies.set('NEXT_LOCALE', newLang, 365);
  };

  return (
    <LanguageContext.Provider value={{ lang, dict, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
}
```

### Step 4: Wrap Your App

Update `src/app/layout.tsx`:

```typescript
import { LanguageProvider } from '@/contexts/LanguageContext';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="uk">
      <head>
        {/* Your existing head content */}
      </head>
      <body>
        <LanguageProvider>
          <GoogleTranslate />
          <Header />
          <main>{children}</main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
```

### Step 5: Use Translations in Components

Convert your pages to client components and use translations:

**Example: Update `src/app/credits/page.tsx`**

```typescript
'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import Link from 'next/link';
import { Wallet, Calculator } from 'lucide-react';

export default function CreditsPage() {
  const { dict } = useLanguage();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="container-custom py-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-primary">
              {dict.common.home}
            </Link>
            <span>/</span>
            <span className="text-gray-900">{dict.common.credits}</span>
          </div>
        </div>
      </div>

      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-primary-dark text-white py-16">
        <div className="container-custom text-center">
          <h1 className="text-5xl font-bold font-heading mb-4">
            {dict.credits.title}
          </h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            {dict.credits.subtitle}
          </p>
        </div>
      </div>

      {/* Rest of your content using dict.credits.* */}
    </div>
  );
}
```

---

## 📝 Translation Usage Examples

### In Components:

```typescript
'use client';
import { useLanguage } from '@/contexts/LanguageContext';

export default function MyComponent() {
  const { dict, lang } = useLanguage();

  return (
    <div>
      <h1>{dict.home.title}</h1>
      <p>{dict.home.subtitle}</p>
      <button>{dict.common.readMore}</button>
    </div>
  );
}
```

### In Metadata (Server Component):

For SEO metadata, you'll need to read cookies on the server:

```typescript
import { cookies } from 'next/headers';
import { getDictionary } from '@/i18n/dictionaries';
import { i18n, type Locale } from '@/i18n/config';

export async function generateMetadata() {
  const cookieStore = cookies();
  const locale = (cookieStore.get('NEXT_LOCALE')?.value as Locale) || i18n.defaultLocale;
  const dict = getDictionary(locale);

  return {
    title: dict.meta.credits.title,
    description: dict.meta.credits.description,
  };
}
```

---

## 🔍 SEO Considerations

### Add Language Alternates to Metadata

Update your metadata to include language alternatives:

```typescript
// In your layout or page metadata
export const metadata = {
  // ... existing metadata
  alternates: {
    languages: {
      'uk-UA': '/?lang=uk',
      'ru-RU': '/?lang=ru',
    },
  },
};
```

### Update Sitemap

Update `src/app/sitemap.ts` to include language variants:

```typescript
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://finradar.com.ua';

  const routes = ['', '/credits', '/cards', '/insurance', '/crypto', '/news'];

  return routes.flatMap((route) =>
    i18n.locales.map((locale) => ({
      url: `${baseUrl}${route}?lang=${locale}`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: route === '' ? 1 : 0.8,
    }))
  );
}
```

---

## ⚡ Priority Files to Update

Update these files first to see translations:

1. **Header** (`src/components/Header.tsx`)
   - Add LanguageSwitcher
   - Use dict for navigation labels

2. **Footer** (`src/components/Footer.tsx`)
   - Use dict for footer text

3. **Home Page** (`src/app/page.tsx`)
   - Convert to client component
   - Use dict for all text

4. **Credits Page** (`src/app/credits/page.tsx`)
   - Already has good structure
   - Just replace hard-coded text with dict

5. **News Page** (`src/app/news/page.tsx`)
   - Update UI text with translations

---

## 🎨 Styling the Language Switcher

The language switcher is already styled, but you can customize it in `src/components/LanguageSwitcher.tsx`.

**Example placement in Header**:

```typescript
<header className="flex items-center justify-between">
  <Logo />

  <nav className="flex items-center gap-6">
    <Link href="/credits">Кредити</Link>
    <Link href="/cards">Картки</Link>
    {/* ... other links */}
  </nav>

  {/* Language switcher */}
  <LanguageSwitcher mode="cookie" />
</header>
```

---

## 🧪 Testing

1. **Test Language Switching**:
   - Click language switcher
   - Verify cookie is set (check DevTools > Application > Cookies)
   - Verify page content changes

2. **Test Cookie Persistence**:
   - Switch language
   - Refresh page
   - Language should remain

3. **Test on Different Pages**:
   - Switch language on home page
   - Navigate to credits page
   - Language should persist

---

## 🔧 Troubleshooting

### Language doesn't change after switching

**Solution**: Make sure you're using `'use client'` at the top of your component file.

### Cookie not being set

**Solution**: Check that `src/lib/cookies.ts` exists and is properly imported

### Translations not showing

**Solution**: Check that you're importing `useLanguage` correctly and wrapping app with `LanguageProvider`.

### Hydration errors

**Solution**: Don't read cookies directly in server components during render. Use the context on client side.

---

## 📊 What You Get

✅ **Ukrainian and Russian support**
✅ **Language switcher in header**
✅ **Cookie-based persistence**
✅ **No URL restructuring needed**
✅ **All translations ready to use**
✅ **SEO-friendly (with limitations)**

---

## ⚠️ Limitations of Cookie-Based Approach

1. **SEO**: Google can index it, but path-based (`/uk/`, `/ru/`) is better
2. **Sharing**: Users can't share language-specific URLs easily
3. **Client-side**: Requires JavaScript to work
4. **Metadata**: Harder to have language-specific metadata

For **maximum SEO**, consider the full path-based approach in `MULTILANGUAGE_IMPLEMENTATION_GUIDE.md`.

---

## 📈 Next Steps

After basic implementation works:

1. **Update all pages** with translations
2. **Add hreflang tags** for better SEO
3. **Update metadata** to be language-aware
4. **Consider migrating** to path-based approach (`/uk/`, `/ru/`) for better SEO

---

## 🎯 Example: Complete Page Update

Here's a before/after example:

### Before:
```typescript
export default function CreditsPage() {
  return (
    <div>
      <h1>Кредити та позики</h1>
      <p>Порівняйте умови...</p>
    </div>
  );
}
```

### After:
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

**That's it!** The text automatically switches based on selected language.

---

**Estimated Time**: 2-4 hours to update main pages
**Difficulty**: Easy
**SEO Impact**: Medium (Good, but path-based is better)

Ready to implement? Start with Step 1! 🚀
