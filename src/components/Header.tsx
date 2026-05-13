'use client';

import Link from 'next/link';
import { Phone, Menu, ChevronDown, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import LanguageSwitcher from './LanguageSwitcher';
import Logo from './Logo';
import { type Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n/dictionaries';

interface HeaderProps {
  lang: Locale;
}

export default function Header({ lang }: HeaderProps) {
  const dict = getDictionary(lang);
  const [showCreditsDropdown, setShowCreditsDropdown] = useState(false);
  const [showInsuranceDropdown, setShowInsuranceDropdown] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showMobileCredits, setShowMobileCredits] = useState(false);
  const [showMobileInsurance, setShowMobileInsurance] = useState(false);

  const creditOptions = [
    { href: `/${lang}/credits/all`, label: dict.headerCreditOptions.all.label, description: dict.headerCreditOptions.all.description },
    { href: `/${lang}/credits/online`, label: dict.headerCreditOptions.online.label, description: dict.headerCreditOptions.online.description },
    { href: `/${lang}/credits/pozyka-online`, label: dict.headerCreditOptions.pozykaOnline.label, description: dict.headerCreditOptions.pozykaOnline.description },
    { href: `/${lang}/credits/credit-na-kartu`, label: dict.headerCreditOptions.creditNaKartu.label, description: dict.headerCreditOptions.creditNaKartu.description },
    { href: `/${lang}/credits/cash`, label: dict.headerCreditOptions.cash.label, description: dict.headerCreditOptions.cash.description },
    { href: `/${lang}/credits/microcredits`, label: dict.headerCreditOptions.microcredits.label, description: dict.headerCreditOptions.microcredits.description },
    { href: `/${lang}/credits/credit-line`, label: dict.headerCreditOptions.creditLine.label, description: dict.headerCreditOptions.creditLine.description },
    { href: `/${lang}/credits/refinancing`, label: dict.headerCreditOptions.refinancing.label, description: dict.headerCreditOptions.refinancing.description },
    { href: `/${lang}/credits/secured`, label: dict.headerCreditOptions.secured.label, description: dict.headerCreditOptions.secured.description },
  ];

  const insuranceOptions = [
    { href: `/${lang}/insurance`, label: dict.headerInsuranceOptions.all.label, description: dict.headerInsuranceOptions.all.description },
    { href: `/${lang}/insurance/car-insurance`, label: dict.headerInsuranceOptions.carInsurance.label, description: dict.headerInsuranceOptions.carInsurance.description },
    { href: `/${lang}/insurance/kasko`, label: dict.headerInsuranceOptions.kasko.label, description: dict.headerInsuranceOptions.kasko.description },
    { href: `/${lang}/insurance/greencard`, label: dict.headerInsuranceOptions.greenCard.label, description: dict.headerInsuranceOptions.greenCard.description },
    { href: `/${lang}/insurance/osago`, label: dict.headerInsuranceOptions.osago.label, description: dict.headerInsuranceOptions.osago.description },
    { href: `/${lang}/insurance/osago/in-kyiv`, label: dict.headerInsuranceOptions.osagoKyiv.label, description: dict.headerInsuranceOptions.osagoKyiv.description },
    { href: `/${lang}/insurance/osago/in-kharkiv`, label: dict.headerInsuranceOptions.osagoKharkiv.label, description: dict.headerInsuranceOptions.osagoKharkiv.description },
    { href: `/${lang}/insurance/osago/in-dnipro`, label: dict.headerInsuranceOptions.osagoDnipro.label, description: dict.headerInsuranceOptions.osagoDnipro.description },
    { href: `/${lang}/insurance/osago/in-lviv`, label: dict.headerInsuranceOptions.osagoLviv.label, description: dict.headerInsuranceOptions.osagoLviv.description },
    { href: `/${lang}/insurance/osago/in-odesa`, label: dict.headerInsuranceOptions.osagoOdesa.label, description: dict.headerInsuranceOptions.osagoOdesa.description },
    { href: `/${lang}/insurance/osago/in-zaporizhzhia`, label: dict.headerInsuranceOptions.osagoZaporizhzhia.label, description: dict.headerInsuranceOptions.osagoZaporizhzhia.description },
    { href: `/${lang}/insurance/osago/motorcycle`, label: dict.headerInsuranceOptions.motorcycle.label, description: dict.headerInsuranceOptions.motorcycle.description },
  ];

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    setShowMobileCredits(false);
    setShowMobileInsurance(false);
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container-custom">
        {/* Top Bar */}
        <div className="flex items-center justify-between py-1 sm:py-2 border-b border-gray-200">
          <Link href={`/${lang}`} className="flex items-center bg-finance-dark px-3 py-2 sm:px-6 sm:py-3 rounded-lg hover:bg-opacity-90 transition-all">
            <Logo className="text-lg sm:text-2xl md:text-3xl" />
          </Link>

          <div className="flex items-center gap-4">
            {/* Language Switcher - Desktop */}
            <div className="hidden md:block">
              <LanguageSwitcher mode="path" currentLang={lang} />
            </div>

            {/*<a*/}
            {/*  href="tel:0800307555"*/}
            {/*  className="hidden md:flex items-center gap-2 text-primary hover:text-primary-dark transition-colors"*/}
            {/*>*/}
            {/*  <Phone className="w-5 h-5" />*/}
            {/*  <span className="font-semibold">0 800 307 555</span>*/}
            {/*</a>*/}

            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
              aria-label="Open menu"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Mobile Sidebar Overlay */}
        {isMobileMenuOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-50 lg:hidden animate-fadeIn"
            onClick={closeMobileMenu}
          />
        )}

        {/* Mobile Sidebar */}
        <div
          className={`fixed top-0 right-0 h-full w-[280px] bg-white shadow-2xl z-50 lg:hidden transform transition-transform duration-300 ease-in-out ${
            isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          {/* Sidebar Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-finance-dark">
            <Logo className="text-xl" />
            <button
              onClick={closeMobileMenu}
              className="p-2 hover:bg-gray-700 rounded-lg transition-colors text-white"
              aria-label="Close menu"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Sidebar Navigation */}
          <nav className="flex flex-col p-4 space-y-1 overflow-y-auto h-[calc(100%-80px)]">
            {/* Language Switcher - Mobile */}
            <div className="mb-4">
              <LanguageSwitcher mode="path" currentLang={lang} />
            </div>

            <Link
              href={`/${lang}`}
              className="px-4 py-3 text-gray-700 hover:bg-gray-100 hover:text-primary font-medium rounded-lg transition-colors"
              onClick={closeMobileMenu}
            >
              {dict.common.home}
            </Link>

            <Link
              href={`/${lang}/news`}
              className="px-4 py-3 text-gray-700 hover:bg-gray-100 hover:text-primary font-medium rounded-lg transition-colors"
              onClick={closeMobileMenu}
            >
              {dict.common.news}
            </Link>

            <Link
              href={`/${lang}#currency`}
              className="px-4 py-3 text-gray-700 hover:bg-gray-100 hover:text-primary font-medium rounded-lg transition-colors"
              onClick={closeMobileMenu}
            >
              {dict.common.currencyRates}
            </Link>

            <Link
              href={`/${lang}/crypto`}
              className="px-4 py-3 text-gray-700 hover:bg-gray-100 hover:text-primary font-medium rounded-lg transition-colors"
              onClick={closeMobileMenu}
            >
              {dict.common.crypto}
            </Link>

            {/* Credits Dropdown in Mobile */}
            <div>
              <button
                onClick={() => setShowMobileCredits(!showMobileCredits)}
                className="w-full flex items-center justify-between px-4 py-3 text-gray-700 hover:bg-gray-100 hover:text-primary font-medium rounded-lg transition-colors"
              >
                {dict.common.credits}
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${
                    showMobileCredits ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {showMobileCredits && (
                <div className="mt-1 ml-4 space-y-1 animate-slideDown">
                  {creditOptions.map((option, index) => (
                    <Link
                      key={index}
                      href={option.href}
                      className="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 hover:text-primary rounded-lg transition-colors"
                      onClick={closeMobileMenu}
                    >
                      <div className="font-medium">{option.label}</div>
                      <div className="text-xs text-gray-500">{option.description}</div>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link
              href={`/${lang}/cards`}
              className="px-4 py-3 text-gray-700 hover:bg-gray-100 hover:text-primary font-medium rounded-lg transition-colors"
              onClick={closeMobileMenu}
            >
              {dict.common.cards}
            </Link>

            <Link
              href={`/${lang}/calc/deposit`}
              className="px-4 py-3 text-gray-700 hover:bg-gray-100 hover:text-primary font-medium rounded-lg transition-colors"
              onClick={closeMobileMenu}
            >
              {dict.common.deposits}
            </Link>

            {/* Insurance Dropdown in Mobile */}
            <div>
              <button
                onClick={() => setShowMobileInsurance(!showMobileInsurance)}
                className="w-full flex items-center justify-between px-4 py-3 text-gray-700 hover:bg-gray-100 hover:text-primary font-medium rounded-lg transition-colors"
              >
                {dict.common.insurance}
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${
                    showMobileInsurance ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {showMobileInsurance && (
                <div className="mt-1 ml-4 space-y-1 animate-slideDown">
                  {insuranceOptions.map((option, index) => (
                    <Link
                      key={index}
                      href={option.href}
                      className="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 hover:text-primary rounded-lg transition-colors"
                      onClick={closeMobileMenu}
                    >
                      <div className="font-medium">{option.label}</div>
                      <div className="text-xs text-gray-500">{option.description}</div>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Mobile Phone Number */}
            <div className="pt-4 mt-4 border-t border-gray-200">
              <a
                href="tel:0800307555"
                className="flex items-center gap-2 px-4 py-3 text-primary hover:bg-gray-100 font-semibold rounded-lg transition-colors"
                onClick={closeMobileMenu}
              >
                <Phone className="w-5 h-5" />
                <span>0 800 307 555</span>
              </a>
            </div>
          </nav>
        </div>

        {/* Navigation */}
        <nav className="hidden lg:flex items-center gap-8 py-4">
          <Link href={`/${lang}`} className="text-gray-700 hover:text-primary font-medium transition-colors">
            {dict.common.home}
          </Link>
          <Link href={`/${lang}/news`} className="text-gray-700 hover:text-primary font-medium transition-colors">
            {dict.common.news}
          </Link>
          <Link href={`/${lang}#currency`} className="text-gray-700 hover:text-primary font-medium transition-colors">
            {dict.common.currencyRates}
          </Link>
          <Link href={`/${lang}/crypto`} className="text-gray-700 hover:text-primary font-medium transition-colors">
            {dict.common.crypto}
          </Link>

          {/* Credits Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setShowCreditsDropdown(true)}
            onMouseLeave={() => setShowCreditsDropdown(false)}
          >
            <button className="text-gray-700 hover:text-primary font-medium transition-colors flex items-center gap-1">
              {dict.common.credits}
              <ChevronDown className={`w-4 h-4 transition-transform ${showCreditsDropdown ? 'rotate-180' : ''}`} />
            </button>

            {showCreditsDropdown && (
              <div className="absolute top-full left-0 pt-2 w-72 bg-white rounded-xl shadow-2xl border border-gray-200 py-2 animate-fadeIn">
                {creditOptions.map((option, index) => (
                  <Link
                    key={index}
                    href={option.href}
                    className="block px-4 py-3 hover:bg-gray-50 transition-colors group"
                    onClick={() => setShowCreditsDropdown(false)}
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 group-hover:scale-125 transition-transform"></div>
                      <div className="flex-1">
                        <div className="font-semibold text-slate-900 group-hover:text-primary transition-colors">
                          {option.label}
                        </div>
                        <div className="text-xs text-gray-500 mt-0.5">
                          {option.description}
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link href={`/${lang}/cards`} className="text-gray-700 hover:text-primary font-medium transition-colors">
            {dict.common.cards}
          </Link>
          <Link href={`/${lang}/calc/deposit`} className="text-gray-700 hover:text-primary font-medium transition-colors">
            {dict.common.deposits}
          </Link>

          {/* Insurance Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setShowInsuranceDropdown(true)}
            onMouseLeave={() => setShowInsuranceDropdown(false)}
          >
            <button className="text-gray-700 hover:text-primary font-medium transition-colors flex items-center gap-1">
              {dict.common.insurance}
              <ChevronDown className={`w-4 h-4 transition-transform ${showInsuranceDropdown ? 'rotate-180' : ''}`} />
            </button>

            {showInsuranceDropdown && (
              <div className="absolute top-full left-0 pt-2 w-72 bg-white rounded-xl shadow-2xl border border-gray-200 py-2 animate-fadeIn">
                {insuranceOptions.map((option, index) => (
                  <Link
                    key={index}
                    href={option.href}
                    className="block px-4 py-3 hover:bg-gray-50 transition-colors group"
                    onClick={() => setShowInsuranceDropdown(false)}
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 group-hover:scale-125 transition-transform"></div>
                      <div className="flex-1">
                        <div className="font-semibold text-slate-900 group-hover:text-primary transition-colors">
                          {option.label}
                        </div>
                        <div className="text-xs text-gray-500 mt-0.5">
                          {option.description}
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </nav>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideDown {
          from {
            opacity: 0;
            max-height: 0;
          }
          to {
            opacity: 1;
            max-height: 500px;
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }

        .animate-slideDown {
          animation: slideDown 0.3s ease-out;
        }
      `}</style>
    </header>
  );
}

/*
 * KEY CHANGES FOR PATH-BASED ROUTING:
 *
 * 1. Added lang prop: HeaderProps with lang: Locale
 * 2. All links prefixed with /${lang}:
 *    - href={`/${lang}`}
 *    - href={`/${lang}/credits`}
 *    - href={`/${lang}/news`}
 * 3. Language switcher mode="path" with currentLang={lang}
 * 4. Uses getDictionary(lang) for translations
 * 5. Credit options use lang in hrefs
 */
