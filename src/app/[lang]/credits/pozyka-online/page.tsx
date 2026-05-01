import { type Locale } from '@/i18n/config';
import PozykaOnlinePageClient from '@/components/credits/PozykaOnlinePageClient';

interface PageProps {
  params: {
    lang: Locale;
  };
}

export default function PozykaOnlinePage({ params }: PageProps) {
  return <PozykaOnlinePageClient lang={params.lang} />;
}
