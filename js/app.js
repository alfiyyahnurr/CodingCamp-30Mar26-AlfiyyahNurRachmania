// Storage key
const STORAGE_KEY = 'expenseTrackerData';
const THEME_KEY = 'expenseTrackerTheme';
const SPENDING_LIMIT = 1000;

// State
let transactions = [];
let chart = null;

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
    loadFromStorage();
    initializeTheme();
    setupEventListeners();
    render();
});

// Load data from localStorage
function loadFromStorage() {
    const data = localStorage.getItem(STORAGE_KEY);
    if (data) {
        transactions = JSON.parse(data);
    }
}

// Save data to localStorage
function saveToStorage() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions));
}

// Initialize theme
function initializeTheme() {
    const savedTheme = localStorage.getItem(THEME_KEY);
    const toggleIcon = document.querySelector('.toggle-icon');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        toggleIcon.textContent = '☀️';
    }
}

// Setup event listeners
function setupEventListeners() {
    document.getElementById('transactionForm').addEventListener('submit', handleAddTransaction);
    document.getElementById('sortBy').addEventListener('change', handleSort);
    document.getElementById('themeToggle').addEventListener('click', toggleTheme);
}

// Handle form submission
function handleAddTransaction(e) {
    e.preventDefault();
    
    const itemName = document.getElementById('itemName').value.trim();
    const amount = parseFloat(document.getElementById('amount').value);
    const category = document.getElementById('category').value;
    
    if (!itemName || !amount || !category) {
        alert('Please fill in all fields');
        return;
    }
    
    const transaction = {
        id: Date.now(),
        name: itemName,
        amount: amount,
        category: category,
        date: new Date().toISOString()
    };
    
    transactions.push(transaction);
    saveToStorage();
    render();
    
    // Reset form
    e.target.reset();
}

// Delete transaction
function deleteTransaction(id) {
    transactions = transactions.filter(t => t.id !== id);
    saveToStorage();
    render();
}

// Handle sorting
function handleSort() {
    const sortBy = document.getElementById('sortBy').value;
    
    switch(sortBy) {
        case 'amount-high':
            transactions.sort((a, b) => b.amount - a.amount);
            break;
        case 'amount-low':
            transactions.sort((a, b) => a.amount - b.amount);
            break;
        case 'category':
            transactions.sort((a, b) => a.category.localeCompare(b.category));
            break;
        case 'date':
        default:
            transactions.sort((a, b) => new Date(b.date) - new Date(a.date));
            break;
    }
    
    renderTransactions();
}

// Toggle theme
function toggleTheme() {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');
    const toggleIcon = document.querySelector('.toggle-icon');
    toggleIcon.textContent = isDark ? '☀️' : '🌙';
    localStorage.setItem(THEME_KEY, isDark ? 'dark' : 'light');
    
    // Update chart colors
    if (chart) {
        chart.options.plugins.legend.labels.color = isDark ? '#1e293b' : '#ffffff';
        chart.update();
    }
}

// Calculate total balance
function calculateTotal() {
    return transactions.reduce((sum, t) => sum + t.amount, 0);
}

// Calculate spending by category
function calculateCategoryTotals() {
    const totals = {};
    transactions.forEach(t => {
        totals[t.category] = (totals[t.category] || 0) + t.amount;
    });
    return totals;
}

// Render everything
function render() {
    renderBalance();
    renderTransactions();
    renderChart();
}

// Render balance
function renderBalance() {
    const total = calculateTotal();
    const balanceElement = document.getElementById('totalBalance');
    const progressBar = document.getElementById('balanceProgress');
    
    balanceElement.textContent = `$${total.toFixed(2)}`;
    
    // Update progress bar
    const percentage = Math.min((total / SPENDING_LIMIT) * 100, 100);
    progressBar.style.width = `${percentage}%`;
    
    // Highlight if over limit
    if (total > SPENDING_LIMIT) {
        balanceElement.classList.add('over-limit');
    } else {
        balanceElement.classList.remove('over-limit');
    }
}

// Get emoji for category
function getCategoryEmoji(category) {
    const emojis = {
        'Food': '🍔',
        'Transport': '🚗',
        'Fun': '🎉'
    };
    return emojis[category] || '💰';
}

// Render transactions list
function renderTransactions() {
    const listElement = document.getElementById('transactionsList');
    
    if (transactions.length === 0) {
        listElement.innerHTML = `
            <div class="empty-state">
                <div class="empty-icon">📭</div>
                <p>No expenses yet</p>
                <span>Start tracking your spending!</span>
            </div>
        `;
        return;
    }
    
    listElement.innerHTML = transactions.map(t => `
        <div class="transaction-item">
            <div class="transaction-info">
                <div class="transaction-top">
                    <span class="transaction-emoji">${getCategoryEmoji(t.category)}</span>
                    <h4>${t.name}</h4>
                </div>
                <div class="transaction-bottom">
                    <span class="transaction-amount">$${t.amount.toFixed(2)}</span>
                    <span class="transaction-category category-${t.category}">${t.category}</span>
                </div>
            </div>
            <button class="btn-delete" onclick="deleteTransaction(${t.id})">Delete</button>
        </div>
    `).join('');
}

// Render chart
function renderChart() {
    const ctx = document.getElementById('spendingChart');
    const categoryTotals = calculateCategoryTotals();
    
    const isDark = document.body.classList.contains('dark-mode');
    const textColor = isDark ? '#1e293b' : '#ffffff';
    
    const data = {
        labels: Object.keys(categoryTotals).map(cat => `${getCategoryEmoji(cat)} ${cat}`),
        datasets: [{
            data: Object.values(categoryTotals),
            backgroundColor: [
                'rgba(16, 185, 129, 0.8)',
                'rgba(59, 130, 246, 0.8)',
                'rgba(245, 158, 11, 0.8)'
            ],
            borderColor: [
                'rgba(16, 185, 129, 1)',
                'rgba(59, 130, 246, 1)',
                'rgba(245, 158, 11, 1)'
            ],
            borderWidth: 2
        }]
    };
    
    if (chart) {
        chart.data = data;
        chart.options.plugins.legend.labels.color = textColor;
        chart.update();
    } else {
        chart = new Chart(ctx, {
            type: 'doughnut',
            data: data,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            color: textColor,
                            padding: 20,
                            font: {
                                size: 14,
                                weight: '600'
                            },
                            usePointStyle: true,
                            pointStyle: 'circle'
                        }
                    },
                    tooltip: {
                        backgroundColor: 'rgba(0, 0, 0, 0.8)',
                        padding: 12,
                        titleFont: {
                            size: 14,
                            weight: 'bold'
                        },
                        bodyFont: {
                            size: 13
                        },
                        callbacks: {
                            label: function(context) {
                                const value = context.parsed;
                                const total = context.dataset.data.reduce((a, b) => a + b, 0);
                                const percentage = ((value / total) * 100).toFixed(1);
                                return ` $${value.toFixed(2)} (${percentage}%)`;
                            }
                        }
                    }
                },
                cutout: '65%'
            }
        });
    }
}
