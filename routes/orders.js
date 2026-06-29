const express = require('express');
const router = express.Router();
const { orders } = require('../data/mockData');

// GET - All Orders 
router.get('/', (req, res) => {
  res.json({
    success: true,
    total: orders.length,
    orders: orders
  });
});

// GET - One Orders Check in Id Number
router.get('/:orderId', (req, res) => {
  const order = orders.find(o => o.orderId === req.params.orderId);

  if (!order) {
    return res.status(404).json({
      success: false,
      message: "Order not found!"
    });
  }

  res.json({ success: true, order });
});

// POST - New Order create 
router.post('/create', (req, res) => {
  const { customerName, phone, address, items } = req.body;

  if (!customerName || !phone || !address || !items) {
    return res.status(400).json({
      success: false,
      message: "customerName, phone, address, items sob lagbe!"
    });
  }

  const newOrder = {
    orderId: `ORD-00${orders.length + 1}`,
    customerName,
    phone,
    address,
    items,
    status: "pending",
    createdAt: new Date().toISOString().split('T')[0],
    deliveredAt: null
  };

  orders.push(newOrder);

  res.status(201).json({
    success: true,
    message: "Order created successfully!",
    order: newOrder
  });
});

// PUT - Order status update 
router.put('/:orderId/status', (req, res) => {
  const order = orders.find(o => o.orderId === req.params.orderId);

  if (!order) {
    return res.status(404).json({
      success: false,
      message: "Order not found!"
    });
  }

  const { status } = req.body;
  const validStatuses = ["pending", "in-transit", "delivered", "cancelled"];

  if (!validStatuses.includes(status)) {
    return res.status(400).json({
      success: false,
      message: `Status : ${validStatuses.join(', ')}`
    });
  }

  order.status = status;
  if (status === "delivered") {
    order.deliveredAt = new Date().toISOString().split('T')[0];
  }

  res.json({
    success: true,
    message: "Status updated!",
    order
  });
});

// DELETE - Order cancel
router.delete('/:orderId', (req, res) => {
  const index = orders.findIndex(o => o.orderId === req.params.orderId);

  if (index === -1) {
    return res.status(404).json({
      success: false,
      message: "Order not found!"
    });
  }

  orders.splice(index, 1);
  res.json({
    success: true,
    message: "Order deleted!"
  });
});

module.exports = router;