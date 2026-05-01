# 💎 Cryptocurrency Page Guide

Complete guide for the cryptocurrency page with real-time data.

## 📍 Location

**URL**: `/crypto`

**Access from:**
- Header navigation → "Криптовалюти"
- Homepage services block → "Криптовалюти" card
- Direct URL

## 🎯 Features

### Real-time Data
- **API**: CoinGecko API (free, no key required)
- **Update frequency**: Every 60 seconds auto-refresh
- **Data points**: 100 cryptocurrencies
- **Manual refresh**: Button with loading indicator

### Display Features

**1. Hero Section**
- Page title and description
- Last update timestamp
- Gradient background (purple to blue)

**2. Search & Filtering**
- Real-time search by name or symbol
- Results update instantly
- Clear search indicator

**3. Sorting Options**
- Sort by Name (A-Z, Z-A)
- Sort by Price (High-Low, Low-High)
- Sort by 24h Change (High-Low, Low-High)
- Sort by Market Cap (High-Low, Low-High)
- Click column header to toggle

**4. Cryptocurrency Table**
- Rank number
- Favorite star (toggle)
- Crypto logo image
- Name and symbol
- Current price (formatted)
- 24h change (color-coded)
- Market capitalization
- Buy button

**5. Pagination**
- 20 items per page
- Page navigation buttons
- Results counter
- Smart page number display

**6. Info Cards**
- Educational information
- Investment warnings
- Security tips

## 🎨 Visual Design

### Color Scheme
- **Positive change**: Green (#10b981)
- **Negative change**: Red (#ef4444)
- **Hero gradient**: Purple to Blue
- **Accent**: Amber for Bitcoin/Crypto

### Table Layout
```
┌────┬─────────────────────┬──────────────┬──────────┬──────────────┬────────┐
│ #  │ Криптовалюта        │ Ціна         │ 24г Зміна│ Капіталізація│ Дії    │
├────┼─────────────────────┼──────────────┼──────────┼──────────────┼────────┤
│ 1  │ ⭐ 🟠 Bitcoin BTC   │ $71,234.56   │ 🟢 +2.5% │ $1.4T        │ Купити │
│ 2  │ ☆ ⚪ Ethereum ETH  │ $3,456.78    │ 🔴 -1.2% │ $415B        │ Купити │
└────┴─────────────────────┴──────────────┴──────────┴──────────────┴────────┘
```

### Responsive Behavior
- **Desktop**: Full table with all columns
- **Tablet**: Scrollable table
- **Mobile**: Horizontal scroll with touch

## 📊 Data Structure

### Cryptocurrency Interface
```typescript
interface CryptoData {
  id: string;                         // 'bitcoin'
  symbol: string;                     // 'btc'
  name: string;                       // 'Bitcoin'
  image: string;                      // Logo URL
  current_price: number;              // 71234.56
  price_change_percentage_24h: number;// 2.45
  market_cap: number;                 // 1400000000000
  total_volume: number;               // 45000000000
  high_24h: number;                   // 72000
  low_24h: number;                    // 70000
  circulating_supply: number;         // 19500000
}
```

## 🔍 Features Breakdown

### Search Function
- Filter by name (case-insensitive)
- Filter by symbol (case-insensitive)
- Instant results
- No server requests
- Resets to page 1

### Sorting Logic
- Ascending/Descending toggle
- Maintains current filter
- Multiple sort columns
- Visual indicator (arrow icon)

### Favorites System
- Client-side storage (state)
- Yellow star when favorited
- Gray star when not favorited
- Toggle on/off
- Can be saved to localStorage (future)

### Number Formatting

**Price Display:**
- >= $1: `$71,234.56` (2 decimals)
- < $1: `$0.001234` (6 decimals)

**Market Cap:**
- Trillion: `$1.45T`
- Billion: `$415.23B`
- Million: `$123.45M`
- Thousand: `$12.34K`

**Percentage:**
- Always 2 decimals: `2.45%`
- Color: green (positive), red (negative)
- Icon: ↗ (up), ↘ (down)

## 🔄 Auto-refresh

### Implementation
```typescript
useEffect(() => {
  fetchCryptoData();
  const interval = setInterval(fetchCryptoData, 60000); // 60s
  return () => clearInterval(interval);
}, []);
```

### Behavior
- Fetches on mount
- Refreshes every 60 seconds
- Maintains current state (search, sort, page)
- Updates timestamp
- Shows loading indicator

## 🚀 Performance

### Optimizations
- Client-side rendering
- No API key required
- Free tier: 50 calls/minute
- Pagination (20 items)
- Efficient filtering/sorting
- Image lazy loading

### Loading States
- Initial: Spinner with message
- Refresh: Button spinner icon
- Error: Red alert box

## 🎯 User Journeys

### Journey 1: Check Bitcoin Price
```
Homepage → Click "Криптовалюти"
  → See Bitcoin at #1
  → Check price and change
  → Click "Купити" (external)
```

### Journey 2: Find Specific Crypto
```
/crypto page → Type in search
  → See filtered results
  → Click favorite star
  → View details
```

### Journey 3: Compare Top Cryptos
```
/crypto page → Sort by Market Cap
  → View top 10
  → Compare changes
  → Track favorites
```

## 🔗 API Integration

### CoinGecko API

**Endpoint:**
```
https://api.coingecko.com/api/v3/coins/markets
```

**Parameters:**
- `vs_currency=usd` - Prices in USD
- `order=market_cap_desc` - Sort by market cap
- `per_page=100` - Get 100 coins
- `page=1` - First page
- `sparkline=false` - No chart data

**Rate Limits:**
- Free tier: 50 calls/minute
- No API key required
- Global rate limit

**Response:**
```json
[
  {
    "id": "bitcoin",
    "symbol": "btc",
    "name": "Bitcoin",
    "image": "https://...",
    "current_price": 71234.56,
    "price_change_percentage_24h": 2.45,
    "market_cap": 1400000000000,
    ...
  }
]
```

## 🛠️ Customization

### Change Update Interval
```typescript
// In useEffect, change 60000 to desired milliseconds
const interval = setInterval(fetchCryptoData, 30000); // 30s
```

### Change Items Per Page
```typescript
const itemsPerPage = 50; // Default: 20
```

### Add More Data Columns
```typescript
// In table, add new column:
<th>Об'єм 24г</th>
// In row:
<td>{formatNumber(crypto.total_volume)}</td>
```

### Change Default Sort
```typescript
const [sortBy, setSortBy] = useState<...>('price'); // Default: market_cap
```

## 🎨 Styling Guide

### Color Classes
- **Hero**: `bg-gradient-to-r from-purple-600 to-blue-600`
- **Positive**: `text-green-600`
- **Negative**: `text-red-600`
- **Favorite**: `text-yellow-500 fill-yellow-500`
- **Card**: `bg-white rounded-lg shadow-md`

### Icon Sizes
- Table icons: `w-4 h-4` or `w-5 h-5`
- Crypto logos: `w-8 h-8`
- Loading spinner: `w-12 h-12`

## 📱 Mobile Optimizations

### Touch Interactions
- Tap to sort columns
- Swipe to scroll table
- Tap star to favorite
- Pull to refresh (future)

### Layout Adjustments
- Horizontal scroll for table
- Stack info cards
- Full-width search
- Larger touch targets

## 🔜 Future Enhancements

### Phase 1 (v1.6)
- [ ] Individual crypto detail pages
- [ ] Price charts (7d, 30d, 1y)
- [ ] Price alerts
- [ ] Portfolio tracker
- [ ] LocalStorage for favorites

### Phase 2 (v2.0)
- [ ] Price change notifications
- [ ] Watchlist management
- [ ] Advanced filtering
- [ ] Historical data view
- [ ] Exchange integration
- [ ] Wallet connections

### Phase 3 (v2.5)
- [ ] Trading functionality
- [ ] DeFi integration
- [ ] NFT marketplace
- [ ] Staking calculator
- [ ] Tax reporting

## 🐛 Troubleshooting

### No Data Loading
- Check internet connection
- Verify CoinGecko API status
- Check browser console for errors
- Try manual refresh button

### Images Not Showing
- CoinGecko provides image URLs
- Check CORS policy
- Verify image URLs in network tab

### Slow Loading
- API rate limit reached (wait 1 minute)
- Network congestion
- Too many requests
- Use pagination

## 📊 Analytics Opportunities

Track:
- Most viewed cryptocurrencies
- Most favorited coins
- Search queries
- Sort preferences
- Page views per crypto
- Buy button clicks

## 💡 Educational Content

### Info Cards

**Card 1: What is Crypto?**
- Basic definition
- Technology explanation
- Use cases

**Card 2: How to Buy**
- Exchange selection
- Wallet setup
- Security tips

**Card 3: Investment Risks**
- Volatility warning
- Risk management
- Diversification advice

## 🔒 Security

### Best Practices
- No API keys exposed
- No user data stored
- External links clearly marked
- Educational warnings included
- No financial advice given

## 📞 Support

### Common Questions

**Q: Prices seem outdated?**
A: Click "Оновити" or wait for auto-refresh (60s)

**Q: Can I buy crypto here?**
A: "Купити" buttons link to external exchanges

**Q: Are favorites saved?**
A: Currently session only (localStorage coming soon)

**Q: How often do prices update?**
A: Every 60 seconds automatically

**Q: Which API is used?**
A: CoinGecko free API (no key required)

---

**Page Version**: 1.0
**Last Updated**: 2026-03-13
**Status**: ✅ Production Ready
**API**: CoinGecko (Free)

💎 **Real-time crypto tracking!** 💎
