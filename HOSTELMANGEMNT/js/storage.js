// Local storage and data management
console.log('Storage module loaded');

// Export data to CSV
function exportToCSV(filename, data) {
  const csv = data.map(row => Object.values(row).join(',')).join('\n');
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}

// Export tenants list
function exportTenants() {
  const data = getTenants().map(t => ({
    'Name': t.name,
    'Room No': t.roomNo,
    'Monthly Rent': t.rent,
    'Join Date': new Date(t.joinDate).toLocaleDateString(),
    'Status': t.active ? 'Active' : 'Inactive'
  }));
  exportToCSV('tenants-' + new Date().toISOString().split('T')[0] + '.csv', data);
}

// Export payments
function exportPayments() {
  const data = getPayments().map(p => ({
    'Tenant ID': p.tenantId,
    'Amount': p.amount,
    'Month': p.month,
    'Date': new Date(p.date).toLocaleDateString(),
    'Status': p.status
  }));
  exportToCSV('payments-' + new Date().toISOString().split('T')[0] + '.csv', data);
}

// Export expenses
function exportExpenses() {
  const data = getExpenses().map(e => ({
    'Description': e.description,
    'Category': e.category,
    'Amount': e.amount,
    'Date': new Date(e.date).toLocaleDateString()
  }));
  exportToCSV('expenses-' + new Date().toISOString().split('T')[0] + '.csv', data);
}
