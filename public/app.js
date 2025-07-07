// // ==================== SEARCH localStorage====================
// const searchBtn = document.getElementById('searchBtn');
// if (searchBtn) {
//   searchBtn.addEventListener('click', async () => {
//     const input = document.getElementById('ingredientInput').value.trim();
//     const resultsDiv = document.getElementById('resultsContainer');
//     resultsDiv.innerHTML = ''; // clear old results

//     if (!input) {
//       resultsDiv.textContent = 'Please enter some ingredients.';
//       return;
//     }

//     try {
//       const response = await fetch(`/recipes/search?ingredients=${encodeURIComponent(input)}`);
//       const data = await response.json();

//       if (data.length === 0) {
//         resultsDiv.textContent = 'No recipes found.';
//         return;
//       }

//       data.forEach(recipe => {
//         const card = document.createElement('div');
//         card.classList.add('recipe-card');

//         card.innerHTML = `
//           <h2>${recipe.title}</h2>
//           <img src="${recipe.image}" alt="${recipe.title}" width="200">
//           <p><strong>Used:</strong> ${recipe.usedIngredients.join(', ')}</p>
//           <p><strong>Missing:</strong> ${recipe.missedIngredients.join(', ')}</p>
//           <button class="saveBtn">Save to Favorites</button>    
//         `;

//         card.querySelector('.saveBtn').addEventListener('click', () => {
//           const favorites = JSON.parse(localStorage.getItem('favorites')) || [];

//           const alreadyExists = favorites.some(fav => fav.title === recipe.title);
//           if (!alreadyExists) {
//             favorites.push(recipe);
//             localStorage.setItem('favorites', JSON.stringify(favorites));
//             alert('Recipe saved!');
//           } else {
//             alert('Already saved!');
//           }
//         });

//         resultsDiv.appendChild(card);
//       });

//     } catch (err) {
//       resultsDiv.textContent = 'Error fetching recipes.';
//       console.error(err);
//     }
//   });
// }

// ==================== SEARCH PostgreSQL ====================
const searchBtn = document.getElementById('searchBtn');

if (searchBtn) {
  searchBtn.addEventListener('click', async () => {
    const input = document.getElementById('ingredientInput').value.trim();
    const resultsDiv = document.getElementById('resultsContainer');
    resultsDiv.innerHTML = ''; // clear old results

    if (!input) {
      resultsDiv.innerHTML = '<p style="color: white;">Please enter some ingredients.</p>';
      return;
    }

    try {
      const response = await fetch(`/recipes/search?ingredients=${encodeURIComponent(input)}`);
      const data = await response.json();

      if (data.length === 0) {
        resultsDiv.innerHTML = '<p style="color: white;">No recipes found.</p>';
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

        // save btn
        card.querySelector('.saveBtn').addEventListener('click', async () => {
           const ingredients = recipe.usedIngredients
          .concat(recipe.missedIngredients);

        const recipeToSave = {
          title: recipe.title,
          image: recipe.image,
          instructions: recipe.instructions || 'No instructions available',
          ingredients: ingredients,
          readyin: recipe.readyInMinutes || 0
        };

          try {
            const response = await fetch('/recipes', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(recipeToSave)
            });

            if (response.ok) {
              alert('Recipe saved to database!');
            } else {
              const error = await response.json();
              alert(`Failed to save: ${error.message || 'Unknown error'}`);
            }
          } catch (error) {
            console.error('Error saving recipe:', error);
            alert('Network error while saving recipe.');
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
      // console.log(data);
      
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
//==================== FAVORITES localStorage ======================
// const favoritesContainer = document.getElementById('favoritesContainer');
// if (favoritesContainer) {
//   const favorites = JSON.parse(localStorage.getItem('favorites')) || [];

//   if (favorites.length === 0) {
//     favoritesContainer.textContent = 'No favorite recipes yet.';
//   } else {
//     favorites.forEach((recipe, index) => {
//       const card = document.createElement('div');
//       card.classList.add('recipe-card');

//       card.innerHTML = `
//         <h2>${recipe.title}</h2>
//         <img src="${recipe.image}" alt="${recipe.title}" width="200"><br>
//         <button class="removeBtn">Remove</button>
//       `;

//       card.querySelector('.removeBtn').addEventListener('click', () => {
//         favorites.splice(index, 1);
//         localStorage.setItem('favorites', JSON.stringify(favorites));
//         window.location.reload();
//       });

//       favoritesContainer.appendChild(card);
//     });
//   }
// }

//==================== FAVORITES PostgreSQL ======================
document.addEventListener('DOMContentLoaded', () => {
  const favoritesContainer = document.getElementById('favoritesContainer');

  if (favoritesContainer) {
    fetch('/recipes')
      .then(response => response.json())
      .then(favorites => {
        if (favorites.length === 0) {
        favoritesContainer.innerHTML = '<p style="color: white;">No favorite recipes yet.</p>';
        } else {
          favorites.forEach(recipe => {
            const card = document.createElement('div');
            card.classList.add('recipe-card');

            card.innerHTML = `
              <h2>${recipe.title}</h2>
              <img src="${recipe.image}" alt="${recipe.title}" width="200"><br>
              <p><strong>Instructions:</strong> ${recipe.instructions || 'No instructions available'}</p>
              <p><strong>Ingredients:</strong> ${Array.isArray(recipe.ingredients) ? recipe.ingredients.join(', ') : recipe.ingredients}</p>
              <p><strong>Ready in:</strong> ${recipe.readyin} minutes</p>
              <button class="removeBtn">Remove</button>
              <button class="editBtn">Edit</button>
            `;

            card.querySelector('.removeBtn').addEventListener('click', () => {
              fetch(`/recipes/${recipe.id}`, { method: 'DELETE' })
                .then(res => {
                  if (res.ok) card.remove();
                  else alert('Failed to delete recipe');
                })
                .catch(err => console.error('Delete failed:', err));
            });

            card.querySelector('.editBtn').addEventListener('click', () => {
              document.getElementById('editTitle').value = recipe.title;
              document.getElementById('editInstructions').value = recipe.instructions;
              document.getElementById('editIngredients').value = Array.isArray(recipe.ingredients)
                ? recipe.ingredients.join(', ')
                : recipe.ingredients;
              document.getElementById('editReadyin').value = recipe.readyin;
              document.getElementById('editImage').value = recipe.image;

              document.getElementById('editForm').dataset.recipeId = recipe.id;
              $('#editModal').modal('show');
            });

            favoritesContainer.appendChild(card);
          });
        }
      })
      .catch(error => {
        console.error('Error fetching favorites:', error);
        favoritesContainer.textContent = 'Failed to load favorite recipes.';
      });

    document.getElementById('closeModal').addEventListener('click', () => {
      document.getElementById('editModal').style.display = 'none';
    });

    document.getElementById('editForm').addEventListener('submit', async (e) => {
      e.preventDefault();
      const form = e.target;
      const id = form.dataset.recipeId;

      const updatedRecipe = {
        title: document.getElementById('editTitle').value,
        image: document.getElementById('editImage').value,
        instructions: document.getElementById('editInstructions').value,
        ingredients: document.getElementById('editIngredients').value
          .split(',')
          .map(i => i.trim()),
        readyin: parseInt(document.getElementById('editReadyin').value)
      };

      try {
        const res = await fetch(`/recipes/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updatedRecipe)
        });

        if (res.ok) {
          console.log('Recipe updated!');

          window.location.reload();
        } else {
          console.log('Failed to update recipe.');
        }
      } catch (error) {
        console.error('Network error:', error);
        console.log('Network error while updating.');
      }
    });
  }
});
