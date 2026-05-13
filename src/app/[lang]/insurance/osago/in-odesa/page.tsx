import { Metadata } from 'next';
import OsagoLocationPage from '@/components/insurance/OsagoLocationPage';
import { type Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n/dictionaries';

export async function generateMetadata({ params }: { params: { lang: Locale } }): Promise<Metadata> {
  const dict = getDictionary(params.lang);

  return {
    title: params.lang === 'uk'
      ? 'ОСЦПВ (Автоцивілка) в Одесі - Онлайн Оформлення Страховки | FinRadar'
      : 'OSAGO (Автоцивилка) в Одессе - Онлайн Оформление Страховки | FinRadar',
    description: params.lang === 'uk'
      ? 'Оформити ОСЦПВ (автоцивілку) в Одесі онлайн. Порівняння цін від усіх страхових компаній Одеси. Електронний поліс за 5 хвилин. Ціни від 4 308 грн.'
      : 'Оформить OSAGO (Автоцивилку) в Одессе онлайн. Сравнение цен от всех страховых компаний Одессы. Электронный полис за 5 минут. Цены от 4 308 грн.',
    keywords: params.lang === 'uk'
      ? 'ОСЦПВ Одеса, автоцивілка Одеса, страховка авто Одеса, OSAGO Одеса, купити ОСЦПВ Одеса онлайн'
      : 'ОСГПО Одесса, Автоцивилка Одесса, страховка авто Одесса, OSAGO Одесса, купить ОСГПО Одесса онлайн',
  };
}

export default function OsagoOdesaPage({ params }: { params: { lang: Locale } }) {
  return <OsagoLocationPage city="odesa" lang={params.lang} />;
}
