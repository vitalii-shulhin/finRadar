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

  const title = params.lang === 'uk'
    ? 'МФО України 2026 | Всі МФО - Кредити МФО Онлайн на Карту'
    : 'МФО Украины 2026 | Все МФО - Кредиты МФО Онлайн на Карту';

  const description = params.lang === 'uk'
    ? 'Всі МФО України! 🏦 Кредити МФО онлайн на карту без довідок. Мікрофінансові організації 24/7. Нові МФО та перевірені компанії. Швидке оформлення, мінімум документів!'
    : 'Все МФО Украины! 🏦 Кредиты МФО онлайн на карту без справок. Микрофинансовые организации 24/7. Новые МФО и проверенные компании. Быстрое оформление, минимум документов!';

  const baseKeywords = params.lang === 'uk'
    ? [
        'мфо',
        'всі мфо',
        'кредити мфо',
        'мфо кредити',
        'нове мфо',
        'маловідомі кредити онлайн',
        'перекредитування мфо',
        'мфо отп банк',
        'мфо які кредитують під час війни',
        'мікрофінансові організації',
        'мфо України',
        'всі мфо України',
        'кредити від мфо',
        'мфо онлайн',
        'кредит мфо на карту',
        'мфо без відмов'
      ]
    : [
        'мфо',
        'все мфо',
        'кредиты мфо',
        'мфо кредиты',
        'новые мфо',
        'малоизвестные кредиты онлайн',
        'перекредитование мфо',
        'мфо отп банк',
        'мфо которые кредитуют во время войны',
        'микрофинансовые организации',
        'мфо Украины',
        'все мфо Украины',
        'кредиты от мфо',
        'мфо онлайн',
        'кредит мфо на карту',
        'мфо без отказов'
      ];

  const cityKeywords = params.lang === 'uk'
    ? [
        'мфо Київ',
        'мфо Харків',
        'мфо Одеса',
        'мфо Дніпро',
        'мфо Львів',
        'мфо Україна онлайн',
      ]
    : [
        'мфо Киев',
        'мфо Харьков',
        'мфо Одесса',
        'мфо Днепр',
        'мфо Львов',
        'мфо Украина онлайн',
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
      url: `${baseUrl}/${params.lang}/credits/mfo`,
    },
    alternates: {
      languages: {
        'uk': `${baseUrl}/uk/credits/mfo`,
        'ru': `${baseUrl}/ru/credits/mfo`,
        'x-default': `${baseUrl}/uk/credits/mfo`,
      },
    },
  };
}

export default function MfoLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: Locale };
}) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://finradar.com.ua';

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'FinancialProduct',
    name: params.lang === 'uk' ? 'МФО України - Мікрофінансові Організації' : 'МФО Украины - Микрофинансовые Организации',
    description: params.lang === 'uk'
      ? 'Всі МФО України. Кредити МФО онлайн на карту без довідок. Мікрофінансові організації з високим рівнем схвалення.'
      : 'Все МФО Украины. Кредиты МФО онлайн на карту без справок. Микрофинансовые организации с высоким уровнем одобрения.',
    url: `${baseUrl}/${params.lang}/credits/mfo`,
    category: 'MFO Loans',
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
      highPrice: '100000',
      offerCount: '50+'
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
        name: params.lang === 'uk' ? 'МФО' : 'МФО',
        item: `${baseUrl}/${params.lang}/credits/mfo`
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
