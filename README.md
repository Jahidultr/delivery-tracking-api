# 🚚 Delivery Tracking API

A RESTful API for managing and tracking delivery orders. Built with **Node.js** and **Express.js**, and deployed on **Railway**.

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
│   └── tracking.js
├── middleware/
│   └── auth.js
├── data/
│   └── mockData.js
└── package.json
```

---

## 📦 API Endpoints

| Method | Endpoint                 | Description            |
| ------ | ------------------------ | ---------------------- |
| GET    | `/`                      | Check API status       |
| GET    | `/api/orders`            | Get all orders         |
| GET    | `/api/orders/:id`        | Get a single order     |
| POST   | `/api/orders/create`     | Create a new order     |
| PUT    | `/api/orders/:id/status` | Update delivery status |
| DELETE | `/api/orders/:id`        | Delete an order        |
| GET    | `/api/tracking/:id`      | Track an order         |

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

### Get One Order

```http
GET https://delivery-tracking-api-production.up.railway.app/api/orders/ORD-003
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
  "items": [
    "Product 1",
    "Product 2"
  ]
}
```

### Update Order Status

```http
PUT https://delivery-tracking-api-production.up.railway.app/api/orders/ORD-007/status
```

```json
{
  "status": "pending"
}
```

### Valid Status

```text
pending | in-transit | delivered | cancelled
```

---

## 🧪 QA Practice Scenarios

This project is designed for practicing **API Testing**.

You can practice:

* ✅ API Authentication
* ✅ GET, POST, PUT & DELETE Requests
* ✅ CRUD Operations
* ✅ Request Header Validation
* ✅ Request Body Validation
* ✅ Response Body Validation
* ✅ HTTP Status Code Validation
* ✅ Positive & Negative Test Cases
* ✅ Delivery Status Update Testing
* ✅ Order Tracking API Testing
* ✅ Error Response Validation (400, 401, 404, 500)

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
