# 💰 Expense & Budget Visualizer

A modern, feature-rich expense tracker web application built with vanilla JavaScript, HTML, and CSS. Track your spending, manage custom categories, and visualize your expenses with beautiful charts.

## ✨ Features

### Core Features
- ✅ **Add Transactions** - Record expenses with name, amount, category, and date
- ✅ **Delete Transactions** - Remove incorrect or unwanted transactions
- ✅ **Real-time Balance** - See your total spending update instantly
- ✅ **Visual Progress Bar** - Track spending against your limit
- ✅ **Spending Limit Alert** - Get visual warnings when exceeding your budget
- ✅ **Data Persistence** - All data saved in browser localStorage

### Advanced Features
- 🎨 **Dark/Light Mode Toggle** - Switch between themes for comfortable viewing
- 📊 **Interactive Chart** - Doughnut chart showing spending by category
- 🔄 **Sort Transactions** - Sort by date, amount (high/low), or category
- 📁 **Custom Categories** - Add, manage, and delete your own expense categories
- 📅 **Monthly Summary** - View detailed spending reports by month and year
- 💵 **Editable Spending Limit** - Set and adjust your budget limit anytime

## 🚀 Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, or Edge)
- JavaScript enabled
- No installation required!

### Usage
1. Open `index.html` in your web browser
2. Start adding transactions using the form
3. Manage categories via the "Manage Categories" button
4. View monthly summaries with the "Monthly Summary" button
5. Toggle dark/light mode using the theme button in the header
6. Edit your spending limit by clicking the "Edit" button

## 📱 Features in Detail

### Transaction Management
- **Add Transaction**: Fill in item name, amount, category, and date
- **Sort Options**:
  - Latest (default)
  - Highest Amount
  - Lowest Amount
  - Category (alphabetical)
- **Delete**: Remove any transaction with one click

### Category Management
- **Default Categories**: Food, Transport, Fun
- **Add Custom Categories**: Create categories that fit your lifestyle
- **Delete Categories**: Remove unused categories (with transaction warning)
- **Visual Identification**: Clean category labels

### Monthly Summary
- **Total Spending**: See your monthly total
- **Transaction Count**: Number of transactions in the month
- **Average per Transaction**: Calculate spending patterns
- **Category Breakdown**: Detailed spending by category with percentages
- **Date Selection**: Choose any month and year to review

### Spending Limit
- **Default Limit**: $1,000 (customizable)
- **Visual Indicators**:
  - Progress bar shows percentage of limit used
  - Color gradient (green → yellow → red)
  - Red highlight when over limit
- **Edit Anytime**: Click "Edit" to set a new limit

### Theme Toggle
- **Light Mode**: Clean, bright interface
- **Dark Mode**: Easy on the eyes for low-light environments
- **Persistent**: Your theme choice is saved
- **Chart Updates**: Chart colors adapt to theme

## 💾 Data Storage

All data is stored locally in your browser using localStorage:
- `expenseTrackerData` - Your transactions
- `expenseTrackerCategories` - Custom categories
- `expenseTrackerLimit` - Your spending limit
- `expenseTrackerTheme` - Theme preference

**Note**: Data persists across browser sessions but is device-specific.

## 🎨 Technologies Used

- **HTML5** - Structure and semantics
- **CSS3** - Styling with CSS variables for theming
- **Vanilla JavaScript** - No frameworks, pure JS
- **Chart.js** - Beautiful doughnut charts
- **LocalStorage API** - Client-side data persistence

## 📊 Chart Visualization

The spending chart provides:
- Doughnut chart with category breakdown
- Color-coded categories (up to 9 unique colors)
- Hover tooltips showing amount and percentage
- Responsive design that adapts to screen size
- Theme-aware colors

## 🎯 Use Cases

Perfect for:
- Personal expense tracking
- Budget management
- Spending pattern analysis
- Monthly financial reviews
- Category-based expense monitoring

## 🔒 Privacy & Security

- ✅ No data sent to servers
- ✅ No tracking or analytics
- ✅ No cookies
- ✅ All data stays in your browser
- ✅ No account or login required

## 📱 Responsive Design

Fully responsive interface that works on:
- 📱 Mobile phones
- 📱 Tablets
- 💻 Laptops
- 🖥️ Desktop computers

## 🎓 Learning Resources

This project demonstrates:
- DOM manipulation
- Event handling
- LocalStorage usage
- Chart.js integration
- CSS theming with variables
- Responsive design patterns
- Modal dialogs
- Form validation

## 🐛 Known Limitations

- Data is device-specific (no cloud sync)
- No export/import functionality
- No transaction editing (delete and re-add)
- No recurring expense tracking
- No multi-currency support

## 🔮 Future Enhancements

Potential features for future versions:
- Transaction editing
- Export to CSV/PDF
- Budget planning tools
- Recurring expenses
- Income tracking
- Multi-device sync
- Mobile app version

## 📄 License

This project is open source and available for personal and educational use.

## 🤝 Contributing

Feel free to fork, modify, and enhance this project for your own needs!

## 📞 Support

For issues or questions, please refer to the code comments or create an issue in the repository.

---

**Made with ❤️ using Vanilla JavaScript**
