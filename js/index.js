function recipeFactory(data) {
  const {
    id,
    name,
    ingredients,
    ingredient,
    quantity,
    unit,
    time,
    description,
    appliance,
    ustensils,
  } = data;

  const picture = `images/recipes/img.png`;

  function getRecipesDOM() {
    const article = document.createElement('article');
    article.setAttribute('style', 'position:relative');
    article.className = 'recipes_list';
    const img = document.createElement('img');
    img.setAttribute('src', picture);
    img.setAttribute('alt', name);
    const h2 = document.createElement('h2');
    h2.textContent = name;

    const i = document.createElement('i');
    i.setAttribute('class', 'fa-regular fa-clock time_icon');

    const preparationTime = document.createElement('span');
    preparationTime.textContent = `${time} min`;
    preparationTime.setAttribute('class', 'preparation_time');

    const recipeDescription = document.createElement('span');
    recipeDescription.textContent = `${description.slice(0, 260)}...`;
    recipeDescription.setAttribute('class', 'recipe_description');

    //
    const recipeIngredients = document.createElement('span');
    const str = [];
    for (let i = 0; i < ingredients.length; i++) {
      let s = '<b>' + ingredients[i].ingredient + '</b>';
      if (ingredients[i].quantity) {
        s += ': ' + ingredients[i].quantity;
        if (ingredients[i].unit) {
          // if (ingredients[i].unit == 'grammes') {
          //   ingredients[i].unit = 'g';
          // }
          s += ' ' + ingredients[i].unit;
        }
      }

      str.push(s);
    }
    recipeIngredients.innerHTML = str.join('<br/>');
    recipeIngredients.className = 'recipe_ingredients';

    // recipe illustration
    article.appendChild(img);
    // recipe name
    article.appendChild(h2);
    // time icon
    article.appendChild(i);
    // preparation time
    article.appendChild(preparationTime);
    // recipe description
    article.appendChild(recipeDescription);
    // recipe ingredients
    article.appendChild(recipeIngredients);

    return article;
  }
  return { getRecipesDOM };
}

async function getRecipes() {
  // Récupération des données depuis le fichier JSON
  const response = await fetch('data/recipes.json');
  const data = await response.json();

  return data.recipes;
}

async function displayData(recipes) {
  const recipesSection = document.querySelector('.recipes_section');

  recipes.forEach((recipes) => {
    const recipeModel = recipeFactory(recipes);
    const recipesDOM = recipeModel.getRecipesDOM();
    recipesSection.appendChild(recipesDOM);
  });
}

async function init() {
  // Récupère les datas
  recipes = await getRecipes();
  filterList();
  // displayData(recipes);
}

window.onload = function () {
  init();
};

let recipes = [];
let ingredients = [];

// function filter() {
//   const r = [...recipes];
// }
