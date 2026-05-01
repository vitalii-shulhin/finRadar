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
    title: dict.meta.autoCalculator.title,
    description: dict.meta.autoCalculator.description,
    keywords: [...dict.meta.autoCalculator.keywords],
    openGraph: {
      title: dict.meta.autoCalculator.ogTitle,
      description: dict.meta.autoCalculator.ogDescription,
      type: 'website',
      locale: params.lang === 'uk' ? 'uk_UA' : 'ru_RU',
      url: `${baseUrl}/${params.lang}/calc/credit/auto`,
    },
    twitter: {
      card: 'summary_large_image',
      title: dict.meta.autoCalculator.ogTitle,
      description: dict.meta.autoCalculator.ogDescription,
    },
    alternates: {
      languages: {
        'uk': `${baseUrl}/uk/calc/credit/auto`,
        'ru': `${baseUrl}/ru/calc/credit/auto`,
        'x-default': `${baseUrl}/uk/calc/credit/auto`,
      },
    },
  };
}

export default function AutoCreditPage() {
  return <CreditCalculator loanType="auto" />;
}
