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
    ? 'Готівкові кредити в банках | Вигідні умови'
    : 'Наличные кредиты в банках | Выгодные условия';

  const description = params.lang === 'uk'
    ? 'Готівкові кредити від надійних банків України. Суми до 500 000 грн, термін до 5 років. Порівняйте ставки, оформіть заявку онлайн та отримайте готівку в банку.'
    : 'Наличные кредиты от надежных банков Украины. Суммы до 500 000 грн, срок до 5 лет. Сравните ставки, оформите заявку онлайн и получите наличные в банке.';

  const baseKeywords = params.lang === 'uk'
    ? ['готівковий кредит', 'кредит готівкою', 'кредит в банку', 'отримати готівку', 'кредит наличными']
    : ['наличный кредит', 'кредит наличными', 'кредит в банке', 'получить наличные', 'кредит наличкой'];

  const cityKeywords = params.lang === 'uk'
    ? [
        'кредит готівкою Київ', 'кредит готівкою Харків', 'кредит готівкою Одеса', 'кредит готівкою Дніпро',
        'кредит готівкою Львів', 'кредит готівкою Запоріжжя', 'кредит готівкою Вінниця', 'кредит готівкою Полтава'
      ]
    : [
        'кредит наличными Киев', 'кредит наличными Харьков', 'кредит наличными Одесса', 'кредит наличными Днепр',
        'кредит наличными Львов', 'кредит наличными Запорожье', 'кредит наличными Винница', 'кредит наличными Полтава'
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
      url: `${baseUrl}/${params.lang}/credits/cash`,
    },
    alternates: {
      languages: {
        'uk': `${baseUrl}/uk/credits/cash`,
        'ru': `${baseUrl}/ru/credits/cash`,
        'x-default': `${baseUrl}/uk/credits/cash`,
      },
    },
  };
}

export default function CashCreditsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
