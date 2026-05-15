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
    ? 'Де Взяти Гроші Терміново в Україні 24/7 | Гроші на Карту Швидко 2026'
    : 'Где Взять Деньги Срочно в Украине 24/7 | Деньги на Карту Быстро 2026';

  const description = params.lang === 'uk'
    ? 'Терміново потрібні гроші? ⚡ Отримайте гроші на карту терміново за 5 хвилин! Гроші в борг терміново без довідок 24/7. Кошти до зарплати терміново без відмов. Швидке схвалення та миттєве зарахування!'
    : 'Срочно нужны деньги? ⚡ Получите деньги на карту срочно за 5 минут! Деньги в долг срочно без справок 24/7. Средства до зарплаты срочно без отказов. Быстрое одобрение и мгновенное зачисление!';

  const baseKeywords = params.lang === 'uk'
    ? [
        'терміново потрібні гроші',
        'гроші на карту терміново',
        'гроші в борг терміново',
        'кошти до зарплати терміново',
        'де взяти гроші терміново',
        'гроші онлайн на карту',
        'швидкі гроші на карту',
        'терміново гроші без відмови',
        'отримати гроші терміново',
        'гроші негайно на карту',
        'позика терміново',
        'швидкий кредит на карту',
        'гроші в борг швидко',
        'кошти терміново без довідок',
        'гроші до зарплати онлайн'
      ]
    : [
        'срочно нужны деньги',
        'деньги на карту срочно',
        'деньги в долг срочно',
        'средства до зарплаты срочно',
        'где взять деньги срочно',
        'деньги онлайн на карту',
        'быстрые деньги на карту',
        'срочно деньги без отказа',
        'получить деньги срочно',
        'деньги немедленно на карту',
        'займ срочно',
        'быстрый кредит на карту',
        'деньги в долг быстро',
        'средства срочно без справок',
        'деньги до зарплаты онлайн'
      ];

  const cityKeywords = params.lang === 'uk'
    ? [
        'гроші терміново Київ',
        'гроші терміново Харків',
        'гроші терміново Одеса',
        'гроші терміново Дніпро',
        'гроші терміново Львів',
        'гроші на карту Україна',
      ]
    : [
        'деньги срочно Киев',
        'деньги срочно Харьков',
        'деньги срочно Одесса',
        'деньги срочно Днепр',
        'деньги срочно Львов',
        'деньги на карту Украина',
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
      url: `${baseUrl}/${params.lang}/credits/groshi-terminovo`,
    },
    alternates: {
      languages: {
        'uk': `${baseUrl}/uk/credits/groshi-terminovo`,
        'ru': `${baseUrl}/ru/credits/groshi-terminovo`,
        'x-default': `${baseUrl}/uk/credits/groshi-terminovo`,
      },
    },
  };
}

export default function GroshiTerminovoLayout({
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
    name: params.lang === 'uk' ? 'Гроші Терміново на Карту' : 'Деньги Срочно на Карту',
    description: params.lang === 'uk'
      ? 'Терміново потрібні гроші? Отримайте гроші на карту терміново 24/7 без довідок.'
      : 'Срочно нужны деньги? Получите деньги на карту срочно 24/7 без справок.',
    url: `${baseUrl}/${params.lang}/credits/groshi-terminovo`,
    category: 'Urgent Loan',
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
        name: params.lang === 'uk' ? 'Гроші Терміново' : 'Деньги Срочно',
        item: `${baseUrl}/${params.lang}/credits/groshi-terminovo`
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
