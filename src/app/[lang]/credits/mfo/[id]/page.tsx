import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import OnlineCreditDetailPage from '@/components/credits/OnlineCreditDetailPage';
import { getLoanProductById, LOAN_PRODUCTS } from '@/data/loanProducts';
import { type Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n/dictionaries';

export async function generateStaticParams() {
  return LOAN_PRODUCTS.map((product) => ({
    id: product.id.toString(),
  }));
}

export async function generateMetadata({
  params
}: {
  params: { id: string; lang: Locale }
}): Promise<Metadata> {
  const productId = parseInt(params.id);
  const product = getLoanProductById(productId);

  if (!product) {
    return {
      title: params.lang === 'uk' ? 'Кредит не знайдено' : 'Кредит не найден',
    };
  }

  const dict = getDictionary(params.lang);

  const title = params.lang === 'uk'
    ? `${product.lender} - ${product.productName} | МФО України | FinRadar`
    : `${product.lender} - ${product.productName} | МФО Украины | FinRadar`;

  const description = params.lang === 'uk'
    ? `Оформити ${product.productName.toLowerCase()} від ${product.lender}. Сума від ${product.minAmount.toLocaleString()} до ${product.maxAmount.toLocaleString()} грн. Ставка від ${product.interestRateValue}%. Схвалення за ${product.approvalTime}.`
    : `Оформить ${product.productName.toLowerCase()} от ${product.lender}. Сумма от ${product.minAmount.toLocaleString()} до ${product.maxAmount.toLocaleString()} грн. Ставка от ${product.interestRateValue}%. Одобрение за ${product.approvalTime}.`;

  const keywords = params.lang === 'uk'
    ? `${product.lender} МФО, ${product.productName}, кредит ${product.lender} онлайн, МФО України, мікрокредит онлайн, позика на картку`
    : `${product.lender} МФО, ${product.productName}, кредит ${product.lender} онлайн, МФО Украины, микрокредит онлайн, займ на карту`;

  return {
    title,
    description,
    keywords,
  };
}

export default function MfoCreditPage({
  params
}: {
  params: { id: string; lang: Locale }
}) {
  const productId = parseInt(params.id);
  const product = getLoanProductById(productId);

  if (!product) {
    notFound();
  }

  return <OnlineCreditDetailPage product={product} lang={params.lang} />;
}
