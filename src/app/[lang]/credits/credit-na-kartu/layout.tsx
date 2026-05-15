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
    ? 'Кредит на Карту Онлайн 24/7 | Гроші на Карту Без Відмов | Україна 2026'
    : 'Кредит на Карту Онлайн 24/7 | Деньги на Карту Без Отказов | Украина 2026';

  const description = params.lang === 'uk'
    ? 'Кредит на карту терміново 24/7 ⚡ Онлайн кредит на карту без відмов за 5 хвилин. Гроші на будь-яку карту, навіть з поганою кредитною історією. Швидке схвалення, миттєве зарахування коштів. Порівняйте кредити на карту в Україні!'
    : 'Кредит на карту срочно 24/7 ⚡ Онлайн кредит на карту без отказов за 5 минут. Деньги на любую карту, даже с плохой кредитной историей. Быстрое одобрение, мгновенное зачисление средств. Сравните кредиты на карту в Украине!';

  const baseKeywords = params.lang === 'uk'
    ? [
        'кредит на карту',
        'онлайн кредіт на карту',
        'кредит онлайн без відмов',
        'кредит онлайн на будь яку карту',
        'кредити з поганою кредитною історією',
        'онлайн кредит з поганою кредитною історією без відмов та цілодобово',
        'кредит на картку',
        'гроші в кредит на карточку',
        'терміновий кредит з поганою кредитною історією',
        'кредит онлайн на картку',
        'кредит готівкою на карту',
        'кредит на карту терміново',
        'швидкий кредит на карту',
        'гроші онлайн на карту',
        'нові кредити онлайн на карту',
        'онлайн кредит на рік на карту',
        'взяти кредит на карту',
        'кредит на карту без відмови',
        'терміновий кредит на карту',
        'швидко гроші на карту'
      ]
    : [
        'кредит на карту',
        'онлайн кредит на карту',
        'кредит онлайн без отказов',
        'кредит онлайн на любую карту',
        'кредиты с плохой кредитной историей',
        'онлайн кредит с плохой кредитной историей без отказов и круглосуточно',
        'кредит на карточку',
        'деньги в кредит на карточку',
        'срочный кредит с плохой кредитной историей',
        'кредит онлайн на карточку',
        'кредит наличными на карту',
        'кредит на карту срочно',
        'быстрый кредит на карту',
        'деньги онлайн на карту',
        'новые кредиты онлайн на карту',
        'онлайн кредит на год на карту',
        'взять кредит на карту',
        'кредит на карту без отказа',
        'срочный кредит на карту',
        'быстро деньги на карту'
      ];

  const cityKeywords = params.lang === 'uk'
    ? [
        'кредит на карту Київ',
        'кредит на карту Харків',
        'кредит на карту Одеса',
        'кредит на карту Дніпро',
        'кредит на карту Львів',
        'гроші на карту Україна',
        'онлайн кредит на карту Україна'
      ]
    : [
        'кредит на карту Киев',
        'кредит на карту Харьков',
        'кредит на карту Одесса',
        'кредит на карту Днепр',
        'кредит на карту Львов',
        'деньги на карту Украина',
        'онлайн кредит на карту Украина'
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
      url: `${baseUrl}/${params.lang}/credits/credit-na-kartu`,
    },
    alternates: {
      languages: {
        'uk': `${baseUrl}/uk/credits/credit-na-kartu`,
        'ru': `${baseUrl}/ru/credits/credit-na-kartu`,
        'x-default': `${baseUrl}/uk/credits/credit-na-kartu`,
      },
    },
  };
}

export default function CreditNaKartuLayout({
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
    name: params.lang === 'uk' ? 'Кредит на Карту' : 'Кредит на Карту',
    description: params.lang === 'uk'
      ? 'Кредит на карту терміново 24/7. Онлайн кредит на будь-яку карту без відмов.'
      : 'Кредит на карту срочно 24/7. Онлайн кредит на любую карту без отказов.',
    url: `${baseUrl}/${params.lang}/credits/credit-na-kartu`,
    category: 'Card Loan',
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
        name: params.lang === 'uk' ? 'Кредит на Карту' : 'Кредит на Карту',
        item: `${baseUrl}/${params.lang}/credits/credit-na-kartu`
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
