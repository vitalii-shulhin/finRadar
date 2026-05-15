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
    title: dict.meta.depositCalculator.title,
    description: dict.meta.depositCalculator.description,
    keywords: [...dict.meta.depositCalculator.keywords],
    openGraph: {
      title: dict.meta.depositCalculator.ogTitle,
      description: dict.meta.depositCalculator.ogDescription,
      type: 'website',
      locale: params.lang === 'uk' ? 'uk_UA' : 'ru_RU',
      url: `${baseUrl}/${params.lang}/calc/deposit`,
    },
    twitter: {
      card: 'summary_large_image',
      title: dict.meta.depositCalculator.ogTitle,
      description: dict.meta.depositCalculator.ogDescription,
    },
    alternates: {
      languages: {
        'uk': `${baseUrl}/uk/calc/deposit`,
        'ru': `${baseUrl}/ru/calc/deposit`,
        'x-default': `${baseUrl}/uk/calc/deposit`,
      },
    },
  };
}

export default function DepositCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
