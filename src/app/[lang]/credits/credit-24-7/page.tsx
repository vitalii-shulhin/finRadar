import Credit247PageClient from '@/components/credits/Credit247PageClient';
import type { Locale } from '@/i18n/config';

export default function Credit247Page({
  params,
}: {
  params: { lang: Locale };
}) {
  return <Credit247PageClient lang={params.lang} />;
}
