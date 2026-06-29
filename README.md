# 🚚 Delivery Tracking API

A RESTful API for managing and tracking delivery orders. Built with **Node.js** and **Express.js**, and deployed on **Railway**.Includes Auth, CRUD, Search, Filter, Pagination, Rate Limiting & Auto Tracking. 🚚

## 🌍 Live API
```text
https://delivery-tracking-api-production.up.railway.app
```

---

## 🔐 Authentication
All protected endpoints require the following header:
```http
x-api-key: mydeliveryapikey123
```

---

## 🚀 Run Locally
```bash
git clone https://github.com/Jahidultr/delivery-tracking-api.git
cd delivery-tracking-api
npm install
```

Create a `.env` file:
```env
PORT=3000
API_KEY=mydeliveryapikey123
```

Start the server:
```bash
npm run dev
```

Open:
```text
http://localhost:3000
```

---

## 📁 Project Structure
```text
delivery-tracking-api/
├── server.js
├── routes/
│   ├── orders.js
│   ├── tracking.js
│   └── stats.js
├── middleware/
│   └── auth.js
├── data/
│   └── mockData.js
└── package.json
```

---

## 📦 API Endpoints

| Method | Endpoint | Description |
| ------ | -------- | ----------- |
| GET | `/` | Check API status |
| GET | `/api/orders` | Get all orders |
| GET | `/api/orders/summary` | Get order summary |
| GET | `/api/orders/:id` | Get a single order |
| POST | `/api/orders/create` | Create a new order |
| PUT | `/api/orders/:id/status` | Update delivery status |
| DELETE | `/api/orders/:id` | Delete an order |
| GET | `/api/tracking/:id` | Track an order |
| POST | `/api/tracking/update/:id` | Auto update tracking history |
| GET | `/api/stats` | Get order statistics |

---

## 🧪 Quick API Testing

### Check API
```http
GET https://delivery-tracking-api-production.up.railway.app
```

### Get All Orders
```http
GET https://delivery-tracking-api-production.up.railway.app/api/orders
```

### Get Single Order
```http
GET https://delivery-tracking-api-production.up.railway.app/api/orders/ORD-001
```

### Get Order Summary
```http
GET https://delivery-tracking-api-production.up.railway.app/api/orders/summary
```

### Get Statistics
```http
GET https://delivery-tracking-api-production.up.railway.app/api/stats
```

### Filter by Status
```http
GET https://delivery-tracking-api-production.up.railway.app/api/orders?status=pending
```

### Search by Customer Name
```http
GET https://delivery-tracking-api-production.up.railway.app/api/orders?customerName=Rahim
```

### Pagination
```http
GET https://delivery-tracking-api-production.up.railway.app/api/orders?page=1&limit=3
```

### Create Order
```http
POST https://delivery-tracking-api-production.up.railway.app/api/orders/create
```
```json
{
  "customerName": "Jahidul Islam",
  "phone": "01700000000",
  "address": "Mirpur, Dhaka",
  "items": ["Product 1", "Product 2"]
}
```

### Update Order Status
```http
PUT https://delivery-tracking-api-production.up.railway.app/api/orders/ORD-003/status
```
```json
{
  "status": "in-transit"
}
```

### Valid Status Values
```text
pending | in-transit | delivered | cancelled
```

### Auto Update Tracking History
```http
POST https://delivery-tracking-api-production.up.railway.app/api/tracking/update/ORD-003
```
```json
{
  "status": "in-transit",
  "location": "Chittagong Hub"
}
```

### Track an Order
```http
GET https://delivery-tracking-api-production.up.railway.app/api/tracking/ORD-001
```

### Delete an Order
```http
DELETE https://delivery-tracking-api-production.up.railway.app/api/orders/ORD-001
```

---

## 🧪 QA Practice Scenarios

This project is designed for practicing **API Testing**.

You can practice:

* ✅ API Authentication Testing
* ✅ GET, POST, PUT & DELETE Requests
* ✅ CRUD Operations
* ✅ Request Header Validation
* ✅ Request Body Validation
* ✅ Response Body Validation
* ✅ HTTP Status Code Validation
* ✅ Positive & Negative Test Cases
* ✅ Search & Filter Testing
* ✅ Pagination Testing
* ✅ Delivery Status Update Testing
* ✅ Order Tracking API Testing
* ✅ Auto Tracking History Update Testing
* ✅ Order Summary Testing
* ✅ Statistics Testing
* ✅ Rate Limiting Testing (429)
* ✅ Error Response Validation (400, 401, 404, 429, 500)

---

## ⚠️ Rate Limiting

This API has rate limiting enabled:
```text
Maximum 100 requests per 15 minutes per IP
Exceeded limit returns: 429 Too Many Requests
```

---

## ❌ Error Responses

| Status Code | Meaning |
|-------------|---------|
| 400 | Bad Request — Invalid input data |
| 401 | Unauthorized — Invalid or missing API key |
| 404 | Not Found — Order does not exist |
| 429 | Too Many Requests — Rate limit exceeded |
| 500 | Internal Server Error |

---

## 🛠️ Tech Stack

* Node.js
* Express.js
* REST API
* Railway
* Git & GitHub

---

## 👨‍💻 Author

**Md. Jahidul Islam**

⭐ If you found this project useful, consider giving it a star.
