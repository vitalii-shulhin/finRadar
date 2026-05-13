import { type Locale } from '@/i18n/config';
import CashCreditsPageClient from '@/components/credits/CashCreditsPageClient';

interface PageProps {
  params: {
    lang: Locale;
  };
}

export default function CashCreditsPage({ params }: PageProps) {
  return <CashCreditsPageClient lang={params.lang} />;
}
