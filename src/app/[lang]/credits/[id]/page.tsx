import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import CreditDetailPage from '@/components/credits/CreditDetailPage';
import CreditArticleSchema from '@/components/credits/CreditArticleSchema';
import { getCreditById, CREDIT_OFFERS } from '@/data/creditOffers';
import { type Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n/dictionaries';

export async function generateStaticParams() {
  return CREDIT_OFFERS.map((credit) => ({
    id: credit.id.toString(),
  }));
}

export async function generateMetadata({
  params
}: {
  params: { id: string; lang: Locale }
}): Promise<Metadata> {
  const creditId = parseInt(params.id);
  const credit = getCreditById(creditId);

  if (!credit) {
    return {
      title: 'Кредит не знайдено',
    };
  }

  const dict = getDictionary(params.lang);
  const articleData = credit.articleId ? (dict as any)[credit.articleId] : null;

  const title = params.lang === 'uk'
    ? `${credit.bank} - ${dict.allCredits.typeNames[credit.type === 'credit-line' ? 'creditLine' : credit.type]} | FinRadar`
    : `${credit.bank} - ${dict.allCredits.typeNames[credit.type === 'credit-line' ? 'creditLine' : credit.type]} | FinRadar`;

  // Base description
  let description = params.lang === 'uk'
    ? `Оформити ${dict.allCredits.typeNames[credit.type === 'credit-line' ? 'creditLine' : credit.type].toLowerCase()} від ${credit.bank}. Сума від ${credit.minAmount.toLocaleString()} до ${credit.maxAmount.toLocaleString()} грн. Ставка від ${credit.minRate}%. ${credit.onlineApplication ? 'Онлайн заявка' : ''}.`
    : `Оформить ${dict.allCredits.typeNames[credit.type === 'credit-line' ? 'creditLine' : credit.type].toLowerCase()} от ${credit.bank}. Сумма от ${credit.minAmount.toLocaleString()} до ${credit.maxAmount.toLocaleString()} грн. Ставка от ${credit.minRate}%. ${credit.onlineApplication ? 'Онлайн заявка' : ''}.`;

  // Enhance with article intro if available
  if (articleData?.intro) {
    const introSnippet = articleData.intro.slice(0, 100);
    description = `${description} ${introSnippet}...`;
  }

  // Enhanced keywords
  const baseKeywords = params.lang === 'uk'
    ? `${credit.bank} кредит, ${dict.allCredits.typeNames[credit.type === 'credit-line' ? 'creditLine' : credit.type]} ${credit.bank}, кредит ${credit.bank} онлайн, умови кредиту ${credit.bank}`
    : `${credit.bank} кредит, ${dict.allCredits.typeNames[credit.type === 'credit-line' ? 'creditLine' : credit.type]} ${credit.bank}, кредит ${credit.bank} онлайн, условия кредита ${credit.bank}`;

  return {
    title,
    description,
    keywords: baseKeywords,
    openGraph: {
      title,
      description,
      type: 'website',
      locale: params.lang === 'uk' ? 'uk_UA' : 'ru_RU',
    },
  };
}

export default function CreditPage({
  params
}: {
  params: { id: string; lang: Locale }
}) {
  const creditId = parseInt(params.id);
  const credit = getCreditById(creditId);

  if (!credit) {
    notFound();
  }

  const dict = getDictionary(params.lang);
  const articleData = credit.articleId ? (dict as any)[credit.articleId] : null;

  return (
    <>
      {articleData && (
        <CreditArticleSchema
          credit={credit}
          articleData={articleData}
          lang={params.lang}
        />
      )}
      <CreditDetailPage credit={credit} lang={params.lang} />
    </>
  );
}
