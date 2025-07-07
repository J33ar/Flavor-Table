# 🧂 Flavor Table

**Flavor Table** is a recipe discovery app that lets users search for recipes using ingredients, explore random meals, view detailed instructions, and save favorites using a PostgreSQL database.

---

## 🔥 Features

- 🔎 Search recipes by ingredients
- 🎲 Discover random recipes
- 📋 View full instructions and cooking time
- 💾 Save favorite recipes to PostgreSQL
- 🗑️ Delete favorite recipes
- ✏️ Update recipe details (Update route implemented; UI integration pending)
- 🌐 Clean and responsive UI

---

## ⚙️ Technologies Used

### 🖥️ Backend
- Node.js
- Express.js
- Axios
- dotenv
- cors
- pg (PostgreSQL)

### 💻 Frontend
- HTML
- CSS
- JavaScript (Vanilla)

### 🌐 API
- [Spoonacular API](https://spoonacular.com/food-api)

---

## 📁 Project Structure

```
Flavor-Table/
├── node_modules/
├── public/
│   ├── index.html             # Main search page
│   ├── favorites.html         # Favorite recipes from PostgreSQL
│   ├── randomRecipes.html     # Random recipe page
│   ├── styles.css             # App styling
│   └── app.js                 # Frontend logic (fetching, saving, rendering)
├── routes/
│   ├── home.js                # Static HTML serving
│   └── recipes.js             # API logic and CRUD routes
├── .env                       # API key + DB URL
├── .env.example
├── .gitignore
├── package.json
├── server.js                 # Express server
=======
# 🧂 Flavor Table – User Authentication & Deployment

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
>>>>>>> 1b87346 (Add authentication, JWT middleware, and user profile routes)
└── README.md
```

---

<<<<<<< HEAD
## 🗄️ Database Schema

Using PostgreSQL, the `recipes` table is structured as:

```sql
CREATE TABLE recipes (
  id SERIAL PRIMARY KEY,
  title VARCHAR NOT NULL,
  image TEXT,
  instructions TEXT,
  ingredients JSONB,
  readyin INTEGER
=======
## 🗄️ Database Schema: `users` Table

```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(50) NOT NULL UNIQUE,
  email VARCHAR NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL
>>>>>>> 1b87346 (Add authentication, JWT middleware, and user profile routes)
);
```

---

<<<<<<< HEAD
## 🔌 API Routes

| Method | Endpoint              | Description                            |
|--------|-----------------------|----------------------------------------|
| GET    | `/`                   | Serves index.html                      |
| GET    | `/recipes/random`     | Fetches a random recipe from Spoonacular |
| GET    | `/recipes/search?ingredients=chicken,tomato` | Search recipes by ingredients |
| GET    | `/recipes`        | Fetch all favorite recipes             |
| POST   | `/recipes`        | Save new recipe to DB                  |
| PUT    | `/recipes/:id`    | Update recipe (route implemented only) |
| DELETE | `/recipes/:id`    | Delete recipe by ID                    |

---

## 🧪 How to Use

### 1. Search Recipes
- Go to `index.html`
- Enter ingredients like `chicken, rice`
- Click **Search**
- View results and **Save to Favorites**

### 2. Random Recipe
- Go to `randomRecipes.html`
- Click the button to fetch one random recipe
- View its image, instructions, and ingredients

### 3. Favorite Recipes
- Go to `favorites.html`
- All saved recipes from PostgreSQL will be displayed
- You can **Delete** or (in the future) **Edit** them

---

## ❌ Error Handling

- Handles empty input fields
- Displays proper messages on:
  - API failures
  - Network errors
  - Database issues
  - No recipes found

---

## 📝 Submission Answers

**1. How many hours did it take you to complete this assignment?**  
Approximately 8 hours.

**2. Were there any parts of the lab you found challenging?**  
Yes, working with the Spoonacular API response structure, especially normalizing ingredient data, required attention.  
Also, shifting from localStorage to PostgreSQL and building full CRUD routes with backend/frontend sync took extra time.

---

## 🚀 Running Locally

### Install dependencies:
```bash
npm install
```

### Start the server:
```bash
npx nodemon server.js
```

### .env Example:
```
API_KEY=your_spoonacular_api_key
DATABASE_URL=postgresql://username:password@localhost:5432/flavor_table
```

---

## ✅ Status

- All core functionality implemented
- Save, delete, and fetch from DB works perfectly
- Update route created, UI for editing is pending (Bonus Task)

---
=======
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

