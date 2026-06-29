const express = require('express');
const router = express.Router();
const { orders } = require('../data/mockData');

// GET - Order statistics
router.get('/', (req, res) => {
  const total = orders.length;
  const delivered = orders.filter(o => o.status === 'delivered').length;
  const pending = orders.filter(o => o.status === 'pending').length;
  const inTransit = orders.filter(o => o.status === 'in-transit').length;
  const cancelled = orders.filter(o => o.status === 'cancelled').length;

  // Calculate delivery rate
  const deliveryRate = total > 0
    ? ((delivered / total) * 100).toFixed(1) + '%'
    : '0%';

  // Calculate average delivery days
  const deliveredOrders = orders.filter(
    o => o.status === 'delivered' && o.deliveredAt && o.createdAt
  );

  const avgDeliveryDays = deliveredOrders.length > 0
    ? (
        deliveredOrders.reduce((sum, o) => {
          const created = new Date(o.createdAt);
          const delivered = new Date(o.deliveredAt);
          const days = (delivered - created) / (1000 * 60 * 60 * 24);
          return sum + days;
        }, 0) / deliveredOrders.length
      ).toFixed(1) + ' days'
    : 'N/A';

  res.json({
    success: true,
    statistics: {
      totalOrders: total,
      delivered,
      pending,
      inTransit,
      cancelled,
      deliveryRate,
      avgDeliveryDays
    }
  });
});

module.exports = router;