// Main application file
console.log('App initialized');

// Core data structure for hostel management
const hostelData = {
  tenants: [],
  payments: [],
  expenses: [],
  rooms: []
};

// Load data from localStorage on app start
function loadData() {
  const saved = localStorage.getItem('hostelData');
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      hostelData.tenants = Array.isArray(parsed.tenants) ? parsed.tenants : [];
      hostelData.payments = Array.isArray(parsed.payments) ? parsed.payments : [];
      hostelData.expenses = Array.isArray(parsed.expenses) ? parsed.expenses : [];
      hostelData.rooms = Array.isArray(parsed.rooms) ? parsed.rooms : [];
    } catch (error) {
      console.error('Failed to parse stored hostelData:', error);
      localStorage.removeItem('hostelData');
    }
  }
}

// Save data to localStorage
function saveData() {
  localStorage.setItem('hostelData', JSON.stringify(hostelData));
  try {
    // touch a timestamp key so other pages/tabs can detect updates
    localStorage.setItem('hostelDataUpdated', String(Date.now()));
  } catch (e) {
    // ignore storage errors (e.g., storage full)
  }
}

// Initialize app
function initApp() {
  loadData();
  console.log('App initialized with data:', hostelData);
}

// Load data immediately so pages can use stored state before inline scripts run
loadData();

// Call init on page load if needed
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}
