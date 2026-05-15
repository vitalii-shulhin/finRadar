# FinRadar - Фінансовий портал України

Ukrainian finance portal built with Next.js, React, TypeScript, and Tailwind CSS. Features real-time currency rates, financial news, stock market data, and banking product information.

## 🚀 Features

- 💱 **Currency Exchange Rates** - Real-time UAH exchange rates from National Bank of Ukraine
- 📰 **Financial News** - Latest finance news from Financial Modeling Prep API
- 📊 **Market Data** - Stock indices and cryptocurrency prices
- 💎 **Cryptocurrency Prices** - Real-time crypto rates for 100+ coins with live updates (`/crypto`)
- 🏦 **Banking Products** - Information about loans, cards, deposits, and insurance
- 💳 **Bank Cards** - Card catalog with filtering and individual detail pages (`/cards`, `/cards/[id]`)
- 🧮 **Credit Calculator** - Full-featured loan calculator with payment schedule (`/calc/credit`)
- 💰 **Deposit Calculator** - Compound interest calculator with capitalization (`/calc/deposit`)
- 🎯 **Services Block** - 8 financial tools and calculators
- 🏢 **Featured Banks** - Top Ukrainian banks with ratings and comparisons
- ⚡ **Fast Performance** - Built with Next.js 14+ App Router and server components
- 📱 **Responsive Design** - Mobile-first approach with Tailwind CSS
- 🔄 **Auto-refresh** - Data revalidation every 5 minutes

## 🛠️ Tech Stack

- **Framework**: Next.js 14.2
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **HTTP Client**: Axios
- **Date Formatting**: date-fns
- **Process Manager**: PM2 (for production)

## 📋 Prerequisites

- Node.js 18+ installed
- Free API key from [Financial Modeling Prep](https://site.financialmodelingprep.com/developer/docs)
- PM2 installed globally (for production deployment)

## 🔧 Installation

### 1. Clone and install dependencies

```bash
cd /Users/Vitalii_Shulhin/Projects/finRadar
npm install
```

### 2. Configure environment variables

```bash
cp .env.example .env
```

Edit `.env` and add your API keys:

```env
# Required
FMP_API_KEY=your_fmp_api_key_here

# Optional
NEWSAPI_KEY=your_newsapi_key_here
```

**Get your free FMP API key:**
- Visit https://site.financialmodelingprep.com/developer/docs
- Register for a free account
- Copy your API key (250 requests/day free tier)

### 3. Run development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🏗️ Build for Production

```bash
npm run build
npm start
```

## 🚀 EC2 Deployment with PM2

### Prerequisites on EC2 Instance

1. **Install Node.js and PM2**

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js 18+
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# Install PM2 globally
sudo npm install -g pm2

# Install nginx (optional, for reverse proxy)
sudo apt install -y nginx
```

2. **Clone and setup project**

```bash
# Clone your project
cd /var/www
sudo git clone <your-repo-url> finradar
cd finradar

# Install dependencies
sudo npm install

# Setup environment variables
sudo cp .env.example .env
sudo nano .env  # Add your API keys

# Build the project
sudo npm run build

# Create logs directory
sudo mkdir -p logs
```

3. **Start with PM2**

```bash
# Start the application
sudo npm run pm2:start

# Save PM2 process list
sudo pm2 save

# Setup PM2 to start on system boot
sudo pm2 startup systemd
# Follow the instructions from the output

# Check application status
sudo pm2 status
sudo pm2 logs finradar
```

### PM2 Commands

```bash
# Start application
npm run pm2:start

# Stop application
npm run pm2:stop

# Restart application
npm run pm2:restart

# Delete from PM2
npm run pm2:delete

# View logs
pm2 logs finradar

# Monitor
pm2 monit
```

## 🌐 Nginx Configuration (Optional)

Create Nginx config for reverse proxy:

```bash
sudo nano /etc/nginx/sites-available/finradar
```

Add configuration:

```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

Enable the site:

```bash
sudo ln -s /etc/nginx/sites-available/finradar /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

### SSL with Let's Encrypt (Recommended)

```bash
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.com
```

## 📊 API Sources

- **Currency Rates**: National Bank of Ukraine API (free, no key required)
- **News & Market Data**: Financial Modeling Prep API (250 requests/day free)
- **Alternative**: Can integrate NewsAPI.org for additional news

## 🔒 Security Recommendations

1. **Firewall Setup**
```bash
sudo ufw allow 22/tcp   # SSH
sudo ufw allow 80/tcp   # HTTP
sudo ufw allow 443/tcp  # HTTPS
sudo ufw enable
```

2. **Environment Variables**
- Never commit `.env` file
- Use strong API keys
- Rotate keys regularly

3. **Updates**
```bash
# Keep system updated
sudo apt update && sudo apt upgrade -y

# Update Node packages
npm audit fix
```

## 📝 Project Structure

```
finRadar/
├── src/
│   ├── app/
│   │   ├── layout.tsx       # Root layout
│   │   ├── page.tsx         # Homepage
│   │   └── globals.css      # Global styles
│   ├── components/
│   │   ├── Header.tsx       # Navigation header
│   │   ├── Footer.tsx       # Footer
│   │   ├── HeroSection.tsx  # Hero banner
│   │   ├── CurrencyRates.tsx   # Currency display
│   │   ├── NewsSection.tsx     # News feed
│   │   ├── MarketOverview.tsx  # Market data
│   │   └── BankingProducts.tsx # Products
│   └── lib/
│       ├── api.ts           # FMP API client
│       └── uahRates.ts      # NBU API client
├── ecosystem.config.js      # PM2 configuration
├── next.config.js          # Next.js config
├── tailwind.config.ts      # Tailwind config
└── package.json            # Dependencies

```

## 🐛 Troubleshooting

### API not working
- Verify your FMP_API_KEY in `.env`
- Check API rate limits (250 requests/day free)
- View logs: `pm2 logs finradar`

### Build errors
```bash
# Clear cache and rebuild
rm -rf .next node_modules
npm install
npm run build
```

### PM2 not starting
```bash
# Check PM2 logs
pm2 logs finradar --lines 100

# Restart with fresh config
pm2 delete finradar
npm run pm2:start
```

### Port already in use
```bash
# Find process using port 3000
sudo lsof -i :3000
# Kill the process
sudo kill -9 <PID>
```

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Data provided by Financial Modeling Prep
- Currency rates from National Bank of Ukraine
- Icons by Lucide React

## 📞 Support

For issues and questions:

---

Built with ❤️ in Ukraine
