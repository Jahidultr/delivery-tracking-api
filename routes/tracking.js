const express = require('express');
const router = express.Router();
const { orders, trackingHistory } = require('../data/mockData');

// GET - Track order by ID
router.get('/:orderId', (req, res) => {
  const order = orders.find(o => o.orderId === req.params.orderId);

  // Check if order exists
  if (!order) {
    return res.status(404).json({
      success: false,
      message: `${req.params.orderId} does not exist. Valid orders: ORD-001 to ORD-00${orders.length}`
    });
  }

  const history = trackingHistory[req.params.orderId] || [];

  res.json({
    success: true,
    orderId: order.orderId,
    customerName: order.customerName,
    currentStatus: order.status,
    address: order.address,
    trackingHistory: history
  });
});

// POST - Auto update tracking history when status changes
router.post('/update/:orderId', (req, res) => {
  const order = orders.find(o => o.orderId === req.params.orderId);

  // Check if order exists
  if (!order) {
    return res.status(404).json({
      success: false,
      message: `${req.params.orderId} does not exist.`
    });
  }

  const { status, location } = req.body;
  const validStatuses = ["pending", "in-transit", "delivered", "cancelled"];

  // Validate status
  if (!validStatuses.includes(status)) {
    return res.status(400).json({
      success: false,
      message: `Invalid status! Valid statuses: ${validStatuses.join(', ')}`
    });
  }

  // Auto add tracking history
  if (!trackingHistory[req.params.orderId]) {
    trackingHistory[req.params.orderId] = [];
  }

  const newTracking = {
    time: new Date().toISOString().replace('T', ' ').substring(0, 16),
    status: status === 'in-transit' ? 'In Transit' :
            status === 'delivered' ? 'Delivered' :
            status === 'cancelled' ? 'Cancelled' : 'Order Placed',
    location: location || 'Dhaka Hub'
  };

  // Update order status
  order.status = status;
  if (status === 'delivered') {
    order.deliveredAt = new Date().toISOString().split('T')[0];
  }

  // Push to tracking history
  trackingHistory[req.params.orderId].push(newTracking);

  res.json({
    success: true,
    message: "Status and tracking history updated!",
    orderId: order.orderId,
    currentStatus: order.status,
    newTracking
  });
});

module.exports = router;