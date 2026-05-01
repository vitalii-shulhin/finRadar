import { type Locale } from '@/i18n/config';
import OnlineCreditsPageClient from '@/components/credits/OnlineCreditsPageClient';

interface PageProps {
  params: {
    lang: Locale;
  };
}

export default function OnlineCreditsPage({ params }: PageProps) {
  return <OnlineCreditsPageClient lang={params.lang} />;
}
