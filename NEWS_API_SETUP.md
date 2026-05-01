# News API Setup Guide

## Current Status

The news section works with **mock Ukrainian financial news data** by default. You can upgrade to **real Ukrainian news** from NewsAPI.

## What Happened?

Financial Modeling Prep (FMP) deprecated their free news endpoints on **August 31, 2025**:
- `/api/v3/stock_news` → Legacy endpoint (discontinued)
- `/stable/news/*` → Requires paid subscription

## Current Solution (Default)

The app shows **15 mock Ukrainian financial news articles**:
- ✅ Works immediately without any API key
- ✅ Relevant Ukrainian financial topics
- ✅ All content in Ukrainian language
- ✅ Properly formatted with dates and sources
- ✅ No API rate limits

## Get Real Ukrainian News (Recommended) 🇺🇦

Use **NewsAPI** to fetch real Ukrainian business news in Ukrainian language:

### Steps:

1. **Get Free API Key** (100 requests/day)
   - Visit: https://newsapi.org
   - Sign up for free account
   - Copy your API key

2. **Add to `.env.local`**
   ```env
   NEWS_API_KEY=your_newsapi_key_here
   ```

3. **Restart dev server**
   ```bash
   npm run dev
   ```

### What You Get:

- 📰 **Real Ukrainian news** from Ukrainian media
- 🇺🇦 **Ukrainian language** articles
- 💼 **Business & finance** category
- 🖼️ News images from sources
- 🔗 Links to original Ukrainian news sites
- 📅 Real-time updates
- 🆓 **100 requests/day FREE**

## Technical Details

### API Endpoint
- **File**: `/src/app/api/news/route.ts`
- **Logic**:
  1. If `NEWS_API_KEY` exists → Fetch from NewsAPI
  2. Otherwise → Return mock Ukrainian news

### News Component
- **File**: `/src/components/NewsSection.tsx`
- **Type**: Client Component with loading state
- **Fetches from**: `/api/news?limit=15`

## Mock News Content

Currently showing:
1. Фінансові ринки України: огляд тижня
2. Курс долара: прогноз на найближчий місяць
3. НБУ оновив вимоги до банків
4. Кредитування в Україні: тенденції 2026
5. Депозитні ставки досягли нових максимумів

You can customize these mock articles in `/src/app/api/news/route.ts` (lines 38-74).

## Alternative News APIs

If you want Ukrainian-specific news, consider:
- **NewsAPI** with `country=ua` parameter (may have limited Ukrainian sources)
- **Custom scraping** from Ukrainian financial news sites (requires more work)
- **RSS feeds** from Ukrainian financial portals

## Summary

✅ **News section works right now** with mock data
🆓 **Completely free** - no API key needed
📈 **Optional upgrade** to real news with NewsAPI
🇺🇦 **Ukrainian-focused** mock content
