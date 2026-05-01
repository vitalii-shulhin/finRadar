import { Metadata } from 'next';
import OsagoLocationPage from '@/components/insurance/OsagoLocationPage';
import { type Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n/dictionaries';

export async function generateMetadata({ params }: { params: { lang: Locale } }): Promise<Metadata> {
  const dict = getDictionary(params.lang);

  return {
    title: params.lang === 'uk'
      ? 'Страховка на Мотоцикл (ОСЦПВ) - Онлайн Оформлення | FinRadar'
      : 'Страховка на Мотоцикл (ОСГПО) - Онлайн Оформление | FinRadar',
    description: params.lang === 'uk'
      ? 'Оформити ОСЦПВ на мотоцикл онлайн. Порівняння цін від усіх страхових компаній України. Електронний поліс за 5 хвилин. Ціни від 2 800 грн.'
      : 'Оформить ОСГПО на мотоцикл онлайн. Сравнение цен от всех страховых компаний Украины. Электронный полис за 5 минут. Цены от 2 800 грн.',
    keywords: params.lang === 'uk'
      ? 'ОСЦПВ мотоцикл, страховка на мотоцикл, автоцивілка мотоцикл, OSAGO мотоцикл, купити ОСЦПВ мотоцикл онлайн'
      : 'ОСГПО мотоцикл, страховка на мотоцикл, Автоцивилка мотоцикл, OSAGO мотоцикл, купить ОСГПО мотоцикл онлайн',
  };
}

export default function OsagoMotorcyclePage({ params }: { params: { lang: Locale } }) {
  return <OsagoLocationPage city="motorcycle" lang={params.lang} />;
}
