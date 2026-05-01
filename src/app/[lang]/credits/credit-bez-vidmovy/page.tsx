import CreditBezVidmovyPageClient from '@/components/credits/CreditBezVidmovyPageClient';
import type { Locale } from '@/i18n/config';

export default function CreditBezVidmovyPage({
  params,
}: {
  params: { lang: Locale };
}) {
  return <CreditBezVidmovyPageClient lang={params.lang} />;
}
