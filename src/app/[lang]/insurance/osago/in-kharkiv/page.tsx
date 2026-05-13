import { Metadata } from 'next';
import OsagoLocationPage from '@/components/insurance/OsagoLocationPage';
import { type Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n/dictionaries';

export async function generateMetadata({ params }: { params: { lang: Locale } }): Promise<Metadata> {
  const dict = getDictionary(params.lang);

  return {
    title: params.lang === 'uk'
      ? 'ОСЦПВ (Автоцивілка) в Харкові - Онлайн Оформлення Страховки | FinRadar'
      : 'OSAGO (Автоцивилка) в Харькове - Онлайн Оформление Страховки | FinRadar',
    description: params.lang === 'uk'
      ? 'Оформити ОСЦПВ (автоцивілку) в Харкові онлайн. Порівняння цін від усіх страхових компаній Харкова. Електронний поліс за 5 хвилин. Ціни від 4 308 грн.'
      : 'Оформить ОСГПО (автогражданку) в Харькове онлайн. Сравнение цен от всех страховых компаний Харькова. Электронный полис за 5 минут. Цены от 4 308 грн.',
    keywords: params.lang === 'uk'
      ? 'ОСЦПВ Харків, автоцивілка Харків, страховка авто Харків, OSAGO Харків, купити ОСЦПВ Харків онлайн'
      : 'ОСГПО Харьков, Автоцивилка Харьков, страховка авто Харьков, OSAGO Харьков, купить ОСГПО Харьков онлайн',
  };
}

export default function OsagoKharkivPage({ params }: { params: { lang: Locale } }) {
  return <OsagoLocationPage city="kharkiv" lang={params.lang} />;
}
