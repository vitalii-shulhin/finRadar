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
    title: dict.meta.cards.title,
    description: dict.meta.cards.description,
    keywords: [...dict.meta.cards.keywords],
    openGraph: {
      title: dict.meta.cards.ogTitle,
      description: dict.meta.cards.ogDescription,
      type: 'website',
      locale: params.lang === 'uk' ? 'uk_UA' : 'ru_RU',
      url: `${baseUrl}/${params.lang}/cards`,
    },
    twitter: {
      card: 'summary_large_image',
      title: dict.meta.cards.ogTitle,
      description: dict.meta.cards.ogDescription,
    },
    alternates: {
      languages: {
        'uk': `${baseUrl}/uk/cards`,
        'ru': `${baseUrl}/ru/cards`,
        'x-default': `${baseUrl}/uk/cards`,
      },
    },
  };
}

export default function CardsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
