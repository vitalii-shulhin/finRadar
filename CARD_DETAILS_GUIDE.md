# 💳 Card Detail Pages Guide

Complete guide for individual card detail pages.

## 📍 Location

**URL Pattern**: `/cards/[id]`

**Examples:**
- ПриватБанк Універсальна: `/cards/1`
- Monobank Єдина картка: `/cards/2`
- ПриватБанк Пільгова: `/cards/3`

**Access from:**
- Cards listing page → Click "Детальніше" button
- Direct URL with card ID
- Search results (future)

## 🎯 Features

### Page Sections

**1. Hero Section**
- Visual card representation
- Bank logo and name
- Card name and type
- Key metrics (4 boxes):
  - Credit limit (credit cards)
  - Grace period (credit cards)
  - Cashback rate
  - Annual fee
- Star rating with review count
- Primary CTAs (Order, Call, Share)

**2. Description**
- Brief overview of the card
- Target audience
- Main benefits summary

**3. Advantages (Collapsible)**
- Detailed list of benefits
- 8-10 key advantages
- Checkmark icons
- Expandable section

**4. Requirements (Collapsible)**
- Age restrictions
- Required documents
- Employment requirements
- Income verification needs

**5. Conditions (Collapsible)**
- Issuance time
- Card validity period
- Supported currencies
- Payment system
- Contactless support

**6. Fees & Commissions (Collapsible)**
- Card issuance fee
- Annual service fee
- SMS notifications
- Card replacement
- Cash withdrawal fees (own/other/abroad ATMs)

**7. Warnings (Collapsible)**
- Late payment penalties
- Interest rate after grace period
- Minimum payment requirements
- Other important information

**8. Customer Reviews**
- User testimonials
- Star ratings
- Review dates
- Review form (expandable)

**9. Sidebar**
- Quick actions
- Key features list
- Security information
- Related links

## 🎨 Visual Design

### Hero Card Visual

```
┌─────────────────────────────────┐
│ 🏦                    Platinum  │
│                                  │
│                                  │
│ Універсальна                     │
│ ПриватБанк                       │
│                                  │
│ Кредитна               💳        │
└─────────────────────────────────┘
```

### Color Scheme
- Background: Gradient matching bank brand
- Cards: White with subtle shadows
- Sections: Collapsible accordions
- Icons: Contextual colors (green=good, orange=warning)
- CTA buttons: Primary blue

### Layout

```
┌──────────────────────────────────────────────────┐
│ Breadcrumb: Home / Cards / [Card Name]          │
└──────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────┐
│          HERO SECTION (Gradient)                 │
│  ┌─────────┐  Card Name                         │
│  │ Visual  │  Key Metrics [4 boxes]             │
│  │  Card   │  ★★★★★ 4.8 (1245)                  │
│  └─────────┘  [Order] [Call] [Share]            │
└──────────────────────────────────────────────────┘

┌────────────────────────┬─────────────────────────┐
│   MAIN CONTENT (2/3)   │   SIDEBAR (1/3)         │
│                        │                          │
│  📝 Description         │  🎯 Quick Actions        │
│                        │  [Order Card]            │
│  ✓ Advantages ▼        │  [Calculator]            │
│                        │  [Compare]               │
│  👤 Requirements ▼     │                          │
│                        │  ✨ Key Features         │
│  📄 Conditions ▼       │  • Feature 1             │
│                        │  • Feature 2             │
│  💰 Fees ▼             │                          │
│                        │  🛡️ Security             │
│  ⚠️  Warnings ▼        │  • 3D Secure             │
│                        │  • Insurance             │
│  ⭐ Reviews            │                          │
│  [Review Form]         │                          │
│  • User 1 ★★★★★       │                          │
│  • User 2 ★★★★☆       │                          │
└────────────────────────┴─────────────────────────┘
```

## 📊 Data Structure

### Card Detail Interface

```typescript
interface CardDetail {
  // Basic info
  id: number;
  bank: string;
  bankLogo: string;
  name: string;
  type: 'credit' | 'debit';
  variant: string;

  // Metrics
  creditLimit?: string;
  gracePeriod?: number;
  cashback?: string;
  annualFee?: string;
  interestRate?: string;
  annualPercentageRate?: string;

  // Stats
  rating: number;
  reviews: number;

  // Display
  features: string[];
  color: string;
  description: string;

  // Details
  requirements: {
    age: string;
    documents: string[];
    employment: string;
    income?: string;
  };

  advantages: string[];

  conditions: {
    issuanceTime: string;
    cardValidity: string;
    currency: string[];
    paymentSystem: string;
    contactless: boolean;
  };

  fees: {
    issuance: string;
    annual: string;
    sms: string;
    replacement: string;
  };

  cashWithdrawal: {
    ownAtm: string;
    otherAtm: string;
    abroad: string;
  };

  warnings: string[];

  userReviews: {
    author: string;
    date: string;
    rating: number;
    text: string;
  }[];
}
```

## 🔍 Collapsible Sections

### How It Works

1. **Default State**: "Advantages" section expanded
2. **Toggle**: Click header to expand/collapse
3. **Icon**: ChevronUp when open, ChevronDown when closed
4. **Animation**: Smooth height transition
5. **State**: Only one can be open at a time (optional)

### Section Icons
- ✅ Advantages: CheckCircle (green)
- 👤 Requirements: User (primary)
- 📄 Conditions: FileText (primary)
- 💰 Fees: Banknote (primary)
- ⚠️ Warnings: AlertTriangle (orange)

## 💬 Reviews Section

### Features
- Display existing reviews
- Star rating per review
- Review date
- User name (first name + initial)
- Review text
- "Leave review" button
- Expandable review form

### Review Form
```
[ ] ★ ★ ★ ★ ★  (Select rating)
[Text area for review]
[Publish] [Cancel]
```

## 🎯 User Journeys

### Journey 1: Research Card
```
Cards List → Click "Детальніше"
  → View hero metrics
  → Read advantages
  → Check fees
  → Read reviews
  → Decide to order
```

### Journey 2: Compare Details
```
Card A details → Back to list
  → Card B details
  → Compare mentally
  → Choose best option
```

### Journey 3: Apply for Card
```
Detail page → Check requirements
  → Confirm eligibility
  → Click "Order"
  → External application
```

## 📱 Responsive Behavior

### Desktop (> 1024px)
- 2-column layout (main + sidebar)
- Sidebar sticky
- All sections visible
- Large hero card visual

### Tablet (768px - 1024px)
- Sidebar below content
- Adjusted spacing
- Medium card visual

### Mobile (< 768px)
- Single column
- Stacked sections
- Small card visual
- Full-width buttons

## 🔗 Navigation

### Breadcrumb
```
Home / Картки / [Bank] [Card Name]
```

### Back Links
- "← Назад до всіх карток" in hero
- Breadcrumb links
- Header navigation

### Related Links
- Back to cards list
- Credit calculator
- Other cards comparison
- Similar cards (future)

## 💡 Tips for Users

### Understanding Metrics

**Credit Limit:**
- Maximum you can borrow
- Increases with good history
- Consider your needs

**Grace Period:**
- Interest-free days
- Only for credit cards
- Longer is better

**Cashback:**
- Money returned on purchases
- Check categories and limits
- Partners may vary

**Annual Fee:**
- Yearly cost
- Many cards are free
- Compare total costs

### Reading Reviews

✅ Look for recent reviews (last 3 months)
✅ Read both positive and negative
✅ Check for common themes
✅ Consider reviewer's use case
✅ Note bank's responses

## 🛠️ Customization

### Adding New Card Details

1. Add to `cardsDetailData.ts`:
```typescript
export const CARDS_DETAIL_DATA = {
  // ...existing cards
  9: {
    id: 9,
    bank: 'NewBank',
    name: 'New Card',
    // ...all required fields
  },
};
```

2. Card ID must match list page
3. Include all required fields
4. Add 2-3 reviews minimum

### Modifying Sections

**Add New Section:**
1. Add state for expansion
2. Create section in main content
3. Add collapsible button
4. Add content container

**Change Default Open:**
```typescript
const [expandedSection, setExpandedSection] = useState('fees');
// Change 'advantages' to any section name
```

## 🎨 Styling Guide

### Hero Card Visual
- Width: 320px (80rem)
- Height: 192px (48rem)
- Rounded: 2xl (1rem)
- Background: white/10 with blur
- Border: white/20

### Metric Boxes
- 4 columns on desktop
- 2 columns on mobile
- Background: white/10 blur
- Border: white/20
- Padding: 1rem

### Section Cards
- White background
- Rounded: lg
- Shadow: md
- Hover: xl shadow

## 🚀 Performance

### Optimization
- Client component (interactive)
- Data imported from separate file
- Lazy load reviews
- Optimized images (if real logos)
- Minimal re-renders

### Loading
- Instant page load (static)
- No API calls
- Fast navigation
- Smooth transitions

## 📊 Analytics Opportunities

Track:
- Most viewed cards
- Time spent on each section
- Which sections expanded most
- CTA button clicks
- Review form submissions
- External link clicks

## 🔜 Future Enhancements

### Phase 1 (v1.5)
- [ ] Real user reviews
- [ ] Review moderation
- [ ] Review voting (helpful/not)
- [ ] Image gallery
- [ ] Video reviews
- [ ] Social sharing

### Phase 2 (v2.0)
- [ ] Live chat support
- [ ] Q&A section
- [ ] Comparison with similar cards
- [ ] Application form integration
- [ ] Document upload
- [ ] Instant approval status

### Phase 3 (v2.5)
- [ ] Virtual card preview
- [ ] Spending calculator
- [ ] Cashback calculator
- [ ] Payment simulator
- [ ] ROI calculator

## 🐛 Troubleshooting

### Card Not Found
- Check card ID in URL
- Verify card exists in data
- Check data import
- Fallback 404 page shown

### Sections Not Expanding
- Check useState hook
- Verify toggle function
- Check section names match

### Reviews Not Showing
- Check userReviews array
- Verify data structure
- Check map function

## 📞 Support

### Common Questions

**Q: How to order a card?**
A: Click "Замовити картку" button

**Q: Are reviews real?**
A: Sample reviews for demonstration

**Q: Can I leave a review?**
A: Form available (not yet functional)

**Q: Where are images?**
A: Using emoji placeholders (can be replaced)

---

**Page Version**: 1.0
**Last Updated**: 2026-03-13
**Status**: ✅ Production Ready
**Total Detail Pages**: Dynamic (based on card data)

💳 **Comprehensive card information!** 💳
