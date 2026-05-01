import { Metadata } from 'next';
import KaskoPageContent from '@/components/insurance/KaskoPageContent';
import { type Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n/dictionaries';

export async function generateMetadata({ params }: { params: { lang: Locale } }): Promise<Metadata> {
  const dict = getDictionary(params.lang);

  return {
    title: dict.kasko.meta.title,
    description: dict.kasko.meta.description,
    keywords: params.lang === 'uk'
      ? 'КАСКО, страхування авто, страховка автомобіля, купити КАСКО онлайн, КАСКО Україна, повне страхування авто, КАСКО з воєнними ризиками, добровільне страхування, франшиза КАСКО, міні КАСКО, повне КАСКО, страхування від крадіжки, страхування від ДТП, КАСКО ціна, розрахунок КАСКО, оформити КАСКО онлайн, електронний поліс КАСКО'
      : 'КАСКО, страхование авто, страховка автомобиля, купить КАСКО онлайн, КАСКО Украина, полное страхование авто, КАСКО с военными рисками, добровольное страхование, франшиза КАСКО, мини КАСКО, полное КАСКО, страхование от кражи, страхование от ДТП, КАСКО цена, расчет КАСКО, оформить КАСКО онлайн, электронный полис КАСКО',
  };
}

export default function KaskoInsurancePage({ params }: { params: { lang: Locale } }) {
  return <KaskoPageContent lang={params.lang} />;
}
