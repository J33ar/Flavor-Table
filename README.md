# Flavor Table

A recipe discovery application that allows users to search for recipes based on ingredients, explore random recipes, and view detailed recipe information using the Spoonacular API.

## Features

- Search recipes by ingredients
- Discover random recipes
- View recipe details including summary and cooking time
- Mark favorite recipes using local storage
- Responsive and clean user interface
- Backend powered by Express.js and frontend with vanilla JavaScript

### Backend
- Node.js
- Express.js
- Axios
- dotenv
- cors
- nodemon

### Frontend
- HTML
- CSS
- JavaScript 

### API
- Spoonacular API (https://spoonacular.com/food-api)

## Folder Structure
```
Flavor-Table/
├── node_modules/          # Dependencies
├── public/                # Static files
│   ├── index.html        # Main HTML file
│   ├── styles.css        # CSS styles
│   ├── app.js           # Frontend JavaScript
│   └── background.jpg   # Background image
├── routes/               # Express routes
│   ├── home.js          # Home route
│   └── recipes.js       # Recipe API routes
├── .env                 # Environment variables
├── .env.example         # Environment template
├── .gitignore          # Git ignore rules
├── package.json        # Project dependencies
├── package-lock.json   # Dependency lock file
├── server.js           # Main server file
└── README.md           # This file
```


## API Endpoints

### GET `/`
Serves the main index.html page

### GET `/recipes/random`
Fetches one random recipe from Spoonacular

### GET `/recipes/search?ingredients=...`
Search for recipes using one or more comma-separated ingredients

## Usage Instructions

### 1. Search Recipes
- Type ingredients in the input field
- Click "Search"
- Results appear in card format
- You can view recipe details from each card

### 2. Random Recipe
- Click on "Random Recipe" page
- A random recipe will be fetched from the API

### 3. Favorite Recipes
- Save recipes using localStorage
- View saved recipes in the Favorites page
- Remove recipes anytime


## Error Handling

- Network errors
- Empty input
- API key invalid or exceeded limit
- No results found
- Catch blocks on all async operations

## Submission Answers

**1. How many hours did it take you to complete this assignment?**  
Approximately 10 hours.

**2. Were there any parts of the lab you found challenging?**  
Yes, handling the structure of Spoonacular API responses and integrating them with clean UI display logic was a bit tricky at first.  
Managing state between random search and details view also required extra effort.

## Deployment

- Static frontend deployable via GitHub Pages
- Node.js backend runs locally with Express server

To run locally:
```bash
npm install
nodemon