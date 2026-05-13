import { type Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n/dictionaries';

interface HeroSectionProps {
  lang: Locale;
}

export default function HeroSection({ lang }: HeroSectionProps) {
  const dict = getDictionary(lang);

  return (
    <section className="bg-gradient-to-r from-primary to-primary-dark text-white py-2">
      <div className="container-custom">
        <div className="max-w-3xl">
          <h2 className="text-4xl md:text-5xl font-bold font-heading mb-4">
            {dict.home.hero.title}
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            {dict.home.hero.subtitle}
          </p>
          <div className="flex flex-wrap gap-4">
            <a href="#currency" className="btn-primary bg-white text-primary hover:bg-gray-100">
              {dict.home.hero.currencyRatesBtn}
            </a>
            <a href="#news" className="btn-secondary bg-primary-dark hover:bg-primary-light text-white border-2 border-white">
              {dict.home.hero.latestNewsBtn}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
