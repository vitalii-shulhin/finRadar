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
    ? 'Рейтинг МФО України 2026 | ТОП МФО - Кращі Мікрозайми України'
    : 'Рейтинг МФО Украины 2026 | ТОП МФО - Лучшие Микрозаймы Украины';

  const description = params.lang === 'uk'
    ? 'Рейтинг МФО України 2026! ⭐ ТОП МФО та топ кращі МФО. Топ мікрозаймів онлайн на карту. Оберіть найкращу МФО України з високим рівнем схвалення!'
    : 'Рейтинг МФО Украины 2026! ⭐ ТОП МФО и топ лучшие МФО. Топ микрозаймов онлайн на карту. Выберите лучшую МФО Украины с высоким уровнем одобрения!';

  const baseKeywords = params.lang === 'uk'
    ? [
        'рейтинг мфо',
        'топ мфо',
        'топ кращий мфо',
        'топ мікрозаймів',
        'рейтинг мфо України',
        'топ мфо України',
        'найкращі мфо',
        'кращі мфо України',
        'рейтинг мікрозаймів',
        'топ організацій мфо',
        'рейтинг мікрофінансових організацій',
        'топ 10 мфо',
        'кращі мікрозайми',
        'найнадійніші мфо',
      ]
    : [
        'рейтинг мфо',
        'топ мфо',
        'топ лучшие мфо',
        'топ микрозаймов',
        'рейтинг мфо Украины',
        'топ мфо Украины',
        'лучшие мфо',
        'лучшие мфо Украины',
        'рейтинг микрозаймов',
        'топ организаций мфо',
        'рейтинг микрофинансовых организаций',
        'топ 10 мфо',
        'лучшие микрозаймы',
        'самые надежные мфо',
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
      url: `${baseUrl}/${params.lang}/credits/mfo/reytyng`,
    },
    alternates: {
      languages: {
        'uk': `${baseUrl}/uk/credits/mfo/reytyng`,
        'ru': `${baseUrl}/ru/credits/mfo/reytyng`,
        'x-default': `${baseUrl}/uk/credits/mfo/reytyng`,
      },
    },
  };
}

export default function MfoReytyngLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: Locale };
}) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://finradar.ua';

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: params.lang === 'uk' ? 'Рейтинг МФО України' : 'Рейтинг МФО Украины',
    description: params.lang === 'uk'
      ? 'ТОП МФО України. Рейтинг найкращих мікрофінансових організацій з вигідними умовами та високим рівнем схвалення.'
      : 'ТОП МФО Украины. Рейтинг лучших микрофинансовых организаций с выгодными условиями и высоким уровнем одобрения.',
    url: `${baseUrl}/${params.lang}/credits/mfo/reytyng`,
    numberOfItems: 50,
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
        name: params.lang === 'uk' ? 'Рейтинг МФО' : 'Рейтинг МФО',
        item: `${baseUrl}/${params.lang}/credits/mfo/reytyng`
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
