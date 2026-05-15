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
    ? 'Кредит з Поганою Кредитною Історією 2026 | Без Відмов 24/7'
    : 'Кредит с Плохой Кредитной Историей 2026 | Без Отказов 24/7';

  const description = params.lang === 'uk'
    ? 'Кредит з поганою кредитною історією без відмов! ✅ Онлайн кредит з поганою кредитною історією без відмов та цілодобово. Взяти кредит з поганою історією, простроченнями. Терміновий кредит на карту за 5 хвилин!'
    : 'Кредит с плохой кредитной историей без отказов! ✅ Онлайн кредит с плохой кредитной историей без отказов и круглосуточно. Взять кредит с плохой историей, просрочками. Срочный кредит на карту за 5 минут!';

  const baseKeywords = params.lang === 'uk'
    ? [
        'кредит з поганою кредитною історією',
        'онлайн кредит з поганою кредитною історією без відмов та цілодобово',
        'всі нові кредити з поганою історією',
        'кредит без відмов з поганою кредитною історією',
        'кредит з поганою кредитною історією та простроченням',
        'кредит онлайн з поганою кредитною історією',
        'взяти кредит з поганою кредитною історією',
        'кредит з поганою історією',
        'мікрозайм з поганою кредитною історією',
        'терміновий кредит з поганою кредитною історією',
        'допоможу взяти кредит з поганою кредитною історією',
        'кредит з поганою кредитною історією без дзвінків',
        'банки які кредитують з поганою кредитною історією',
        'кредит з простроченнями',
        'кредит з боргами',
        'позика з поганою історією'
      ]
    : [
        'кредит с плохой кредитной историей',
        'онлайн кредит с плохой кредитной историей без отказов и круглосуточно',
        'все новые кредиты с плохой историей',
        'кредит без отказов с плохой кредитной историей',
        'кредит с плохой кредитной историей и просрочкой',
        'кредит онлайн с плохой кредитной историей',
        'взять кредит с плохой кредитной историей',
        'кредит с плохой историей',
        'микрозайм с плохой кредитной историей',
        'срочный кредит с плохой кредитной историей',
        'помогу взять кредит с плохой кредитной историей',
        'кредит с плохой кредитной историей без звонков',
        'банки которые кредитуют с плохой кредитной историей',
        'кредит с просрочками',
        'кредит с долгами',
        'займ с плохой историей'
      ];

  const cityKeywords = params.lang === 'uk'
    ? [
        'кредит з поганою історією Київ',
        'кредит з поганою історією Харків',
        'кредит з поганою історією Одеса',
        'кредит з поганою історією Дніпро',
        'кредит з поганою історією Львів',
        'кредит з поганою кредитною історією Україна',
      ]
    : [
        'кредит с плохой историей Киев',
        'кредит с плохой историей Харьков',
        'кредит с плохой историей Одесса',
        'кредит с плохой историей Днепр',
        'кредит с плохой историей Львов',
        'кредит с плохой кредитной историей Украина',
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
      url: `${baseUrl}/${params.lang}/credits/z-poganoyu-istoriyeyu`,
    },
    alternates: {
      languages: {
        'uk': `${baseUrl}/uk/credits/z-poganoyu-istoriyeyu`,
        'ru': `${baseUrl}/ru/credits/z-poganoyu-istoriyeyu`,
        'x-default': `${baseUrl}/uk/credits/z-poganoyu-istoriyeyu`,
      },
    },
  };
}

export default function BadCreditHistoryLayout({
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
    name: params.lang === 'uk' ? 'Кредит з Поганою Кредитною Історією' : 'Кредит с Плохой Кредитной Историей',
    description: params.lang === 'uk'
      ? 'Отримайте кредит з поганою кредитною історією без відмов. Онлайн кредитування 24/7 навіть з простроченнями.'
      : 'Получите кредит с плохой кредитной историей без отказов. Онлайн кредитование 24/7 даже с просрочками.',
    url: `${baseUrl}/${params.lang}/credits/z-poganoyu-istoriyeyu`,
    category: 'Bad Credit Loan',
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
      offerCount: '40+'
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
        name: params.lang === 'uk' ? 'Кредит з Поганою Історією' : 'Кредит с Плохой Историей',
        item: `${baseUrl}/${params.lang}/credits/z-poganoyu-istoriyeyu`
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
