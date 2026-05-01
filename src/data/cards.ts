export interface BankCard {
  id: number;
  bank: string;
  bankLogo: string;
  name: string;
  type: 'credit' | 'debit';
  variant: string;
  creditLimit?: string;
  gracePeriod?: number;
  cashback?: string;
  annualFee?: string;
  interestRate?: string;
  rating: number;
  reviews: number;
  features: string[];
  popular?: boolean;
  recommended?: boolean;
  highApproval?: boolean;
  approvalRate?: string;
  color: string;
  position?: number;
  cardUrl?: string;
  cardUrlIOS?: string;
  cardUrlAndroid?: string;
}

// All available cards
export const CARDS_DATA: BankCard[] = [
  {
    id: 1,
    bank: 'ПУМБ',
    bankLogo: '/logos/pumb.png',
    name: 'Premium Card',
    type: 'credit',
    variant: 'Platinum',
    creditLimit: 'до 300 000 ₴',
    gracePeriod: 60,
    cashback: 'до 7%',
    annualFee: '500 ₴',
    interestRate: '0.1% (під час пільгового періоду)',
    rating: 4.5,
    reviews: 678,
    features: [
      '60 днів без відсотків',
      'Кешбек до 7%',
      'VIP обслуговування',
      'Консьєрж-сервіс',
      'Доступ до бізнес-залів',
    ],
    recommended: true,
    popular: true,
    highApproval: true,
    approvalRate: '88%',
    color: 'from-red-500 to-red-600',
    position: 2,
    cardUrl: 'https://rdr.fmcgsd.net/in/offer/1515?aid=91780&source=generalbankua&',
  },
  {
    id: 2,
    bank: 'Alliance Bank',
    bankLogo: '/logos/Alliance_Bank.png',
    name: 'Startova',
    type: 'credit',
    variant: 'Virtual Card',
    creditLimit: 'до 300 000 ₴',
    gracePeriod: 92,
    cashback: 'до 30%',
    annualFee: '0 ₴',
    interestRate: '36% річних',
    rating: 4.6,
    reviews: 543,
    features: [
      'До 92 днів без відсотків',
      'Кешбек до 30%',
      'Безкоштовні безготівкові поповнення',
      'Безкоштовні перекази між банками України',
      '1% базовий кешбек (3% на комунальні)',
    ],
    recommended: true,
    color: 'from-blue-500 to-blue-600',
    cardUrl: 'https://rdr.salesdoubler.com.ua/in/offer/8331?aid=91780&source=generalbankua&',
  },
  {
    id: 3,
    bank: 'ЮНЕКС',
    bankLogo: '/logos/Юнекс.png',
    name: 'Smart',
    type: 'credit',
    variant: 'MasterCard World',
    creditLimit: 'до 100 000 ₴',
    gracePeriod: 62,
    cashback: '1.5%',
    annualFee: '0 ₴',
    interestRate: '42% річних (59.24% реальна річна ставка)',
    rating: 4.3,
    reviews: 412,
    features: [
      'До 62 днів без відсотків',
      'Кешбек 1.5% на всі операції',
      'Безкоштовне обслуговування',
      'Онлайн заявка за 10 хвилин',
      'Google Pay, Apple Pay',
    ],
    color: 'from-purple-500 to-purple-600',
    cardUrl: 'https://rdr.salesdoubler.com.ua/in/offer/5749?aid=91780&source=generalbankua&',
  },
  {
    id: 4,
    bank: 'Ідея Банк (O.Bank)',
    bankLogo: '/logos/Ідея_Банк.png',
    name: 'Кредитна картка',
    type: 'credit',
    variant: 'Classic',
    creditLimit: 'до 500 000 ₴',
    gracePeriod: 92,
    cashback: '5%',
    annualFee: '0 ₴',
    interestRate: '39.6% річних',
    rating: 4.7,
    reviews: 867,
    features: [
      'До 92 днів пільговий період',
      '5% повернення на залишки рахунку',
      '0% комісії за обмін валют',
      'Безкоштовне оформлення та обслуговування',
      'Реферальна програма до 50 000 ₴/міс',
    ],
    popular: true,
    color: 'from-green-500 to-green-600',
    cardUrl: 'https://rdr.fmcgsd.net/in/offer/3505?aid=91780&source=generalbankua&',
  },
  {
    id: 5,
    bank: '  BANK',
    bankLogo: '/logos/izibank.png',
    name: 'izibank',
    type: 'credit',
    variant: 'MasterCard World',
    creditLimit: 'від 500 до 200 000 ₴',
    gracePeriod: 62,
    cashback: '5%',
    annualFee: '0 ₴',
    interestRate: '59% річних',
    rating: 4.4,
    reviews: 329,
    features: [
      'До 62 днів без відсотків',
      'До 5% на залишок рахунку',
      'Безкоштовні SMS-сповіщення',
      'Безкоштовне обслуговування',
      'Google Pay, Apple Pay',
    ],
    color: 'from-orange-500 to-orange-600',
    cardUrlIOS: 'https://rdr.sdpdl.com.ua/in/offer/2812?aid=91780&source=generalbankua&',
    cardUrlAndroid: 'https://rdr.sdpdl.com.ua/in/offer/2811?aid=91780&source=generalbankua&',
  },
];

// Credit cards for main credit cards page
export const CREDIT_CARDS_DATA = CARDS_DATA;

// Credit cards with high approval rate (no refusal)
export const CREDIT_CARDS_NO_REFUSAL = CARDS_DATA.filter(card =>
  card.highApproval === true
);

// Top rated credit cards (with position ranking)
export const CREDIT_CARDS_RATING = CARDS_DATA.filter(card =>
  card.position !== undefined
).sort((a, b) => (a.position || 0) - (b.position || 0));
