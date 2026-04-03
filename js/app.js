// Storage keys
const STORAGE_KEY = 'expenseTrackerData';
const THEME_KEY = 'expenseTrackerTheme';
const CATEGORIES_KEY = 'expenseTrackerCategories';
const LIMIT_KEY = 'expenseTrackerLimit';

// State
let transactions = [];
let chart = null;
let categories = ['Food', 'Transport', 'Fun'];
let spendingLimit = 1000;

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
    loadFromStorage();
    initializeTheme();
    setupEventListeners();
    updateCategoryDropdown();
    render();
});

// Load data from localStorage
function loadFromStorage() {
    const data = localStorage.getItem(STORAGE_KEY);
    if (data) {
        transactions = JSON.parse(data);
    }
    
    const savedCategories = localStorage.getItem(CATEGORIES_KEY);
    if (savedCategories) {
        categories = JSON.parse(savedCategories);
    }
    
    const savedLimit = localStorage.getItem(LIMIT_KEY);
    if (savedLimit) {
        spendingLimit = parseFloat(savedLimit);
    }
}

// Save data to localStorage
function saveToStorage() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions));
}

// Save categories to localStorage
function saveCategories() {
    localStorage.setItem(CATEGORIES_KEY, JSON.stringify(categories));
}

// Save spending limit to localStorage
function saveLimit() {
    localStorage.setItem(LIMIT_KEY, spendingLimit.toString());
}

// Initialize theme
function initializeTheme() {
    const savedTheme = localStorage.getItem(THEME_KEY);
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
    }
}

// Setup event listeners
function setupEventListeners() {
    document.getElementById('transactionForm').addEventListener('submit', handleAddTransaction);
    document.getElementById('sortBy').addEventListener('change', handleSort);
    document.getElementById('themeToggle').addEventListener('click', toggleTheme);
    document.getElementById('manageCategoriesBtn').addEventListener('click', openCategoryModal);
    document.getElementById('closeCategoryModal').addEventListener('click', closeCategoryModal);
    document.getElementById('addCategoryBtn').addEventListener('click', addCategory);
    document.getElementById('viewSummaryBtn').addEventListener('click', openSummaryModal);
    document.getElementById('closeSummaryModal').addEventListener('click', closeSummaryModal);
    document.getElementById('editLimitBtn').addEventListener('click', editSpendingLimit);
    document.getElementById('summaryMonth').addEventListener('change', updateSummary);
    document.getElementById('summaryYear').addEventListener('change', updateSummary);
    
    // Close modals when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal')) {
            e.target.classList.remove('active');
        }
    });
}

// Handle form submission
function handleAddTransaction(e) {
    e.preventDefault();
    
    const itemName = document.getElementById('itemName').value.trim();
    const amount = parseFloat(document.getElementById('amount').value);
    const category = document.getElementById('category').value;
    const dateInput = document.getElementById('date').value;
    
    if (!itemName || !amount || !category) {
        alert('Please fill in all fields');
        return;
    }
    
    const transaction = {
        id: Date.now(),
        name: itemName,
        amount: amount,
        category: category,
        date: dateInput ? new Date(dateInput).toISOString() : new Date().toISOString()
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
    localStorage.setItem(THEME_KEY, isDark ? 'dark' : 'light');
    
    // Update chart colors
    if (chart) {
        const textColor = isDark ? '#ffffff' : '#1e293b';
        chart.options.plugins.legend.labels.color = textColor;
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
    const limitElement = document.getElementById('spendingLimit');
    
    balanceElement.textContent = `$${total.toFixed(2)}`;
    limitElement.textContent = `$${spendingLimit.toFixed(2)}`;
    
    // Update progress bar
    const percentage = Math.min((total / spendingLimit) * 100, 100);
    progressBar.style.width = `${percentage}%`;
    
    // Highlight if over limit
    if (total > spendingLimit) {
        balanceElement.classList.add('over-limit');
    } else {
        balanceElement.classList.remove('over-limit');
    }
}

// Get emoji for category (disabled - returns empty string)
function getCategoryEmoji(category) {
    return '';
}

// Get color for category
function getCategoryColor(index) {
    const colors = [
        'rgba(16, 185, 129, 0.8)',
        'rgba(59, 130, 246, 0.8)',
        'rgba(245, 158, 11, 0.8)',
        'rgba(239, 68, 68, 0.8)',
        'rgba(168, 85, 247, 0.8)',
        'rgba(236, 72, 153, 0.8)',
        'rgba(20, 184, 166, 0.8)',
        'rgba(251, 146, 60, 0.8)',
        'rgba(132, 204, 22, 0.8)'
    ];
    return colors[index % colors.length];
}

// Render transactions list
function renderTransactions() {
    const listElement = document.getElementById('transactionsList');
    
    if (transactions.length === 0) {
        listElement.innerHTML = `
            <div class="empty-state">
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

// Update category dropdown
function updateCategoryDropdown() {
    const categorySelect = document.getElementById('category');
    categorySelect.innerHTML = '<option value="">Select category</option>' +
        categories.map(cat => `<option value="${cat}">${cat}</option>`).join('');
}

// Render chart
function renderChart() {
    const ctx = document.getElementById('spendingChart');
    const categoryTotals = calculateCategoryTotals();
    
    if (Object.keys(categoryTotals).length === 0) {
        if (chart) {
            chart.destroy();
            chart = null;
        }
        return;
    }
    
    const isDark = document.body.classList.contains('dark-mode');
    const textColor = isDark ? '#ffffff' : '#1e293b';
    
    const categoryKeys = Object.keys(categoryTotals);
    const data = {
        labels: categoryKeys,
        datasets: [{
            data: Object.values(categoryTotals),
            backgroundColor: categoryKeys.map((_, i) => getCategoryColor(i)),
            borderColor: categoryKeys.map((_, i) => getCategoryColor(i).replace('0.8', '1')),
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

// Category Management
function openCategoryModal() {
    document.getElementById('categoryModal').classList.add('active');
    renderCategoryList();
}

function closeCategoryModal() {
    document.getElementById('categoryModal').classList.remove('active');
}

function renderCategoryList() {
    const listElement = document.getElementById('categoryList');
    listElement.innerHTML = categories.map(cat => `
        <div class="category-item">
            <span>${cat}</span>
            <button class="btn-delete-category" onclick="deleteCategory('${cat}')">Delete</button>
        </div>
    `).join('');
}

function addCategory() {
    const input = document.getElementById('newCategoryName');
    const categoryName = input.value.trim();
    
    if (!categoryName) {
        alert('Please enter a category name');
        return;
    }
    
    if (categories.includes(categoryName)) {
        alert('Category already exists');
        return;
    }
    
    categories.push(categoryName);
    saveCategories();
    updateCategoryDropdown();
    renderCategoryList();
    input.value = '';
}

function deleteCategory(categoryName) {
    if (categories.length <= 1) {
        alert('You must have at least one category');
        return;
    }
    
    const hasTransactions = transactions.some(t => t.category === categoryName);
    if (hasTransactions) {
        if (!confirm(`There are transactions in "${categoryName}". Delete anyway?`)) {
            return;
        }
    }
    
    categories = categories.filter(c => c !== categoryName);
    saveCategories();
    updateCategoryDropdown();
    renderCategoryList();
    render();
}

// Edit Spending Limit
function editSpendingLimit() {
    const newLimit = prompt('Enter new spending limit:', spendingLimit);
    if (newLimit !== null && newLimit !== '') {
        const limit = parseFloat(newLimit);
        if (isNaN(limit) || limit <= 0) {
            alert('Please enter a valid positive number');
            return;
        }
        spendingLimit = limit;
        saveLimit();
        renderBalance();
    }
}

// Monthly Summary
function openSummaryModal() {
    document.getElementById('summaryModal').classList.add('active');
    populateDateSelectors();
    updateSummary();
}

function closeSummaryModal() {
    document.getElementById('summaryModal').classList.remove('active');
}

function populateDateSelectors() {
    const monthSelect = document.getElementById('summaryMonth');
    const yearSelect = document.getElementById('summaryYear');
    
    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];
    
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();
    
    monthSelect.innerHTML = months.map((month, index) => 
        `<option value="${index}" ${index === currentMonth ? 'selected' : ''}>${month}</option>`
    ).join('');
    
    const years = [];
    for (let i = currentYear; i >= currentYear - 5; i--) {
        years.push(i);
    }
    
    yearSelect.innerHTML = years.map(year => 
        `<option value="${year}" ${year === currentYear ? 'selected' : ''}>${year}</option>`
    ).join('');
}

function updateSummary() {
    const month = parseInt(document.getElementById('summaryMonth').value);
    const year = parseInt(document.getElementById('summaryYear').value);
    
    const monthTransactions = transactions.filter(t => {
        const date = new Date(t.date);
        return date.getMonth() === month && date.getFullYear() === year;
    });
    
    const total = monthTransactions.reduce((sum, t) => sum + t.amount, 0);
    const categoryTotals = {};
    
    monthTransactions.forEach(t => {
        categoryTotals[t.category] = (categoryTotals[t.category] || 0) + t.amount;
    });
    
    const summaryContent = document.getElementById('summaryContent');
    
    if (monthTransactions.length === 0) {
        summaryContent.innerHTML = `
            <div class="empty-state">
                <p>No transactions for this month</p>
            </div>
        `;
        return;
    }
    
    let html = `
        <div class="summary-stat">
            <span class="summary-stat-label">Total Spending</span>
            <span class="summary-stat-value">$${total.toFixed(2)}</span>
        </div>
        <div class="summary-stat">
            <span class="summary-stat-label">Number of Transactions</span>
            <span class="summary-stat-value">${monthTransactions.length}</span>
        </div>
        <div class="summary-stat">
            <span class="summary-stat-label">Average per Transaction</span>
            <span class="summary-stat-value">$${(total / monthTransactions.length).toFixed(2)}</span>
        </div>
        <div class="summary-category">
            <h4>Spending by Category</h4>
    `;
    
    Object.entries(categoryTotals)
        .sort((a, b) => b[1] - a[1])
        .forEach(([cat, amount]) => {
            const percentage = ((amount / total) * 100).toFixed(1);
            html += `
                <div class="summary-stat">
                    <span class="summary-stat-label">${cat}</span>
                    <span class="summary-stat-value">$${amount.toFixed(2)} (${percentage}%)</span>
                </div>
            `;
        });
    
    html += '</div>';
    summaryContent.innerHTML = html;
}
