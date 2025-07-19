# IMF Gadget API 🔧

An ultra-secure REST API for managing IMF gadgets, built with Node.js, Express, MongoDB, and JWT authentication.

---

## 🚀 Features

- Add, update, and decommission gadgets
- Generate unique codename for each gadget using the `codename` library
- Simulate self-destruct with a confirmation code
- Filter gadgets by status
- JWT-based secure authentication system
- MongoDB + Mongoose based database

---

## 📦 Tech Stack

- Node.js
- Express.js
- MongoDB with Mongoose
- JWT for authentication
- `unique-names-generator` library for random names

---

## 🔐 Authentication

All `/gadgets` routes are protected and require a valid JWT.

### Signup
```
POST /auth/signup
Body: {
  "email": "agent@imf.com",
  "password": "yourPassword"
}
```

### Login
```
POST /auth/login
Response: {
  "token": "<jwt_token>"
}
```
Use the token in headers:
```
Authorization: Bearer <token>
```

---

## 📘 API Endpoints

### Gadget Routes (Protected)

| Method | Endpoint                          | Description                            |
|--------|-----------------------------------|----------------------------------------|
| GET    | `/gadgets`                       | List all gadgets with success %        |
| GET    | `/gadgets?status=Available`      | Filter gadgets by status               |
| POST   | `/gadgets`                       | Add a new gadget (auto codename)       |
| PATCH  | `/gadgets/:id`                   | Update a gadget                        |
| DELETE | `/gadgets/:id`                   | Decommission a gadget                  |
| POST   | `/gadgets/:id/self-destruct`     | Simulate self-destruct confirmation    |

---

## 🧪 Example

```
POST /gadgets
Headers: Authorization: Bearer <token>
Response:
{
  "_id": "...",
  "name": "stealth-viper",
  "status": "Available",
  "createdAt": "...",
  "updatedAt": "..."
}
```

---

## 🛠️ Local Setup

### 1. Clone the repository
```bash
git clone https://github.com/your-username/imf-gadget-api.git
cd imf-gadget-api
```

### 2. Install dependencies
```bash
npm install
```

### 3. Setup Environment Variables
Create a `.env` file:
```env
PORT=3000
MONGO_URI=mongodb://localhost:27017/imf-db
JWT_SECRET=your_jwt_secret_key
```

### 4. Start the server
```bash
npm run dev  # or npm start
```

Server should be live at `http://localhost:3000`


## 📣 Note
> This message will not self-destruct... 
