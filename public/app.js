// ==================== SEARCH ====================
const searchBtn = document.getElementById('searchBtn');
if (searchBtn) {
  searchBtn.addEventListener('click', async () => {
    const input = document.getElementById('ingredientInput').value.trim();
    const resultsDiv = document.getElementById('resultsContainer');
    resultsDiv.innerHTML = ''; // clear old results

    if (!input) {
      resultsDiv.textContent = 'Please enter some ingredients.';
      return;
    }

    try {
      const response = await fetch(`/recipes/search?ingredients=${encodeURIComponent(input)}`);
      const data = await response.json();

      if (data.length === 0) {
        resultsDiv.textContent = 'No recipes found.';
        return;
      }

      data.forEach(recipe => {
        const card = document.createElement('div');
        card.classList.add('recipe-card');

        card.innerHTML = `
          <h2>${recipe.title}</h2>
          <img src="${recipe.image}" alt="${recipe.title}" width="200">
          <p><strong>Used:</strong> ${recipe.usedIngredients.join(', ')}</p>
          <p><strong>Missing:</strong> ${recipe.missedIngredients.join(', ')}</p>
          <button class="saveBtn">Save to Favorites</button>    
        `;

        card.querySelector('.saveBtn').addEventListener('click', () => {
          const favorites = JSON.parse(localStorage.getItem('favorites')) || [];

          const alreadyExists = favorites.some(fav => fav.title === recipe.title);
          if (!alreadyExists) {
            favorites.push(recipe);
            localStorage.setItem('favorites', JSON.stringify(favorites));
            alert('Recipe saved!');
          } else {
            alert('Already saved!');
          }
        });

        resultsDiv.appendChild(card);
      });

    } catch (err) {
      resultsDiv.textContent = 'Error fetching recipes.';
      console.error(err);
    }
  });
}
// ==================== RANDOM ====================
const randomBtn = document.getElementById('randomBtn');
if (randomBtn) {
  randomBtn.addEventListener('click', async () => {
    const container = document.getElementById('randomContainer');
    container.innerHTML = 'Loading...';

    try {
      const response = await fetch('/recipes/random');
      const data = await response.json();

      container.innerHTML = `
        <h2>${data.title}</h2>
        <img src="${data.image}" alt="${data.title}" width="300">
        <h3>Instructions</h3>
        <p>${data.instructions || 'No instructions available'}</p>
        <h3>Ingredients</h3>
        <ul>
          ${data.ingredients.map(ing => `<li>${ing}</li>`).join('')}
        </ul>
      `;
    } catch (err) {
      console.error(err);
      container.innerHTML = 'Error fetching recipe';
    }
  });
}
//==================== FAVORITES ======================
const favoritesContainer = document.getElementById('favoritesContainer');
if (favoritesContainer) {
  const favorites = JSON.parse(localStorage.getItem('favorites')) || [];

  if (favorites.length === 0) {
    favoritesContainer.textContent = 'No favorite recipes yet.';
  } else {
    favorites.forEach((recipe, index) => {
      const card = document.createElement('div');
      card.classList.add('recipe-card');

      card.innerHTML = `
        <h2>${recipe.title}</h2>
        <img src="${recipe.image}" alt="${recipe.title}" width="200"><br>
        <button class="removeBtn">Remove</button>
      `;

      card.querySelector('.removeBtn').addEventListener('click', () => {
        favorites.splice(index, 1);
        localStorage.setItem('favorites', JSON.stringify(favorites));
        window.location.reload();
      });

      favoritesContainer.appendChild(card);
    });
  }
}
