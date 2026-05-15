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
    title: dict.meta.creditCards.title,
    description: dict.meta.creditCards.description,
    keywords: [...dict.meta.creditCards.keywords],
    openGraph: {
      title: dict.meta.creditCards.ogTitle,
      description: dict.meta.creditCards.ogDescription,
      type: 'website',
      locale: params.lang === 'uk' ? 'uk_UA' : 'ru_RU',
      url: `${baseUrl}/${params.lang}/cards/kreditnye-karty`,
    },
    twitter: {
      card: 'summary_large_image',
      title: dict.meta.creditCards.ogTitle,
      description: dict.meta.creditCards.ogDescription,
    },
    alternates: {
      languages: {
        'uk': `${baseUrl}/uk/cards/kreditni-kartky`,
        'ru': `${baseUrl}/ru/cards/kreditnye-karty`,
        'x-default': `${baseUrl}/uk/cards/kreditni-kartky`,
      },
    },
  };
}

export default function CreditCardsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
