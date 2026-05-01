import { Metadata } from 'next';
import GreenCardPageContent from '@/components/insurance/GreenCardPageContent';
import { type Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n/dictionaries';

export async function generateMetadata({ params }: { params: { lang: Locale } }): Promise<Metadata> {
  const dict = getDictionary(params.lang);

  return {
    title: dict.greenCard.meta.title,
    description: dict.greenCard.meta.description,
    keywords: params.lang === 'uk'
      ? 'Зелена Карта, Green Card, страховка за кордон, автостраховка Європа, автостраховка за кордон, Green Card онлайн, Зелена карта онлайн, купити зелену карту, оформити зелену карту, страхування виїзд за кордон, автоцивілка Європа, міжнародне страхування авто, страховка автомобіля за кордоном, Green Card Україна, автостраховка для подорожей, обов\'язкова страховка за кордон'
      : 'Зеленая карта, Green Card, страховка за границу, автостраховка Европа, автостраховка за границу, Green Card онлайн, Зеленая карта онлайн, купить зеленую карту, оформить зеленую карту, страхование выезд за границу, Автоцивилка Европа, международное страхование авто, страховка автомобиля за рубежом, Green Card Украина, автостраховка для путешествий, обязательная страховка за границу',
  };
}

export default function GreenCardInsurancePage({ params }: { params: { lang: Locale } }) {
  return <GreenCardPageContent lang={params.lang} />;
}
