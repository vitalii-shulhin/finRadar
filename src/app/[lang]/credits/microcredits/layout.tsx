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
    ? 'Мікрокредити онлайн | Швидкі позики до зарплати'
    : 'Микрокредиты онлайн | Быстрые займы до зарплаты';

  const description = params.lang === 'uk'
    ? 'Мікрокредити онлайн на карту без відмови. Суми від 500 до 15 000 грн, термін до 30 днів. Перша позика безкоштовно. Схвалення за 5 хвилин, виплата протягом 15 хвилин.'
    : 'Микрокредиты онлайн на карту без отказа. Суммы от 500 до 15 000 грн, срок до 30 дней. Первый займ бесплатно. Одобрение за 5 минут, выплата в течение 15 минут.';

  const baseKeywords = params.lang === 'uk'
    ? [
        'мікрокредит',
        'мікрокредит онлайн',
        'мікрокредит онлайн на карту',
        'мікро кредит',
        'мікро кредит онлайн',
        'мікрокредит з поганою кредитною історією',
        'мікрокредит без відмови',
        'всі мікрокредити онлайн',
        'мікрокредит на карту',
        'мікрозайм це',
        'позика онлайн',
        'швидка позика',
        'позика до зарплати',
        'позика без відмови',
        'мікрокредит швидко',
        'оформити мікрокредит',
      ]
    : [
        'микрокредит',
        'микрокредит онлайн',
        'микрокредит онлайн на карту',
        'микро кредит',
        'микро кредит онлайн',
        'микрокредит с плохой кредитной историей',
        'микрокредит без отказа',
        'все микрокредиты онлайн',
        'микрокредит на карту',
        'микрозайм это',
        'займ онлайн',
        'быстрый займ',
        'займ до зарплаты',
        'займ без отказа',
        'микрокредит быстро',
        'оформить микрокредит',
      ];

  const cityKeywords = params.lang === 'uk'
    ? [
        'мікрокредит Київ', 'мікрокредит Харків', 'мікрокредит Одеса', 'мікрокредит Дніпро',
        'мікрокредит Львів', 'мікрокредит Запоріжжя', 'мікрокредит Вінниця', 'мікрокредит Полтава'
      ]
    : [
        'микрокредит Киев', 'микрокредит Харьков', 'микрокредит Одесса', 'микрокредит Днепр',
        'микрокредит Львов', 'микрокредит Запорожье', 'микрокредит Винница', 'микрокредит Полтава'
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
      url: `${baseUrl}/${params.lang}/credits/microcredits`,
    },
    alternates: {
      languages: {
        'uk': `${baseUrl}/uk/credits/microcredits`,
        'ru': `${baseUrl}/ru/credits/microcredits`,
        'x-default': `${baseUrl}/uk/credits/microcredits`,
      },
    },
  };
}

export default function MicrocreditsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
