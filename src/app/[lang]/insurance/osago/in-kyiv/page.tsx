import { Metadata } from 'next';
import OsagoLocationPage from '@/components/insurance/OsagoLocationPage';
import { type Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n/dictionaries';

export async function generateMetadata({ params }: { params: { lang: Locale } }): Promise<Metadata> {
  const dict = getDictionary(params.lang);

  return {
    title: params.lang === 'uk'
      ? 'ОСЦПВ (Автоцивілка) в Києві - Онлайн Оформлення Страховки | FinRadar'
      : 'ОСГПО (Автоцивилка) в Киеве - Онлайн Оформление Страховки | FinRadar',
    description: params.lang === 'uk'
      ? 'Оформити ОСЦПВ (автоцивілку) в Києві онлайн. Порівняння цін від усіх страхових компаній Києва. Електронний поліс за 5 хвилин. Ціни від 4 308 грн.'
      : 'Оформить ОСГПО (автогражданку) в Киеве онлайн. Сравнение цен от всех страховых компаний Киева. Электронный полис за 5 минут. Цены от 4 308 грн.',
    keywords: params.lang === 'uk'
      ? 'ОСЦПВ Київ, автоцивілка Київ, страховка авто Київ, OSAGO Київ, купити ОСЦПВ Київ онлайн'
      : 'ОСГПО Киев, Автоцивилка Киев, страховка авто Киев, OSAGO Киев, купить ОСГПО Киев онлайн',
  };
}

export default function OsagoKyivPage({ params }: { params: { lang: Locale } }) {
  return <OsagoLocationPage city="kyiv" lang={params.lang} />;
}
