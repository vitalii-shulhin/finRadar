# Insurance (OSAGO) Page Guide

## Overview
The insurance page provides a comprehensive comparison tool for OSAGO/ОСЦПВ (mandatory car insurance) in Ukraine, similar to finance.ua's insurance section.

## Pages Created

### 1. Insurance Hub (`/insurance`)
- Overview of all insurance types
- OSAGO, KASKO, Property, Health, Travel, Business, Life insurance
- Educational content about choosing insurance
- Links to specific insurance products

### 2. OSAGO Insurance Page (`/insurance/osago`)
Full-featured insurance comparison with calculator and product listings

## Key Features

### Interactive Calculator
**Parameters:**
- **Vehicle Type**: Car, Truck, Motorcycle, Bus (with emoji icons)
- **Benefit Status**: None, Veteran (50%), Disabled (50%), Chornobyl (50%), Pensioner (30%), Participant (50%)
- **Engine Volume**: 800-5000 cm³ (slider)
- **Vehicle Age**: 0-30 years (slider)

**Price Calculation Logic:**
```javascript
Base price = 4,000 UAH
× Vehicle type multiplier (car: 1x, truck: 1.5x, motorcycle: 0.7x, bus: 1.8x)
× Engine volume factor (<1500: 0.9x, >2500: 1.3x, 2000-2500: 1.15x)
× Vehicle age factor (>10 years: 1.1x, <3 years: 0.95x)
× Benefit discount (veteran/disabled/chornobyl/participant: 0.5x, pensioner: 0.7x)
```

**Real-time Updates:** Calculator updates instantly as parameters change

### Insurance Companies (6 Products)

1. **ARX** - Recommended & Popular
   - From 4,308 UAH
   - 15% discount, 5-minute processing
   - Installments: 3, 6 months

2. **УСК АСКА** - Popular
   - From 4,500 UAH
   - 10% discount, 15-minute processing
   - Installments: 4 months

3. **ТАС**
   - From 4,700 UAH
   - 12% discount, 10-minute processing
   - Installments: 3 months

4. **Уніка**
   - From 4,600 UAH
   - 8% discount, 20-minute processing
   - Installments: 2 months

5. **Країна** - Recommended
   - From 4,400 UAH
   - 10% discount, 10-minute processing
   - Installments: 6 months

6. **ВУСО**
   - From 4,800 UAH
   - 7% discount, 15-minute processing
   - Installments: 3 months

### Filtering System

**Available Filters:**
1. **Max Price Slider** (4,000 - 10,000 UAH)
2. **Only with Installments** (checkbox)
3. **Insurance Company** (multi-select checkboxes)

**Visual Feedback:**
- Active filter counter badge
- Filter count display
- Disabled state for inactive filters
- Real-time results counter

### Sorting Options
- **Recommended**: Shows recommended first, then by rating
- **By Price**: Lowest price first
- **By Rating**: Highest rating first
- **By Discount**: Highest discount first

### Product Cards Display

**Each card shows:**
- Company logo (emoji) and name
- Badges: Recommended, Popular, Discount %
- Rating with stars and review count
- Processing time
- Price range (min - max)
- Key metrics in colored boxes:
  - Coverage limit (130,000 UAH)
  - Processing time
  - Installments availability
  - Online application status
- Features list with checkmarks
- Payment plan options
- Action buttons: "Оформити онлайн" and "Зателефонувати"

### Information Sections

#### What is Covered
- Third-party property damage
- Third-party health/life damage
- Coverage limit: 130,000 UAH per incident
- Legal defense costs

#### What is NOT Covered
- Your own vehicle damage
- Your own health damage
- Vehicle theft
- Accidents under influence

#### FAQ Section (6 Questions)
- Expandable accordion-style
- Click to expand/collapse
- Topics:
  1. What is OSAGO?
  2. What does OSAGO cover?
  3. How is cost calculated?
  4. Who gets discounts?
  5. Can I apply online?
  6. What is Europrotocol?

## Technical Implementation

### State Management
- React hooks (useState, useMemo)
- Calculator parameters
- Filter selections
- Sort preferences
- FAQ expansion state

### Performance Optimization
- `useMemo` for filtered products
- `useMemo` for sorted products
- Only re-calculate when dependencies change

### Responsive Design
- Mobile-first approach
- Collapsible filters on mobile
- Toggle button for filter sidebar
- Grid layouts adapt to screen size

### Visual Design
- Gradient headers matching site theme
- Color-coded information cards
- Icon-based navigation
- Smooth transitions and hover effects
- Badge system for status indicators

## Testing Scenarios

### Test 1: Calculator
1. Select different vehicle types - watch price change
2. Adjust benefit status to "Ветеран" - see 50% discount
3. Change engine volume - price adjusts
4. Modify vehicle age - price updates

### Test 2: Filtering
1. Set max price to 5,000 UAH - see fewer products
2. Check "Only with installments" - all results support installments
3. Select specific companies - see only those
4. Combine filters - results update accordingly

### Test 3: Sorting
1. Sort by price - cheapest first
2. Sort by rating - highest rated first
3. Sort by discount - best deals first
4. Sort by recommended - see badges

### Test 4: FAQ
1. Click any question - expands with answer
2. Click another - previous closes, new opens
3. Click same question again - collapses

## URLs

- **Insurance Hub**: http://localhost:3001/insurance
- **OSAGO Page**: http://localhost:3001/insurance/osago
- **Navigation**: Click "Страхування" in header menu

## Key Statistics Display

**Top Banner Shows:**
- Minimum price: from 4,308 UAH
- Coverage limit: 130,000 UAH
- Number of companies: 6
- Processing time: from 5 minutes

## Legal Compliance

All information reflects 2026 Ukrainian insurance regulations:
- Updated coverage limits (130,000 UAH since 2025)
- Proper benefit calculations
- Licensed insurance companies (NBU regulated)
- MTSBU registration (Motor Transport Insurance Bureau)

## Future Enhancements

The page structure supports easy addition of:
- KASKO insurance comparison
- Additional insurance types
- Real API integration
- Online payment processing
- Document upload
- Policy management dashboard
- Claim submission forms

## Mobile Experience

- Collapsible calculator
- Toggle filters button
- Stacked card layouts
- Touch-friendly controls
- Optimized slider controls
- Responsive grid systems

## Accessibility Features

- Semantic HTML structure
- Clear labels for form controls
- Keyboard navigation support
- Color contrast compliance
- Focus indicators
- Screen reader friendly

The page provides a complete insurance comparison experience matching the functionality of major Ukrainian financial portals!
