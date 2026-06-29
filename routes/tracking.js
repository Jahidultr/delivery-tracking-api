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

module.exports = router;