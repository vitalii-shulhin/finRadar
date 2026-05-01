import { type Locale } from '@/i18n/config';
import CreditNaKartuPageClient from '@/components/credits/CreditNaKartuPageClient';

interface PageProps {
  params: {
    lang: Locale;
  };
}

export default function CreditNaKartuPage({ params }: PageProps) {
  return <CreditNaKartuPageClient lang={params.lang} />;
}
