import Link from 'next/link';
import { Facebook, Youtube, Send } from 'lucide-react';
import Logo from './Logo';
import { type Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n/dictionaries';

interface FooterProps {
  lang: Locale;
}

export default function Footer({ lang }: FooterProps) {
  const dict = getDictionary(lang);
  return (
    <footer className="bg-finance-dark text-white mt-16">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <Logo className="text-2xl mb-4" />
            <p className="text-gray-300 text-sm mb-4">
              {dict.footer.description}
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors"
              >
                <Send className="w-6 h-6" />
              </a>
              <a
                href="#"
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors"
              >
                <Facebook className="w-6 h-6" />
              </a>
              <a
                href="#"
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors"
              >
                <Youtube className="w-6 h-6" />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-semibold mb-4">{dict.footer.navigation}</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <Link href="#news" className="hover:text-primary transition-colors">
                  {dict.footer.nav.news}
                </Link>
              </li>
              <li>
                <Link href="#currency" className="hover:text-primary transition-colors">
                  {dict.footer.nav.currencyRates}
                </Link>
              </li>
              <li>
                <Link href={`${lang}/credits/all`} className="hover:text-primary transition-colors">
                  {dict.footer.nav.credits}
                </Link>
              </li>
              <li>
                <Link href={`${lang}/calc/deposit`} className="hover:text-primary transition-colors">
                  {dict.footer.nav.deposits}
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold mb-4">{dict.footer.services}</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <Link href={`${lang}/cards`} className="hover:text-primary transition-colors">
                  {dict.footer.servicesLinks.cards}
                </Link>
              </li>
              <li>
                <Link href={`${lang}/insurance`} className="hover:text-primary transition-colors">
                  {dict.footer.servicesLinks.insurance}
                </Link>
              </li>
              <li>
                <Link href={`${lang}/cards`} className="hover:text-primary transition-colors">
                  {dict.footer.servicesLinks.banks}
                </Link>
              </li>
              <li>
                <Link href={`${lang}/crypto`} className="hover:text-primary transition-colors">
                  {dict.footer.servicesLinks.crypto}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">{dict.footer.contact}</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>{dict.footer.email}: finradar24@gmail.com</li>
              {/*<li>{dict.footer.phone}: 0 800 307 555</li>*/}
              {/*<li>{dict.footer.freeInUkraine}</li>*/}
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} FinRadar. {dict.footer.allRightsReserved}.</p>
          <p className="mt-2">
            {dict.footer.disclaimer}
          </p>
        </div>
      </div>
    </footer>
  );
}
