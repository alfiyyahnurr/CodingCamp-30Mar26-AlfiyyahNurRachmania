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
│  │  - Category Modal                 │  │
│  │  - Summary Modal                  │  │
│  └───────────────────────────────────┘  │
│                  ↕                       │
│  ┌───────────────────────────────────┐  │
│  │      app.js (Controller)          │  │
│  │  - Event Handlers                 │  │
│  │  - Business Logic                 │  │
│  │  - Data Management                │  │
│  │  - Rendering Functions            │  │
│  │  - Category Management            │  │
│  │  - Summary Generation             │  │
│  └───────────────────────────────────┘  │
│                  ↕                       │
│  ┌───────────────────────────────────┐  │
│  │   localStorage (Model/Storage)    │  │
│  │  - Transaction Data               │  │
│  │  - Theme Preference               │  │
│  │  - Custom Categories              │  │
│  │  - Spending Limit                 │  │
│  └───────────────────────────────────┘  │
│                  ↕                       │
│  ┌───────────────────────────────────┐  │
│  │      Chart.js (Library)           │  │
│  │  - Doughnut Chart Rendering       │  │
│  └───────────────────────────────────┘  │
└─────────────────────────────────────────┘
```

### 1.2 Pattern: MVC-like Architecture

- **Model**: Data disimpan di localStorage, diakses melalui state variables
- **View**: HTML template dan rendering functions
- **Controller**: Event handlers dan business logic di app.js

## 2. Struktur Data

### 2.1 State Management

```javascript
// Global State
let transactions = [];           // Array of transaction objects
let chart = null;                // Chart.js instance
let categories = ['Food', 'Transport', 'Fun'];  // Dynamic categories
let spendingLimit = 1000;        // User-configurable limit

// Constants
const STORAGE_KEY = 'expenseTrackerData';
const THEME_KEY = 'expenseTrackerTheme';
const CATEGORIES_KEY = 'expenseTrackerCategories';
const LIMIT_KEY = 'expenseTrackerLimit';
```

### 2.2 Transaction Schema

```javascript
{
  id: 1678901234567,              // Unique identifier (timestamp)
  name: "Coffee at Starbucks",    // Item description
  amount: 14.50,                  // Expense amount (float)
  category: "Food",               // Category name (dynamic)
  date: "2026-04-03T10:30:00Z"   // ISO 8601 timestamp
}
```

### 2.3 Category Configuration

```javascript
// Dynamic categories array
let categories = ['Food', 'Transport', 'Fun'];

// Color palette for categories (9 colors)
const colors = [
  'rgba(16, 185, 129, 0.8)',   // Green
  'rgba(59, 130, 246, 0.8)',   // Blue
  'rgba(245, 158, 11, 0.8)',   // Orange
  'rgba(239, 68, 68, 0.8)',    // Red
  'rgba(168, 85, 247, 0.8)',   // Purple
  'rgba(236, 72, 153, 0.8)',   // Pink
  'rgba(20, 184, 166, 0.8)',   // Teal
  'rgba(251, 146, 60, 0.8)',   // Orange-red
  'rgba(132, 204, 22, 0.8)'    // Lime
];

// No emoji - clean text only
function getCategoryEmoji(category) {
  return '';  // Returns empty string
}
```

## 3. Alur Data (Data Flow)

### 3.1 Add Transaction Flow

```
User Input → Form Submit Event
    ↓
Validate Form Data
    ↓
Create Transaction Object (with date)
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

### 3.3 Add Category Flow

```
User Click "Manage Categories"
    ↓
Open Category Modal
    ↓
User Enter Category Name
    ↓
Validate (not empty, not duplicate)
    ↓
Add to categories Array
    ↓
Save to localStorage
    ↓
Update Category Dropdown
    ↓
Re-render Category List
```

### 3.4 Edit Spending Limit Flow

```
User Click "Edit" Button
    ↓
Show Prompt Dialog
    ↓
User Enter New Limit
    ↓
Validate (positive number)
    ↓
Update spendingLimit Variable
    ↓
Save to localStorage
    ↓
Re-render Balance Card
```

### 3.5 Monthly Summary Flow

```
User Click "Monthly Summary"
    ↓
Open Summary Modal
    ↓
Populate Month/Year Dropdowns
    ↓
Filter Transactions by Selected Month/Year
    ↓
Calculate Statistics
    ↓
Render Summary Content
```

## 4. Komponen UI

### 4.1 Layout Grid

```
┌─────────────────────────────────────────┐
│      Header (Logo + Theme Toggle)       │
├─────────────────────────────────────────┤
│  ┌─────────────────────────────────┐    │
│  │   Balance Card (with Edit)      │    │
│  └─────────────────────────────────┘    │
│  ┌─────────────┐  ┌─────────────────┐  │
│  │   Input     │  │  Transactions   │  │
│  │   Form      │  │      List       │  │
│  │  + Manage   │  │   (with Sort)   │  │
│  │  Categories │  │                 │  │
│  └─────────────┘  └─────────────────┘  │
│  ┌─────────────────────────────────┐    │
│  │    Chart (with Monthly Summary) │    │
│  └─────────────────────────────────┘    │
└─────────────────────────────────────────┘
```

### 4.2 Component Breakdown

#### Header Component
- Judul aplikasi "Expense & Budget Visualizer"
- Theme toggle button (text: "Light" / "Dark")

#### Balance Card Component
- Label "TOTAL BALANCE"
- Amount display dengan format currency
- Spending limit display dengan tombol "Edit"
- Progress bar (visual indicator)

#### Form Component
- Input fields:
  - Item Name (text input)
  - Amount (number input)
  - Category (select dropdown - dynamic)
  - Date (date input)
- Submit button "Add Transaction"
- "Manage Categories" button

#### Chart Component
- Header "Spending by Category"
- "Monthly Summary" button
- Canvas element untuk Chart.js
- Doughnut chart dengan legend (no emoji)

#### Transaction List Component
- Header "Transactions"
- Sort dropdown
- Scrollable list container
- Transaction items (no emoji) atau empty state

#### Transaction Item Component
- Item name
- Amount dengan format currency
- Category badge
- Delete button

#### Category Modal Component
- Modal header "Manage Categories"
- Close button (×)
- Category list (no emoji)
- Delete button per category
- Input field untuk kategori baru
- "Add" button

#### Monthly Summary Modal Component
- Modal header "Monthly Summary"
- Close button (×)
- Month dropdown
- Year dropdown
- Summary statistics:
  - Total Spending
  - Number of Transactions
  - Average per Transaction
  - Category breakdown (no emoji)

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
.main-content { grid layout }

/* 4. UI Components */
.card { card styles }
.btn-primary { button styles }
.form-group { form styles }

/* 5. Specific Components */
.balance-card { ... }
.chart-container { ... }
.transaction-item { ... }
.modal { ... }

/* 6. Animations */
@keyframes { ... }

/* 7. Responsive */
@media queries
```

### 5.2 Design System

#### Colors (Light Mode)
```css
--bg-primary: #f5f5f5;        /* Light gray background */
--bg-secondary: #ffffff;      /* White cards */
--text-primary: #333333;      /* Dark text */
--text-secondary: #666666;    /* Gray text */
--text-light: #999999;        /* Light gray text */
--border-color: #e0e0e0;      /* Border */
--accent: #3b82f6;            /* Blue accent */
--success: #10b981;           /* Green */
--warning: #f59e0b;           /* Orange */
--danger: #ef4444;            /* Red */
```

#### Colors (Dark Mode)
```css
--bg-primary: #1a1a1a;        /* Dark background */
--bg-secondary: #2d2d2d;      /* Dark cards */
--text-primary: #ffffff;      /* Light text */
--text-secondary: #cccccc;    /* Light gray text */
--text-light: #999999;        /* Gray text */
--border-color: #404040;      /* Dark border */
```

#### Typography
```css
Font Family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif
Font Sizes:
  - Heading 1: 24px
  - Heading 2: 48px (balance)
  - Heading 3: 18px
  - Body: 14px
  - Small: 12px
```

#### Spacing Scale
```css
--spacing-xs: 8px;
--spacing-sm: 12px;
--spacing-md: 20px;
--spacing-lg: 30px;
```

#### Border Radius
```css
--radius-sm: 6px;
--radius-md: 8px;
--radius-lg: 12px;
```

## 6. Interaksi & Animasi

### 6.1 Animations

#### Shake Animation (Over Limit)
```css
@keyframes shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-5px); }
  75% { transform: translateX(5px); }
}
```

#### Pulse Animation (Warning)
```css
@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.7; }
}
```

#### Progress Bar Animation
```css
.balance-progress {
  transition: width 0.5s ease;
}
```

### 6.2 Hover Effects

- Buttons: Background color change
- Transaction items: Background + transform
- Delete button: Opacity change
- Form inputs: Border color change

### 6.3 Transitions

```css
transition: all 0.3s ease;  /* Default */
transition: background 0.3s ease;  /* Buttons */
transition: width 0.5s ease;  /* Progress bar */
```

## 7. Responsive Design

### 7.1 Breakpoints

```css
/* Mobile First Approach */
/* Base: 320px - 767px (Mobile) */

@media (min-width: 768px) {
  /* Tablet/Desktop: 768px+ */
  .main-content {
    grid-template-columns: 1fr 1fr;
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
│    List     │
├─────────────┤
│    Chart    │
└─────────────┘
```

#### Tablet/Desktop (≥ 768px)
```
┌──────────────────────┐
│       Balance        │
├──────────┬───────────┤
│   Form   │   List    │
├──────────┴───────────┤
│        Chart         │
└──────────────────────┘
```

## 8. Chart Configuration

### 8.1 Chart.js Setup

```javascript
{
  type: 'doughnut',
  data: {
    labels: ['Food', 'Transport', 'Fun'],  // No emoji
    datasets: [{
      data: [300, 150, 100],
      backgroundColor: [
        getCategoryColor(0),
        getCategoryColor(1),
        getCategoryColor(2)
      ],
      borderColor: [...],
      borderWidth: 2
    }]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '65%',
    plugins: {
      legend: {
        position: 'bottom',
        labels: { color, padding, font }
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            return ` $${value.toFixed(2)} (${percentage}%)`;
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
- Support dynamic categories (up to 9 colors)

## 9. LocalStorage Strategy

### 9.1 Storage Structure

```javascript
// Transactions
localStorage.setItem('expenseTrackerData', JSON.stringify([...]));

// Theme
localStorage.setItem('expenseTrackerTheme', 'dark');

// Categories
localStorage.setItem('expenseTrackerCategories', JSON.stringify(['Food', 'Transport', 'Fun']));

// Spending Limit
localStorage.setItem('expenseTrackerLimit', '1000');
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

// Category management
document.getElementById('manageCategoriesBtn')
  .addEventListener('click', openCategoryModal);
document.getElementById('addCategoryBtn')
  .addEventListener('click', addCategory);

// Spending limit
document.getElementById('editLimitBtn')
  .addEventListener('click', editSpendingLimit);

// Monthly summary
document.getElementById('viewSummaryBtn')
  .addEventListener('click', openSummaryModal);
document.getElementById('summaryMonth')
  .addEventListener('change', updateSummary);
document.getElementById('summaryYear')
  .addEventListener('change', updateSummary);

// Modal close
document.getElementById('closeCategoryModal')
  .addEventListener('click', closeCategoryModal);
document.getElementById('closeSummaryModal')
  .addEventListener('click', closeSummaryModal);

// Click outside modal to close
window.addEventListener('click', (e) => {
  if (e.target.classList.contains('modal')) {
    e.target.classList.remove('active');
  }
});
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
  // 3. Update limit text
  // 4. Update progress bar width
  // 5. Add/remove over-limit class
}

renderTransactions() {
  // 1. Check if empty
  // 2. Map transactions to HTML (no emoji)
  // 3. Update innerHTML
}

renderChart() {
  // 1. Calculate category totals
  // 2. Prepare chart data (no emoji in labels)
  // 3. Create or update chart
  // 4. Handle empty state
}

updateCategoryDropdown() {
  // 1. Get category select element
  // 2. Generate options from categories array
  // 3. Update innerHTML
}

renderCategoryList() {
  // 1. Map categories to HTML (no emoji)
  // 2. Add delete button per category
  // 3. Update modal content
}

updateSummary() {
  // 1. Get selected month/year
  // 2. Filter transactions
  // 3. Calculate statistics
  // 4. Generate HTML (no emoji)
  // 5. Update modal content
}
```

## 12. Modal Management

### 12.1 Modal Structure

```html
<div id="categoryModal" class="modal">
  <div class="modal-content">
    <div class="modal-header">
      <h3>Manage Categories</h3>
      <button class="modal-close">&times;</button>
    </div>
    <div class="modal-body">
      <!-- Content -->
    </div>
  </div>
</div>
```

### 12.2 Modal Functions

```javascript
openCategoryModal() {
  // 1. Add 'active' class
  // 2. Render category list
}

closeCategoryModal() {
  // 1. Remove 'active' class
}

openSummaryModal() {
  // 1. Add 'active' class
  // 2. Populate date selectors
  // 3. Update summary
}

closeSummaryModal() {
  // 1. Remove 'active' class
}
```

## 13. Category Management

### 13.1 Add Category

```javascript
addCategory() {
  // 1. Get input value
  // 2. Validate (not empty, not duplicate)
  // 3. Add to categories array
  // 4. Save to localStorage
  // 5. Update dropdown
  // 6. Re-render category list
  // 7. Clear input
}
```

### 13.2 Delete Category

```javascript
deleteCategory(name) {
  // 1. Check if last category (prevent)
  // 2. Check if has transactions (confirm)
  // 3. Filter categories array
  // 4. Save to localStorage
  // 5. Update dropdown
  // 6. Re-render category list
  // 7. Re-render chart
}
```

## 14. Monthly Summary

### 14.1 Date Selector Population

```javascript
populateDateSelectors() {
  // 1. Get current date
  // 2. Generate month options (Jan-Dec)
  // 3. Generate year options (current - 5 years)
  // 4. Set current month/year as selected
}
```

### 14.2 Summary Calculation

```javascript
updateSummary() {
  // 1. Get selected month/year
  // 2. Filter transactions by date
  // 3. Calculate total spending
  // 4. Calculate transaction count
  // 5. Calculate average
  // 6. Calculate category totals
  // 7. Sort by amount (descending)
  // 8. Generate HTML
  // 9. Handle empty state
}
```

## 15. Performance Considerations

### 15.1 Optimization Techniques

- Minimal DOM manipulation
- Event delegation for dynamic elements
- CSS animations (GPU accelerated)
- Lazy chart initialization
- Efficient array operations
- Reuse chart instance

### 15.2 Bundle Size

- No build process needed
- Single CSS file (~8KB)
- Single JS file (~12KB)
- Chart.js from CDN (~200KB)
- Total: ~220KB

## 16. Browser Compatibility

### 16.1 Required Features

- ES6+ (arrow functions, let/const, template literals)
- localStorage API
- CSS Grid
- CSS Custom Properties (variables)
- Date input type

### 16.2 Fallbacks

- No fallback for localStorage (required)
- Graceful degradation for CSS features

## 17. Security Considerations

### 17.1 XSS Prevention

- No user HTML input (only text and numbers)
- No `eval()` or `innerHTML` with user data
- Form validation prevents injection

### 17.2 Data Privacy

- No external API calls
- No tracking scripts
- No cookies
- Data stays in browser

## 18. Future Design Improvements

- Custom category colors/icons
- Animated transitions between views
- Drag-to-delete gesture
- Swipe actions on mobile
- Dark mode auto-detection
- Skeleton loading states
- Toast notifications instead of alerts
- Export/import functionality
- Budget planning visualization

