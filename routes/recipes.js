const express = require('express');
const axios = require('axios');
const router = express.Router();


const API_KEY = process.env.SPOONACULAR_API_KEY;

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
});


module.exports = router;