# 📄 Pages Overview

Complete list of all pages in FinRadar.

## 🏠 Main Pages

### 1. Homepage (`/`)
**Purpose**: Main landing page with all key information

**Sections:**
- Hero banner with CTAs
- Currency exchange rates (UAH)
- Financial news feed
- Market overview (stocks + crypto)
- Banking products cards
- Services block (8 tools)
- Featured banks (6 banks)

**Features:**
- Server-side rendering
- Real-time data from APIs
- 5-minute cache
- Fully responsive

**Documentation**: README.md, LAYOUT_GUIDE.md

---

### 2. Credit Calculator (`/calc/credit`)
**Purpose**: Calculate loan payments with amortization schedule

**Features:**
- Loan amount: 10K - 1M UAH
- Interest rate: 0-50%
- Term: 6-120 months
- 7 types of fees
- Annuity payment method
- Full payment schedule
- Real-time calculation

**Use For:**
- Personal loans
- Auto loans
- Consumer credit
- Refinancing analysis

**Documentation**: CALCULATOR_GUIDE.md

---

### 3. Deposit Calculator (`/calc/deposit`)
**Purpose**: Calculate savings growth with compound interest

**Features:**
- Multi-currency (UAH, USD, EUR)
- Amount: 1K - 1M
- Interest rate: 0-25%
- Term: 3-60 months
- 5 capitalization options
- Regular top-ups
- Partial withdrawals
- Inflation adjustment

**Use For:**
- Savings planning
- Bank comparison
- Goal setting
- Retirement planning

**Documentation**: DEPOSIT_CALCULATOR_GUIDE.md, DEPOSIT_CALCULATOR.md

---

### 4. Bank Cards (`/cards`)
**Purpose**: Browse and compare bank cards

**Features:**
- 8 Ukrainian bank cards
- Credit & debit categories
- Filter by type and bank
- Sort by various criteria
- Detailed specifications
- Ratings and reviews
- Order CTAs

**Use For:**
- Finding best card
- Comparing offers
- Checking cashback rates
- Reading reviews

**Documentation**: CARDS_PAGE_GUIDE.md

---

## 📊 Page Comparison

| Page | Type | Data Source | Interactive |
|------|------|-------------|-------------|
| **Homepage** | Dynamic | API (FMP, NBU) | No |
| **Credit Calc** | Static | Client-side | Yes |
| **Deposit Calc** | Static | Client-side | Yes |
| **Cards** | Static | Client-side | Yes (filters) |

## 🎨 Design Consistency

### Common Elements

**All pages include:**
- Header with navigation
- Breadcrumb navigation
- Back to home link
- Footer with links
- Responsive design
- Mobile optimization

### Color Themes

**Homepage**: Primary blue
**Credit Calculator**: Blue theme (debt)
**Deposit Calculator**: Green theme (growth)
**Cards**: Purple/Blue theme (comparison)

### Typography

**All pages use:**
- Noto Sans (body)
- Raleway (headings)
- Consistent sizing
- Clear hierarchy

## 🗺️ Site Structure

```
FinRadar
├── Home (/)
│   ├── Hero
│   ├── Currency Rates
│   ├── News + Market
│   ├── Services Block
│   │   ├── → Credit Calculator
│   │   ├── → Deposit Calculator
│   │   ├── → Cards Page
│   │   └── → Other tools (planned)
│   └── Featured Banks
│
├── Credit Calculator (/calc/credit)
│   ├── Input form
│   ├── Results sidebar
│   └── Payment schedule
│
├── Deposit Calculator (/calc/deposit)
│   ├── Input form
│   ├── Results sidebar
│   └── Period breakdown
│
└── Bank Cards (/cards)
    ├── Filters sidebar
    ├── Cards grid
    └── CTA section
```

## 🔗 Navigation Paths

### From Homepage

```
Homepage
  ├─→ Services Block → Credit Calculator
  ├─→ Services Block → Deposit Calculator
  ├─→ Services Block → Cards Page
  ├─→ Header Menu → Cards
  ├─→ Header Menu → Kредити (Calculator)
  └─→ Header Menu → Депозити (Calculator)
```

### From Calculators

```
Credit Calculator
  ├─→ Breadcrumb → Home
  ├─→ Back link → Home
  └─→ Header Menu → Other pages

Deposit Calculator
  ├─→ Breadcrumb → Home
  ├─→ Back link → Home
  └─→ Header Menu → Other pages
```

### From Cards

```
Cards Page
  ├─→ Breadcrumb → Home
  ├─→ Hero CTAs → Calculators
  ├─→ Header Menu → Other pages
  └─→ Bottom CTA → Consultation
```

## 📱 Mobile Experience

### Mobile-Optimized Pages

**All pages are fully responsive:**
- Stacked layouts
- Touch-friendly buttons
- Optimized font sizes
- Collapsible sections
- Mobile menus

### Mobile Performance

**Optimizations:**
- Lazy loading
- Code splitting
- Optimized images
- Minimal JavaScript
- Fast initial load

## 🎯 User Journeys

### Journey 1: Loan Seeker

```
Home → Services Block → Credit Calculator
  → Enter loan details
  → See monthly payment
  → Calculate affordability
  → Browse cards for credit
  → Apply for card
```

### Journey 2: Saver

```
Home → Services Block → Deposit Calculator
  → Enter savings amount
  → Compare capitalization
  → Calculate growth
  → Find best bank
  → Open deposit
```

### Journey 3: Card Shopper

```
Home → Header Menu → Cards
  → Filter by type
  → Sort by cashback
  → Compare offers
  → Read features
  → Order card
```

### Journey 4: Market Watcher

```
Home → News Section
  → Read articles
  → Check market data
  → View currency rates
  → External links
  → Return for updates
```

## 📊 Page Statistics

### Current Status

**Total Pages**: 4
- 1 Homepage
- 2 Calculators
- 1 Comparison page

**Total Routes**: 4
- `/`
- `/calc/credit`
- `/calc/deposit`
- `/cards`

**Total Components**: 13+
**Total Code**: 3,000+ lines
**Total Documentation**: 4,000+ lines

### Traffic Expectations

**Most visited** (predicted):
1. Homepage (landing)
2. Cards page (shopping)
3. Credit calculator (planning)
4. Deposit calculator (savings)

## 🔜 Planned Pages

### Phase 1 (v1.5)

**1. Loans Page** (`/loans`)
- Loan offers comparison
- Bank-by-bank breakdown
- Application forms
- Requirement checklist

**2. Deposits Page** (`/deposits`)
- Deposit offers catalog
- Rate comparison
- Term options
- Calculator integration

**3. Insurance Page** (`/insurance`)
- Insurance products
- Coverage comparison
- Price quotes
- Application process

### Phase 2 (v2.0)

**4. Banks Page** (`/banks`)
- Bank directory
- Ratings and reviews
- Branch locator
- Contact information

**5. News Page** (`/news`)
- Dedicated news page
- Categories and filters
- Search functionality
- Pagination

**6. About Page** (`/about`)
- About the platform
- Team information
- Contact form
- FAQ section

### Phase 3 (v2.5)

**7. User Dashboard** (`/dashboard`)
- User account
- Saved calculations
- Bookmarked cards
- Application tracking

**8. Comparison Tools** (`/compare`)
- Side-by-side comparison
- Multiple products
- Export results
- Share functionality

## 🎨 Design System

### Page Templates

**Template A: Landing Page**
- Used by: Homepage
- Layout: Multi-section
- Data: API-driven

**Template B: Calculator**
- Used by: Credit, Deposit calculators
- Layout: Form + Sidebar
- Data: Client-side

**Template C: Catalog**
- Used by: Cards page
- Layout: Filters + Grid
- Data: Static/API

**Template D: Detail Page** (planned)
- Will be used by: Card details, Bank details
- Layout: Hero + Tabs
- Data: Dynamic

## 📈 SEO Structure

### Current Pages

**Homepage:**
- Title: FinRadar - Фінансовий портал України
- Description: Актуальні новини, курси валют...
- Keywords: фінанси, новини, курс валют...

**Calculators:**
- Title: [Type] Калькулятор - FinRadar
- Description: Розрахунок [loan/deposit]...
- Keywords: калькулятор, кредит, депозит...

**Cards:**
- Title: Банківські картки України - FinRadar
- Description: Порівняння 8 карток...
- Keywords: картки, кредитна картка, дебетова...

### URL Structure

**Clean URLs:**
- `/` - Homepage
- `/calc/[type]` - Calculators
- `/cards` - Cards catalog
- `/cards/[id]` - Card details (planned)
- `/banks/[id]` - Bank details (planned)

## 💻 Technical Details

### Rendering Strategy

**Homepage**: Server-side (SSR + ISR)
**Calculators**: Client-side (CSR)
**Cards**: Client-side (CSR)
**Future pages**: Hybrid approach

### Data Flow

**Static pages** (Calculators, Cards):
```
User Input → State → Calculation → UI Update
```

**Dynamic pages** (Homepage):
```
Request → Server → API Fetch → Generate HTML → Send to Client
```

### Performance Metrics

**Target metrics:**
- First load: < 2s
- Time to interactive: < 3s
- Lighthouse score: > 90

**Current status:**
- Homepage: Good (API dependent)
- Calculators: Excellent (instant)
- Cards: Excellent (instant)

## 📚 Documentation

### Per-Page Docs

- Homepage: README.md, LAYOUT_GUIDE.md
- Credit Calc: CALCULATOR_GUIDE.md
- Deposit Calc: DEPOSIT_CALCULATOR_GUIDE.md, DEPOSIT_CALCULATOR.md
- Cards: CARDS_PAGE_GUIDE.md

### General Docs

- CHANGELOG.md - Version history
- FEATURES.md - All features
- CALCULATORS.md - Calculator overview
- PROJECT_STRUCTURE.md - Code structure
- DEPLOYMENT.md - Deployment guide

---

**Document Version**: 1.0
**Last Updated**: 2026-03-13
**Total Pages**: 4
**Status**: ✅ All Production Ready

🎉 **Growing platform with more pages coming!**
