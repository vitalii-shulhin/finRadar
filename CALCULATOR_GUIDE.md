# 🧮 Credit Calculator Guide

Complete guide for the credit calculator feature.

## 📍 Location

**URL**: `/calc/credit`

**Access from:**
- Homepage → Services Block → "Кредитний калькулятор" (Popular badge)
- Direct link: `http://localhost:3000/calc/credit`

## 🎯 Features

### Main Parameters

1. **Loan Amount (Сума кредиту)**
   - Range: 10,000 - 1,000,000 UAH
   - Input: Number field + slider
   - Default: 100,000 UAH

2. **Interest Rate (Відсоткова ставка)**
   - Range: 0% - 50% annual
   - Input: Number field + slider
   - Default: 18% per year

3. **Loan Term (Термін кредиту)**
   - Range: 6 - 120 months
   - Input: Number field + slider
   - Default: 12 months

4. **Start Date (Дата видачі кредиту)**
   - Input: Date picker
   - Default: Today's date

### Additional Fees & Commissions

All optional fields that affect total cost:

1. **Account Service Fee (РКО)** - One-time
   - Percentage of loan amount
   - Example: 1% = 1,000 UAH on 100,000 loan

2. **Monthly Service Fee (Щомісячне обслуговування)**
   - Fixed UAH amount per month
   - Charged every month

3. **Annual Service Fee (Річне обслуговування)**
   - Fixed UAH amount per year
   - Pro-rated for loan term

4. **Issuance Commission (Комісія за видачу)**
   - Percentage of loan amount
   - One-time fee

5. **Insurance (Страхування)**
   - Percentage of loan amount
   - One-time premium

6. **Notary Fee (Послуги нотаріуса)**
   - Fixed UAH amount
   - One-time

7. **Collateral Evaluation (Оцінка застави)**
   - Fixed UAH amount
   - One-time registration fee

## 📊 Calculation Method

### Annuity Payment Formula

The calculator uses **annuity (equal monthly payments)** method:

```
Monthly Payment = Loan Amount × [r × (1 + r)^n] / [(1 + r)^n - 1]

Where:
- r = monthly interest rate (annual rate / 12 / 100)
- n = number of months
```

### Example Calculation

**Input:**
- Loan: 100,000 UAH
- Rate: 18% annual
- Term: 12 months

**Calculation:**
- Monthly rate: 18% / 12 = 1.5% = 0.015
- Annuity coef: [0.015 × (1.015)^12] / [(1.015)^12 - 1] = 0.09168
- Monthly payment: 100,000 × 0.09168 = 9,168 UAH

**Results:**
- Total payment: 9,168 × 12 = 110,016 UAH
- Total interest: 110,016 - 100,000 = 10,016 UAH
- Effective rate: ~18% (without fees)

## 📈 Results Display

### Summary Card (Right Sidebar)

**Main Result:**
- Monthly payment amount (large, highlighted)

**Breakdown:**
- Loan amount
- Total interest
- Additional fees
- Total payments
- Overpayment (total - loan)
- Effective annual rate

### Payment Schedule Table

**Columns:**
1. **№** - Payment number (1, 2, 3...)
2. **Дата** - Payment date (DD.MM.YYYY)
3. **Платіж** - Total payment (principal + interest + fees)
4. **Основний борг** - Principal portion
5. **Відсотки** - Interest portion
6. **Залишок** - Remaining balance

**Features:**
- Full amortization schedule
- Month-by-month breakdown
- Color coding (interest in orange)
- Hover effects
- Downloadable (button provided)

## 🎨 User Interface

### Layout

```
┌─────────────────────────────────────────────────┐
│ Breadcrumb: Головна / Кредитний калькулятор     │
└─────────────────────────────────────────────────┘

┌──────────────────────────┬──────────────────────┐
│  INPUT FORM (2/3)        │  RESULTS (1/3)       │
│                          │                       │
│  [Main Parameters]       │  [Monthly Payment]   │
│  - Loan Amount           │  9,168 UAH           │
│  - Interest Rate         │                       │
│  - Loan Term             │  [Breakdown]         │
│  - Start Date            │  - Loan: 100,000     │
│                          │  - Interest: 10,016  │
│  [Additional Fees]       │  - Fees: 0           │
│  - Account Service       │  - Total: 110,016    │
│  - Monthly Fee           │  - Overpayment: ...  │
│  - Annual Fee            │                       │
│  - Issuance Comm.        │  [Download] [Share]  │
│  - Insurance             │                       │
│  - Notary                │  [Info Box]          │
│  - Collateral Eval.      │                       │
│                          │                       │
│  [Payment Schedule]      │                       │
│  [Table with all months] │                       │
└──────────────────────────┴──────────────────────┘
```

### Responsive Behavior

**Desktop (> 1024px):**
- 2-column layout (form + results sidebar)
- Results sidebar is sticky
- Full table width

**Tablet (768px - 1024px):**
- 2-column layout
- Condensed spacing
- Horizontal scroll for table

**Mobile (< 768px):**
- Single column
- Results at bottom
- Table scrolls horizontally

## 💻 Technical Implementation

### Technology Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State**: React useState + useEffect
- **Date**: date-fns library

### File Location

```
src/
└── app/
    └── calc/
        └── credit/
            └── page.tsx (630+ lines)
```

### Key Features

1. **Client Component** - Uses 'use client' directive
2. **Real-time Calculation** - Updates on every input change
3. **Local State** - All calculation happens client-side
4. **No API Calls** - Pure calculation logic
5. **Type Safety** - Full TypeScript interfaces

### State Management

```typescript
// Main parameters
const [loanAmount, setLoanAmount] = useState<number>(100000);
const [interestRate, setInterestRate] = useState<number>(18);
const [loanTerm, setLoanTerm] = useState<number>(12);
const [startDate, setStartDate] = useState<string>(today);

// Additional fees (7 types)
const [accountServiceFee, setAccountServiceFee] = useState<number>(0);
// ... more fee states

// Results
const [monthlyPayment, setMonthlyPayment] = useState<number>(0);
const [totalPayment, setTotalPayment] = useState<number>(0);
const [schedule, setSchedule] = useState<PaymentSchedule[]>([]);
```

### Calculation Logic

```typescript
useEffect(() => {
  calculateCredit();
}, [
  loanAmount, interestRate, loanTerm,
  accountServiceFee, monthlyServiceFee,
  // ... all dependencies
]);

const calculateCredit = () => {
  // 1. Calculate monthly rate
  // 2. Calculate annuity coefficient
  // 3. Calculate base payment
  // 4. Add all fees
  // 5. Generate payment schedule
  // 6. Update state with results
};
```

## 🎯 Use Cases

### Use Case 1: Basic Loan Calculation
**User Story:** "I want to know my monthly payment for a 100K loan"

**Steps:**
1. Enter loan amount: 100,000
2. Set interest rate: 18%
3. Choose term: 12 months
4. See result: 9,168 UAH/month

### Use Case 2: Compare Bank Offers
**User Story:** "Bank A charges 18% + 1% commission, Bank B charges 20% with no commission"

**Bank A:**
- Loan: 100,000
- Rate: 18%
- Issuance: 1%
- Result: Higher total cost

**Bank B:**
- Loan: 100,000
- Rate: 20%
- Issuance: 0%
- Result: Compare and decide

### Use Case 3: Plan Budget
**User Story:** "Can I afford a 200K loan with my 10K monthly income?"

**Steps:**
1. Enter loan: 200,000
2. Try different terms (12, 24, 36 months)
3. Compare monthly payments
4. Choose affordable term

### Use Case 4: Analyze True Cost
**User Story:** "What's my real cost with insurance and fees?"

**Steps:**
1. Enter loan parameters
2. Add all fees (insurance 2%, monthly 100 UAH)
3. Check effective rate
4. See true overpayment

## 📱 Features Roadmap

### Current (v1.0)
- ✅ Annuity calculation
- ✅ Multiple fee types
- ✅ Payment schedule
- ✅ Real-time updates
- ✅ Responsive design

### Planned (v1.1)
- ⏳ Differentiated payment option
- ⏳ Early repayment calculator
- ⏳ Charts/graphs visualization
- ⏳ Export to PDF/Excel
- ⏳ Save calculations to account
- ⏳ Email results

### Future (v2.0)
- 🔮 Compare multiple loans side-by-side
- 🔮 Real bank offers integration
- 🔮 Mortgage-specific calculator
- 🔮 Auto loan calculator
- 🔮 Currency loan calculator (USD/EUR)
- 🔮 Refinancing calculator

## 🐛 Known Limitations

1. **Calculation precision** - Rounding may cause minor differences
2. **Date handling** - Assumes 30-day months for simplicity
3. **Effective rate** - Approximation, not exact IRR
4. **No validation** - Accepts any numeric input
5. **No persistence** - Results lost on page refresh

## 🔧 Customization

### Change Default Values

Edit in `page.tsx`:

```typescript
const [loanAmount, setLoanAmount] = useState<number>(50000); // Was 100000
const [interestRate, setInterestRate] = useState<number>(15); // Was 18
const [loanTerm, setLoanTerm] = useState<number>(24); // Was 12
```

### Add New Fee Type

1. Add state:
```typescript
const [newFee, setNewFee] = useState<number>(0);
```

2. Add to form:
```tsx
<div>
  <label>New Fee Label</label>
  <input value={newFee} onChange={(e) => setNewFee(Number(e.target.value))} />
</div>
```

3. Include in calculation:
```typescript
const allFees = oneTimeFees + newFee;
```

### Change Calculation Method

Replace annuity with differentiated:

```typescript
// Differentiated payment
const monthlyPrincipal = loanAmount / loanTerm;
const monthlyInterest = remainingBalance * monthlyRate;
const payment = monthlyPrincipal + monthlyInterest;
```

## 📊 Testing Examples

### Test Case 1: Zero Interest
- Input: 100,000 UAH, 0%, 12 months
- Expected: 8,333.33 UAH/month
- Total interest: 0 UAH

### Test Case 2: High Interest
- Input: 100,000 UAH, 50%, 12 months
- Expected: ~11,122 UAH/month
- Total interest: ~33,464 UAH

### Test Case 3: Long Term
- Input: 100,000 UAH, 18%, 60 months
- Expected: ~2,535 UAH/month
- Total interest: ~52,100 UAH

### Test Case 4: With Fees
- Input: 100,000 UAH, 18%, 12 months
- Fees: 1% issuance + 100 UAH/month
- Expected: 9,168 + 100 = 9,268 UAH/month
- Total fees: 1,000 + 1,200 = 2,200 UAH

## 🎓 Educational Content

### What is Annuity?

Annuity means equal monthly payments. Each payment includes:
- **Principal** - Pays down the loan (increases over time)
- **Interest** - Cost of borrowing (decreases over time)

### Effective Interest Rate

The **effective rate** includes all costs:
- Base interest rate
- All one-time fees
- Recurring monthly fees
- Annual fees

Always compare effective rates, not just nominal rates!

### Early Repayment

Want to pay off early? The calculator shows:
- Remaining balance each month
- How much interest you save
- When you break even

## 📞 Support

For issues with the calculator:
1. Check console for errors
2. Verify all inputs are positive numbers
3. Try refreshing the page
4. Report bugs with example inputs

---

**Calculator Version**: 1.0
**Last Updated**: 2026-03-13
**Status**: ✅ Production Ready
