import { CreditCard, PiggyBank, Shield, Percent } from 'lucide-react';
import { type Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n/dictionaries';

interface BankingProductsProps {
  lang: Locale;
}

export default function BankingProducts({ lang }: BankingProductsProps) {
  const dict = getDictionary(lang);
  const products = [
    {
      icon: CreditCard,
      title: dict.home.bankingProducts.items.cards.title,
      description: dict.home.bankingProducts.items.cards.description,
      link: '#cards',
      color: 'text-blue-600',
      bg: 'bg-blue-50',
    },
    {
      icon: Percent,
      title: dict.home.bankingProducts.items.loans.title,
      description: dict.home.bankingProducts.items.loans.description,
      link: '#loans',
      color: 'text-green-600',
      bg: 'bg-green-50',
    },
    {
      icon: PiggyBank,
      title: dict.home.bankingProducts.items.deposits.title,
      description: dict.home.bankingProducts.items.deposits.description,
      link: '#deposits',
      color: 'text-purple-600',
      bg: 'bg-purple-50',
    },
    {
      icon: Shield,
      title: dict.home.bankingProducts.items.insurance.title,
      description: dict.home.bankingProducts.items.insurance.description,
      link: '#insurance',
      color: 'text-orange-600',
      bg: 'bg-orange-50',
    },
  ];

  return (
    <div className="card p-6">
      <h3 className="text-xl font-bold font-heading mb-4">{dict.home.bankingProducts.title}</h3>

      <div className="space-y-3">
        {products.map((product, index) => {
          const Icon = product.icon;
          return (
            <a
              key={index}
              href={product.link}
              className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-all hover:shadow-md group"
            >
              <div className={`${product.bg} p-3 rounded-lg group-hover:scale-110 transition-transform`}>
                <Icon className={`w-6 h-6 ${product.color}`} />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900 mb-1 group-hover:text-primary transition-colors">
                  {product.title}
                </h4>
                <p className="text-sm text-gray-600">{product.description}</p>
              </div>
            </a>
          );
        })}
      </div>

      <div className="mt-6 p-4 bg-gradient-to-r from-primary to-primary-dark rounded-lg text-white">
        <h4 className="font-semibold mb-2">{dict.home.bankingProducts.consultation.title}</h4>
        <p className="text-sm text-blue-100 mb-3">
          {dict.home.bankingProducts.consultation.description}
        </p>
        <button className="btn-primary bg-white text-primary hover:bg-gray-100 w-full">
          {dict.home.bankingProducts.consultation.button}
        </button>
      </div>
    </div>
  );
}
