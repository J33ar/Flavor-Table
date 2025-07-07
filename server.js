const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
dotenv.config();
const pg = require('pg');

const app = express();
const PORT = process.env.PORT;
// const client = new pg.Client(DATABASE_URL);
const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

//Routes
const homeRoute = require('./routes/home');
const recipesRoutes = require ('./routes/recipes');
<<<<<<< HEAD

app.use('/',homeRoute);
app.use('/recipes',recipesRoutes);
=======
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users'); 

app.use('/',homeRoute);
app.use('/recipes',recipesRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
>>>>>>> 1b87346 (Add authentication, JWT middleware, and user profile routes)


pool.connect()
  .then(() => {
    app.listen(PORT, ()=> {
    console.log(`Server is running on http://localhost:${PORT}`); 
});

  })
  .catch((err) => {
    console.error("Could not connect to database:", err);
  });