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
    title: dict.meta.creditCardsNoRefusal.title,
    description: dict.meta.creditCardsNoRefusal.description,
    keywords: [...dict.meta.creditCardsNoRefusal.keywords],
    openGraph: {
      title: dict.meta.creditCardsNoRefusal.ogTitle,
      description: dict.meta.creditCardsNoRefusal.ogDescription,
      type: 'website',
      locale: params.lang === 'uk' ? 'uk_UA' : 'ru_RU',
      url: `${baseUrl}/${params.lang}/cards/kreditni-kartky/bez-vidmovy`,
    },
    twitter: {
      card: 'summary_large_image',
      title: dict.meta.creditCardsNoRefusal.ogTitle,
      description: dict.meta.creditCardsNoRefusal.ogDescription,
    },
    alternates: {
      languages: {
        'uk': `${baseUrl}/uk/cards/kreditni-kartky/bez-vidmovy`,
        'ru': `${baseUrl}/ru/cards/kreditnye-karty/bez-otkaza`,
        'x-default': `${baseUrl}/uk/cards/kreditni-kartky/bez-vidmovy`,
      },
    },
  };
}

export default function CreditCardsNoRefusalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
