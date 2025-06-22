const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(cors());

app.use(express.static('public'));

//Routes
const homeRoute = require('./routes/home');
const recipesRoutes = require ('./routes/recipes');

app.use('/',homeRoute);
app.use('/recipes',recipesRoutes);

app.listen(PORT, ()=> {
    console.log(`Server is running on http://localhost:${PORT}`);
    
});