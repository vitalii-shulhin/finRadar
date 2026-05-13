import { Metadata } from 'next';
import OsagoLocationPage from '@/components/insurance/OsagoLocationPage';
import { type Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n/dictionaries';

export async function generateMetadata({ params }: { params: { lang: Locale } }): Promise<Metadata> {
  const dict = getDictionary(params.lang);

  return {
    title: params.lang === 'uk'
      ? 'ОСЦПВ (Автоцивілка) у Львові - Онлайн Оформлення Страховки | FinRadar'
      : 'OSAGO (Автоцивилка) во Львове - Онлайн Оформление Страховки | FinRadar',
    description: params.lang === 'uk'
      ? 'Оформити ОСЦПВ (автоцивілку) у Львові онлайн. Порівняння цін від усіх страхових компаній Львова. Електронний поліс за 5 хвилин. Ціни від 4 308 грн.'
      : 'Оформить ОСГПО (автогражданку) во Львове онлайн. Сравнение цен от всех страховых компаний Львова. Электронный полис за 5 минут. Цены от 4 308 грн.',
    keywords: params.lang === 'uk'
      ? 'ОСЦПВ Львів, автоцивілка Львів, страховка авто Львів, OSAGO Львів, купити ОСЦПВ Львів онлайн'
      : 'ОСГПО Львов, Автоцивилка Львов, страховка авто Львов, OSAGO Львов, купить ОСГПО Львов онлайн',
  };
}

export default function OsagoLvivPage({ params }: { params: { lang: Locale } }) {
  return <OsagoLocationPage city="lviv" lang={params.lang} />;
}
