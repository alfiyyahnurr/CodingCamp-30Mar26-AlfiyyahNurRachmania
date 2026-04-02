# 💰 SpendWise - Expense & Budget Visualizer

A modern, mobile-friendly web application for tracking daily expenses with visual insights. Built with vanilla JavaScript, HTML, and CSS.

![SpendWise Preview](https://img.shields.io/badge/Status-Active-success)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)

## ✨ Features

### Core Features (MVP)
- ✅ **Input Form** - Add expenses with item name, amount, and category
- ✅ **Form Validation** - Ensures all fields are filled before submission
- ✅ **Transaction List** - Scrollable list of all expenses with delete functionality
- ✅ **Total Balance** - Real-time calculation of total spending
- ✅ **Visual Chart** - Interactive doughnut chart showing spending distribution by category
- ✅ **Auto-Update** - All components update automatically when data changes

### Optional Features (3/5 Implemented)
- 🎯 **Sort Transactions** - Sort by date, amount (high/low), or category
- ⚠️ **Spending Limit Alert** - Visual warning when spending exceeds $1,000
- 🌓 **Dark/Light Mode** - Toggle between two beautiful themes

## 🎨 Design Highlights

- **Glassmorphism UI** - Modern glass effect with backdrop blur
- **Gradient Backgrounds** - Beautiful blue gradient (dark mode) and sky blue (light mode)
- **Smooth Animations** - Floating icons, slide-in effects, and hover transitions
- **High Contrast** - Optimized for readability and accessibility
- **Responsive Design** - Works seamlessly on desktop, tablet, and mobile devices
- **Icon-Based** - Emoji icons for intuitive user experience

## 🚀 Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Edge, Safari)
- No installation or setup required!

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/spendwise.git
```

2. Navigate to the project folder:
```bash
cd spendwise
```

3. Open `index.html` in your browser:
```bash
# On Windows
start index.html

# On Mac
open index.html

# On Linux
xdg-open index.html
```

That's it! The app runs entirely in your browser.

## 📁 Project Structure

```
spendwise/
├── index.html          # Main HTML file
├── css/
│   └── style.css      # All styles in one file
├── js/
│   └── app.js         # All JavaScript logic
└── README.md          # Project documentation
```

## 🛠️ Technologies Used

- **HTML5** - Semantic markup structure
- **CSS3** - Modern styling with glassmorphism, gradients, and animations
- **Vanilla JavaScript** - No frameworks, pure ES6+
- **Chart.js** - Beautiful and responsive charts
- **LocalStorage API** - Client-side data persistence

## 💾 Data Storage

All expense data is stored locally in your browser using the LocalStorage API. This means:
- ✅ No server required
- ✅ Data persists between sessions
- ✅ Complete privacy - your data never leaves your device
- ⚠️ Data is browser-specific (clearing browser data will delete expenses)

## 🎯 How to Use

1. **Add an Expense**
   - Enter the item name (e.g., "Coffee", "Taxi")
   - Enter the amount (e.g., 14.50)
   - Select a category (Food, Transport, or Fun)
   - Click "Add Expense"

2. **View Your Spending**
   - See total spending at the top
   - Progress bar shows spending relative to $1,000 limit
   - Chart displays category breakdown

3. **Manage Transactions**
   - Sort transactions using the dropdown menu
   - Delete individual transactions with the "Delete" button
   - Watch the chart update in real-time

4. **Toggle Theme**
   - Click the moon/sun icon to switch between dark and light modes
   - Your preference is saved automatically

## 📊 Categories

The app includes three default categories:
- 🍔 **Food** - Meals, groceries, snacks
- 🚗 **Transport** - Taxi, gas, public transport
- 🎉 **Fun** - Entertainment, hobbies, leisure

## 🌐 Browser Compatibility

| Browser | Supported |
|---------|-----------|
| Chrome  | ✅ Yes    |
| Firefox | ✅ Yes    |
| Edge    | ✅ Yes    |
| Safari  | ✅ Yes    |
| Opera   | ✅ Yes    |

Requires modern browser with ES6+ support and LocalStorage API.

## 📱 Mobile Support

SpendWise is fully responsive and optimized for mobile devices:
- Touch-friendly buttons and inputs
- Adaptive layout for small screens
- Smooth scrolling for transaction list
- Mobile-first design approach

## 🚀 Deployment

### GitHub Pages

1. Push your code to GitHub
2. Go to repository Settings
3. Navigate to Pages section
4. Select main branch as source
5. Click Save
6. Your site will be live at `https://yourusername.github.io/spendwise`

### Other Options
- **Netlify** - Drag and drop deployment
- **Vercel** - Connect GitHub repository
- **Local Server** - Use any HTTP server (e.g., `python -m http.server`)

## 🔒 Privacy & Security

- No data is sent to any server
- No tracking or analytics
- No cookies used
- All data stored locally in your browser
- Open source - inspect the code yourself

## 🎓 Learning Outcomes

This project demonstrates:
- DOM manipulation and event handling
- LocalStorage API usage
- Chart.js integration
- Responsive CSS design
- Modern UI/UX patterns (glassmorphism)
- Form validation
- Array methods and data manipulation
- CSS animations and transitions

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest new features
- Submit pull requests
- Improve documentation

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 Author

Created with ❤️ by [Your Name]

## 🙏 Acknowledgments

- Chart.js for the beautiful charts
- Inspiration from modern expense tracking apps
- Community feedback and suggestions

---

**Happy Tracking! 💰✨**

If you find this project helpful, please give it a ⭐ on GitHub!
