import { Metadata } from 'next';
import OsagoLocationPage from '@/components/insurance/OsagoLocationPage';
import { type Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n/dictionaries';

export async function generateMetadata({ params }: { params: { lang: Locale } }): Promise<Metadata> {
  const dict = getDictionary(params.lang);

  return {
    title: params.lang === 'uk'
      ? 'ОСЦПВ (Автоцивілка) в Запоріжжі - Онлайн Оформлення Страховки | FinRadar'
      : 'ОСГПО (Автоцивилка) в Запорожье - Онлайн Оформление Страховки | FinRadar',
    description: params.lang === 'uk'
      ? 'Оформити ОСЦПВ (автоцивілку) в Запоріжжі онлайн. Порівняння цін від усіх страхових компаній Запоріжжя. Електронний поліс за 5 хвилин. Ціни від 4 308 грн.'
      : 'Оформить ОСГПО (автогражданку) в Запорожье онлайн. Сравнение цен от всех страховых компаний Запорожья. Электронный полис за 5 минут. Цены от 4 308 грн.',
    keywords: params.lang === 'uk'
      ? 'ОСЦПВ Запоріжжя, автоцивілка Запоріжжя, страховка авто Запоріжжя, OSAGO Запоріжжя, купити ОСЦПВ Запоріжжя онлайн'
      : 'ОСГПО Запорожье, Автоцивилка Запорожье, страховка авто Запорожье, OSAGO Запорожье, купить ОСГПО Запорожье онлайн',
  };
}

export default function OsagoZaporizhzhiaPage({ params }: { params: { lang: Locale } }) {
  return <OsagoLocationPage city="zaporizhzhia" lang={params.lang} />;
}
