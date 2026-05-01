import GroshiTerminovoPageClient from '@/components/credits/GroshiTerminovoPageClient';
import type { Locale } from '@/i18n/config';

export default function GroshiTerminovoPage({
  params,
}: {
  params: { lang: Locale };
}) {
  return <GroshiTerminovoPageClient lang={params.lang} />;
}
