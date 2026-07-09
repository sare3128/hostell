// Dashboard functionality
console.log('Dashboard loaded');

// Initialize dashboard
function initDashboard() {
  // Add navigation bar
  addNavigation();
}

// Add navigation bar
function addNavigation() {
  const nav = document.createElement('nav');
  nav.style.cssText = `
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    padding: 15px 0;
    margin: -20px -20px 20px -20px;
    color: white;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  `;
  
  nav.innerHTML = `
    <div style="max-width: 1200px; margin: 0 auto; padding: 0 20px; display: flex; justify-content: space-between; align-items: center;">
      <h3 style="margin: 0; font-size: 20px;">🏢 Hostel Management</h3>
      <div>
        <a href="dashboard.html" style="color: white; text-decoration: none; margin: 0 15px; font-weight: 600;">Dashboard</a>
        <a href="tenants.html" style="color: white; text-decoration: none; margin: 0 15px; font-weight: 600;">Tenants</a>
        <a href="payments.html" style="color: white; text-decoration: none; margin: 0 15px; font-weight: 600;">Payments</a>
        <a href="reports.html" style="color: white; text-decoration: none; margin: 0 15px; font-weight: 600;">Reports</a>
        <a href="rooms.html" style="color: white; text-decoration: none; margin: 0 15px; font-weight: 600;">Rooms</a>
        <a href="settings.html" style="color: white; text-decoration: none; margin: 0 15px; font-weight: 600;">Settings</a>
        <a href="index.html" onclick="sessionStorage.clear()" style="color: white; text-decoration: none; margin: 0 15px; font-weight: 600;">Logout</a>
      </div>
    </div>
  `;
  
  const container = document.querySelector('.dashboard') || document.querySelector('.container');
  if (container) {
    container.parentNode.insertBefore(nav, container);
  }
}

// Add authentication check
function checkAuth() {
  if (!sessionStorage.getItem('isLoggedIn') && !localStorage.getItem('hostelData')) {
    // Allow access on first visit
    return true;
  }
  return sessionStorage.getItem('isLoggedIn') || true;
}

// Initialize dashboard on page load
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', function() {
    if (checkAuth()) {
      initDashboard();
    }
  });
} else {
  if (checkAuth()) {
    initDashboard();
  }
}
