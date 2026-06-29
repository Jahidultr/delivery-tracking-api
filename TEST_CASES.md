# 🧪 Test Cases — Delivery Tracking API

**Live URL:** https://delivery-tracking-api-production.up.railway.app  
**Auth Header:** x-api-key: mydeliveryapikey123

---

## 1. Functional Testing

| TC ID | Test Case | Method | Endpoint | Expected Result |
|-------|-----------|--------|----------|----------------|
| TC-001 | Get all orders | GET | `/api/orders` | 200 OK |
| TC-002 | Get single order by ID | GET | `/api/orders/ORD-001` | 200 OK |
| TC-003 | Create a new order | POST | `/api/orders/create` | 201 Created |
| TC-004 | Update order status | PUT | `/api/orders/ORD-001/status` | 200 OK |
| TC-005 | Delete an order | DELETE | `/api/orders/ORD-001` | 200 OK |
| TC-006 | Track an order | GET | `/api/tracking/ORD-001` | 200 OK |

---

## 2. Authentication Testing

| TC ID | Test Case | Input | Expected Result |
|-------|-----------|-------|----------------|
| TC-007 | Request with valid API key | x-api-key: mydeliveryapikey123 | ✅ 200 OK |
| TC-008 | Request without API key | No header | ❌ 401 Unauthorized |
| TC-009 | Request with wrong API key | x-api-key: wrongkey123 | ❌ 401 Unauthorized |

---

## 3. Validation Testing

| TC ID | Test Case | Input | Expected Result |
|-------|-----------|-------|----------------|
| TC-010 | Phone number less than 11 digits | "phone": "017123" | ❌ 400 Bad Request |
| TC-011 | Phone number with letters | "phone": "abcdefghijk" | ❌ 400 Bad Request |
| TC-012 | Empty items array | "items": [] | ❌ 400 Bad Request |
| TC-013 | Missing required field | No customerName | ❌ 400 Bad Request |
| TC-014 | All valid data provided | All fields correct | ✅ 201 Created |

---

## 4. Negative Testing

| TC ID | Test Case | Input | Expected Result |
|-------|-----------|-------|----------------|
| TC-015 | Get non-existing order | GET /api/orders/ORD-999 | ❌ 404 Not Found |
| TC-016 | Delete non-existing order | DELETE /api/orders/ORD-999 | ❌ 404 Not Found |
| TC-017 | Update non-existing order | PUT /api/orders/ORD-999/status | ❌ 404 Not Found |
| TC-018 | Update with invalid status | "status": "flying" | ❌ 400 Bad Request |
| TC-019 | Request to unknown route | GET /api/unknown | ❌ 404 Route Not Found |

---

## 5. Filter & Search Testing

| TC ID | Test Case | Endpoint | Expected Result |
|-------|-----------|----------|----------------|
| TC-020 | Filter by pending status | `/api/orders?status=pending` | Only pending orders returned |
| TC-021 | Filter by delivered status | `/api/orders?status=delivered` | Only delivered orders returned |
| TC-022 | Search by customer name | `/api/orders?customerName=Rahim` | Only Rahim's orders returned |
| TC-023 | Case insensitive search | `/api/orders?customerName=rahim` | Same result as TC-022 |
| TC-024 | Filter with non-existing status | `/api/orders?status=flying` | Empty array returned |

---

## 6. Pagination Testing

| TC ID | Test Case | Endpoint | Expected Result |
|-------|-----------|----------|----------------|
| TC-025 | Get first page | `/api/orders?page=1&limit=3` | First 3 orders returned |
| TC-026 | Get second page | `/api/orders?page=2&limit=3` | Next 3 orders returned |
| TC-027 | Custom limit | `/api/orders?limit=5` | 5 orders returned |
| TC-028 | No page number provided | `/api/orders` | Default page 1 returned |
| TC-029 | No limit provided | `/api/orders` | Default limit 5 returned |

---

## 7. Status Update Testing

| TC ID | Test Case | Input | Expected Result |
|-------|-----------|-------|----------------|
| TC-030 | Update status to pending | "status": "pending" | ✅ 200 OK |
| TC-031 | Update status to in-transit | "status": "in-transit" | ✅ 200 OK |
| TC-032 | Update status to delivered | "status": "delivered" | ✅ 200 OK + deliveredAt auto set |
| TC-033 | Update status to cancelled | "status": "cancelled" | ✅ 200 OK |
| TC-034 | Update with invalid status | "status": "flying" | ❌ 400 Bad Request |

---

## 8. Rate Limiting Testing

| TC ID | Test Case | Input | Expected Result |
|-------|-----------|-------|----------------|
| TC-035 | Requests within limit | Under 100 requests per 15 min | ✅ Normal response |
| TC-036 | Requests exceeding limit | Over 100 requests per 15 min | ❌ 429 Too Many Requests |

---

## 9. Response Structure Testing

| TC ID | Test Case | What to Check | Expected Result |
|-------|-----------|--------------|----------------|
| TC-037 | Success field present | `success: true/false` | Always present in response |
| TC-038 | Correct status codes | 200, 201, 400, 401, 404, 429 | Matches expected code |
| TC-039 | Response time acceptable | Time taken | Under 2000ms |
| TC-040 | Valid JSON format | Response body | Always valid JSON |

---

## 📊 Summary

| Category | Total Tests |
|----------|------------|
| Functional Testing | 6 |
| Authentication Testing | 3 |
| Validation Testing | 5 |
| Negative Testing | 5 |
| Filter & Search Testing | 5 |
| Pagination Testing | 5 |
| Status Update Testing | 5 |
| Rate Limiting Testing | 2 |
| Response Structure Testing | 4 |
| **Total** | **40** |