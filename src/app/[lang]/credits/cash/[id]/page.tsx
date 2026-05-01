import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import CashCreditDetailPage from '@/components/credits/CashCreditDetailPage';
import { getCashCreditProductById, CASH_CREDIT_PRODUCTS } from '@/data/cashCreditProducts';
import { type Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n/dictionaries';

export async function generateStaticParams() {
  return CASH_CREDIT_PRODUCTS.map((product) => ({
    id: product.id.toString(),
  }));
}

export async function generateMetadata({
  params
}: {
  params: { id: string; lang: Locale }
}): Promise<Metadata> {
  const productId = parseInt(params.id);
  const product = getCashCreditProductById(productId);

  if (!product) {
    return {
      title: params.lang === 'uk' ? 'Кредит не знайдено' : 'Кредит не найден',
    };
  }

  const dict = getDictionary(params.lang);

  const title = params.lang === 'uk'
    ? `${product.lender} - Готівковий кредит до ${product.maxAmount.toLocaleString()} грн | FinRadar`
    : `${product.lender} - Наличный кредит до ${product.maxAmount.toLocaleString()} грн | FinRadar`;

  const description = params.lang === 'uk'
    ? `Оформити готівковий кредит у ${product.lender}. Сума від ${product.minAmount.toLocaleString()} до ${product.maxAmount.toLocaleString()} грн. Ставка від ${product.interestRateValue}%. Рейтинг ${product.rating}.`
    : `Оформить наличный кредит в ${product.lender}. Сумма от ${product.minAmount.toLocaleString()} до ${product.maxAmount.toLocaleString()} грн. Ставка от ${product.interestRateValue}%. Рейтинг ${product.rating}.`;

  const keywords = params.lang === 'uk'
    ? `${product.lender} готівковий кредит, кредит готівкою ${product.lender}, умови кредиту ${product.lender}, готівковий кредит онлайн`
    : `${product.lender} наличный кредит, кредит наличными ${product.lender}, условия кредита ${product.lender}, наличный кредит онлайн`;

  return {
    title,
    description,
    keywords,
  };
}

export default function CashCreditPage({
  params
}: {
  params: { id: string; lang: Locale }
}) {
  const productId = parseInt(params.id);
  const product = getCashCreditProductById(productId);

  if (!product) {
    notFound();
  }

  return <CashCreditDetailPage product={product} lang={params.lang} />;
}
