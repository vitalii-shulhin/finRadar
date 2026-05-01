import { type CreditOffer } from '@/data/creditOffers';
import { type Locale } from '@/i18n/config';

interface CreditArticleSchemaProps {
  credit: CreditOffer;
  articleData: any;
  lang: Locale;
}

export default function CreditArticleSchema({
  credit,
  articleData,
  lang
}: CreditArticleSchemaProps) {
  if (!articleData) return null;

  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": lang === 'uk'
      ? `${credit.bank} - детальний огляд умов кредитування`
      : `${credit.bank} - детальный обзор условий кредитования`,
    "description": articleData.intro || '',
    "author": {
      "@type": "Organization",
      "name": "FinRadar"
    },
    "publisher": {
      "@type": "Organization",
      "name": "FinRadar"
    },
    "dateModified": new Date().toISOString(),
    "inLanguage": lang === 'uk' ? 'uk-UA' : 'ru-RU',
    "about": {
      "@type": "FinancialProduct",
      "name": credit.bank,
      "description": articleData.intro || '',
      "provider": {
        "@type": "FinancialService",
        "name": credit.bank
      }
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
