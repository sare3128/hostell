// Tenant management functionality
console.log('Tenants module loaded');

// Add new tenant
function addTenant(name, roomNo, rent, joinDate = null) {
  const tenant = {
    id: Date.now(),
    name: name,
    roomNo: roomNo,
    rent: parseFloat(rent),
    joinDate: joinDate ? new Date(joinDate).toISOString() : new Date().toISOString(),
    active: true
  };
  hostelData.tenants.push(tenant);
  saveData();
  return tenant;
}

// Get all tenants
function getTenants() {
  return hostelData.tenants;
}

// Update tenant
function updateTenant(id, name, roomNo, rent) {
  const tenant = hostelData.tenants.find(t => t.id === id);
  if (tenant) {
    tenant.name = name;
    tenant.roomNo = roomNo;
    tenant.rent = parseFloat(rent);
    saveData();
    return tenant;
  }
  return null;
}

// Remove tenant
function removeTenant(id) {
  const index = hostelData.tenants.findIndex(t => t.id === id);
  if (index !== -1) {
    hostelData.tenants.splice(index, 1);
    saveData();
    return true;
  }
  return false;
}

// Get tenant by ID
function getTenantById(id) {
  return hostelData.tenants.find(t => t.id === id);
}
