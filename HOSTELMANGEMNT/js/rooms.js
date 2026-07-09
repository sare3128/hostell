// Room management functionality
console.log('Rooms module loaded');

// Get occupancy statistics
function getOccupancyStats() {
  const totalRooms = hostelData.tenants.length;
  const occupiedRooms = hostelData.tenants.filter(t => t.active).length;
  const occupancyRate = totalRooms > 0 ? Math.round((occupiedRooms / totalRooms) * 100) : 0;
  
  return {
    totalRooms: totalRooms,
    occupiedRooms: occupiedRooms,
    vacantRooms: totalRooms - occupiedRooms,
    occupancyRate: occupancyRate
  };
}

// Get room by room number
function getRoomByNumber(roomNo) {
  return hostelData.tenants.find(t => t.roomNo === roomNo);
}

// Get payment status for a room
function getRoomPaymentStatus(roomNo) {
  const room = getRoomByNumber(roomNo);
  if (!room) return null;
  
  const tenant = getTenantById(room.id);
  if (!tenant) return null;
  
  const now = new Date();
  const currentMonth = now.getFullYear() + '-' + String(now.getMonth() + 1).padStart(2, '0');
  const isPaid = hostelData.payments.some(p => 
    p.tenantId === room.id && 
    p.month.startsWith(currentMonth)
  );
  
  return {
    roomNo: roomNo,
    tenantName: tenant.name,
    rent: tenant.rent,
    paid: isPaid,
    currentMonth: currentMonth
  };
}

// Get room report
function generateRoomReport() {
  const stats = getOccupancyStats();
  const report = {
    generatedDate: new Date().toISOString(),
    occupancyStats: stats,
    rooms: hostelData.tenants.map(t => ({
      roomNumber: t.roomNo,
      tenantName: t.name,
      monthlyRent: t.rent,
      status: t.active ? 'Occupied' : 'Vacant'
    }))
  };
  return report;
}
