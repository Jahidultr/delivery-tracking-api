require('dotenv').config();
const express = require('express');
const cors = require('cors');
const auth = require('./middleware/auth');
const ordersRoute = require('./routes/orders');
const trackingRoute = require('./routes/tracking');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Home route
app.get('/', (req, res) => {
  res.json({
    message: "🚚 Delivery API Running!",
    endpoints: {
      getAllOrders: "GET /api/orders",
      getOneOrder: "GET /api/orders/:orderId",
      createOrder: "POST /api/orders/create",
      updateStatus: "PUT /api/orders/:orderId/status",
      deleteOrder: "DELETE /api/orders/:orderId",
      trackOrder: "GET /api/tracking/:orderId"
    }
  });
});

// Protected routes
app.use('/api/orders', auth, ordersRoute);
app.use('/api/tracking', auth, trackingRoute);

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});