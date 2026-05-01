import Link from 'next/link';
import { Calculator, TrendingUp, FileText, Building2, Smartphone, Bitcoin, CreditCard, Shield, Wallet, Layers } from 'lucide-react';
import { type Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n/dictionaries';

interface ServicesBlockProps {
  lang: Locale;
}

export default function ServicesBlock({ lang }: ServicesBlockProps) {
  const dict = getDictionary(lang);

  const services = [
    {
      icon: Wallet,
      title: dict.home.services.items.onlineCredits.title,
      description: dict.home.services.items.onlineCredits.description,
      link: `/${lang}/credits/online`,
      color: 'bg-primary',
      badge: dict.home.services.badges.new,
    },
    {
      icon: Layers,
      title: dict.home.services.items.allCredits.title,
      description: dict.home.services.items.allCredits.description,
      link: `/${lang}/credits/all`,
      color: 'bg-teal-500',
      badge: dict.home.services.badges.new,
    },
    {
      icon: CreditCard,
      title: dict.home.services.items.cards.title,
      description: dict.home.services.items.cards.description,
      link: `/${lang}/cards`,
      color: 'bg-purple-500',
      badge: dict.home.services.badges.new,
    },
    {
      icon: Bitcoin,
      title: dict.home.services.items.crypto.title,
      description: dict.home.services.items.crypto.description,
      link: `/${lang}/crypto`,
      color: 'bg-amber-500',
      badge: dict.home.services.badges.actual,
    },
    {
      icon: Shield,
      title: dict.home.services.items.insurance.title,
      description: dict.home.services.items.insurance.description,
      link: `/${lang}/insurance/osago`,
      color: 'bg-orange-500',
      badge: dict.home.services.badges.new,
    },
    {
      icon: Calculator,
      title: dict.home.services.items.creditCalc.title,
      description: dict.home.services.items.creditCalc.description,
      link: `/${lang}/calc/credit`,
      color: 'bg-blue-500',
      badge: dict.home.services.badges.popular,
    },
    {
      icon: TrendingUp,
      title: dict.home.services.items.depositCalc.title,
      description: dict.home.services.items.depositCalc.description,
      link: `/${lang}/calc/deposit`,
      color: 'bg-green-500',
      badge: null,
    },
    {
      icon: FileText,
      title: dict.home.services.items.tax.title,
      description: dict.home.services.items.tax.description,
      link: '#tax-help',
      color: 'bg-red-500',
      badge: null,
    },
    {
      icon: Building2,
      title: dict.home.services.items.mortgage.title,
      description: dict.home.services.items.mortgage.description,
      link: '#mortgage',
      color: 'bg-indigo-500',
      badge: null,
    },
    {
      icon: Smartphone,
      title: dict.home.services.items.mobileBanking.title,
      description: dict.home.services.items.mobileBanking.description,
      link: '#mobile-banking',
      color: 'bg-pink-500',
      badge: null,
    }
  ];

  return (
    <section className="bg-white py-6 sm:py-12">
      <div className="container-custom">
        <div className="text-center mb-4 sm:mb-10">
          <h2 className="text-xl sm:text-3xl font-bold font-heading mb-1 sm:mb-3">
            {dict.home.services.title}
          </h2>
          <p className="text-gray-600 text-sm sm:text-lg">
            {dict.home.services.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <Link
                key={index}
                href={service.link}
                className="group relative card p-3 sm:p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                {/* Badge */}
                {service.badge && (
                  <span className="absolute top-1 right-1 sm:top-3 sm:right-3 bg-primary text-white text-[9px] sm:text-xs font-semibold px-1 sm:px-2 py-0.5 sm:py-1 rounded">
                    {service.badge}
                  </span>
                )}

                {/* Icon */}
                <div className={`${service.color} w-8 h-8 sm:w-14 sm:h-14 rounded-lg sm:rounded-xl flex items-center justify-center mb-2 sm:mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="w-4 h-4 sm:w-7 sm:h-7 text-white" />
                </div>

                {/* Content */}
                <h3 className="text-xs sm:text-lg font-semibold mb-1 sm:mb-2 group-hover:text-primary transition-colors leading-tight">
                  {service.title}
                </h3>
                <p className="text-[10px] sm:text-sm text-gray-600 hidden sm:block">
                  {service.description}
                </p>

                {/* Arrow indicator */}
                <div className="mt-2 sm:mt-4 flex items-center text-primary text-xs sm:text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="hidden sm:inline">{dict.home.services.goTo}</span>
                  <svg
                    className="w-3 h-3 sm:w-4 sm:h-4 sm:ml-1 transform group-hover:translate-x-1 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </Link>
            );
          })}
        </div>

        {/* CTA Section */}
        <div className="mt-12 bg-gradient-to-r from-primary via-primary-dark to-primary rounded-2xl p-8 md:p-12 text-white text-center">
          <h3 className="text-2xl md:text-3xl font-bold font-heading mb-4">
            {dict.home.services.cta.title}
          </h3>
          <p className="text-lg text-blue-100 mb-6 max-w-2xl mx-auto">
            {dict.home.services.cta.subtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="btn-primary bg-white text-primary hover:bg-gray-100 inline-flex items-center justify-center">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              {dict.home.services.cta.callBtn}
            </button>
            <button className="btn-secondary bg-transparent border-2 border-white text-white hover:bg-white hover:text-primary inline-flex items-center justify-center">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
              {dict.home.services.cta.consultBtn}
            </button>
          </div>
        </div>

        {/* Popular Articles */}
        <div className="mt-12">
          <h3 className="text-2xl font-bold font-heading mb-6">{dict.home.services.popularArticles}</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {dict.home.services.articles.map((article, index) => (
              <a
                key={index}
                href="#"
                className="card overflow-hidden hover:shadow-xl transition-shadow group"
              >
                <div className="bg-gradient-to-br from-primary-light to-primary p-8 text-center">
                  <span className="text-5xl">{article.image}</span>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-3 text-xs text-gray-500 mb-3">
                    <span className="bg-primary/10 text-primary px-2 py-1 rounded font-medium">
                      {article.category}
                    </span>
                    <span>⏱️ {article.readTime}</span>
                  </div>
                  <h4 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
                    {article.title}
                  </h4>
                  <p className="text-sm text-gray-600">
                    {article.description}
                  </p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
