import { Metadata } from 'next';
import OsagoPageContent from '@/components/insurance/OsagoPageContent';
import { type Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n/dictionaries';

export async function generateMetadata({ params }: { params: { lang: Locale } }): Promise<Metadata> {
  const dict = getDictionary(params.lang);

  return {
    title: dict.osago.meta.title,
    description: dict.osago.meta.description,
    keywords: params.lang === 'uk'
      ? 'ОСЦПВ, автоцивілка, автоцивілка онлайн, авто цивілка, страховка авто, OSAGO, купити ОСЦПВ онлайн, ОСЦПВ Україна, купити автоцивілку онлайн, купити автоцивілку, автоцивілка ціна, найдешевша автоцивілка, дешева автоцивілка, автоцивілка Оранта, оранта автоцивілка, розрахунок вартості автоцивілки, оформити автоцивілку онлайн, оформити автоцивілку, електронний поліс ОСЦПВ, Hotline автоцивілка, хотлайн автоцивілка, страхування авто онлайн, обов\'язкове страхування авто'
      : 'ОСГПО, Автоцивилка, страховка авто, OSAGO, купить ОСГПО онлайн, ОСГПО Украина, купить автогражданку онлайн, Автоцивилка цена, самая дешевая Автоцивилка, дешевая Автоцивилка, Автоцивилка Оранта, расчет стоимости автогражданки, оформить автогражданку онлайн, электронный полис ОСГПО, Hotline Автоцивилка, страхование авто онлайн, обязательное страхование авто',
  };
}

export default function OsagoInsurancePage({ params }: { params: { lang: Locale } }) {
  return <OsagoPageContent lang={params.lang} />;
}
