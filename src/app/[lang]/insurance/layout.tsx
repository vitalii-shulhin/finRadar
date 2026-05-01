import { Metadata } from 'next';
import { getDictionary } from '@/i18n/dictionaries';
import type { Locale } from '@/i18n/config';

export async function generateMetadata({
  params,
}: {
  params: { lang: Locale };
}): Promise<Metadata> {
  const dict = getDictionary(params.lang);
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://finradar.ua';

  return {
    title: dict.meta.insurance.title,
    description: dict.meta.insurance.description,
    keywords: [...dict.meta.insurance.keywords],
    openGraph: {
      title: dict.meta.insurance.ogTitle,
      description: dict.meta.insurance.ogDescription,
      type: 'website',
      locale: params.lang === 'uk' ? 'uk_UA' : 'ru_RU',
      url: `${baseUrl}/${params.lang}/insurance`,
    },
    twitter: {
      card: 'summary_large_image',
      title: dict.meta.insurance.ogTitle,
      description: dict.meta.insurance.ogDescription,
    },
    alternates: {
      languages: {
        'uk': `${baseUrl}/uk/insurance`,
        'ru': `${baseUrl}/ru/insurance`,
        'x-default': `${baseUrl}/uk/insurance`,
      },
    },
  };
}

export default function InsuranceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
