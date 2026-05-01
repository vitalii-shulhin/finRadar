import type { Metadata, Viewport } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { OrganizationSchema, WebSiteSchema } from "@/components/StructuredData";
import { i18n, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { getAlternateLanguages } from "@/lib/i18n-helpers";

// Generate static params for all locales (for static export)
export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

// Generate metadata with proper language support
export async function generateMetadata({
  params,
}: {
  params: { lang: Locale };
}): Promise<Metadata> {
  const dict = getDictionary(params.lang);
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://finradar.ua';

  return {
    metadataBase: new URL(baseUrl),
    title: {
      default: dict.meta.home.title,
      template: "%s | 1FinRadar"
    },
    description: dict.meta.home.description,
    keywords: params.lang === 'uk'
      ? ["фінанси України", "новини", "курс валют", "курс долара", "кредити онлайн", "депозити", "банки України", "страхування", "кредитний калькулятор", "ОСАГО", "криптовалюта"]
      : ["финансы Украины", "новости", "курс валют", "курс доллара", "кредиты онлайн", "депозиты", "банки Украины", "страхование", "кредитный калькулятор", "ОСАГО", "криптовалюта"],
    authors: [{ name: "FinRadar Team" }],
    creator: "FinRadar",
    publisher: "FinRadar",
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    openGraph: {
      type: 'website',
      locale: params.lang === 'uk' ? 'uk_UA' : 'ru_RU',
      url: `/${params.lang}`,
      siteName: 'FinRadar',
      title: dict.meta.home.title,
      description: dict.meta.home.description,
      images: [
        {
          url: '/opengraph-image',
          width: 1200,
          height: 630,
          alt: 'FinRadar - Фінансовий портал України',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: dict.meta.home.title,
      description: dict.meta.home.description,
      images: ['/opengraph-image'],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    alternates: {
      languages: {
        'uk': `${baseUrl}/uk`,
        'ru': `${baseUrl}/ru`,
        'x-default': `${baseUrl}/uk`,
      },
    },
    verification: {
      google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
    },
  };
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#3B82F6',
};

export default function LangLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { lang: Locale };
}>) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://finradar.ua';

  return (
    <>
      {/* Hreflang tags for SEO */}
      {i18n.locales.map((locale) => (
        <link
          key={locale}
          rel="alternate"
          hrefLang={locale}
          href={`${baseUrl}/${locale}`}
        />
      ))}
      <link
        rel="alternate"
        hrefLang="x-default"
        href={`${baseUrl}/${i18n.defaultLocale}`}
      />

      {/* Structured Data */}
      <OrganizationSchema />
      <WebSiteSchema />

      <Header lang={params.lang} />
      <main className="min-h-screen">
        {children}
      </main>
      <Footer lang={params.lang} />
    </>
  );
}
