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
    ? 'Кредит Онлайн Без Відмови на Карту 2026 | Швидке Схвалення 24/7'
    : 'Кредит Онлайн Без Отказа на Карту 2026 | Быстрое Одобрение 24/7';

  const description = params.lang === 'uk'
    ? 'Кредит без відмови онлайн на карту за 5 хвилин! ✅ Онлайн кредит без відмови одразу на карту 24/7. Кредит з поганою кредитною історією без відмов. Міні кредити без відмов цілодобово. Висока ймовірність схвалення!'
    : 'Кредит без отказа онлайн на карту за 5 минут! ✅ Онлайн кредит без отказа сразу на карту 24/7. Кредит с плохой кредитной историей без отказов. Мини кредиты без отказов круглосуточно. Высокая вероятность одобрения!';

  const baseKeywords = params.lang === 'uk'
    ? [
        'кредит без відмови',
        'кредит без відмов',
        'онлайн кредит без відмови одразу на карту',
        'онлайн кредит з поганою кредитною історією без відмов та цілодобово',
        'міні кредити без відмов',
        'кредит онлайн без відмови',
        'кредит без відмови на карту',
        'швидкий кредит без відмови',
        'мікрокредит без відмови',
        'позика без відмови',
        'кредит без відмов цілодобово',
        'гроші без відмови',
        'онлайн кредит без відмови 24/7',
        'кредит без відмови з поганою історією',
        'займ без відмови онлайн',
        'кредит без відмови терміново'
      ]
    : [
        'кредит без отказа',
        'кредит без отказов',
        'онлайн кредит без отказа сразу на карту',
        'онлайн кредит с плохой кредитной историей без отказов и круглосуточно',
        'мини кредиты без отказов',
        'кредит онлайн без отказа',
        'кредит без отказа на карту',
        'быстрый кредит без отказа',
        'микрокредит без отказа',
        'займ без отказа',
        'кредит без отказов круглосуточно',
        'деньги без отказа',
        'онлайн кредит без отказа 24/7',
        'кредит без отказа с плохой историей',
        'займ без отказа онлайн',
        'кредит без отказа срочно'
      ];

  const cityKeywords = params.lang === 'uk'
    ? [
        'кредит без відмови Київ',
        'кредит без відмови Харків',
        'кредит без відмови Одеса',
        'кредит без відмови Дніпро',
        'кредит без відмови Львів',
        'кредит без відмови Україна',
      ]
    : [
        'кредит без отказа Киев',
        'кредит без отказа Харьков',
        'кредит без отказа Одесса',
        'кредит без отказа Днепр',
        'кредит без отказа Львов',
        'кредит без отказа Украина',
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
      url: `${baseUrl}/${params.lang}/credits/credyt-bez-vidmovy`,
    },
    alternates: {
      languages: {
        'uk': `${baseUrl}/uk/credits/credyt-bez-vidmovy`,
        'ru': `${baseUrl}/ru/credits/credyt-bez-vidmovy`,
        'x-default': `${baseUrl}/uk/credits/credyt-bez-vidmovy`,
      },
    },
  };
}

export default function CreditBezVidmovyLayout({
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
    name: params.lang === 'uk' ? 'Кредит без Відмови Онлайн' : 'Кредит без Отказа Онлайн',
    description: params.lang === 'uk'
      ? 'Отримайте кредит онлайн без відмови на карту за кілька хвилин. Висока ймовірність схвалення навіть з поганою кредитною історією.'
      : 'Получите кредит онлайн без отказа на карту за несколько минут. Высокая вероятность одобрения даже с плохой кредитной историей.',
    url: `${baseUrl}/${params.lang}/credits/credyt-bez-vidmovy`,
    category: 'Online Loan',
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
        name: params.lang === 'uk' ? 'Кредит без Відмови' : 'Кредит без Отказа',
        item: `${baseUrl}/${params.lang}/credits/credyt-bez-vidmovy`
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
