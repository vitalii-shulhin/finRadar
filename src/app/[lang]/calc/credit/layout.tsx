import { Metadata } from 'next';
import { getDictionary } from '@/i18n/dictionaries';
import type { Locale } from '@/i18n/config';

export async function generateMetadata({
  params,
}: {
  params: { lang: Locale };
}): Promise<Metadata> {
  const dict = getDictionary(params.lang);
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://finradar.com.ua';

  return {
    title: {
      default: dict.meta.creditCalculator.title,
      template: dict.meta.creditCalculator.titleTemplate,
    },
    description: dict.meta.creditCalculator.description,
    keywords: [...dict.meta.creditCalculator.keywords],
    openGraph: {
      title: dict.meta.creditCalculator.ogTitle,
      description: dict.meta.creditCalculator.ogDescription,
      type: 'website',
      locale: params.lang === 'uk' ? 'uk_UA' : 'ru_RU',
      url: `${baseUrl}/${params.lang}/calc/credit`,
    },
    twitter: {
      card: 'summary_large_image',
      title: dict.meta.creditCalculator.ogTitle,
      description: dict.meta.creditCalculator.ogDescription,
    },
    alternates: {
      languages: {
        'uk': `${baseUrl}/uk/calc/credit`,
        'ru': `${baseUrl}/ru/calc/credit`,
        'x-default': `${baseUrl}/uk/calc/credit`,
      },
    },
  };
}

export default function CreditCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
