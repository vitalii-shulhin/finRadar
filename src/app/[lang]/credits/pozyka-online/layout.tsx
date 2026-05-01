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
    ? 'Позика Онлайн на Карту 24/7 | Швидкі Позики Без Відмов | Україна 2026'
    : 'Займ Онлайн на Карту 24/7 | Быстрые Займы Без Отказов | Украина 2026';

  const description = params.lang === 'uk'
    ? 'Позика онлайн на карту без відмови 24/7 ⚡ Швидка позика онлайн на карту за 5 хвилин. Онлайн позики на карту без довідок, навіть з поганою кредитною історією. Миттєве схвалення та зарахування коштів!'
    : 'Займ онлайн на карту без отказа 24/7 ⚡ Быстрый займ онлайн на карту за 5 минут. Онлайн займы на карту без справок, даже с плохой кредитной историей. Мгновенное одобрение и зачисление средств!';

  const baseKeywords = params.lang === 'uk'
    ? [
        'позика онлайн',
        'позики',
        'онлайн позика',
        'позика на карту',
        'позика онлайн на карту',
        'позика без відмов',
        'онлайн позики на карту',
        'онлайн позика на картку без відмови',
        'позика онлайн без відмов',
        'позика на карту онлайн',
        'позика з поганою кредитною історією',
        'швидка позика онлайн на карту',
        'позика онлайн на картку',
        'взяти позику онлайн',
        'швидка позика',
        'термінова позика онлайн',
        'позика без довідок',
        'позика 24/7',
        'нова позика онлайн',
        'позика миттєво на карту'
      ]
    : [
        'займ онлайн',
        'займы',
        'онлайн займ',
        'займ на карту',
        'займ онлайн на карту',
        'займ без отказов',
        'онлайн займы на карту',
        'онлайн займ на карточку без отказа',
        'займ онлайн без отказов',
        'займ на карту онлайн',
        'займ с плохой кредитной историей',
        'быстрый займ онлайн на карту',
        'займ онлайн на карточку',
        'взять займ онлайн',
        'быстрый займ',
        'срочный займ онлайн',
        'займ без справок',
        'займ 24/7',
        'новый займ онлайн',
        'займ мгновенно на карту'
      ];

  const cityKeywords = params.lang === 'uk'
    ? [
        'позика онлайн Київ',
        'позика онлайн Харків',
        'позика онлайн Одеса',
        'позика онлайн Дніпро',
        'позика онлайн Львів',
        'позика на карту Україна',
        'онлайн позики Україна'
      ]
    : [
        'займ онлайн Киев',
        'займ онлайн Харьков',
        'займ онлайн Одесса',
        'займ онлайн Днепр',
        'займ онлайн Львов',
        'займ на карту Украина',
        'онлайн займы Украина'
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
      url: `${baseUrl}/${params.lang}/credits/pozyka-online`,
    },
    alternates: {
      languages: {
        'uk': `${baseUrl}/uk/credits/pozyka-online`,
        'ru': `${baseUrl}/ru/credits/pozyka-online`,
        'x-default': `${baseUrl}/uk/credits/pozyka-online`,
      },
    },
  };
}

export default function PozykaOnlineLayout({
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
    name: params.lang === 'uk' ? 'Позика Онлайн на Карту' : 'Займ Онлайн на Карту',
    description: params.lang === 'uk'
      ? 'Швидка позика онлайн на карту без відмови 24/7. Миттєве оформлення та зарахування.'
      : 'Быстрый займ онлайн на карту без отказа 24/7. Мгновенное оформление и зачисление.',
    url: `${baseUrl}/${params.lang}/credits/pozyka-online`,
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
      lowPrice: '100',
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
        name: params.lang === 'uk' ? 'Позика Онлайн' : 'Займ Онлайн',
        item: `${baseUrl}/${params.lang}/credits/pozyka-online`
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
