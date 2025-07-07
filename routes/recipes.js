const express = require('express');
const axios = require('axios');
const router = express.Router();
const pg = require('pg');
const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });


const API_KEY = process.env.SPOONACULAR_API_KEY;

<<<<<<< HEAD
=======
//random
>>>>>>> 1b87346 (Add authentication, JWT middleware, and user profile routes)
router.get('/random', async (req, res) => {
  try {
    const response = await axios.get(
      `https://api.spoonacular.com/recipes/random?apiKey=${API_KEY}`
    );

    const recipe = response.data.recipes[0];

    const fetch = {
      title: recipe.title,
      image: recipe.image,
      instructions: recipe.instructions,
      ingredients: recipe.extendedIngredients.map(ingredient => ingredient.original),
    };

    res.json(fetch);

  } catch (error) {
    console.error('Error fetching random recipe:', error.message);
    res.status(500).json({ error: 'Failed to fetch random recipe' });
  }
});

<<<<<<< HEAD
router.get('/search', async (req, res) => {
    const ingredients = req.query.ingredients;

    try {
        const response = await axios.get(
            `https://api.spoonacular.com/recipes/findByIngredients`,
            {
                params:{
                    apiKey: API_KEY,
                    ingredients: ingredients,
                    number: 10
                }
            }
        );

        const fetch = response.data.map( recipe => ({
            title: recipe.title,
            image: recipe.image,
            usedIngredients: recipe.usedIngredients.map(ing => ing.name),
            missedIngredients: recipe.missedIngredients.map(ing => ing.name),
        }));
        res.json(fetch);
    } catch (error) {
        console.error('Error searching recipes:', error.response?.data || error.message);
        res.status(500).json({ error: 'Failed to search recipes' });
    }
=======
//search
router.get('/search', async (req, res) => {
  const ingredients = req.query.ingredients;

  try {
    const response = await axios.get(
      'https://api.spoonacular.com/recipes/findByIngredients',
      {
        params: {
          apiKey: API_KEY,
          ingredients,
          number: 10,
        },
      }
    );

    const basicRecipes = response.data;

    // جلب تفاصيل كل وصفة باستخدام ID
    const detailedRecipes = await Promise.all(
      basicRecipes.map(async (recipe) => {
        try {
          const detailRes = await axios.get(
            `https://api.spoonacular.com/recipes/${recipe.id}/information`,
            {
              params: {
                apiKey: API_KEY,
              },
            }
          );

          const detail = detailRes.data;

          return {
            title: recipe.title,
            image: recipe.image,
            usedIngredients: recipe.usedIngredients.map((i) => i.name),
            missedIngredients: recipe.missedIngredients.map((i) => i.name),
            instructions: detail.instructions || 'No instructions available',
            readyInMinutes: detail.readyInMinutes || 0,
          };
        } catch (err) {
          console.error(`Failed to fetch details for recipe ID ${recipe.id}`, err.message);
          return null;
        }
      })
    );

    const validRecipes = detailedRecipes.filter((r) => r !== null);

    res.json(validRecipes);
  } catch (error) {
    console.error('Error searching recipes:', error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to search recipes' });
  }
>>>>>>> 1b87346 (Add authentication, JWT middleware, and user profile routes)
});

//Get all recipes
router.get('/',async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM recipes');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch recipes' });
  }
});

//Post new recipe
router.post('/', async (req, res) => {
  let {title, image, instructions,ingredients, readyin} = req.body;
  try {
    if (!Array.isArray(ingredients)) {
      ingredients = [];
    }
    ingredients = JSON.stringify(ingredients);

    const result = await pool.query(
      'INSERT INTO recipes (title, image, instructions,ingredients, readyin) VALUES ($1,$2,$3,$4,$5) RETURNING *',
      [title, image, instructions,ingredients, readyin]);
      res.status(201).json(result.rows[0]);
  } catch (error) {
     console.error(" Error inserting recipe:", error);
     res.status(500).json({ error: 'Failed to add recipe' });
  }
});

<<<<<<< HEAD
// PUT update a recipe
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { title, image, instructions, ingredients, readyin } = req.body;
  try {
    const result = await pool.query(
      'UPDATE recipes SET title=$1, image=$2, instructions=$3, ingredients=$4, readyin=$5 WHERE id=$6 RETURNING *',
      [title, image, instructions, ingredients, readyin, id]
    );
    res.json(result.rows[0]);
  } catch (err) {
=======
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  let { title, image, instructions, ingredients, readyin } = req.body;

  try {
    const result = await pool.query(
      'UPDATE recipes SET title=$1, image=$2, instructions=$3, ingredients=$4, readyin=$5 WHERE id=$6 RETURNING *',
      [title, image, instructions, JSON.stringify(ingredients), readyin, id]
    );

    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error during update:', err); 
>>>>>>> 1b87346 (Add authentication, JWT middleware, and user profile routes)
    res.status(500).json({ error: 'Failed to update recipe' });
  }
});

// DELETE recipe
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM recipes WHERE id=$1', [id]);
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete recipe' });
  }
});


module.exports = router;