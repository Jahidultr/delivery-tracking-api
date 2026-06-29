const orders = [
  {
    orderId: "ORD-001",
    customerName: "Rahim Uddin",
    phone: "01712345678",
    address: "Mirpur 10, Dhaka",
    items: ["Samsung TV", "Remote"],
    status: "delivered",
    createdAt: "2024-01-10",
    deliveredAt: "2024-01-12"
  },
  {
    orderId: "ORD-002",
    customerName: "Karim Mia",
    phone: "01898765432",
    address: "Gulshan 2, Dhaka",
    items: ["iPhone 15"],
    status: "in-transit",
    createdAt: "2024-01-11",
    deliveredAt: null
  },
  {
    orderId: "ORD-003",
    customerName: "Sadia Begum",
    phone: "01611122233",
    address: "Chittagong, Agrabad",
    items: ["Laptop", "Mouse", "Keyboard"],
    status: "pending",
    createdAt: "2024-01-12",
    deliveredAt: null
  }
];

const trackingHistory = {
  "ORD-001": [
    { time: "2024-01-10 10:00", status: "Order Placed", location: "Dhaka Warehouse" },
    { time: "2024-01-11 09:00", status: "Picked Up", location: "Dhaka Hub" },
    { time: "2024-01-12 14:00", status: "Delivered", location: "Mirpur 10" }
  ],
  "ORD-002": [
    { time: "2024-01-11 11:00", status: "Order Placed", location: "Dhaka Warehouse" },
    { time: "2024-01-12 08:00", status: "In Transit", location: "Dhaka Hub" }
  ],
  "ORD-003": [
    { time: "2024-01-12 15:00", status: "Order Placed", location: "Chittagong Warehouse" }
  ]
};

module.exports = { orders, trackingHistory };