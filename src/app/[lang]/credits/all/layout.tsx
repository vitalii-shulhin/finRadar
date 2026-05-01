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
    ? 'Кредит готівкою - Взяти кредит в Україні | FinRadar'
    : 'Кредит наличными - Взять кредит в Украине | FinRadar';

  const description = params.lang === 'uk'
    ? 'Кредит готівкою в Україні ✅ рішення в день звернення ✅ заявка в кілька банків ✅ Порівняйте умови та оберіть найвигідніший кредит на FinRadar.'
    : 'Кредит наличными в Украине ✅ решение в день обращения ✅ заявка в несколько банков ✅ Сравните условия и выберите самый выгодный кредит на FinRadar.';

  const baseKeywords = params.lang === 'uk'
    ? [
        'кредит готівкою',
        'взяти кредит',
        'кредит в Україні',
        'кредити в Україні',
        'кредит онлайн',
        'кредит цілодобово',
        'кредит без відмови',
        'швидкий кредит',
        'кредит на картку',
        'кредит без довідки про доходи',
        'мікрокредит',
        'кредит від банків',
        'кредит від МФО',
        'порівняння кредитів',
        'вигідний кредит',
        'перший кредит під 0%',
        'кредит без застави',
        'кредит без поручителів',
        'миттєве рішення',
        'кредит готівкою Україна'
      ]
    : [
        'кредит наличными',
        'взять кредит',
        'кредит в Украине',
        'кредиты в Украине',
        'кредит онлайн',
        'кредит круглосуточно',
        'кредит без отказа',
        'быстрый кредит',
        'кредит на карту',
        'кредит без справки о доходах',
        'микрокредит',
        'кредит от банков',
        'кредит от МФО',
        'сравнение кредитов',
        'выгодный кредит',
        'первый кредит под 0%',
        'кредит без залога',
        'кредит без поручителей',
        'мгновенное решение',
        'кредит наличными Украина'
      ];

  const cityKeywords = params.lang === 'uk'
    ? [
        'кредит Київ', 'кредит Харків', 'кредит Одеса', 'кредит Дніпро',
        'кредит Львів', 'кредит Запоріжжя', 'кредит Вінниця', 'кредит Полтава'
      ]
    : [
        'кредит Киев', 'кредит Харьков', 'кредит Одесса', 'кредит Днепр',
        'кредит Львов', 'кредит Запорожье', 'кредит Винница', 'кредит Полтава'
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
      url: `${baseUrl}/${params.lang}/credits/all`,
      siteName: 'FinRadar',
      images: [
        {
          url: `${baseUrl}/og-credits.jpg`,
          width: 1200,
          height: 630,
          alt: params.lang === 'uk' ? 'Кредит готівкою в Україні' : 'Кредит наличными в Украине',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [`${baseUrl}/og-credits.jpg`],
    },
    alternates: {
      canonical: `${baseUrl}/${params.lang}/credits/all`,
      languages: {
        'uk': `${baseUrl}/uk/credits/all`,
        'ru': `${baseUrl}/ru/credits/all`,
        'x-default': `${baseUrl}/uk/credits/all`,
      },
    },
    robots: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  };
}

export default function AllCreditsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
