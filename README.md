
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
└── README.md
```

---

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
);
```

---

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