import MfoPageClient from '@/components/credits/MfoPageClient';
import type { Locale } from '@/i18n/config';

export default function MfoPage({
  params,
}: {
  params: { lang: Locale };
}) {
  return <MfoPageClient lang={params.lang} />;
}
