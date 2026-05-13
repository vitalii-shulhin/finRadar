import { Metadata } from 'next';
import OsagoLocationPage from '@/components/insurance/OsagoLocationPage';
import { type Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n/dictionaries';

export async function generateMetadata({ params }: { params: { lang: Locale } }): Promise<Metadata> {
  const dict = getDictionary(params.lang);

  return {
    title: params.lang === 'uk'
      ? 'ОСЦПВ (Автоцивілка) в Дніпрі - Онлайн Оформлення Страховки | FinRadar'
      : 'ОСГПО (Автоцивилка) в Днепре - Онлайн Оформление Страховки | FinRadar',
    description: params.lang === 'uk'
      ? 'Оформити ОСЦПВ (автоцивілку) в Дніпрі онлайн. Порівняння цін від усіх страхових компаній Дніпра. Електронний поліс за 5 хвилин. Ціни від 4 308 грн.'
      : 'Оформить OSAGO (Автоцивилку) в Днепре онлайн. Сравнение цен от всех страховых компаний Днепра. Электронный полис за 5 минут. Цены от 4 308 грн.',
    keywords: params.lang === 'uk'
      ? 'ОСЦПВ Дніпро, автоцивілка Дніпро, страховка авто Дніпро, OSAGO Дніпро, купити ОСЦПВ Дніпро онлайн'
      : 'ОСГПО Днепр, Автоцивилка Днепр, страховка авто Днепр, OSAGO Днепр, купить ОСГПО Днепр онлайн',
  };
}

export default function OsagoDniproPage({ params }: { params: { lang: Locale } }) {
  return <OsagoLocationPage city="dnipro" lang={params.lang} />;
}
