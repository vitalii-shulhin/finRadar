# 🧮 Financial Calculators

Overview of all calculators in FinRadar.

## 📊 Available Calculators

### 1. Credit Calculator 💳
**URL**: `/calc/credit`
**Status**: ✅ Production Ready

Calculate loan payments with full amortization schedule.

**Key Features:**
- Loan amount: 10K - 1M
- Interest rate: 0-50%
- Term: 6-120 months
- 7 types of fees
- Annuity payment method
- Monthly payment schedule
- Effective rate calculation

**Use For:**
- Personal loans
- Auto loans
- Consumer credit
- Refinancing analysis

[📖 Full Documentation](CALCULATOR_GUIDE.md)

---

### 2. Deposit Calculator 💰
**URL**: `/calc/deposit`
**Status**: ✅ Production Ready

Calculate deposit returns with compound interest.

**Key Features:**
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

[📖 Full Documentation](DEPOSIT_CALCULATOR_GUIDE.md)

---

## 🎯 Quick Comparison

| Feature | Credit Calculator | Deposit Calculator |
|---------|------------------|-------------------|
| **Purpose** | Loan payments | Savings growth |
| **Currency** | UAH only | UAH, USD, EUR |
| **Main Input** | Loan amount | Deposit amount |
| **Rate Range** | 0-50% | 0-25% |
| **Term Range** | 6-120 months | 3-60 months |
| **Payment Type** | Annuity | Compound interest |
| **Additional Fees** | 7 types | None |
| **Capitalization** | N/A | 5 options |
| **Top-ups** | N/A | Yes |
| **Withdrawals** | N/A | Yes |
| **Inflation** | N/A | Yes |
| **Schedule** | Payment table | Period table |
| **Color Theme** | Blue | Green |
| **Icon** | Calculator | TrendingUp |

## 📐 Calculation Methods

### Credit Calculator

**Method**: Annuity (Equal Monthly Payments)

```
Monthly Payment = L × [r × (1+r)^n] / [(1+r)^n - 1]

Where:
L = Loan amount
r = Monthly rate (annual / 12 / 100)
n = Number of months
```

**Each payment contains:**
- Principal portion (increases over time)
- Interest portion (decreases over time)

### Deposit Calculator

**Method**: Compound Interest

```
For each period:
  Interest = Balance × Monthly Rate

  If capitalization period:
    Balance += Accumulated Interest

  If top-up period:
    Balance += Top-up Amount

  If withdrawal period:
    Balance -= Withdrawal Amount
```

**Capitalization frequencies:**
- Monthly: Every month
- Quarterly: Every 3 months
- Annual: Every 12 months
- At maturity: End of term
- None: Simple interest

## 🎨 Design System

### Common Elements

Both calculators share:
- 2-column layout (form + results)
- Sticky results sidebar
- Slider + text input controls
- Real-time calculations
- Breadcrumb navigation
- Download/share buttons
- Info boxes
- Responsive design

### Unique Elements

**Credit Calculator:**
- Blue color scheme
- Focus on debt reduction
- Payment breakdown
- Fee inputs
- Overpayment warnings

**Deposit Calculator:**
- Green color scheme
- Focus on wealth growth
- Currency selector
- Top-up inputs
- Growth projections

## 📱 Responsive Behavior

### Desktop (> 1024px)
```
┌─────────────────────┬──────────┐
│                     │          │
│   Form (66%)        │ Results  │
│                     │  (33%)   │
│                     │  Sticky  │
└─────────────────────┴──────────┘
```

### Mobile (< 768px)
```
┌─────────────────────────┐
│                         │
│    Form (100%)          │
│                         │
├─────────────────────────┤
│                         │
│    Results (100%)       │
│                         │
└─────────────────────────┘
```

## 🚀 Performance

Both calculators:
- ✅ Client-side only (no API calls)
- ✅ Instant calculations
- ✅ Real-time updates
- ✅ No loading states needed
- ✅ Work offline
- ✅ Type-safe TypeScript
- ✅ Optimized re-renders

## 📊 Usage Examples

### Credit Calculator Example

**Scenario**: Car loan

```
Input:
  Loan: 300,000 UAH
  Rate: 18%
  Term: 36 months
  Insurance: 2%

Output:
  Monthly: 10,860 UAH
  Total Interest: 90,960 UAH
  Total Payment: 396,960 UAH
  Effective Rate: 20.1%
```

### Deposit Calculator Example

**Scenario**: Emergency fund

```
Input:
  Currency: UAH
  Deposit: 20,000 UAH
  Rate: 12%
  Term: 12 months
  Monthly top-up: 2,000 UAH
  Capitalization: Monthly

Output:
  Final Amount: 47,136 UAH
  Interest Earned: 3,136 UAH
  Return: 7.3%
```

## 🔄 Data Flow

```
User Input → State Update → useEffect Trigger
    ↓
Calculate Function
    ↓
Update Results State
    ↓
Re-render UI (instant)
```

No API calls = No latency!

## 🎓 Educational Value

### What Users Learn

**Credit Calculator:**
- How annuity payments work
- Impact of fees on total cost
- Effective vs nominal rates
- Early payment benefits
- Loan amortization

**Deposit Calculator:**
- Power of compound interest
- Impact of capitalization frequency
- Benefits of regular saving
- Inflation effects
- Real vs nominal returns

### Tips Provided

**Credit Calculator:**
- Compare effective rates, not nominal
- Consider all fees in total cost
- Shorter terms = less interest
- Watch for hidden charges

**Deposit Calculator:**
- Monthly capitalization = highest returns
- Regular top-ups accelerate growth
- Consider inflation
- Longer terms usually = better rates
- Don't break early (lose interest)

## 🔜 Coming Soon

### Planned Calculators (v1.4+)

**1. Mortgage Calculator**
- Specialized for home loans
- Down payment calculation
- Property tax estimation
- Insurance included
- Refinancing options

**2. Investment Calculator**
- Stock portfolio returns
- DCA (Dollar Cost Averaging)
- Risk assessment
- Diversification suggestions

**3. Retirement Calculator**
- Pension planning
- Monthly income needed
- Savings required
- Timeline projection

**4. Currency Converter**
- Real-time rates
- Historical charts
- Multiple currencies
- Fees calculation

**5. Loan Comparison**
- Side-by-side comparison
- Multiple offers
- Best deal finder
- Total cost ranking

## 🛠️ For Developers

### Adding a New Calculator

1. Create page: `src/app/calc/[name]/page.tsx`
2. Use 'use client' directive
3. Copy structure from existing calculators
4. Implement calculation logic
5. Add to ServicesBlock component
6. Create documentation file
7. Update CHANGELOG

### Code Structure

```typescript
'use client';

// Imports
import { useState, useEffect } from 'react';

// Types
interface CalculationResult { }

// Component
export default function CalculatorPage() {
  // State
  const [inputs, setInputs] = useState();
  const [results, setResults] = useState();

  // Calculate on input change
  useEffect(() => {
    calculate();
  }, [inputs]);

  // Calculation function
  const calculate = () => {
    // Logic here
  };

  // Render
  return (
    // JSX
  );
}
```

### Best Practices

1. **Type Safety**: Use TypeScript interfaces
2. **Real-time**: Update on every input change
3. **Validation**: Handle edge cases (0, negative, etc.)
4. **Performance**: Optimize heavy calculations
5. **UX**: Provide instant feedback
6. **Accessibility**: Keyboard navigation, labels
7. **Responsive**: Mobile-first design
8. **Documentation**: Explain formulas

## 📊 Statistics

### Current Status

- **Total Calculators**: 2
- **Total Lines**: 1,300+
- **Total Documentation**: 1,000+ lines
- **Languages**: TypeScript, TSX
- **Framework**: Next.js 14
- **Styling**: Tailwind CSS

### Features Count

- **Input Parameters**: 28 total
- **Calculation Methods**: 3
- **Currency Support**: 3
- **Output Metrics**: 20+
- **Interactive Elements**: 40+

## 📞 Support

### Common Issues

**Calculator not updating?**
- Check console for errors
- Verify all inputs are valid numbers
- Try refreshing the page

**Wrong results?**
- Double-check input values
- Ensure rate is annual (not monthly)
- Verify term is in months
- Check capitalization setting

**Mobile layout broken?**
- Clear browser cache
- Update to latest version
- Check responsive design

### Report Issues

Found a bug? Have a suggestion?
- Check existing documentation
- Verify with different inputs
- Note exact steps to reproduce
- Include screenshots if possible

---

**Document Version**: 1.0
**Last Updated**: 2026-03-13
**Total Calculators**: 2
**Status**: ✅ Both Production Ready

🎉 **Happy Calculating!**
