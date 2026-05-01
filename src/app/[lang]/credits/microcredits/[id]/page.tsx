import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import MicrocreditDetailPage from '@/components/credits/MicrocreditDetailPage';
import { getMicrocreditProductById, MICROCREDIT_PRODUCTS } from '@/data/microcreditProducts';
import { type Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n/dictionaries';

export async function generateStaticParams() {
  return MICROCREDIT_PRODUCTS.map((product) => ({
    id: product.id.toString(),
  }));
}

export async function generateMetadata({
  params
}: {
  params: { id: string; lang: Locale }
}): Promise<Metadata> {
  const productId = parseInt(params.id);
  const product = getMicrocreditProductById(productId);

  if (!product) {
    return {
      title: params.lang === 'uk' ? 'Мікрокредит не знайдено' : 'Микрокредит не найден',
    };
  }

  const dict = getDictionary(params.lang);

  const title = params.lang === 'uk'
    ? `${product.lender} - Мікрокредит до ${product.maxAmount.toLocaleString()} грн за ${product.approvalTime} | FinRadar`
    : `${product.lender} - Микрокредит до ${product.maxAmount.toLocaleString()} грн за ${product.approvalTime} | FinRadar`;

  const description = params.lang === 'uk'
    ? `Оформити мікрокредит у ${product.lender}. Сума від ${product.minAmount.toLocaleString()} до ${product.maxAmount.toLocaleString()} грн. ${product.firstLoanFree ? 'Перший кредит безкоштовно!' : ''} Схвалення за ${product.approvalTime}. Рейтинг ${product.rating}.`
    : `Оформить микрокредит в ${product.lender}. Сумма от ${product.minAmount.toLocaleString()} до ${product.maxAmount.toLocaleString()} грн. ${product.firstLoanFree ? 'Первый кредит бесплатно!' : ''} Одобрение за ${product.approvalTime}. Рейтинг ${product.rating}.`;

  const keywords = params.lang === 'uk'
    ? `${product.lender} мікрокредит, мікрозайм ${product.lender}, кредит онлайн без довідок, швидкий кредит, перший кредит безкоштовно`
    : `${product.lender} микрокредит, микрозайм ${product.lender}, кредит онлайн без справок, быстрый кредит, первый кредит бесплатно`;

  return {
    title,
    description,
    keywords,
  };
}

export default function MicrocreditPage({
  params
}: {
  params: { id: string; lang: Locale }
}) {
  const productId = parseInt(params.id);
  const product = getMicrocreditProductById(productId);

  if (!product) {
    notFound();
  }

  return <MicrocreditDetailPage product={product} lang={params.lang} />;
}
