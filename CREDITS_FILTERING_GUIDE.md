# Credits Page Filtering Guide

## Overview
The `/credits/online` page now has a fully functional filtering system that allows users to find the best loan offers based on their needs.

## Filtering Features

### 1. **Loan Amount Filter** (Main Calculator)
- Range: 100 ₴ to 100,000 ₴
- **How it works**: Only shows loans where the selected amount is within the lender's min/max range
- **Example**: If you select 5,000 ₴, only loans supporting 5,000 ₴ or more will appear

### 2. **Loan Term Filter** (Main Calculator)
- Range: 1 to 365 days
- **How it works**: Only shows loans where the selected term is within the lender's min/max term
- **Example**: If you select 90 days, only loans supporting 90 days or more will appear

### 3. **Interest Rate Filter** (Sidebar)
- Range: 0% to 2% per day
- **Visual feedback**: Border turns blue when filter is active
- **Shows**: Current min/max values above inputs
- **Quick reset**: "Скинути" button appears when modified

### 4. **Lender Filter** (Sidebar)
- Checkboxes for each lender
- **Dynamic counts**: Shows how many products are available from each lender based on current amount/term
- **Disabled state**: Lenders with 0 matching products are grayed out
- **Visual feedback**: Selected lenders have a light blue background
- **Shows**: Number of selected lenders in header

## Visual Feedback

### Active Filters Badge
- Top of filters sidebar shows count of active filters
- "Скинути все" button becomes disabled when no filters are active

### Active Filter Pills
- Displays above the results showing which filters are applied
- Click the "✕" on any pill to remove that specific filter
- Includes:
  - Selected lenders (blue pills)
  - Interest rate range (orange pill)

### Results Counter
- Shows in the sort bar: "Знайдено: X пропозицій"
- Updates in real-time as filters change
- Also updates in the summary cards at the top

### Lender List Feedback
- Available count shown in colored badge (blue for available, gray for 0)
- Selected lenders have background highlight
- Unavailable lenders are grayed out and disabled

## Reset Functionality

### Multiple Reset Options:
1. **"Скинути все"** (Reset All) - Resets ALL filters including amount and term
2. **Individual filter resets**:
   - Interest rate "Скинути" button
   - Click "✕" on active filter pills
   - Uncheck lender checkboxes

### Default Values:
- Loan Amount: 10,000 ₴
- Loan Term: 30 days
- Interest Rate: 0% - 2%
- Lenders: None selected (all shown)

## No Results State

When no products match the filters:
- Shows a helpful message
- Displays current filter parameters
- Offers "Скинути всі фільтри" button to reset everything

## How Filtering Works (Technical)

The filtering happens in stages:
1. **Amount filter**: `loanAmount >= minAmount && loanAmount <= maxAmount`
2. **Term filter**: `loanTerm >= minTerm && loanTerm <= maxTerm`
3. **Lender filter**: If any lenders selected, show only those
4. **Rate filter**: `interestRateValue >= minRate && interestRateValue <= maxRate`

All filters work together (AND logic), meaning a product must pass ALL active filters to appear.

## Sorting Options

After filtering, results can be sorted by:
- **Рекомендовані** (Recommended) - Shows recommended first, then by rating
- **За ставкою** (By rate) - Lowest interest rate first
- **За максимальною сумою** (By amount) - Highest max amount first
- **За швидкістю схвалення** (By approval rate) - Highest approval rate first
- **За часом видачі** (By approval time) - Fastest approval first

## Testing the Filters

### Test Scenario 1: Amount Filter
1. Set amount to 5,000 ₴
2. Notice "FastMoney" (max 5,000) is now included
3. Set amount to 6,000 ₴
4. Notice "FastMoney" disappears (max is 5,000)

### Test Scenario 2: Term Filter
1. Set term to 365 days
2. Notice only long-term lenders appear
3. Set term to 5 days
4. Notice short-term lenders appear

### Test Scenario 3: Lender Filter
1. Check only "Moneyveo"
2. See only Moneyveo products
3. Add "CreditKasa"
4. See both lenders' products
5. Click "✕" on pill to remove

### Test Scenario 4: Interest Rate Filter
1. Set min rate to 0.5%
2. Notice high-rate products disappear
3. Set max rate to 1%
4. See even fewer results
5. Click "Скинути" next to the filter title

### Test Scenario 5: Combined Filters
1. Amount: 15,000 ₴
2. Term: 60 days
3. Select "FerratumBank" and "CreditPlus"
4. Rate: 0.5% - 1.5%
5. See very specific results
6. Click "Скинути все" to reset

## Browser Access

Visit: http://localhost:3001/credits/online

The filtering works entirely client-side with React hooks and useMemo for performance optimization.
