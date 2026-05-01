import { type Locale } from '@/i18n/config';
import CarInsurancePageContent from '@/components/insurance/CarInsurancePageContent';

export default function CarInsurancePage({
  params,
}: {
  params: { lang: Locale };
}) {
  return <CarInsurancePageContent lang={params.lang} />;
}
