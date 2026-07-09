// Reports and analytics functionality
console.log('Reports module loaded');

// Add expense
function addExpense(description, amount, category) {
  const expense = {
    id: Date.now(),
    description: description,
    amount: parseFloat(amount),
    category: category,
    date: new Date().toISOString()
  };
  hostelData.expenses.push(expense);
  saveData();
  return expense;
}

// Get all expenses
function getExpenses() {
  return hostelData.expenses;
}

// Get total expenses
function getTotalExpenses() {
  return hostelData.expenses.reduce((sum, e) => sum + e.amount, 0);
}

// Get expenses by category
function getExpensesByCategory(category) {
  return hostelData.expenses.filter(e => e.category === category);
}

// Calculate total profit
function calculateProfit() {
  const totalCollected = getTotalCollected();
  const totalExpenses = getTotalExpenses();
  return totalCollected - totalExpenses;
}

// Get dashboard summary
function getDashboardSummary() {
  return {
    totalTenants: hostelData.tenants.filter(t => t.active).length,
    totalRooms: hostelData.tenants.length,
    totalCollected: getTotalCollected(),
    totalExpenses: getTotalExpenses(),
    totalProfit: calculateProfit(),
    expectedRevenue: getTotalExpectedRent(),
    pendingAmount: getTotalExpectedRent() - getTotalCollected()
  };
}

// Get monthly report
function getMonthlyReport(month) {
  const monthPayments = hostelData.payments.filter(p => p.month.startsWith(month));
  const monthExpenses = hostelData.expenses.filter(e => e.date.startsWith(month));
  
  const collected = monthPayments.reduce((sum, p) => sum + p.amount, 0);
  const expenses = monthExpenses.reduce((sum, e) => sum + e.amount, 0);
  
  return {
    month: month,
    collected: collected,
    expenses: expenses,
    profit: collected - expenses,
    payments: monthPayments,
    expenses: monthExpenses
  };
}
