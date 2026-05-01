# 💰 Deposit Calculator - Quick Reference

**URL**: http://localhost:3000/calc/deposit

## 🚀 Quick Start

1. Select currency (UAH / USD / EUR)
2. Enter deposit amount
3. Set interest rate
4. Choose term (months)
5. Select capitalization frequency
6. Add optional top-ups or withdrawals
7. See instant results!

---

## 📊 Main Features

### Input Controls

| Parameter | Range | Default |
|-----------|-------|---------|
| Currency | UAH, USD, EUR | UAH |
| Amount | 1K - 1M | 50,000 |
| Rate | 0% - 25% | 12% |
| Term | 3 - 60 months | 12 |

### Capitalization Options

- ❌ **None** - Simple interest (lowest return)
- 📅 **Monthly** - Every month (highest return)
- 📆 **Quarterly** - Every 3 months
- 📆 **Annual** - Every 12 months
- 🏁 **At Maturity** - End of term only

### Advanced Features

- ✅ Regular top-ups (monthly/quarterly/annual)
- ✅ Partial withdrawal simulation
- ✅ Inflation adjustment
- ✅ Multi-currency support
- ✅ Period-by-period breakdown

---

## 🧮 Example Calculations

### Example 1: Basic Deposit
```
Currency: UAH
Amount: 50,000
Rate: 12%
Term: 12 months
Capitalization: Monthly

Result: 56,341 UAH
Interest: 6,341 UAH
Return: 12.68%
```

### Example 2: With Top-ups
```
Currency: UAH
Initial: 20,000
Rate: 12%
Term: 12 months
Monthly top-up: 2,000
Capitalization: Monthly

Result: 47,136 UAH
Interest: 3,136 UAH
Total invested: 44,000
```

### Example 3: With Withdrawal
```
Currency: USD
Amount: 10,000
Rate: 8%
Term: 24 months
Withdrawal: Month 12, 30%
Capitalization: Quarterly

Result: ~8,200 USD
(reduced due to withdrawal)
```

### Example 4: Inflation-Adjusted
```
Currency: UAH
Amount: 100,000
Rate: 12%
Term: 12 months
Inflation: 8%
Capitalization: Monthly

Nominal: 112,683 UAH
Real value: 104,336 UAH
Real gain: 4.34%
```

---

## 💡 Tips for Best Results

### Maximize Returns

1. **Choose monthly capitalization**
   - More frequent = more compound interest
   - Can add 5-10% to returns

2. **Make regular top-ups**
   - Even small amounts help
   - Compound interest on growing balance

3. **Longer terms get better rates**
   - Banks reward commitment
   - But consider liquidity needs

4. **Compare effective rates**
   - Not just nominal advertised rates
   - Account for capitalization

### Avoid Common Mistakes

❌ Breaking deposit early (lose interest)
❌ Ignoring inflation
❌ Comparing different capitalization frequencies
❌ Not reading fine print
❌ Putting all money in one place

---

## 🎯 Use Cases

### 1. Emergency Fund
Build 3-6 months expenses with regular deposits

### 2. Goal Savings
Save for specific purchase (car, vacation, etc.)

### 3. Bank Comparison
Compare offers from different banks

### 4. Retirement Planning
Project long-term savings growth

### 5. Education Fund
Save for children's education

---

## 📈 Understanding Results

### Key Metrics

**Final Amount**
- Total money at maturity
- Includes all interest and top-ups

**Total Interest**
- Pure earnings from deposit
- Your "profit"

**Return Percentage**
- Interest / Initial deposit
- Shows growth rate

**Effective Rate**
- Actual annual return
- Accounts for capitalization

**Inflation-Adjusted**
- Real purchasing power
- Matters more than nominal

---

## 🎓 Educational Guide

### What is Compound Interest?

**Albert Einstein**: "Compound interest is the eighth wonder of the world"

**Simple interest**: Interest only on principal
```
Year 1: 100,000 × 10% = 10,000
Year 2: 100,000 × 10% = 10,000
Total: 120,000
```

**Compound interest**: Interest on interest
```
Year 1: 100,000 × 10% = 10,000 → 110,000
Year 2: 110,000 × 10% = 11,000 → 121,000
Total: 121,000 (1,000 more!)
```

### Capitalization Impact

| Frequency | Example | Effective Rate |
|-----------|---------|----------------|
| None | 12% | 12.00% |
| Annual | 12% | 12.00% |
| Quarterly | 12% | 12.55% |
| Monthly | 12% | 12.68% |
| Daily | 12% | 12.75% |

*More frequent = higher returns!*

### Rule of 72

Quick way to estimate doubling time:

```
Years to double = 72 / Interest Rate

At 12%: 72 / 12 = 6 years
At 8%:  72 / 8 = 9 years
At 6%:  72 / 6 = 12 years
```

---

## 📱 Mobile Usage

The calculator works perfectly on mobile:

- Tap to enter amounts
- Use sliders for quick adjustments
- All features available
- Results always visible
- Touch-optimized interface

---

## 🔒 Privacy & Security

- ✅ All calculations local (in your browser)
- ✅ No data sent to server
- ✅ No account required
- ✅ No cookies or tracking
- ✅ Works offline after first load

---

## 🆚 vs Credit Calculator

| Feature | Deposit | Credit |
|---------|---------|--------|
| Purpose | Make money | Borrow money |
| Interest | You earn | You pay |
| Best rate | Higher | Lower |
| Color | Green | Blue |
| Goal | Growth | Repayment |
| Capitalization | Yes | No |
| Top-ups | Yes | No |
| Fees | Usually none | Many types |

---

## 🎨 Color Guide

In the calculator:

- 💚 **Green** - Income/gains (top-ups, interest)
- ❤️ **Red** - Losses (withdrawals)
- 💙 **Blue** - Neutral info
- 🟠 **Orange** - Warnings (inflation)

---

## ⌨️ Keyboard Shortcuts

- **Tab** - Move between fields
- **Enter** - Confirm input
- **Arrow keys** - Adjust sliders
- **Ctrl/Cmd + S** - Save (planned)
- **Ctrl/Cmd + P** - Print (planned)

---

## 🐛 Troubleshooting

### Issue: Results seem wrong
**Solution**: Check that rate is annual (not monthly)

### Issue: Can't set withdrawal
**Solution**: Enable checkbox first, then set values

### Issue: Calculator not updating
**Solution**: Refresh page, check console for errors

### Issue: Schedule table empty
**Solution**: Ensure all required fields are filled

---

## 📞 Need Help?

**Documentation**: See DEPOSIT_CALCULATOR_GUIDE.md for complete guide

**Examples**: Scroll through this file for more examples

**Support**: Check console logs for technical issues

---

## 🎯 Pro Tips

### For Savers

💡 Start early - time is your friend
💡 Be consistent - regular deposits matter
💡 Don't touch it - let compound interest work
💡 Reinvest interest - maximize capitalization
💡 Diversify - don't put all eggs in one basket

### For Comparing Banks

💡 Look at effective rate, not nominal
💡 Check capitalization frequency
💡 Read about early withdrawal penalties
💡 Consider deposit insurance limits
💡 Check bank reliability ratings

### For Goal Planning

💡 Work backwards from goal amount
💡 Adjust term to match target date
💡 Factor in inflation
💡 Add buffer for emergencies
💡 Review and adjust quarterly

---

## 📊 Real-World Example

**Goal**: Save 100,000 UAH in 2 years

**Strategy 1**: Lump sum
```
Deposit: 88,000 UAH today
Rate: 12%
Term: 24 months
Capitalization: Monthly
Result: 100,200 UAH ✓
```

**Strategy 2**: Regular saving
```
Initial: 20,000 UAH
Monthly: 3,000 UAH
Rate: 12%
Term: 24 months
Capitalization: Monthly
Result: 100,400 UAH ✓
```

Both work! Choose based on your cash flow.

---

## 🌟 Summary

The Deposit Calculator helps you:

✅ Plan savings goals
✅ Compare bank offers
✅ Understand compound interest
✅ Maximize returns
✅ Make informed decisions
✅ See long-term projections
✅ Factor in inflation
✅ Optimize deposit strategy

**Try it now**: [http://localhost:3000/calc/deposit](http://localhost:3000/calc/deposit)

---

**Version**: 1.0
**Status**: ✅ Production Ready
**Last Updated**: 2026-03-13

💰 **Happy Saving!** 💰
