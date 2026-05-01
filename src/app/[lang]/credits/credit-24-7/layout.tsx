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
    ? 'Кредит Онлайн 24/7 Цілодобово 2026 | Гроші на Карту Без Вихідних'
    : 'Кредит Онлайн 24/7 Круглосуточно 2026 | Деньги на Карту Без Выходных';

  const description = params.lang === 'uk'
    ? 'Кредит 24/7 цілодобово! ⏰ Онлайн кредити 24/7 без вихідних та свят. Кредит онлайн 247 на карту навіть вночі. Швидке схвалення, доступність у будь-який час!'
    : 'Кредит 24/7 круглосуточно! ⏰ Онлайн кредиты 24/7 без выходных и праздников. Кредит онлайн 247 на карту даже ночью. Быстрое одобрение, доступность в любое время!';

  const baseKeywords = params.lang === 'uk'
    ? [
        'кредит 24 7',
        'кредит онлайн 247',
        'онлайн кредити 24 7',
        'кредит цілодобово',
        'кредит онлайн 24/7',
        'кредит на карту цілодобово',
        'кредит 24/7 без вихідних',
        'цілодобовий кредит на карту',
        'кредит онлайн 24 години',
        'кредит вночі на карту',
        'кредит без вихідних',
        'онлайн кредит цілодобово',
        'кредит у нічний час',
        'кредит без свят',
        'кредит 24 години на добу',
        'швидкий кредит 24/7'
      ]
    : [
        'кредит 24 7',
        'кредит онлайн 247',
        'онлайн кредиты 24 7',
        'кредит круглосуточно',
        'кредит онлайн 24/7',
        'кредит на карту круглосуточно',
        'кредит 24/7 без выходных',
        'круглосуточный кредит на карту',
        'кредит онлайн 24 часа',
        'кредит ночью на карту',
        'кредит без выходных',
        'онлайн кредит круглосуточно',
        'кредит в ночное время',
        'кредит без праздников',
        'кредит 24 часа в сутки',
        'быстрый кредит 24/7'
      ];

  const cityKeywords = params.lang === 'uk'
    ? [
        'кредит 24/7 Київ',
        'кредит 24/7 Харків',
        'кредит 24/7 Одеса',
        'кредит 24/7 Дніпро',
        'кредит 24/7 Львів',
        'кредит цілодобово Україна',
      ]
    : [
        'кредит 24/7 Киев',
        'кредит 24/7 Харьков',
        'кредит 24/7 Одесса',
        'кредит 24/7 Днепр',
        'кредит 24/7 Львов',
        'кредит круглосуточно Украина',
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
      url: `${baseUrl}/${params.lang}/credits/credit-24-7`,
    },
    alternates: {
      languages: {
        'uk': `${baseUrl}/uk/credits/credit-24-7`,
        'ru': `${baseUrl}/ru/credits/credit-24-7`,
        'x-default': `${baseUrl}/uk/credits/credit-24-7`,
      },
    },
  };
}

export default function Credit247Layout({
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
    name: params.lang === 'uk' ? 'Кредит Онлайн 24/7 Цілодобово' : 'Кредит Онлайн 24/7 Круглосуточно',
    description: params.lang === 'uk'
      ? 'Отримайте кредит онлайн 24/7 у будь-який час доби. Цілодобова підтримка, швидке схвалення без вихідних.'
      : 'Получите кредит онлайн 24/7 в любое время суток. Круглосуточная поддержка, быстрое одобрение без выходных.',
    url: `${baseUrl}/${params.lang}/credits/credit-24-7`,
    category: '24/7 Online Loan',
    feesAndCommissionsSpecification: params.lang === 'uk'
      ? 'Від 0% для нових клієнтів'
      : 'От 0% для новых клиентов',
    availableChannel: {
      '@type': 'ServiceChannel',
      serviceType: 'Online',
      availableLanguage: [params.lang === 'uk' ? 'Ukrainian' : 'Russian'],
      hoursAvailable: {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        opens: '00:00',
        closes: '23:59'
      }
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
        name: params.lang === 'uk' ? 'Кредит 24/7' : 'Кредит 24/7',
        item: `${baseUrl}/${params.lang}/credits/credit-24-7`
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
