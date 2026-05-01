import MfoSpysokPageClient from '@/components/credits/MfoSpysokPageClient';
import type { Locale } from '@/i18n/config';

export default function MfoSpysokPage({
  params,
}: {
  params: { lang: Locale };
}) {
  return <MfoSpysokPageClient lang={params.lang} />;
}
