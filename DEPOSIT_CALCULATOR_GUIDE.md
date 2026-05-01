# 💰 Deposit Calculator Guide

Complete guide for the deposit calculator feature.

## 📍 Location

**URL**: `/calc/deposit`

**Access from:**
- Homepage → Services Block → "Депозитний калькулятор"
- Direct link: `http://localhost:3000/calc/deposit`

## 🎯 Features

### Main Parameters

1. **Currency Selection**
   - Options: UAH (₴), USD ($), EUR (€)
   - Button selector
   - Affects all calculations

2. **Deposit Amount**
   - Range: 1,000 - 1,000,000 (currency units)
   - Input: Number field + slider
   - Default: 50,000

3. **Interest Rate**
   - Range: 0% - 25% annual
   - Input: Number field + slider
   - Default: 12% per year

4. **Deposit Term**
   - Range: 3 - 60 months
   - Input: Number field + slider
   - Default: 12 months

5. **Start Date**
   - Input: Date picker
   - Default: Today's date

### Advanced Parameters

1. **Capitalization Frequency**
   - None (simple interest)
   - Monthly (every month)
   - Quarterly (every 3 months)
   - Annual (every 12 months)
   - At maturity (end of term)

2. **Regular Top-ups**
   - Frequency: None / Monthly / Quarterly / Annual
   - Amount: Custom value
   - Adds to principal automatically

3. **Inflation Rate**
   - Annual percentage
   - Shows real value of money
   - Adjusts final amount

4. **Partial Withdrawal**
   - Enable/disable checkbox
   - Month selector (when to withdraw)
   - Percentage to withdraw
   - Reduces principal

## 📊 Calculation Methods

### Simple Interest (No Capitalization)

Interest is calculated but NOT added to principal:

```
Interest = Principal × Rate × Time
Final Amount = Principal + Total Interest
```

**Example:**
- Deposit: 50,000 UAH
- Rate: 12% annual
- Term: 12 months
- Interest: 50,000 × 0.12 = 6,000 UAH
- Final: 56,000 UAH

### Compound Interest (With Capitalization)

Interest is added to principal periodically:

```
For each period:
  Interest = Current Balance × (Rate / 12)
  New Balance = Current Balance + Interest
```

**Monthly Capitalization Example:**
- Deposit: 50,000 UAH
- Rate: 12% annual (1% monthly)
- Term: 12 months

Month 1: 50,000 × 0.01 = 500 → Balance: 50,500
Month 2: 50,500 × 0.01 = 505 → Balance: 51,005
Month 3: 51,005 × 0.01 = 510.05 → Balance: 51,515.05
... and so on

**Final: ~56,341 UAH** (341 UAH more than simple interest!)

### With Regular Top-ups

Adds money at specified intervals:

```
Each top-up period:
  1. Calculate interest on current balance
  2. Add interest (if capitalization month)
  3. Add top-up amount
  4. New balance becomes base for next period
```

**Example:**
- Deposit: 50,000 UAH
- Rate: 12% annual
- Term: 12 months
- Monthly top-up: 1,000 UAH
- Capitalization: Monthly

Month 1: 50,000 + 500 (interest) + 1,000 (top-up) = 51,500
Month 2: 51,500 + 515 + 1,000 = 53,015
... and so on

**Final: ~69,342 UAH**

### With Partial Withdrawal

Reduces principal at specified month:

```
Withdrawal month:
  1. Calculate interest normally
  2. Subtract withdrawal amount
  3. Continue with reduced balance
```

## 📈 Results Display

### Summary Card (Right Sidebar)

**Main Result:**
- Total amount at maturity (large, green)

**Detailed Breakdown:**
- Initial deposit
- Total interest earned
- Total top-ups (if any)
- Total withdrawals (if any)
- Return percentage
- Effective annual rate
- Inflation-adjusted value

### Period-by-Period Table

**Columns:**
1. **Period** - Month number
2. **Date** - Transaction date
3. **Top-up** - Money added (green)
4. **Withdrawal** - Money removed (red)
5. **Interest** - Interest capitalized (blue)
6. **Total** - Balance at end of period

## 🎨 User Interface

### Layout

```
┌─────────────────────────────────────────────────────┐
│ Breadcrumb: Home / Deposit Calculator               │
│ [← Back to Home]                                    │
└─────────────────────────────────────────────────────┘

┌──────────────────────────────┬──────────────────────┐
│   INPUT FORM (Left 2/3)      │   RESULTS (Right 1/3)│
│                               │                      │
│  💰 Main Parameters           │  📊 Final Amount     │
│  ├─ Currency [UAH|USD|EUR]    │  ┌──────────────────┐│
│  ├─ Deposit Amount [slider]   │  │  56,341 ₴       ││
│  ├─ Interest Rate [slider]    │  └──────────────────┘│
│  ├─ Term [slider]             │                      │
│  └─ Start Date [picker]       │  💹 Breakdown        │
│                               │  • Initial: 50,000 ₴ │
│  ⚙️ Advanced Settings          │  • Interest: 6,341 ₴│
│  ├─ Capitalization            │  • Return: 12.68%    │
│  ├─ Top-up Frequency          │  • Effective: 12.7% │
│  ├─ Top-up Amount             │                      │
│  ├─ Inflation Rate            │  [💾 Save]          │
│  ├─ Withdrawal [✓]            │  [📤 Share]         │
│  ├─ Withdrawal Month          │                      │
│  └─ Withdrawal %              │  ℹ️ Info             │
│                               │  💡 Tips             │
│  📅 Period Table              │                      │
│  ┌─────────────────────────┐ │                      │
│  │Per│Date│Top│Wdr│Int│Tot││ │                      │
│  │ 1 │... │ - │ - │500│...││ │                      │
│  │ 2 │... │ - │ - │505│...││ │                      │
│  │...│... │...│...│...│...││ │                      │
│  └─────────────────────────┘ │                      │
└──────────────────────────────┴──────────────────────┘
```

### Design Highlights

✨ **Currency Selector** - Toggle buttons for UAH/USD/EUR
📊 **Green Theme** - Matches deposit/savings concept
🎯 **Sticky Sidebar** - Results stay visible
💚 **Color-Coded** - Green for income, red for withdrawals
⚡ **Real-time** - Instant calculation updates
🔢 **Multiple Inputs** - Sliders + text fields
💡 **Helpful Tips** - Info boxes with advice

## 💡 Use Cases

### Use Case 1: Comparing Banks
**Scenario:** "Which bank offers better return?"

**Steps:**
1. Enter amount: 100,000 UAH
2. Bank A: 10% without capitalization
   - Result: 110,000 UAH
3. Bank B: 9.5% with monthly capitalization
   - Result: 109,956 UAH
4. Bank A wins (but close!)

### Use Case 2: Planning Savings
**Scenario:** "How much will I have in a year with monthly deposits?"

**Steps:**
1. Initial: 10,000 UAH
2. Rate: 12%
3. Term: 12 months
4. Monthly top-up: 1,000 UAH
5. Result: ~24,000 UAH (vs 22,800 without interest)

### Use Case 3: Emergency Fund Access
**Scenario:** "What if I need money mid-term?"

**Steps:**
1. Deposit: 50,000 UAH
2. Rate: 12%, 12 months
3. Enable withdrawal: Month 6, 30%
4. See impact: Lower final amount but available cash

### Use Case 4: Beating Inflation
**Scenario:** "Will my money keep its value?"

**Steps:**
1. Deposit: 100,000 UAH
2. Rate: 12%
3. Term: 12 months
4. Inflation: 8%
5. Nominal: 112,683 UAH
6. Real value: 104,336 UAH (4.3% real gain)

## 🎓 Educational Content

### What is Capitalization?

**Simple Interest:** Interest paid separately
```
Year 1: 100,000 × 10% = 10,000 → You have 110,000
Year 2: 100,000 × 10% = 10,000 → You have 120,000
```

**Compound Interest:** Interest added to principal
```
Year 1: 100,000 × 10% = 10,000 → Balance 110,000
Year 2: 110,000 × 10% = 11,000 → Balance 121,000
```

**Difference after 2 years: 1,000 UAH**

The difference grows exponentially over time!

### Effective Rate vs Nominal Rate

**Nominal Rate:** Advertised rate (e.g., 12% annual)

**Effective Rate:** Actual return with capitalization

```
Monthly capitalization:
Effective = (1 + 0.12/12)^12 - 1 = 12.68%
```

Always compare effective rates!

### Inflation Impact

**Nominal Return:** Number you see
**Real Return:** Purchasing power

```
Nominal: 12%
Inflation: 8%
Real: ~4% (simplified: 12% - 8%)
```

If inflation > interest rate, you LOSE purchasing power!

## 📱 Responsive Design

### Desktop (> 1024px)
- 2-column layout
- Sticky results sidebar
- Full table width

### Tablet (768px - 1024px)
- Adjusted spacing
- Sidebar still visible
- Horizontal table scroll

### Mobile (< 768px)
- Single column
- Results below form
- Mobile-optimized table

## 💻 Technical Details

### Technology Stack
- Next.js 14 (App Router)
- TypeScript
- React hooks (useState, useEffect)
- date-fns (date calculations)
- Tailwind CSS

### File
```
src/app/calc/deposit/page.tsx
```

### Key Features
- Real-time calculations
- Client-side only (no API)
- Type-safe interfaces
- Compound interest formula
- Period-by-period tracking

### Code Stats
- **Lines**: 680+
- **State Variables**: 17
- **Calculation Modes**: 5
- **TypeScript Interfaces**: 3

## 🧮 Formulas Used

### Monthly Interest Rate
```typescript
const monthlyRate = annualRate / 100 / 12;
```

### Simple Interest
```typescript
const interest = principal × rate × time;
```

### Compound Interest
```typescript
for each period:
  monthInterest = currentBalance × monthlyRate;
  if (shouldCapitalize):
    currentBalance += accumulatedInterest;
```

### Effective Rate
```typescript
effectiveRate = (totalIncome / avgDeposit / years) × 100;
```

### Inflation Adjustment
```typescript
totalInflation = (1 + inflationRate/100)^years - 1;
inflationAdjusted = finalAmount / (1 + totalInflation);
```

## 🎯 Best Practices

### For Maximum Returns

1. **Choose monthly capitalization** - More frequent = higher returns
2. **Longer terms** - Usually better rates
3. **Regular top-ups** - Compound interest on growing principal
4. **Compare effective rates** - Not just nominal
5. **Consider inflation** - Real returns matter

### Common Mistakes to Avoid

❌ Comparing nominal rates with different capitalization
❌ Ignoring early withdrawal penalties
❌ Not factoring in inflation
❌ Forgetting about taxes on interest
❌ Breaking deposit early (losing interest)

## 🔜 Future Enhancements

### Planned (v1.3)
- [ ] Multiple deposits comparison
- [ ] Chart visualization
- [ ] Tax calculation
- [ ] Bank offers integration
- [ ] PDF export

### Future (v2.0)
- [ ] Portfolio diversification tool
- [ ] Risk assessment
- [ ] Historical rate analysis
- [ ] Goal-based planning
- [ ] Multi-currency deposits

## ✅ Testing Scenarios

### Test 1: Basic Deposit
```
Input:
  - Amount: 50,000 UAH
  - Rate: 12%
  - Term: 12 months
  - Capitalization: None

Expected: 56,000 UAH (exactly)
```

### Test 2: Monthly Capitalization
```
Input:
  - Amount: 50,000 UAH
  - Rate: 12%
  - Term: 12 months
  - Capitalization: Monthly

Expected: ~56,341 UAH
```

### Test 3: With Top-ups
```
Input:
  - Amount: 10,000 UAH
  - Rate: 12%
  - Term: 12 months
  - Monthly top-up: 1,000 UAH
  - Capitalization: Monthly

Expected: ~19,600 UAH
```

### Test 4: With Withdrawal
```
Input:
  - Amount: 100,000 UAH
  - Rate: 12%
  - Term: 12 months
  - Withdrawal: Month 6, 50%
  - Capitalization: Monthly

Expected: ~58,000 UAH (reduced due to withdrawal)
```

## 📞 Support

For calculator issues:
- Check all inputs are positive numbers
- Ensure withdrawal month ≤ deposit term
- Try refreshing if calculation seems stuck
- Check console for errors

---

**Calculator Version**: 1.0
**Last Updated**: 2026-03-13
**Status**: ✅ Production Ready
**Browser Support**: All modern browsers
**Performance**: Excellent (instant calculations)
