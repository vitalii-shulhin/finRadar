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
    ? 'Кредит Онлайн на Карту 24/7 | Взяти Кредіт Онлайн Без Відмов | Україна 2026'
    : 'Кредит Онлайн на Карту 24/7 | Взять Кредит Онлайн Без Отказов | Украина 2026';

  const description = params.lang === 'uk'
    ? 'Кредит онлайн на карту срочно і без відказу 24/7 ⚡ Взяти кредіт онлайн на будь-яку карту за 5 хвилин. Кредити онлайн без дзвінків та довідок. Швидке схвалення, миттєве зарахування коштів. Порівняйте всі онлайн кредити України та оберіть найвигідніший!'
    : 'Кредит онлайн на карту срочно и без отказа 24/7 ⚡ Взять кредит онлайн на любую карту за 5 минут. Кредиты онлайн без звонков и справок. Быстрое одобрение, мгновенное зачисление средств. Сравните все онлайн кредиты Украины и выберите самый выгодный!';

  const baseKeywords = params.lang === 'uk'
    ? [
        'кредит онлайн',
        'кредіт онлайн на карту',
        'кредит онлайн на карту срочно і без відказу 24 7',
        'кредіт на карту',
        'онлайн кредіт',
        'кредити онлайн',
        'кредит без відмов',
        'взяти кредит онлайн',
        'кредит готівкою',
        'онлайн кредіт на карту',
        'кредит онлайн без відмов',
        'кредит онлайн на будь яку карту',
        'взяти кредіт',
        'швидкий кредит онлайн',
        'миттєвий кредит на карту',
        'кредит без відвідування банку',
        'кредит 24/7',
        'термінові кредити онлайн',
        'кредит без дзвінків',
        'онлайн позика на карту'
      ]
    : [
        'кредит онлайн',
        'кредит онлайн на карту',
        'кредит онлайн на карту срочно и без отказа 24 7',
        'кредит на карту',
        'онлайн кредит',
        'кредиты онлайн',
        'кредит без отказов',
        'взять кредит онлайн',
        'кредит наличными',
        'онлайн кредит на карту',
        'кредит онлайн без отказов',
        'кредит онлайн на любую карту',
        'взять кредит',
        'быстрый кредит онлайн',
        'мгновенный кредит на карту',
        'кредит без посещения банка',
        'кредит 24/7',
        'срочные кредиты онлайн',
        'кредит без звонков',
        'онлайн займ на карту'
      ];

  const cityKeywords = params.lang === 'uk'
    ? [
        'онлайн кредит Київ',
        'онлайн кредит Харків',
        'онлайн кредит Одеса',
        'онлайн кредит Дніпро',
        'онлайн кредит Львів',
        'онлайн кредит Запоріжжя',
        'онлайн кредит Вінниця',
        'онлайн кредит Полтава',
        'кредит на карту Київ',
        'кредит на карту Харків',
        'взяти кредит онлайн Україна'
      ]
    : [
        'онлайн кредит Киев',
        'онлайн кредит Харьков',
        'онлайн кредит Одесса',
        'онлайн кредит Днепр',
        'онлайн кредит Львов',
        'онлайн кредит Запорожье',
        'онлайн кредит Винница',
        'онлайн кредит Полтава',
        'кредит на карту Киев',
        'кредит на карту Харьков',
        'взять кредит онлайн Украина'
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
      url: `${baseUrl}/${params.lang}/credits/online`,
    },
    alternates: {
      languages: {
        'uk': `${baseUrl}/uk/credits/online`,
        'ru': `${baseUrl}/ru/credits/online`,
        'x-default': `${baseUrl}/uk/credits/online`,
      },
    },
  };
}

export default function OnlineCreditsLayout({
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
    name: params.lang === 'uk' ? 'Онлайн Кредити на Карту' : 'Онлайн Кредиты на Карту',
    description: params.lang === 'uk'
      ? 'Кредит онлайн на карту срочно і без відказу 24/7. Швидке оформлення, миттєве зарахування.'
      : 'Кредит онлайн на карту срочно и без отказа 24/7. Быстрое оформление, мгновенное зачисление.',
    url: `${baseUrl}/${params.lang}/credits/online`,
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
        name: params.lang === 'uk' ? 'Онлайн Кредити' : 'Онлайн Кредиты',
        item: `${baseUrl}/${params.lang}/credits/online`
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
