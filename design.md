# 🎨 Design Document - SpendWise

## 1. Arsitektur Aplikasi

### 1.1 Arsitektur Tingkat Tinggi

```
┌─────────────────────────────────────────┐
│           Browser (Client)              │
├─────────────────────────────────────────┤
│  ┌───────────────────────────────────┐  │
│  │         index.html (View)         │  │
│  │  - Header & Navigation            │  │
│  │  - Balance Card                   │  │
│  │  - Form Input                     │  │
│  │  - Chart Display                  │  │
│  │  - Transaction List               │  │
│  └───────────────────────────────────┘  │
│                  ↕                       │
│  ┌───────────────────────────────────┐  │
│  │      app.js (Controller)          │  │
│  │  - Event Handlers                 │  │
│  │  - Business Logic                 │  │
│  │  - Data Management                │  │
│  │  - Rendering Functions            │  │
│  └───────────────────────────────────┘  │
│                  ↕                       │
│  ┌───────────────────────────────────┐  │
│  │   localStorage (Model/Storage)    │  │
│  │  - Transaction Data               │  │
│  │  - Theme Preference               │  │
│  └───────────────────────────────────┘  │
│                  ↕                       │
│  ┌───────────────────────────────────┐  │
│  │      Chart.js (Library)           │  │
│  │  - Doughnut Chart Rendering       │  │
│  └───────────────────────────────────┘  │
└─────────────────────────────────────────┘
```

### 1.2 Pattern: MVC-like Architecture

- **Model**: Data disimpan di localStorage, diakses melalui state `transactions`
- **View**: HTML template dan rendering functions
- **Controller**: Event handlers dan business logic di app.js

## 2. Struktur Data

### 2.1 State Management

```javascript
// Global State
let transactions = [];  // Array of transaction objects
let chart = null;       // Chart.js instance

// Constants
const STORAGE_KEY = 'expenseTrackerData';
const THEME_KEY = 'expenseTrackerTheme';
const SPENDING_LIMIT = 1000;
```

### 2.2 Transaction Schema

```javascript
{
  id: 1678901234567,              // Unique identifier (timestamp)
  name: "Coffee at Starbucks",    // Item description
  amount: 14.50,                  // Expense amount (float)
  category: "Food",               // Category enum
  date: "2026-04-03T10:30:00Z"   // ISO 8601 timestamp
}
```

### 2.3 Category Configuration

```javascript
const CATEGORIES = {
  Food: {
    emoji: '🍔',
    color: 'rgba(16, 185, 129, 0.8)',  // Green
    borderColor: 'rgba(16, 185, 129, 1)'
  },
  Transport: {
    emoji: '🚗',
    color: 'rgba(59, 130, 246, 0.8)',  // Blue
    borderColor: 'rgba(59, 130, 246, 1)'
  },
  Fun: {
    emoji: '🎉',
    color: 'rgba(245, 158, 11, 0.8)',  // Orange
    borderColor: 'rgba(245, 158, 11, 1)'
  }
};
```

## 3. Alur Data (Data Flow)

### 3.1 Add Transaction Flow

```
User Input → Form Submit Event
    ↓
Validate Form Data
    ↓
Create Transaction Object
    ↓
Add to transactions Array
    ↓
Save to localStorage
    ↓
Trigger render()
    ↓
Update: Balance + List + Chart
```

### 3.2 Delete Transaction Flow

```
User Click Delete Button
    ↓
Get Transaction ID
    ↓
Filter transactions Array
    ↓
Save to localStorage
    ↓
Trigger render()
    ↓
Update: Balance + List + Chart
```

### 3.3 Sort Transaction Flow

```
User Select Sort Option
    ↓
Get Sort Type
    ↓
Sort transactions Array (in-place)
    ↓
Trigger renderTransactions()
    ↓
Update List Only
```

## 4. Komponen UI

### 4.1 Layout Grid

```
┌─────────────────────────────────────────┐
│            Header (Logo + Theme)        │
├─────────────────────────────────────────┤
│  ┌─────────────┐  ┌─────────────────┐  │
│  │   Balance   │  │   Input Form    │  │
│  │    Card     │  │                 │  │
│  └─────────────┘  └─────────────────┘  │
│  ┌─────────────┐  ┌─────────────────┐  │
│  │    Chart    │  │  Transactions   │  │
│  │             │  │      List       │  │
│  └─────────────┘  └─────────────────┘  │
└─────────────────────────────────────────┘
```

### 4.2 Component Breakdown

#### Header Component
- Logo dengan icon 💰
- Judul aplikasi "SpendWise"
- Theme toggle button (🌙/☀️)

#### Balance Card Component
- Icon 💵
- Label "Total Spending"
- Amount display dengan format currency
- Progress bar (visual indicator)
- Limit text "$1,000.00"

#### Form Component
- Header dengan icon ➕
- Input fields:
  - Item Name (text input)
  - Amount (number input)
  - Category (select dropdown)
- Submit button dengan arrow icon

#### Chart Component
- Header dengan icon 📊
- Canvas element untuk Chart.js
- Doughnut chart dengan legend

#### Transaction List Component
- Header dengan icon 📋
- Sort dropdown
- Scrollable list container
- Transaction items atau empty state

#### Transaction Item Component
- Category emoji
- Item name
- Amount dengan format currency
- Category badge
- Delete button

## 5. Styling Architecture

### 5.1 CSS Organization

```css
/* 1. CSS Variables (Theme Colors) */
:root { ... }
body.dark-mode { ... }

/* 2. Reset & Base Styles */
* { box-sizing, margin, padding }
body { font, background }

/* 3. Layout Components */
.container { max-width, padding }
.dashboard-grid { grid layout }

/* 4. UI Components */
.glass-effect { glassmorphism }
.btn-primary { button styles }
.form-group { form styles }

/* 5. Specific Components */
.balance-card { ... }
.chart-card { ... }
.transaction-item { ... }

/* 6. Animations */
@keyframes { ... }

/* 7. Responsive */
@media queries
```

### 5.2 Design System

#### Colors (Light Mode)
```css
--bg-primary: #f0f9ff;        /* Sky blue background */
--bg-secondary: #ffffff;      /* White cards */
--text-primary: #1e293b;      /* Dark text */
--text-secondary: #64748b;    /* Gray text */
--accent: #3b82f6;            /* Blue accent */
--success: #10b981;           /* Green */
--warning: #f59e0b;           /* Orange */
--danger: #ef4444;            /* Red */
```

#### Colors (Dark Mode)
```css
--bg-primary: #0f172a;        /* Dark blue background */
--bg-secondary: #1e293b;      /* Dark cards */
--text-primary: #f1f5f9;      /* Light text */
--text-secondary: #94a3b8;    /* Light gray text */
```

#### Typography
```css
Font Family: 'Segoe UI', system-ui, sans-serif
Font Sizes:
  - Heading 1: 2rem (32px)
  - Heading 2: 1.75rem (28px)
  - Heading 3: 1.25rem (20px)
  - Body: 1rem (16px)
  - Small: 0.875rem (14px)
```

#### Spacing Scale
```css
--spacing-xs: 0.5rem;   /* 8px */
--spacing-sm: 1rem;     /* 16px */
--spacing-md: 1.5rem;   /* 24px */
--spacing-lg: 2rem;     /* 32px */
--spacing-xl: 3rem;     /* 48px */
```

#### Border Radius
```css
--radius-sm: 8px;
--radius-md: 12px;
--radius-lg: 16px;
--radius-xl: 24px;
```

### 5.3 Glassmorphism Effect

```css
.glass-effect {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}
```

## 6. Interaksi & Animasi

### 6.1 Animations

#### Floating Animation (Icons)
```css
@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
}
```

#### Slide In Animation (Cards)
```css
@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

#### Progress Bar Animation
```css
.balance-progress {
  transition: width 0.5s ease-in-out;
}
```

### 6.2 Hover Effects

- Buttons: Scale up + shadow increase
- Transaction items: Background color change
- Delete button: Color change to red
- Form inputs: Border color change

### 6.3 Transitions

```css
transition: all 0.3s ease;  /* Default */
transition: transform 0.2s ease;  /* Hover effects */
transition: width 0.5s ease-in-out;  /* Progress bar */
```

## 7. Responsive Design

### 7.1 Breakpoints

```css
/* Mobile First Approach */
/* Base: 320px - 767px (Mobile) */

@media (min-width: 768px) {
  /* Tablet: 768px - 1023px */
  .dashboard-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  /* Desktop: 1024px+ */
  .dashboard-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
```

### 7.2 Grid Layout Adaptation

#### Mobile (< 768px)
```
┌─────────────┐
│   Balance   │
├─────────────┤
│    Form     │
├─────────────┤
│    Chart    │
├─────────────┤
│    List     │
└─────────────┘
```

#### Tablet/Desktop (≥ 768px)
```
┌──────────┬──────────┐
│ Balance  │   Form   │
├──────────┼──────────┤
│  Chart   │   List   │
└──────────┴──────────┘
```

## 8. Chart Configuration

### 8.1 Chart.js Setup

```javascript
{
  type: 'doughnut',
  data: {
    labels: ['🍔 Food', '🚗 Transport', '🎉 Fun'],
    datasets: [{
      data: [300, 150, 100],
      backgroundColor: [
        'rgba(16, 185, 129, 0.8)',
        'rgba(59, 130, 246, 0.8)',
        'rgba(245, 158, 11, 0.8)'
      ],
      borderColor: [...],
      borderWidth: 2
    }]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '65%',  // Doughnut hole size
    plugins: {
      legend: {
        position: 'bottom',
        labels: { color, padding, font }
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            // Show amount and percentage
          }
        }
      }
    }
  }
}
```

### 8.2 Chart Update Strategy

- Create chart once on first render
- Update data and colors on subsequent renders
- Call `chart.update()` instead of recreating
- Update legend colors when theme changes

## 9. LocalStorage Strategy

### 9.1 Storage Structure

```javascript
// Key: 'expenseTrackerData'
// Value: JSON string of transactions array
localStorage.setItem('expenseTrackerData', JSON.stringify([
  { id: 1, name: "Coffee", amount: 5.50, category: "Food", date: "..." },
  { id: 2, name: "Taxi", amount: 15.00, category: "Transport", date: "..." }
]));

// Key: 'expenseTrackerTheme'
// Value: 'dark' or 'light'
localStorage.setItem('expenseTrackerTheme', 'dark');
```

### 9.2 Data Persistence Flow

```
App Load → loadFromStorage() → Parse JSON → Set state
    ↓
User Action → Modify state → saveToStorage() → Stringify JSON
```

### 9.3 Error Handling

```javascript
try {
  const data = localStorage.getItem(STORAGE_KEY);
  if (data) {
    transactions = JSON.parse(data);
  }
} catch (error) {
  console.error('Failed to load data:', error);
  transactions = [];
}
```

## 10. Event Handling

### 10.1 Event Listeners Setup

```javascript
// Form submission
document.getElementById('transactionForm')
  .addEventListener('submit', handleAddTransaction);

// Sort change
document.getElementById('sortBy')
  .addEventListener('change', handleSort);

// Theme toggle
document.getElementById('themeToggle')
  .addEventListener('click', toggleTheme);

// Delete buttons (delegated)
// onclick="deleteTransaction(id)" in HTML
```

### 10.2 Event Handler Functions

```javascript
handleAddTransaction(e) {
  e.preventDefault();
  // 1. Get form values
  // 2. Validate
  // 3. Create transaction
  // 4. Update state
  // 5. Save to storage
  // 6. Render
  // 7. Reset form
}

handleSort() {
  // 1. Get sort type
  // 2. Sort transactions array
  // 3. Re-render list only
}

toggleTheme() {
  // 1. Toggle dark-mode class
  // 2. Update icon
  // 3. Save preference
  // 4. Update chart colors
}

deleteTransaction(id) {
  // 1. Filter transactions
  // 2. Update state
  // 3. Save to storage
  // 4. Render all
}
```

## 11. Rendering Strategy

### 11.1 Render Functions

```javascript
render() {
  renderBalance();
  renderTransactions();
  renderChart();
}

renderBalance() {
  // 1. Calculate total
  // 2. Update balance text
  // 3. Update progress bar width
  // 4. Add/remove over-limit class
}

renderTransactions() {
  // 1. Check if empty
  // 2. Map transactions to HTML
  // 3. Update innerHTML
}

renderChart() {
  // 1. Calculate category totals
  // 2. Prepare chart data
  // 3. Create or update chart
}
```

### 11.2 Render Optimization

- Only re-render affected components
- Use `innerHTML` for list (simple and fast)
- Reuse chart instance (update instead of recreate)
- Debounce not needed (operations are fast)

## 12. Accessibility Considerations

### 12.1 Semantic HTML

```html
<header> - App header
<main> - Main content
<form> - Input form
<button> - Interactive elements
<label> - Form labels
```

### 12.2 ARIA Attributes (Future Enhancement)

```html
<button aria-label="Delete transaction">Delete</button>
<div role="alert" aria-live="polite">Over spending limit!</div>
```

### 12.3 Keyboard Navigation

- All interactive elements focusable
- Tab order follows visual order
- Enter key submits form
- Escape key could close modals (future)

### 12.4 Color Contrast

- Text contrast ratio ≥ 4.5:1 (WCAG AA)
- Interactive elements ≥ 3:1
- Focus indicators visible

## 13. Performance Considerations

### 13.1 Optimization Techniques

- Minimal DOM manipulation
- Event delegation for dynamic elements
- CSS animations (GPU accelerated)
- Lazy chart initialization
- Efficient array operations

### 13.2 Bundle Size

- No build process needed
- Single CSS file (~5KB)
- Single JS file (~8KB)
- Chart.js from CDN (~200KB)
- Total: ~213KB (acceptable for web app)

## 14. Browser Compatibility

### 14.1 Required Features

- ES6+ (arrow functions, let/const, template literals)
- localStorage API
- CSS Grid
- CSS Custom Properties (variables)
- backdrop-filter (glassmorphism)

### 14.2 Fallbacks

- No fallback for localStorage (required)
- Graceful degradation for backdrop-filter
- Chart.js handles canvas fallback

## 15. Security Considerations

### 15.1 XSS Prevention

- No user HTML input (only text and numbers)
- No `eval()` or `innerHTML` with user data
- Form validation prevents injection

### 15.2 Data Privacy

- No external API calls
- No tracking scripts
- No cookies
- Data stays in browser

## 16. Testing Strategy (Manual)

### 16.1 Functional Tests

- Add transaction with valid data
- Add transaction with invalid data
- Delete transaction
- Sort transactions (all options)
- Toggle theme
- Refresh page (data persistence)
- Clear localStorage (empty state)

### 16.2 UI Tests

- Responsive layout (mobile, tablet, desktop)
- Dark/light mode appearance
- Animations and transitions
- Chart rendering
- Empty state display

### 16.3 Browser Tests

- Chrome, Firefox, Safari, Edge
- Mobile browsers (iOS Safari, Chrome Mobile)

## 17. Future Design Improvements

- Custom category colors
- Animated transitions between views
- Drag-to-delete gesture
- Swipe actions on mobile
- Confetti animation on savings milestone
- Dark mode auto-detection (prefers-color-scheme)
- Skeleton loading states
- Toast notifications instead of alerts
