const express = require('express');
const router = express.Router();
const { orders, trackingHistory } = require('../data/mockData');

// GET - Order track
router.get('/:orderId', (req, res) => {
  const order = orders.find(o => o.orderId === req.params.orderId);

  if (!order) {
    return res.status(404).json({
      success: false,
      message: "Order not found!"
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