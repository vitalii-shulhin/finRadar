# 📁 Project Structure

Complete overview of the FinRadar project structure.

## 🗂️ Root Directory

```
finRadar/
├── 📄 Configuration Files
│   ├── package.json              # Dependencies and scripts
│   ├── tsconfig.json             # TypeScript configuration
│   ├── next.config.js            # Next.js configuration
│   ├── tailwind.config.ts        # Tailwind CSS configuration
│   ├── postcss.config.js         # PostCSS configuration
│   ├── ecosystem.config.js       # PM2 process manager config
│   ├── .env                      # Environment variables (YOUR API KEYS)
│   ├── .env.example              # Environment template
│   └── .gitignore                # Git ignore rules
│
├── 📚 Documentation
│   ├── README.md                 # Main documentation
│   ├── QUICKSTART.md             # 5-minute setup guide
│   ├── DEPLOYMENT.md             # Complete EC2 deployment guide
│   └── PROJECT_STRUCTURE.md      # This file
│
├── 🚀 Deployment Files
│   ├── deploy.sh                 # Automated deployment script
│   └── nginx.conf                # Nginx reverse proxy config
│
└── 📂 src/                       # Source code
    ├── app/                      # Next.js App Router
    │   ├── layout.tsx            # Root layout with Header/Footer
    │   ├── page.tsx              # Homepage (main entry)
    │   └── globals.css           # Global styles
    │
    ├── components/               # React components
    │   ├── Header.tsx            # Navigation header
    │   ├── Footer.tsx            # Footer with links
    │   ├── HeroSection.tsx       # Hero banner
    │   ├── CurrencyRates.tsx     # UAH exchange rates table
    │   ├── NewsSection.tsx       # Financial news feed
    │   ├── MarketOverview.tsx    # Stock indices & crypto
    │   └── BankingProducts.tsx   # Banking services cards
    │
    └── lib/                      # Utilities and API clients
        ├── api.ts                # FMP API client functions
        └── uahRates.ts           # NBU API for UAH rates
```

## 🎯 Key Files Explained

### Configuration

**package.json**
- Dependencies: Next.js, React, TypeScript, Tailwind CSS
- Scripts: dev, build, start, PM2 commands
- All required packages for development and production

**ecosystem.config.js**
- PM2 configuration for production deployment
- Cluster mode with automatic scaling
- Memory limits and auto-restart
- Log file configuration

**next.config.js**
- Next.js optimization settings
- Image optimization
- Compression enabled
- Standalone output for deployment

**tailwind.config.ts**
- Custom color palette (primary blue: #33bbfb)
- Finance colors (green/red for up/down)
- Custom fonts (Noto Sans, Raleway)
- Responsive breakpoints

### Application Code

**src/app/layout.tsx**
- Root layout component
- Loads Google Fonts (Noto Sans, Raleway)
- Wraps all pages with Header and Footer
- SEO metadata configuration

**src/app/page.tsx**
- Homepage with all main sections
- Server-side rendering with 5-minute cache
- Assembles: Hero, Currency, News, Market, Banking sections

**src/app/globals.css**
- Tailwind directives
- Custom component classes (card, btn-primary, etc.)
- Base styles for typography

### Components

**Header.tsx**
- Sticky navigation bar
- Logo and phone contact
- Main menu (Ukrainian language)
- Responsive mobile menu

**Footer.tsx**
- Four-column footer layout
- Social media links (Telegram, Facebook, YouTube)
- Navigation links
- Contact information
- Copyright notice

**HeroSection.tsx**
- Gradient background banner
- Call-to-action buttons
- Responsive text sizing

**CurrencyRates.tsx**
- Server component (async)
- Fetches UAH exchange rates from NBU
- Table with Buy/Sell/Official rates
- Color-coded change indicators
- Currency flags

**NewsSection.tsx**
- Server component (async)
- Fetches financial news from FMP API
- News cards with images
- Formatted dates and sources
- External links to full articles
- Load more functionality

**MarketOverview.tsx**
- Server component (async)
- Two sections: Stock Indices & Crypto
- Real-time price data
- Percentage change indicators
- Color-coded up/down arrows

**BankingProducts.tsx**
- Static component
- Four product categories with icons
- Cards, Loans, Deposits, Insurance
- Call-to-action section
- Gradient promotional banner

### Libraries

**lib/api.ts**
- Financial Modeling Prep API client
- Axios instance with base URL
- TypeScript interfaces for data types
- Functions:
  - `getForexRates()` - Currency pairs
  - `getMarketIndices()` - S&P 500, Dow, NASDAQ
  - `getCryptoPrices()` - Top cryptocurrencies
  - `getGeneralNews()` - Financial news
  - `formatCurrency()` - Currency formatter
  - `formatPercentage()` - Percentage formatter

**lib/uahRates.ts**
- National Bank of Ukraine API client
- No API key required (free)
- Functions:
  - `getNBURates()` - All official rates
  - `getUAHExchangeRates()` - USD, EUR, GBP, PLN
  - `formatUAH()` - UAH currency formatter
- Simulates cash market rates (3% spread)

## 🔧 How It All Works

### Data Flow

```
1. User visits homepage
   ↓
2. Next.js renders page.tsx (server-side)
   ↓
3. Server components fetch data in parallel:
   - CurrencyRates → NBU API (UAH rates)
   - NewsSection → FMP API (news)
   - MarketOverview → FMP API (stocks & crypto)
   ↓
4. HTML generated with data
   ↓
5. Sent to browser (fully rendered)
   ↓
6. React hydrates for interactivity
   ↓
7. Cache for 5 minutes (revalidate: 300)
```

### Caching Strategy

- **Revalidation**: Every 5 minutes (300 seconds)
- **Static Generation**: Pages pre-rendered at build time
- **ISR**: Incremental Static Regeneration updates cache
- **API Limits**: Respects free tier limits (250 req/day FMP)

### Styling System

```
Tailwind CSS
  ↓
Custom Theme (tailwind.config.ts)
  ↓
Custom Components (globals.css)
  ↓
Component Classes
```

**Custom Classes:**
- `.container-custom` - Centered container with padding
- `.card` - White card with shadow
- `.btn-primary` - Primary blue button
- `.btn-secondary` - Secondary gray button

## 🎨 Design System

### Colors

```css
Primary: #33bbfb (Blue)
Primary Dark: #2196d8
Primary Light: #5fcbff

Finance Green: #10b981 (Positive changes)
Finance Red: #ef4444 (Negative changes)
Finance Dark: #1a202c (Dark backgrounds)
```

### Typography

- **Headings**: Raleway (400, 500, 600, 700)
- **Body**: Noto Sans (400, 500, 600, 700)
- **Support**: Latin + Cyrillic character sets

### Icons

- **Library**: Lucide React
- **Usage**:
  - TrendingUp/Down for market changes
  - Currency symbols with flags
  - Navigation icons
  - Feature icons

## 📊 API Integration

### National Bank of Ukraine (NBU)

**Endpoint**: `https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange`

**Features:**
- ✅ Free, no API key required
- ✅ Official exchange rates
- ✅ Updated daily
- ✅ JSON format
- ✅ All world currencies

**Used for:**
- UAH exchange rates (USD, EUR, GBP, PLN)
- Official central bank rates

### Financial Modeling Prep (FMP)

**Endpoint**: `https://financialmodelingprep.com/api/v3`

**Free Tier:**
- ✅ 250 requests/day
- ✅ Real-time data (15-min delay)
- ✅ News articles
- ✅ Stock quotes
- ✅ Crypto prices

**Used for:**
- Financial news feed
- Stock market indices
- Cryptocurrency prices
- Forex rates (global)

## 🚀 Deployment Targets

### Local Development
```bash
npm run dev
# Port: 3000
# Hot reload enabled
```

### Production Build
```bash
npm run build
npm start
# Optimized bundle
# Port: 3000
```

### EC2 with PM2
```bash
pm2 start ecosystem.config.js
# Cluster mode
# Auto-restart
# Load balancing
```

### Nginx Reverse Proxy
```
Port 80/443 → Nginx → Port 3000 (Next.js)
# SSL termination
# Static caching
# Gzip compression
```

## 📦 Dependencies

### Core
- `next@^14.2.0` - React framework
- `react@^18.3.0` - UI library
- `react-dom@^18.3.0` - React DOM renderer
- `typescript@^5` - Type safety

### Styling
- `tailwindcss@^3.4.3` - Utility CSS
- `autoprefixer@^10.4.19` - CSS prefixes
- `postcss@^8.4.38` - CSS processing

### Utilities
- `axios@^1.6.8` - HTTP client
- `date-fns@^3.6.0` - Date formatting
- `lucide-react@^0.376.0` - Icons

### Development
- `@types/node` - Node.js types
- `@types/react` - React types
- `eslint` - Code linting
- `eslint-config-next` - Next.js ESLint

## 🔐 Environment Variables

**Required:**
```env
FMP_API_KEY=your_key_here
```

**Optional:**
```env
NEWSAPI_KEY=your_key_here
NEXT_PUBLIC_APP_NAME=FinRadar
NEXT_PUBLIC_APP_URL=https://your-domain.com
```

## 📝 Scripts

```json
"dev": "next dev"                    // Development server
"build": "next build"                // Production build
"start": "next start -p 3000"        // Production server
"lint": "next lint"                  // Run ESLint
"pm2:start": "pm2 start ..."         // Start with PM2
"pm2:stop": "pm2 stop finradar"        // Stop PM2 process
"pm2:restart": "pm2 restart finradar"  // Restart PM2
"pm2:delete": "pm2 delete finradar"    // Remove from PM2
```

## 🎯 Next Steps for Customization

### 1. Add More Features
- User authentication
- Portfolio tracking
- Price alerts
- Interactive charts

### 2. Customize Design
- Change colors in `tailwind.config.ts`
- Add your logo to `Header.tsx`
- Modify layout in `page.tsx`

### 3. Add More Data
- More currency pairs
- Commodity prices
- Bond rates
- Economic indicators

### 4. Localization
- Add i18n support
- Multiple languages
- Regional data

### 5. Performance
- Add Redis caching
- CDN integration
- Image optimization
- Code splitting

---

**Project created successfully!** 🎉

Start with: `npm install && npm run dev`
