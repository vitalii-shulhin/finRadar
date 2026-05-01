import NoviMfoPageClient from '@/components/credits/NoviMfoPageClient';
import type { Locale } from '@/i18n/config';

export default function NoviMfoPage({
  params,
}: {
  params: { lang: Locale };
}) {
  return <NoviMfoPageClient lang={params.lang} />;
}
