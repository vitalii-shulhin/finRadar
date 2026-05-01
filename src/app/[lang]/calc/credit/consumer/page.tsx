import CreditCalculator from '@/components/calculators/CreditCalculator';
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

  return {
    title: dict.meta.consumerCalculator.title,
    description: dict.meta.consumerCalculator.description,
    keywords: [...dict.meta.consumerCalculator.keywords],
    openGraph: {
      title: dict.meta.consumerCalculator.ogTitle,
      description: dict.meta.consumerCalculator.ogDescription,
      type: 'website',
      locale: params.lang === 'uk' ? 'uk_UA' : 'ru_RU',
      url: `${baseUrl}/${params.lang}/calc/credit/consumer`,
    },
    twitter: {
      card: 'summary_large_image',
      title: dict.meta.consumerCalculator.ogTitle,
      description: dict.meta.consumerCalculator.ogDescription,
    },
    alternates: {
      languages: {
        'uk': `${baseUrl}/uk/calc/credit/consumer`,
        'ru': `${baseUrl}/ru/calc/credit/consumer`,
        'x-default': `${baseUrl}/uk/calc/credit/consumer`,
      },
    },
  };
}

export default function ConsumerCreditPage() {
  return <CreditCalculator loanType="consumer" />;
}
