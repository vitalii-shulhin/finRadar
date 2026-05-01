# 🚀 Quick Start Guide

Get your FinRadar up and running in 5 minutes!

## 1️⃣ Install Dependencies

```bash
npm install
```

## 2️⃣ Get Free API Key

Visit [Financial Modeling Prep](https://site.financialmodelingprep.com/developer/docs) and sign up for a free account.

**Free Tier Includes:**
- ✅ 250 API requests per day
- ✅ Real-time market data
- ✅ Financial news
- ✅ Forex and crypto prices
- ✅ No credit card required

## 3️⃣ Configure API Key

Edit the `.env` file in the root directory:

```env
FMP_API_KEY=your_api_key_here
```

## 4️⃣ Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## ✅ That's It!

You should now see:
- 💱 UAH currency exchange rates
- 📰 Latest financial news
- 📊 Stock market indices
- ₿ Cryptocurrency prices
- 🏦 Banking products

## 🎨 Features You'll See

### Currency Rates
- Real-time UAH exchange rates from National Bank of Ukraine
- USD, EUR, GBP, PLN pairs
- Buy, Sell, and Official NBU rates
- Daily change indicators

### Financial News
- Latest global financial news
- Articles from major financial sources
- Direct links to full stories
- Timestamps and source attribution

### Market Overview
- Major stock indices (S&P 500, Dow Jones, NASDAQ)
- Top cryptocurrencies with live prices
- Real-time price changes

### Banking Products
- Loans and credit information
- Banking cards
- Deposits
- Insurance products

## 📝 Next Steps

### For Development
- Customize colors in `tailwind.config.ts`
- Edit components in `src/components/`
- Add more features in `src/app/page.tsx`

### For Production
```bash
npm run build
npm start
```

### For EC2 Deployment
See [DEPLOYMENT.md](DEPLOYMENT.md) for complete deployment guide.

## 🐛 Troubleshooting

### "News not available"
- Check that your `FMP_API_KEY` is set in `.env`
- Verify your API key is valid at [FMP Dashboard](https://site.financialmodelingprep.com/developer/docs)
- Check you haven't exceeded daily limit (250 requests/day)

### Port 3000 already in use
```bash
# Find and kill the process
lsof -i :3000
kill -9 <PID>

# Or use a different port
npm run dev -- -p 3001
```

### Build errors
```bash
# Clear cache and reinstall
rm -rf .next node_modules
npm install
npm run dev
```

## 🎯 What to Build Next?

Ideas for extending your FinRadar:

1. **User Accounts** - Add authentication with NextAuth.js
2. **Favorites** - Let users save favorite currencies or stocks
3. **Alerts** - Email/SMS notifications for price changes
4. **Portfolio Tracker** - Track investment performance
5. **Charts** - Add interactive charts with Chart.js or Recharts
6. **More News Sources** - Integrate NewsAPI.org
7. **Mobile App** - Convert to React Native
8. **Dark Mode** - Add theme switcher
9. **Ukrainian Banks** - Add local bank information
10. **Calculator Tools** - Loan calculators, currency converters

## 📚 Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Financial Modeling Prep API](https://site.financialmodelingprep.com/developer/docs)
- [National Bank of Ukraine API](https://bank.gov.ua/ua/open-data/api-dev)

## 💡 Tips

1. **API Rate Limits**: The free tier has 250 requests/day. The app caches data for 5 minutes (see `revalidate` in `page.tsx`)
2. **Performance**: Built-in caching reduces API calls and improves load times
3. **SEO**: Next.js App Router provides excellent SEO out of the box
4. **Deployment**: Deploy to Vercel with one click, or use PM2 on EC2 for full control

## 🤝 Need Help?

- 📖 Check [README.md](README.md) for detailed documentation
- 🚀 See [DEPLOYMENT.md](DEPLOYMENT.md) for production deployment
- 🐛 Check application logs: `npm run dev` output
- 💬 Open an issue on GitHub

---

Happy coding! 🎉 Built with ❤️ in Ukraine
