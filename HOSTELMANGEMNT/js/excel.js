// Excel export functionality
console.log('Excel module loaded');

// Generate Excel-like report
function generateExcelReport() {
  const summary = getDashboardSummary();
  
  let html = `
    <table border="1" cellpadding="10">
      <tr style="background: #667eea; color: white;">
        <th colspan="2">HOSTEL MANAGEMENT REPORT</th>
      </tr>
      <tr>
        <th>Report Date</th>
        <td>${new Date().toLocaleDateString()}</td>
      </tr>
      <tr style="background: #f0f0f0;">
        <th colspan="2">SUMMARY STATISTICS</th>
      </tr>
      <tr>
        <th>Active Tenants</th>
        <td>${summary.totalTenants}</td>
      </tr>
      <tr>
        <th>Total Collected</th>
        <td>₹${summary.totalCollected.toLocaleString()}</td>
      </tr>
      <tr>
        <th>Total Expenses</th>
        <td>₹${summary.totalExpenses.toLocaleString()}</td>
      </tr>
      <tr style="font-weight: bold; background: #e8f5e9;">
        <th>Total Profit</th>
        <td>₹${summary.totalProfit.toLocaleString()}</td>
      </tr>
      <tr>
        <th>Expected Revenue</th>
        <td>₹${summary.expectedRevenue.toLocaleString()}</td>
      </tr>
      <tr>
        <th>Pending Amount</th>
        <td>₹${summary.pendingAmount.toLocaleString()}</td>
      </tr>
    </table>
  `;
  
  return html;
}

// Print report
function printReport() {
  const printWindow = window.open('', '', 'height=600,width=800');
  printWindow.document.write('<html><head><title>Hostel Management Report</title>');
  printWindow.document.write('<style>body { font-family: Arial; margin: 20px; }');
  printWindow.document.write('table { border-collapse: collapse; width: 100%; }');
  printWindow.document.write('th, td { padding: 12px; text-align: left; }');
  printWindow.document.write('</style></head><body>');
  printWindow.document.write(generateExcelReport());
  printWindow.document.write('</body></html>');
  printWindow.document.close();
  printWindow.print();
}
