# NewsData.io Setup Guide 🇺🇦

## Overview

The news section now uses **NewsData.io API** to fetch real Ukrainian business news in Ukrainian language.

## Why NewsData.io?

✅ **Better for Ukrainian news** than NewsAPI
- More Ukrainian sources
- Better Ukrainian language support
- Business category available
- 200 requests/day FREE (vs NewsAPI's 100)
- More reliable for non-English content

## New Function: `getNewsDataNews()`

**Location**: `/src/lib/api.ts`

### API Parameters:

```typescript
axios.get('https://newsdata.io/api/1/latest', {
  params: {
    apikey: NEWSDATA_API_KEY,
    country: 'ua',        // 🇺🇦 Ukraine
    category: 'business', // 💼 Business news
    language: 'uk',       // Ukrainian language
    size: limit           // Number of articles
  }
});
```

### Data Structure:

NewsData.io returns:
```json
{
  "status": "success",
  "totalResults": 123,
  "results": [
    {
      "title": "Article title",
      "description": "Article description",
      "content": "Full content",
      "pubDate": "2026-03-17 12:00:00",
      "image_url": "https://...",
      "source_id": "source_name",
      "link": "https://...",
      "category": ["business"]
    }
  ]
}
```

## Setup Instructions

### Step 1: Get FREE API Key

1. Visit: **https://newsdata.io**
2. Click "Get API Key" or "Sign Up"
3. Sign up for **FREE tier**:
   - 200 requests/day
   - Historical data access
   - Multiple languages
   - Various categories
4. Copy your API key from dashboard

### Step 2: Add to `.env.local`

Open `.env.local` and add:

```env
# NewsData.io API Key
NEWSDATA_API_KEY=your_api_key_here
NEXT_PUBLIC_NEWSDATA_API_KEY=your_api_key_here
```

**Both keys are needed:**
- `NEWSDATA_API_KEY` - For Server Components
- `NEXT_PUBLIC_NEWSDATA_API_KEY` - For Client Components (if needed)

### Step 3: Restart Dev Server

```bash
# Stop current server (Ctrl+C)
npm run dev
```

## What You'll Get

### Ukrainian News Sources:

NewsData.io aggregates from:
- УНІАН (Українські новини)
- Економічна правда
- Ukrinform
- Liga.net
- Interfax-Ukraine
- НВ (Новое время)
- LB.ua
- And many more Ukrainian media outlets

### Content Features:

- 📰 **Real Ukrainian business news**
- 🇺🇦 **Ukrainian language** articles
- 🖼️ **High-quality images**
- 🔗 **Direct links** to original articles
- 📅 **Real-time updates**
- 🏢 **Business & finance focus**
- 📊 **Reliable sources**

## Component Update

**File**: `/src/components/NewsSection.tsx`

Updated to use:
```typescript
const news = await getNewsDataNews(15);
```

## API Comparison

### NewsData.io (Current) ✅
- ✅ 200 requests/day FREE
- ✅ Ukrainian sources (`country: 'ua'`)
- ✅ Ukrainian language (`language: 'uk'`)
- ✅ Business category
- ✅ Better non-English support
- ✅ More media sources
- ✅ Historical data access
- ✅ More reliable

### NewsAPI (Previous)
- ❌ Only 100 requests/day FREE
- ⚠️ Limited Ukrainian sources
- ⚠️ Primarily English-focused
- ⚠️ Less reliable for Ukraine
- ✅ Business category
- ✅ Easy to use

### FMP (Original)
- ❌ News requires paid subscription
- ❌ No free access after Aug 2025
- ❌ International focus only
- ❌ No Ukrainian sources

## Testing

Check server logs for:
- `Fetched X Ukrainian news articles from NewsData.io` ✅ Success
- `No NewsData.io API key found` ⚠️ No API key
- `Error fetching news from NewsData.io` ❌ API error

## API Rate Limits

**FREE Tier:**
- 200 requests per day
- Rate limit resets at midnight UTC
- No credit card required

**If you exceed limit:**
- API returns 429 error
- Component shows no news (empty array)
- Resets next day automatically

**To track usage:**
- Check NewsData.io dashboard
- Monitor server logs
- Consider caching results

## Caching Strategy (Optional)

To reduce API calls, you can:

1. **Cache in Redis/Memory** (5-15 minutes)
2. **Use Next.js caching**:
   ```typescript
   export const revalidate = 300; // 5 minutes
   ```
3. **Store in database** for historical data

## Error Handling

The function handles:
- ❌ No API key → Returns empty array
- ❌ Network errors → Returns empty array
- ❌ Invalid response → Returns empty array
- ❌ Rate limit exceeded → Returns empty array

All errors are logged to console for debugging.

## Troubleshooting

### No news showing?

1. **Check API key** in `.env.local`
2. **Restart dev server** after adding key
3. **Check console logs** for errors
4. **Verify API key** on NewsData.io dashboard
5. **Check rate limits** (200/day)

### Wrong language?

Ensure `language: 'uk'` is set in API call (already configured).

### No Ukrainian sources?

Ensure `country: 'ua'` is set in API call (already configured).

## Benefits

### For Users:
- 📰 Real, up-to-date Ukrainian news
- 🇺🇦 Native Ukrainian language
- 🏢 Business & finance focus
- 🖼️ Rich media (images)
- 🔗 Source links for credibility

### For Developers:
- 🆓 Generous FREE tier (200 req/day)
- 📚 Good documentation
- 🔄 Easy integration
- 🛠️ Reliable API
- 📊 Dashboard for monitoring

## Additional Features Available

NewsData.io also supports:
- Multiple languages (60+)
- Multiple countries
- Multiple categories
- Full-text search
- Date range filtering
- Domain filtering
- Advanced filtering

## Next Steps

1. **Get API key**: https://newsdata.io ✅
2. **Add to `.env.local`** ✅
3. **Restart server** ✅
4. **Check logs** to verify ✅
5. **Enjoy real Ukrainian news!** 🎉

## Support

- **NewsData.io Docs**: https://newsdata.io/documentation
- **API Status**: https://status.newsdata.io
- **Support**: support@newsdata.io

---

**The system is ready!** Just add your API key and restart the server to see real Ukrainian news. 🇺🇦
