import { type Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n/dictionaries';

interface FeaturedBanksProps {
  lang: Locale;
}

export default function FeaturedBanks({ lang }: FeaturedBanksProps) {
  const dict = getDictionary(lang);
  const banks = [
    {
      name: 'ПриватБанк',
      logo: '🏦',
      rating: 4.8,
      products: dict.home.featuredBanks.products.allServices,
      color: 'from-green-500 to-green-600',
    },
    {
      name: 'Monobank',
      logo: '⚫',
      rating: 4.9,
      products: dict.home.featuredBanks.products.cashback,
      color: 'from-black to-gray-800',
    },
    {
      name: 'Ощадбанк',
      logo: '🏛️',
      rating: 4.5,
      products: dict.home.featuredBanks.products.deposits,
      color: 'from-blue-600 to-blue-700',
    },
    {
      name: 'ПУМБ',
      logo: '🏢',
      rating: 4.6,
      products: dict.home.featuredBanks.products.business,
      color: 'from-red-500 to-red-600',
    },
    {
      name: 'Укргазбанк',
      logo: '⚡',
      rating: 4.4,
      products: dict.home.featuredBanks.products.green,
      color: 'from-teal-500 to-teal-600',
    },
    {
      name: 'Альфа-Банк',
      logo: '🔷',
      rating: 4.7,
      products: dict.home.featuredBanks.products.premium,
      color: 'from-red-600 to-red-700',
    },
  ];

  const features = [
    {
      icon: '✓',
      text: dict.home.featuredBanks.features.guarantee,
    },
    {
      icon: '✓',
      text: dict.home.featuredBanks.features.rates,
    },
    {
      icon: '✓',
      text: dict.home.featuredBanks.features.consultation,
    },
    {
      icon: '✓',
      text: dict.home.featuredBanks.features.online,
    },
  ];

  return (
    <section className="bg-gray-50 py-16">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold font-heading mb-3">
            {dict.home.featuredBanks.title}
          </h2>
          <p className="text-gray-600 text-lg">
            {dict.home.featuredBanks.subtitle}
          </p>
        </div>

        {/* Banks Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {banks.map((bank, index) => (
            <a
              key={index}
              href="#"
              className="card p-6 hover:shadow-xl transition-all duration-300 group"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`w-14 h-14 bg-gradient-to-br ${bank.color} rounded-xl flex items-center justify-center text-3xl group-hover:scale-110 transition-transform`}>
                    {bank.logo}
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
                      {bank.name}
                    </h3>
                    <div className="flex items-center gap-1 text-sm">
                      <span className="text-yellow-500">★</span>
                      <span className="font-medium">{bank.rating}</span>
                      <span className="text-gray-400 text-xs">/5</span>
                    </div>
                  </div>
                </div>
              </div>

              <p className="text-sm text-gray-600 mb-4">
                {bank.products}
              </p>

              <div className="flex gap-2">
                <button className="flex-1 py-2 px-4 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary-dark transition-colors">
                  {dict.home.featuredBanks.buttons.details}
                </button>
                <button className="py-2 px-4 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors">
                  {dict.home.featuredBanks.buttons.compare}
                </button>
              </div>
            </a>
          ))}
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex items-center gap-3 bg-white p-4 rounded-lg shadow-sm"
            >
              <span className="flex-shrink-0 w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-sm font-bold">
                {feature.icon}
              </span>
              <span className="text-sm text-gray-700">{feature.text}</span>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-4">
            {dict.home.featuredBanks.cta.question}
          </p>
          <button className="btn-primary inline-flex items-center">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            {dict.home.featuredBanks.cta.button}
          </button>
        </div>
      </div>
    </section>
  );
}
