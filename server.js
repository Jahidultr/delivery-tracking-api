require('dotenv').config();
const express = require('express');
const cors = require('cors');
const auth = require('./middleware/auth');
const ordersRoute = require('./routes/orders');
const trackingRoute = require('./routes/tracking');
const statsRoute = require('./routes/stats');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware setup
app.use(cors());
app.use(express.json());

// Rate limiting
const requestCounts = {};
const RATE_LIMIT = 100;
const WINDOW_MS = 15 * 60 * 1000;

app.use((req, res, next) => {
  const ip = req.ip;
  const now = Date.now();

  if (!requestCounts[ip]) {
    requestCounts[ip] = { count: 1, startTime: now };
  } else {
    const elapsed = now - requestCounts[ip].startTime;
    if (elapsed > WINDOW_MS) {
      requestCounts[ip] = { count: 1, startTime: now };
    } else {
      requestCounts[ip].count++;
      if (requestCounts[ip].count > RATE_LIMIT) {
        return res.status(429).json({
          success: false,
          message: "Too many requests! Please try again after 15 minutes."
        });
      }
    }
  }
  next();
});

// Home route
app.get('/', (req, res) => {
  res.json({
    message: "🚚 Delivery Tracking API Running!",
    endpoints: {
      getAllOrders: "GET /api/orders",
      filterByStatus: "GET /api/orders?status=pending",
      filterByName: "GET /api/orders?customerName=Rahim",
      pagination: "GET /api/orders?page=1&limit=5",
      orderSummary: "GET /api/orders/summary",
      getOneOrder: "GET /api/orders/:orderId",
      createOrder: "POST /api/orders/create",
      updateStatus: "PUT /api/orders/:orderId/status",
      deleteOrder: "DELETE /api/orders/:orderId",
      trackOrder: "GET /api/tracking/:orderId",
      autoUpdateTracking: "POST /api/tracking/update/:orderId",
      statistics: "GET /api/stats"
    }
  });
});

// Protected routes
app.use('/api/orders', auth, ordersRoute);
app.use('/api/tracking', auth, trackingRoute);
app.use('/api/stats', auth, statsRoute);

// Handle unknown routes
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found!"
  });
});

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});