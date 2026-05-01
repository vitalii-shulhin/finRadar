/**
 * Card Detail Interface
 *
 * To add a unique article for a card:
 * 1. Add articleId field to the card (e.g., articleId: 'pumbCardArticle')
 * 2. Add article content to both i18n dictionaries:
 *    - src/i18n/dictionaries/uk.ts
 *    - src/i18n/dictionaries/ru.ts
 *
 * Article structure in dictionaries:
 * {
 *   intro: string;
 *   sections: Array<{
 *     title: string;
 *     content: string | string[];  // string for paragraphs, array for bullet lists
 *   }>;
 *   conclusion: string;
 * }
 */
export interface CardDetail {
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
  annualPercentageRate?: string;
  rating: number;
  reviews: number;
  features: string[];
  color: string;
  description: string;
  articleId?: string; // Reference to dictionary key for article content
  cardUrl?: string;
  cardUrlIOS?: string;
  cardUrlAndroid?: string;
  requirements: {
    age: string;
    documents: string[];
    employment: string;
    income?: string;
  };
  advantages: string[];
  conditions: {
    issuanceTime: string;
    cardValidity: string;
    currency: string[];
    paymentSystem: string;
    contactless: boolean;
  };
  fees: {
    issuance: string;
    annual: string;
    sms: string;
    replacement: string;
  };
  cashWithdrawal: {
    ownAtm: string;
    otherAtm: string;
    abroad: string;
  };
  warnings: string[];
  userReviews: {
    author: string;
    date: string;
    rating: number;
    text: string;
  }[];
}

export const CARDS_DETAIL_DATA: { [key: number]: CardDetail } = {
  1: {
    id: 1,
    bank: 'ПУМБ',
    bankLogo: '/logos/pumb.png',
    name: 'Premium Card',
    type: 'credit',
    variant: 'Platinum',
    articleId: 'pumbCardArticle',
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
    color: 'from-red-500 to-red-600',
    description: 'Преміальна кредитна картка від ПУМБ - це VIP рівень обслуговування з пільговим періодом 60 днів, кешбеком до 7% та ексклюзивними привілеями. Доступ до бізнес-залів аеропортів та консьєрж-сервіс 24/7.',
    cardUrl: 'https://rdr.fmcgsd.net/in/offer/1515?aid=91780&source=generalbankua&',
    requirements: {
      age: 'від 23 до 65 років',
      documents: ['Паспорт громадянина України', 'ІПН (ID-код)', 'Довідка про доходи'],
      employment: 'Офіційне працевлаштування обов\'язкове',
      income: 'Мінімальний дохід від 30 000 ₴/міс',
    },
    advantages: [
      'VIP обслуговування в усіх відділеннях банку',
      'Кешбек до 7% у мережі партнерів',
      'Безкоштовний доступ до бізнес-залів аеропортів',
      'Консьєрж-сервіс 24/7 українською та англійською',
      'Високий кредитний ліміт до 300 000 ₴',
      'Пріоритетне обслуговування та підтримка',
      'Спеціальні пропозиції від преміальних партнерів',
      'Безконтактні платежі та мобільний банкінг',
    ],
    conditions: {
      issuanceTime: '2-3 робочих дні',
      cardValidity: '3 роки',
      currency: ['UAH', 'USD', 'EUR'],
      paymentSystem: 'Visa',
      contactless: true,
    },
    fees: {
      issuance: '500 ₴',
      annual: '500 ₴',
      sms: '0 ₴',
      replacement: '200 ₴',
    },
    cashWithdrawal: {
      ownAtm: '0%',
      otherAtm: '1% + 10 ₴',
      abroad: '2% + 15 ₴',
    },
    warnings: [
      'Річне обслуговування 500 ₴ списується автоматично',
      'Для отримання картки потрібен високий рівень доходу',
      'Після пільгового періоду стандартна процентна ставка',
      'При несвоєчасній оплаті нараховуються штрафи та пеня',
    ],
    userReviews: [
      {
        author: 'Олександр П.',
        date: '2026-03-20',
        rating: 5,
        text: 'Чудова преміальна картка! Консьєрж-сервіс реально працює, доступ до бізнес-залів - велика перевага. Кешбек хороший. Вартує своїх грошей!',
      },
      {
        author: 'Тетяна М.',
        date: '2026-03-17',
        rating: 4,
        text: 'Гарна картка для тих, хто часто подорожує. VIP обслуговування на висоті. Єдине - річна плата, але за такі привілеї це виправдано.',
      },
    ],
  },
  2: {
    id: 2,
    bank: 'Alliance Bank',
    bankLogo: '/logos/Alliance_Bank.png',
    name: 'Startova',
    type: 'credit',
    variant: 'Virtual Card',
    articleId: 'allianceBankCardArticle',
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
    color: 'from-blue-500 to-blue-600',
    description: 'Кредитна картка Startova від Alliance Bank - інноваційна віртуальна картка з рекордним пільговим періодом 92 дні та кешбеком до 30% у партнерів. Базовий кешбек 1% на всі покупки та підвищений 3% на комунальні послуги.',
    cardUrl: 'https://rdr.salesdoubler.com.ua/in/offer/8331?aid=91780&source=generalbankua&',
    requirements: {
      age: 'від 21 до 60 років',
      documents: ['Паспорт громадянина України', 'ID-картка', 'ІПН'],
      employment: 'Офіційне працевлаштування',
      income: 'Підтвердження доходу обов\'язкове',
    },
    advantages: [
      'Рекордний пільговий період 92 дні без відсотків',
      'Кешбек до 30% у мережі партнерів',
      'Базовий кешбек 1% на всі покупки',
      'Підвищений кешбек 3% на комунальні послуги',
      'Безкоштовні безготівкові поповнення',
      'Безкоштовні перекази між банками України',
      'Віртуальна картка - миттєве отримання',
      'Можливість випуску пластикової картки',
    ],
    conditions: {
      issuanceTime: 'Миттєво (віртуальна)',
      cardValidity: '3 роки',
      currency: ['UAH', 'USD', 'EUR'],
      paymentSystem: 'Mastercard',
      contactless: true,
    },
    fees: {
      issuance: '0 ₴',
      annual: '0 ₴',
      sms: '0 ₴',
      replacement: '0 ₴',
    },
    cashWithdrawal: {
      ownAtm: '0%',
      otherAtm: '1.5% + 8 ₴',
      abroad: '2.5% + 12 ₴',
    },
    warnings: [
      'Після закінчення пільгового періоду ставка 36% річних',
      'Необхідне підтвердження офіційного працевлаштування та доходу',
      'Кешбек у партнерів має обмеження та умови',
      'Мінімальний платіж 5% від заборгованості',
    ],
    userReviews: [
      {
        author: 'Катерина Л.',
        date: '2026-03-19',
        rating: 5,
        text: '92 дні без відсотків - це просто фантастика! Кешбек 3% на комунальні теж дуже радує. Віртуальна картка прийшла миттєво.',
      },
      {
        author: 'Петро Г.',
        date: '2026-03-13',
        rating: 4,
        text: 'Хороша картка з довгим пільговим періодом. Кешбек у партнерів непоганий. Зручний мобільний додаток.',
      },
    ],
  },
  // Add remaining 6 cards with placeholder data
  3: {
    id: 3,
    bank: 'ЮНЕКС',
    bankLogo: '/logos/Юнекс.png',
    name: 'Smart',
    type: 'credit',
    variant: 'MasterCard World',
    articleId: 'unexBankCardArticle',
    creditLimit: 'до 100 000 ₴',
    gracePeriod: 62,

    cashback: '1.5%',
    annualFee: '0 ₴',
    interestRate: '42% річних',
    annualPercentageRate: '59.24%',
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
    description: 'Кредитна картка Smart від банку ЮНЕКС - сучасний фінансовий інструмент з пільговим періодом до 62 днів та кешбеком 1.5% на всі операції. Повністю безкоштовне обслуговування та швидке онлайн оформлення.',
    cardUrl: 'https://rdr.salesdoubler.com.ua/in/offer/5749?aid=91780&source=generalbankua&',
    requirements: {
      age: 'від 21 до 60 років',
      documents: ['Паспорт громадянина України', 'ІПН (ID-код)'],
      employment: 'Офіційне працевлаштування бажане',
      income: 'Підтвердження доходу може бути необхідне',
    },
    advantages: [
      'Пільговий період до 62 днів без відсотків',
      'Кешбек 1.5% на всі покупки без обмежень',
      'Повністю безкоштовне обслуговування',
      'Швидке онлайн оформлення за 10 хвилин',
      'Підтримка Google Pay та Apple Pay',
      'Кредитний ліміт до 100 000 ₴',
      'Зручний мобільний додаток',
      'Безконтактні платежі',
    ],
    conditions: {
      issuanceTime: '10 хвилин онлайн',
      cardValidity: '3 роки',
      currency: ['UAH', 'USD', 'EUR'],
      paymentSystem: 'Mastercard',
      contactless: true,
    },
    fees: {
      issuance: '0 ₴',
      annual: '0 ₴',
      sms: '0 ₴',
      replacement: '50 ₴',
    },
    cashWithdrawal: {
      ownAtm: '0%',
      otherAtm: '1.5% + 10 ₴',
      abroad: '3% + 15 ₴',
    },
    warnings: [
      'Після закінчення пільгового періоду нараховується 42% річних',
      'Реальна річна процентна ставка становить 59.24%',
      'Мінімальний платіж - 5% від суми боргу',
      'При несвоєчасній оплаті нараховується пеня',
    ],
    userReviews: [
      {
        author: 'Сергій Т.',
        date: '2026-03-15',
        rating: 4,
        text: 'Гарна картка для повсякденного використання. Оформлення швидке, кешбек повертається щомісяця. Єдине - ставка після пільгового періоду висока.',
      },
      {
        author: 'Олена В.',
        date: '2026-03-11',
        rating: 5,
        text: 'Дуже зручно! Оформила онлайн за 10 хвилин. Підтримка Apple Pay - це супер. Кешбек 1.5% на все - чудово.',
      },
    ],
  },
  4: {
    id: 4,
    bank: 'Ідея Банк (O.Bank)',
    bankLogo: '/logos/Ідея_Банк.png',
    name: 'Кредитна картка',
    type: 'credit',
    variant: 'Classic',
    articleId: 'ideaBankCardArticle',
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
      'Реферальна програма',
    ],
    color: 'from-green-500 to-green-600',
    description: 'Кредитна картка від Ідея Банк (O.Bank) - одна з найвигідніших пропозицій на ринку з пільговим періодом до 92 днів та 5% на залишок. Високий кредитний ліміт до 500 000 ₴ та безкоштовна конвертація валют.',
    cardUrl: 'https://rdr.fmcgsd.net/in/offer/3505?aid=91780&source=generalbankua&',
    requirements: {
      age: 'від 21 до 65 років',
      documents: ['Паспорт громадянина України', 'ID-картка', 'ІПН'],
      employment: 'Підтвердження зайнятості бажане',
      income: 'Може знадобитися підтвердження доходу',
    },
    advantages: [
      'Найдовший пільговий період - до 92 днів',
      '5% на залишок коштів на рахунку',
      'Безкоштовна конвертація валют (0% комісії)',
      'Високий кредитний ліміт до 500 000 ₴',
      'Повністю безкоштовне обслуговування',
      'Реферальна програма - до 50 000 ₴/міс',
      'Миттєві перекази між картками',
      'Безконтактні платежі',
    ],
    conditions: {
      issuanceTime: '15 хвилин онлайн',
      cardValidity: '3 роки',
      currency: ['UAH', 'USD', 'EUR'],
      paymentSystem: 'Mastercard',
      contactless: true,
    },
    fees: {
      issuance: '0 ₴',
      annual: '0 ₴',
      sms: '0 ₴',
      replacement: '0 ₴',
    },
    cashWithdrawal: {
      ownAtm: '0%',
      otherAtm: '1% + 5 ₴',
      abroad: '2% + 10 ₴',
    },
    warnings: [
      'Після закінчення пільгового періоду ставка 39.6% річних',
      '5% на залишок нараховується тільки при використанні картки',
      'Мінімальний платіж 5% від заборгованості',
      'Реферальна програма має обмеження та умови',
    ],
    userReviews: [
      {
        author: 'Максим К.',
        date: '2026-03-18',
        rating: 5,
        text: 'Найкраща картка! 92 дні пільгового періоду - це просто космос. Ще й 5% на залишок повертають. Дуже задоволений!',
      },
      {
        author: 'Наталія Б.',
        date: '2026-03-14',
        rating: 4,
        text: 'Хороша картка з високим лімітом. Конвертація валют без комісії - велика перевага. Обслуговування на рівні.',
      },
    ],
  },
  5: {
    id: 5,
    bank: 'IZI BANK',
    bankLogo: '/logos/izibank.png',
    name: 'izibank',
    type: 'credit',
    variant: 'MasterCard World',
    articleId: 'iziBankCardArticle',
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
    description: 'Кредитна картка izibank від IZI BANK - зручний фінансовий інструмент з пільговим періодом 62 дні та до 5% на залишок коштів. Швидке оформлення та безкоштовне обслуговування.',
    cardUrlIOS: 'https://rdr.sdpdl.com.ua/in/offer/2812?aid=91780&source=generalbankua&',
    cardUrlAndroid: 'https://rdr.sdpdl.com.ua/in/offer/2811?aid=91780&source=generalbankua&',
    requirements: {
      age: 'від 21 до 60 років',
      documents: ['Паспорт', 'ІПН'],
      employment: 'Офіційне працевлаштування',
      income: 'Підтвердження доходу',
    },
    advantages: [
      'Пільговий період 62 дні без відсотків',
      'До 5% річних на залишок коштів',
      'Безкоштовні SMS-сповіщення про всі операції',
      'Повністю безкоштовне обслуговування',
      'Підтримка Google Pay та Apple Pay',
      'Зручний мобільний додаток',
      'Швидке розгляд заявки',
    ],
    conditions: {
      issuanceTime: '1 робочий день',
      cardValidity: '3 роки',
      currency: ['UAH', 'USD', 'EUR'],
      paymentSystem: 'Mastercard',
      contactless: true,
    },
    fees: {
      issuance: '0 ₴',
      annual: '0 ₴',
      sms: '0 ₴',
      replacement: '50 ₴',
    },
    cashWithdrawal: {
      ownAtm: '0%',
      otherAtm: '2% + 10 ₴',
      abroad: '3% + 15 ₴',
    },
    warnings: [
      'Висока процентна ставка 59% після пільгового періоду',
      'Необхідне підтвердження офіційного працевлаштування',
      'Мінімальний кредитний ліміт 500 ₴',
      'При несвоєчасній оплаті нараховуються штрафи',
    ],
    userReviews: [
      {
        author: 'Ігор М.',
        date: '2026-03-16',
        rating: 4,
        text: 'Нормальна картка. 5% на залишок - це добре. Але ставка після пільгового періоду дуже висока, треба вчасно платити.',
      },
      {
        author: 'Вікторія С.',
        date: '2026-03-12',
        rating: 5,
        text: 'Швидко оформили, все безкоштовно. SMS приходять миттєво. Користуюся через Apple Pay - дуже зручно!',
      },
    ],
  },
};
