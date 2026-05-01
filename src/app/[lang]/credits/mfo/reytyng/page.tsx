import MfoReytyngPageClient from '@/components/credits/MfoReytyngPageClient';
import type { Locale } from '@/i18n/config';

export default function MfoReytyngPage({
  params,
}: {
  params: { lang: Locale };
}) {
  return <MfoReytyngPageClient lang={params.lang} />;
}
