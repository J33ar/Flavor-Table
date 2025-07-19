# 🧂 Flavor Table – User Authentication & Deployment.

**Flavor Table** is now extended to include user authentication, route protection using JWT, and is ready for deployment to Render.com.

Users can now register, log in, and access a secure profile section. The backend is fully protected and communicates securely using tokens.

---

## 🔐 New Features

- 👤 Register and log in with hashed passwords
- 🔑 JWT-based authentication
- 🔒 Protected routes (`/profile`)
- ✏️ Update user email, username, and password
- 📄 Store JWT token in localStorage
- ☁️ Ready for deployment on Render

---

## ⚙️ Technologies Used (Additions)

- bcrypt (password hashing)
- jsonwebtoken (JWT token generation & verification)
- Middleware for route protection (`verifyToken.js`)
- PostgreSQL `users` table

---

## 📁 Updated Project Structure

```
Flavor-Table/
├── public/
│   ├── login.html             # Login form (frontend bonus)
│   ├── register.html          # Registration form
├── routes/
│   ├── home.js
│   ├── recipes.js
│   └── users.js               # New user/auth routes
├── middleware/
│   └── verifyToken.js         # JWT verification middleware
├── server.js
├── .env
└── README.md
```

---

## 🗄️ Database Schema: `users` Table

```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(50) NOT NULL UNIQUE,
  email VARCHAR NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL
);
```

---

## 🔌 API Routes (Authentication)

| Method | Endpoint             | Description                            |
|--------|----------------------|----------------------------------------|
| POST   | `/api/auth/register` | Register new user                      |
| POST   | `/api/auth/login`    | Login user and return JWT token        |
| GET    | `/api/users/profile` | View user profile (protected)          |
| PUT    | `/api/users/profile` | Update username, email, password       |

---

## 🧠 JWT & Authorization

- All protected routes require token:
```http
Authorization: Bearer <token>
```

- On login, frontend stores token in `localStorage`, then sends it via headers:
```js
axios.get('/api/users/profile', {
  headers: { Authorization: `Bearer ${token}` }
});
```

---

## 🔐 Password Encryption (bcrypt)

- Passwords are hashed using bcrypt before saving to database.
- Login verifies password using:
```js
const match = await bcrypt.compare(password, user.password);
```

---

## 🧪 Testing with Postman

### 1. Register
```
POST /api/auth/register
Body (JSON):
{
  "username": "j33ar",
  "email": "j33ar@example.com",
  "password": "securepassword"
}
```

### 2. Login
```
POST /api/auth/login
Body (JSON):
{
  "email": "j33ar@example.com",
  "password": "securepassword"
}
```
✅ Returns:
```json
{
  "token": "eyJhbGciOiJIUzI1NiIs..."
}
```

### 3. Get Profile
```
GET /api/users/profile
Headers:
Authorization: Bearer <token>
```

### 4. Update Profile
```
PUT /api/users/profile
Headers:
Authorization: Bearer <token>
Body (JSON):
{
  "username": "newname",
  "email": "newemail@example.com",
  "password": "newpassword123"
}
```

---

## 🛠️ Deployment Instructions (Render)

### 1. Push your code to GitHub
Make sure you're on `Flavor-Table-Deployment` branch:
```bash
git add .
git commit -m "Add user auth and JWT protection"
git push origin Flavor-Table-Deployment
```

### 2. Sign in to [Render](https://render.com)

- New → Web Service
- Connect your GitHub repo
- Set build command: `npm install`
- Set start command: `node server.js` (or `npx nodemon server.js`)
- Add environment variables:
  - `PORT=3001`
  - `DATABASE_URL=postgresql://...`
  - `SPOONACULAR_API_KEY=...`
  - `JWT_SECRET=...`


##  Status

- [✅] All auth routes implemented
- [✅] JWT + bcrypt working correctly
- [✅] Protected routes functional
- [✅] Profile update supports password change
- [✅] Ready for deployment
- [x] (Optional) Frontend login/register integration

---

## 📄 Submission Answers

**1. How many hours did it take you to complete this assignment?**  
Approximately 6 hours.

**2. Were there any parts of the lab you found challenging?**  
Yes — understanding how JWTs work, especially how to protect routes using middleware and how to store and use tokens on frontend. Also, integrating password updates within profile logic took extra care.

---

## 🧠 Notes

- Never expose your `.env` file. Use `.env.example` instead.
- Always hash passwords before storing.
- Never return raw password hashes to the frontend.
- Always validate token before giving access to private data.

---

## 🧾 Resources

- [JWT Guide](https://jwt.io/)
- [bcrypt npm](https://www.npmjs.com/package/bcrypt)
- [Render Deployment Docs](https://render.com/docs)

---

## Render Link
 
[link][https://flavor-table-h15f.onrender.com]