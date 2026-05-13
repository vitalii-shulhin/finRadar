import { type Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n/dictionaries';
import { CARDS_DATA } from '@/data/cards';
import Link from 'next/link';

interface FeaturedBanksProps {
  lang: Locale;
}

export default function FeaturedBanks({ lang }: FeaturedBanksProps) {
  const dict = getDictionary(lang);

  // Get unique banks from CARDS_DATA (limit to 6)
  const uniqueBanks = Array.from(
    new Map(CARDS_DATA.map(card => [card.bank, card])).values()
  ).slice(0, 6);

  const banks = uniqueBanks.map(card => ({
    name: card.bank,
    logo: card.bankLogo,
    rating: card.rating,
    reviews: card.reviews,
    products: card.features[0], // Use first feature as description
    features: card.features.slice(1, 3), // Get 2 more features
    color: card.color,
    cashback: card.cashback,
    gracePeriod: card.gracePeriod,
    url: card.cardUrl || card.cardUrlIOS || card.cardUrlAndroid || '#',
  }));

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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6 mb-12">
          {banks.map((bank, index) => (
            <a
              key={index}
              href={bank.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative bg-white rounded-xl sm:rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-100 cursor-pointer block"
            >
              {/* Compact Header with Gradient */}
              <div className={`relative bg-gradient-to-br ${bank.color} p-3 sm:p-4`}>
                <div className="flex items-center justify-between">
                  {/* Logo and Name */}
                  <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-lg sm:rounded-xl shadow-md flex items-center justify-center overflow-hidden flex-shrink-0 group-hover:scale-105 transition-transform">
                      {bank.logo.startsWith('/') ? (
                        <img src={bank.logo} alt={bank.name} className="w-full h-full object-contain p-1.5 sm:p-2" />
                      ) : (
                        <span className="text-xl sm:text-2xl">{bank.logo}</span>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm sm:text-base font-bold text-white truncate group-hover:scale-105 transition-transform origin-left">
                        {bank.name}
                      </h3>
                      <div className="flex items-center gap-1 mt-0.5">
                        <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-yellow-300 fill-current" viewBox="0 0 20 20">
                          <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                        </svg>
                        <span className="text-xs sm:text-sm font-bold text-white">{bank.rating}</span>
                        <span className="text-xs text-white/80 hidden sm:inline">({bank.reviews})</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Compact Content */}
              <div className="p-3 sm:p-4">
                {/* Badges - Horizontal on Mobile */}
                <div className="flex gap-1.5 sm:gap-2 mb-2 sm:mb-3">
                  {bank.cashback && (
                    <div className="flex-1 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg px-2 py-1.5 sm:py-2 border border-green-100">
                      <div className="flex items-center justify-center gap-1">
                        <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-green-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                        </svg>
                        <div className="flex flex-col items-center">
                          <span className="text-[10px] sm:text-xs text-green-600 font-semibold whitespace-nowrap">{bank.cashback}</span>
                          <span className="text-[9px] sm:text-[10px] text-green-600/70">кешбек</span>
                        </div>
                      </div>
                    </div>
                  )}
                  {bank.gracePeriod && (
                    <div className="flex-1 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg px-2 py-1.5 sm:py-2 border border-blue-100">
                      <div className="flex items-center justify-center gap-1">
                        <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-blue-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <div className="flex flex-col items-center">
                          <span className="text-[10px] sm:text-xs text-blue-600 font-semibold">{bank.gracePeriod}</span>
                          <span className="text-[9px] sm:text-[10px] text-blue-600/70">днів</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Feature - Single Line on Mobile */}
                <p className="text-xs sm:text-sm text-gray-600 mb-2 sm:mb-3 line-clamp-1 sm:line-clamp-2">
                  {bank.products}
                </p>

                {/* Features List - Compact */}
                <ul className="space-y-1 sm:space-y-1.5">
                  {bank.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-1.5 sm:gap-2 text-xs sm:text-sm text-gray-600">
                      <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-green-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="line-clamp-1">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Hover Border */}
              <div className="absolute inset-0 border-2 border-transparent group-hover:border-primary/50 rounded-xl sm:rounded-2xl transition-colors pointer-events-none"></div>
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
          <Link href={`/${lang}/cards`} className="btn-primary inline-flex items-center">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            {dict.home.featuredBanks.cta.button}
          </Link>
        </div>
      </div>
    </section>
  );
}
