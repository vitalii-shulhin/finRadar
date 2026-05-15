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
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://finradar.com.ua';

  return {
    title: dict.meta.mortgageCalculator.title,
    description: dict.meta.mortgageCalculator.description,
    keywords: [...dict.meta.mortgageCalculator.keywords],
    openGraph: {
      title: dict.meta.mortgageCalculator.ogTitle,
      description: dict.meta.mortgageCalculator.ogDescription,
      type: 'website',
      locale: params.lang === 'uk' ? 'uk_UA' : 'ru_RU',
      url: `${baseUrl}/${params.lang}/calc/credit/mortgage`,
    },
    twitter: {
      card: 'summary_large_image',
      title: dict.meta.mortgageCalculator.ogTitle,
      description: dict.meta.mortgageCalculator.ogDescription,
    },
    alternates: {
      languages: {
        'uk': `${baseUrl}/uk/calc/credit/mortgage`,
        'ru': `${baseUrl}/ru/calc/credit/mortgage`,
        'x-default': `${baseUrl}/uk/calc/credit/mortgage`,
      },
    },
  };
}

export default function MortgageCreditPage() {
  return <CreditCalculator loanType="mortgage" />;
}
