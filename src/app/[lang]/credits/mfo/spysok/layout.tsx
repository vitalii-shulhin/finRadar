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

  const title = params.lang === 'uk'
    ? 'Список МФО України 2026 | Перелік Всіх МФО - Список Мікрозаймів'
    : 'Список МФО Украины 2026 | Перечень Всех МФО - Список Микрозаймов';

  const description = params.lang === 'uk'
    ? 'Список МФО України! 📋 Перелік всіх МФО та список мікрозаймів онлайн. Кредит онлайн список МФО - повний перелік мікрофінансових організацій на карту!'
    : 'Список МФО Украины! 📋 Перечень всех МФО и список микрозаймов онлайн. Кредит онлайн список МФО - полный перечень микрофинансовых организаций на карту!';

  const baseKeywords = params.lang === 'uk'
    ? [
        'список мфо',
        'список всіх мфо',
        'список мікрозаймів',
        'кредит онлайн список мфо',
        'перелік мфо',
        'кредит мфо список',
        'список мфо України',
        'перелік всіх мфо',
        'повний список мфо',
        'список мікрофінансових організацій',
        'список мікрокредитів',
        'всі мфо список',
      ]
    : [
        'список мфо',
        'список всех мфо',
        'список микрозаймов',
        'кредит онлайн список мфо',
        'перечень мфо',
        'кредит мфо список',
        'список мфо Украины',
        'перечень всех мфо',
        'полный список мфо',
        'список микрофинансовых организаций',
        'список микрокредитов',
        'все мфо список',
      ];

  return {
    title,
    description,
    keywords: baseKeywords,
    openGraph: {
      title,
      description,
      type: 'website',
      locale: params.lang === 'uk' ? 'uk_UA' : 'ru_RU',
      url: `${baseUrl}/${params.lang}/credits/mfo/spysok`,
    },
    alternates: {
      languages: {
        'uk': `${baseUrl}/uk/credits/mfo/spysok`,
        'ru': `${baseUrl}/ru/credits/mfo/spysok`,
        'x-default': `${baseUrl}/uk/credits/mfo/spysok`,
      },
    },
  };
}

export default function MfoSpysokLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: Locale };
}) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://finradar.ua';

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: params.lang === 'uk' ? 'Список МФО України' : 'Список МФО Украины',
    description: params.lang === 'uk'
      ? 'Повний список всіх МФО України. Перелік мікрофінансових організацій, які надають кредити онлайн на карту.'
      : 'Полный список всех МФО Украины. Перечень микрофинансовых организаций, которые предоставляют кредиты онлайн на карту.',
    url: `${baseUrl}/${params.lang}/credits/mfo/spysok`,
  };

  const breadcrumbStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: params.lang === 'uk' ? 'Головна' : 'Главная',
        item: `${baseUrl}/${params.lang}`
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: params.lang === 'uk' ? 'Кредити' : 'Кредиты',
        item: `${baseUrl}/${params.lang}/credits`
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: params.lang === 'uk' ? 'МФО' : 'МФО',
        item: `${baseUrl}/${params.lang}/credits/mfo`
      },
      {
        '@type': 'ListItem',
        position: 4,
        name: params.lang === 'uk' ? 'Список МФО' : 'Список МФО',
        item: `${baseUrl}/${params.lang}/credits/mfo/spysok`
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbStructuredData) }}
      />
      {children}
    </>
  );
}
