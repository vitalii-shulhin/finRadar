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
    title: dict.meta.crypto.title,
    description: dict.meta.crypto.description,
    keywords: [...dict.meta.crypto.keywords],
    openGraph: {
      title: dict.meta.crypto.ogTitle,
      description: dict.meta.crypto.ogDescription,
      type: 'website',
      locale: params.lang === 'uk' ? 'uk_UA' : 'ru_RU',
      url: `${baseUrl}/${params.lang}/crypto`,
    },
    twitter: {
      card: 'summary_large_image',
      title: dict.meta.crypto.ogTitle,
      description: dict.meta.crypto.ogDescription,
    },
    alternates: {
      languages: {
        'uk': `${baseUrl}/uk/crypto`,
        'ru': `${baseUrl}/ru/crypto`,
        'x-default': `${baseUrl}/uk/crypto`,
      },
    },
  };
}

export default function CryptoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
