const express = require('express');
const router = express.Router();
const { orders } = require('../data/mockData');

// GET - Fetch all orders with search, filter and pagination
router.get('/', (req, res) => {
  let result = [...orders];

  // Filter by status
  if (req.query.status) {
    result = result.filter(o =>
      o.status === req.query.status
    );
  }

  // Filter by customer name
  if (req.query.customerName) {
    result = result.filter(o =>
      o.customerName.toLowerCase()
      .includes(req.query.customerName.toLowerCase())
    );
  }

  // Pagination
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 5;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const paginated = result.slice(startIndex, endIndex);

  res.json({
    success: true,
    total: result.length,
    page: page,
    limit: limit,
    totalPages: Math.ceil(result.length / limit),
    orders: paginated
  });
});

// GET - Fetch single order by ID
router.get('/:orderId', (req, res) => {
  const order = orders.find(o => o.orderId === req.params.orderId);

  if (!order) {
    return res.status(404).json({
      success: false,
      message: `${req.params.orderId} does not exist. Valid orders: ORD-001 to ORD-00${orders.length}`
    });
  }

  res.json({ success: true, order });
});

// POST - Create new order
router.post('/create', (req, res) => {
  const { customerName, phone, address, items } = req.body;

  // Check required fields
  if (!customerName || !phone || !address || !items) {
    return res.status(400).json({
      success: false,
      message: "All fields are required!",
      required: {
        customerName: "string",
        phone: "string",
        address: "string",
        items: "array"
      }
    });
  }

  // Validate phone number (11 digits)
  if (!/^[0-9]{11}$/.test(phone)) {
    return res.status(400).json({
      success: false,
      message: "Phone number must be 11 digits! Example: 01711223344"
    });
  }

  // Validate items array
  if (!Array.isArray(items) || items.length === 0) {
    return res.status(400).json({
      success: false,
      message: "Items must be a non-empty array! Example: ['Shoes', 'T-Shirt']"
    });
  }

  // Create new order object
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

// PUT - Update order status
router.put('/:orderId/status', (req, res) => {
  const order = orders.find(o => o.orderId === req.params.orderId);

  // Check if order exists
  if (!order) {
    return res.status(404).json({
      success: false,
      message: `${req.params.orderId} does not exist. Valid orders: ORD-001 to ORD-00${orders.length}`
    });
  }

  const { status } = req.body;
  const validStatuses = ["pending", "in-transit", "delivered", "cancelled"];

  // Validate status value
  if (!validStatuses.includes(status)) {
    return res.status(400).json({
      success: false,
      message: `Invalid status! Valid statuses are: ${validStatuses.join(', ')}`
    });
  }

  // Update status
  order.status = status;

  // Set delivered date if status is delivered
  if (status === "delivered") {
    order.deliveredAt = new Date().toISOString().split('T')[0];
  }

  res.json({
    success: true,
    message: "Status updated successfully!",
    order
  });
});

// DELETE - Delete order by ID
router.delete('/:orderId', (req, res) => {
  const index = orders.findIndex(o => o.orderId === req.params.orderId);

  // Check if order exists
  if (index === -1) {
    return res.status(404).json({
      success: false,
      message: `${req.params.orderId} does not exist. Valid orders: ORD-001 to ORD-00${orders.length}`
    });
  }

  orders.splice(index, 1);

  res.json({
    success: true,
    message: "Order deleted successfully!"
  });
});

module.exports = router;