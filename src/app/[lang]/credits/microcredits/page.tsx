import { type Locale } from '@/i18n/config';
import MicrocreditsPageClient from '@/components/credits/MicrocreditsPageClient';

interface PageProps {
  params: {
    lang: Locale;
  };
}

export default function MicrocreditsPage({ params }: PageProps) {
  return <MicrocreditsPageClient lang={params.lang} />;
}
