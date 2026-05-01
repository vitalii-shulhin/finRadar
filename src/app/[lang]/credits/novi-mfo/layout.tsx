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
    ? 'Нові МФО 2026 | Маловідомі МФО без Відмов та Перевірки КІ'
    : 'Новые МФО 2026 | Малоизвестные МФО без Отказов и Проверки КИ';

  const description = params.lang === 'uk'
    ? 'Нові МФО України 2026! ⭐ Кредит онлайн нові МФО без відмов. Нові мікрозайми без перевірки кредитної історії. Маловідомі МФО з високим шансом схвалення. Нові мфо кредити для всіх!'
    : 'Новые МФО Украины 2026! ⭐ Кредит онлайн новые МФО без отказов. Новые микрозаймы без проверки кредитной истории. Малоизвестные МФО с высоким шансом одобрения. Новые мфо кредиты для всех!';

  const baseKeywords = params.lang === 'uk'
    ? [
        'нові мфо',
        'нові мфо без відмов',
        'маловідомі мфо',
        'нові мікрозайми',
        'кредит онлайн нові мфо',
        'нові мфо без перевірки кредитної історії',
        'мфо нові',
        'кредит нові мфо',
        'кредит з поганою кредитною історією',
        'нові мфо кредити',
        'нові кредити мфо',
        'нові мфо України',
        'свіжі мфо',
        'молоді мфо',
        'нові компанії мфо',
        'нові онлайн мфо'
      ]
    : [
        'новые мфо',
        'новые мфо без отказов',
        'малоизвестные мфо',
        'новые микрозаймы',
        'кредит онлайн новые мфо',
        'новые мфо без проверки кредитной истории',
        'мфо новые',
        'кредит новые мфо',
        'кредит с плохой кредитной историей',
        'новые мфо кредиты',
        'новые кредиты мфо',
        'новые мфо Украины',
        'свежие мфо',
        'молодые мфо',
        'новые компании мфо',
        'новые онлайн мфо'
      ];

  const cityKeywords = params.lang === 'uk'
    ? [
        'нові мфо Київ',
        'нові мфо Харків',
        'нові мфо Одеса',
        'нові мфо Дніпро',
        'нові мфо Львів',
        'нові мфо України 2026',
      ]
    : [
        'новые мфо Киев',
        'новые мфо Харьков',
        'новые мфо Одесса',
        'новые мфо Днепр',
        'новые мфо Львов',
        'новые мфо Украины 2026',
      ];

  return {
    title,
    description,
    keywords: [...baseKeywords, ...cityKeywords],
    openGraph: {
      title,
      description,
      type: 'website',
      locale: params.lang === 'uk' ? 'uk_UA' : 'ru_RU',
      url: `${baseUrl}/${params.lang}/credits/novi-mfo`,
    },
    alternates: {
      languages: {
        'uk': `${baseUrl}/uk/credits/novi-mfo`,
        'ru': `${baseUrl}/ru/credits/novi-mfo`,
        'x-default': `${baseUrl}/uk/credits/novi-mfo`,
      },
    },
  };
}

export default function NoviMfoLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: Locale };
}) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://finradar.ua';

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'FinancialProduct',
    name: params.lang === 'uk' ? 'Нові МФО України' : 'Новые МФО Украины',
    description: params.lang === 'uk'
      ? 'Нові МФО з високим шансом схвалення. Кредит онлайн нові МФО без відмов та перевірки кредитної історії.'
      : 'Новые МФО с высоким шансом одобрения. Кредит онлайн новые МФО без отказов и проверки кредитной истории.',
    url: `${baseUrl}/${params.lang}/credits/novi-mfo`,
    category: 'New MFO Loans',
    feesAndCommissionsSpecification: params.lang === 'uk'
      ? 'Від 0% для нових клієнтів'
      : 'От 0% для новых клиентов',
    availableChannel: {
      '@type': 'ServiceChannel',
      serviceType: 'Online',
      availableLanguage: [params.lang === 'uk' ? 'Ukrainian' : 'Russian']
    },
    areaServed: {
      '@type': 'Country',
      name: params.lang === 'uk' ? 'Україна' : 'Украина'
    },
    offers: {
      '@type': 'AggregateOffer',
      priceCurrency: 'UAH',
      lowPrice: '500',
      highPrice: '50000',
      offerCount: '30+'
    }
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
        name: params.lang === 'uk' ? 'Нові МФО' : 'Новые МФО',
        item: `${baseUrl}/${params.lang}/credits/novi-mfo`
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
