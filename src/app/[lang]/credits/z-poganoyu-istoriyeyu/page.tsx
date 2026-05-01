import BadCreditHistoryPageClient from '@/components/credits/BadCreditHistoryPageClient';
import type { Locale } from '@/i18n/config';

export default function BadCreditHistoryPage({
  params,
}: {
  params: { lang: Locale };
}) {
  return <BadCreditHistoryPageClient lang={params.lang} />;
}
