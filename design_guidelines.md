# Agricultural Advisory Mobile App Design Guidelines

## Design Approach
**Reference-Based Approach**: Drawing inspiration from productivity apps like WhatsApp (for chat interface), Google Pay (for mobile-first UX), and government apps like Aarogya Setu for accessibility and multilingual support.

## Core Design Elements

### A. Color Palette
**Primary Colors:**
- Light Mode: 120 60% 35% (Agricultural green)
- Dark Mode: 120 40% 20% (Darker green)
- Background: 45 15% 95% (Warm off-white) / 210 15% 8% (Dark)

**Accent Colors:**
- Success: 140 55% 45% (Crop health green)
- Warning: 35 85% 55% (Harvest gold)
- Error: 0 70% 50% (Disease red)

### B. Typography
- **Primary**: Inter (via Google Fonts)
- **Secondary**: Noto Sans Devanagari (for Hindi support)
- Sizes: text-sm, text-base, text-lg, text-xl, text-2xl

### C. Layout System
**Spacing**: Consistent use of Tailwind units 2, 4, 6, and 8 (p-2, m-4, gap-6, h-8)
**Grid**: Mobile-first with single column layout, cards with rounded-lg borders

### D. Component Library

**Navigation:**
- Bottom navigation with 5 tabs: Subscription | Profile | Home (center, prominent) | Schemes | Feedback
- Home tab uses a distinctive farm/leaf icon

**Cards:**
- Rounded-lg with subtle shadow
- Weather Update: Large card with current conditions and 3-day forecast
- Crop Advisory: Split into two action buttons - "AI Advisory" and "AgriExpert" 
- Camera: Single card with camera icon, opens dual popup (Document | Real Image)

**Authentication:**
- Clean mobile number input with country code selector
- OTP verification with auto-fill support
- Progressive user detail collection form

**Popups/Modals:**
- Backdrop blur with rounded-xl containers
- Clear action buttons with adequate touch targets (44px minimum)

### E. Key Features Layout

**Home Screen:**
1. Weather Update card (current + forecast)
2. Crop Advisory card (dual buttons)
3. Camera card (document/image capture)
4. Quick access to schemes and alerts

**Language Support:**
- Language selector in profile
- RTL support for applicable languages
- Voice input buttons throughout

### F. Accessibility & Mobile Optimization
- Large, finger-friendly touch targets
- High contrast ratios for outdoor visibility
- Voice support indicators
- Offline-first design with sync indicators
- Battery-conscious dark mode as default

**Visual Hierarchy:**
- Primary actions use solid buttons with primary colors
- Secondary actions use outline buttons
- Critical alerts use warning colors
- Success states use agricultural green palette

The design emphasizes simplicity, accessibility, and cultural relevance for Indian farmers while maintaining modern mobile app standards.