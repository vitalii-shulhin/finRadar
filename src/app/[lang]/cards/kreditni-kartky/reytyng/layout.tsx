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
    title: dict.meta.creditCardsRating.title,
    description: dict.meta.creditCardsRating.description,
    keywords: [...dict.meta.creditCardsRating.keywords],
    openGraph: {
      title: dict.meta.creditCardsRating.ogTitle,
      description: dict.meta.creditCardsRating.ogDescription,
      type: 'website',
      locale: params.lang === 'uk' ? 'uk_UA' : 'ru_RU',
      url: `${baseUrl}/${params.lang}/cards/kreditni-kartky/reytyng`,
    },
    twitter: {
      card: 'summary_large_image',
      title: dict.meta.creditCardsRating.ogTitle,
      description: dict.meta.creditCardsRating.ogDescription,
    },
    alternates: {
      languages: {
        'uk': `${baseUrl}/uk/cards/kreditni-kartky/reytyng`,
        'ru': `${baseUrl}/ru/cards/kreditnye-karty/reytyng`,
        'x-default': `${baseUrl}/uk/cards/kreditni-kartky/reytyng`,
      },
    },
  };
}

export default function CreditCardsRatingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
