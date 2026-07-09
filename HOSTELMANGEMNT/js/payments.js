// Payment collection functionality
console.log('Payments module loaded');

// Record a payment
function recordPayment(tenantId, amount, month) {
  const payment = {
    id: Date.now(),
    tenantId: tenantId,
    amount: parseFloat(amount),
    month: month,
    date: new Date().toISOString(),
    status: 'paid'
  };
  hostelData.payments.push(payment);
  saveData();
  return payment;
}

// Get all payments
function getPayments() {
  return hostelData.payments;
}

// Get payments by tenant
function getPaymentsByTenant(tenantId) {
  return hostelData.payments.filter(p => p.tenantId === tenantId);
}

// Get total collected
function getTotalCollected() {
  return hostelData.payments.reduce((sum, p) => sum + p.amount, 0);
}

// Get total expected rent for active tenants
function getTotalExpectedRent() {
  return hostelData.tenants
    .filter(t => t.active)
    .reduce((sum, t) => sum + t.rent, 0);
}

// Check if tenant paid for current month
function isPaidThisMonth(tenantId) {
  const now = new Date();
  const currentMonth = now.getFullYear() + '-' + String(now.getMonth() + 1).padStart(2, '0');
  return hostelData.payments.some(p => p.tenantId === tenantId && p.month.startsWith(currentMonth));
}

// Get outstanding amount
function getOutstandingAmount(tenantId) {
  const tenant = getTenantById(tenantId);
  if (!tenant) return 0;
  
  const payments = getPaymentsByTenant(tenantId);
  const totalPaid = payments.reduce((sum, p) => sum + p.amount, 0);
  return Math.max(0, tenant.rent - totalPaid);
}
