document.querySelector('#livesearch').addEventListener('input', filterList);

function filterList() {
  // copie de recettes
  let r = [...recipes];
  const searchInput = document.querySelector('#livesearch');
  const filter = searchInput.value.toLowerCase();
  const listItems = document.querySelectorAll('.recipes_list');

  // listItems.forEach((item) => {
  //   let text = item.textContent;

  //   if (text.toLowerCase().includes(filter.toLowerCase())) {
  //     item.style.display = '';
  //   } else {
  //     item.style.display = 'none';
  //   }
  // });

  ingredients = [];
  appliances = [];
  ustensils = [];

  for (let i = 0; i < r.length; i++) {
    // ingredients
    for (let j = 0; j < r[i].ingredients.length; j++) {
      // mettre un if pour le trie
      const ingredientSmall = r[i].ingredients[j].ingredient.toLowerCase();
      if (
        !ingredients.some(
          (ingredient) => ingredient.toLowerCase() == ingredientSmall
        )
      ) {
        ingredients.push(r[i].ingredients[j].ingredient);
      }
    }

    // appliance
    if (
      !appliances.some(
        (appliance) => appliance.toLowerCase() == r[i].appliance.toLowerCase()
      )
    ) {
      appliances.push(r[i].appliance);
    }

    // ustensils
    for (let j = 0; j < r[i].ustensils.length; j++) {
      // mettre un if pour le trie
      if (
        !ustensils.some(
          (ustensil) =>
            ustensil.toLowerCase() == r[i].ustensils[j].toLowerCase()
        )
      ) {
        ustensils.push(r[i].ustensils[j]);
      }
    }
  }

  // list ingredients
  const iList = document.getElementById('ingredients_list');
  for (let i = 0; i < ingredients.length; i++) {
    const d = document.createElement('div');
    d.textContent = ingredients[i];
    iList.appendChild(d);
  }

  // list appliance
  const aList = document.getElementById('appliance_list');
  for (let i = 0; i < appliances.length; i++) {
    const d = document.createElement('div');
    d.textContent = appliances[i];
    aList.appendChild(d);
  }

  // list ustensils
  const uList = document.getElementById('ustensils_list');
  for (let i = 0; i < ustensils.length; i++) {
    const d = document.createElement('div');
    d.textContent = ustensils[i];
    uList.appendChild(d);
  }

  displayData(r);
}

// function openList() {
//   document.querySelector('.filterOptionsIngredients').style.display = 'flex';
// }

function showHideIList() {
  var iListTag = document.getElementById('ingredients_list');
  if (iListTag.style.display === 'none') {
    iListTag.style.display = 'flex';
  } else {
    iListTag.style.display = 'none';
  }
}

function showHideAList() {
  var aListTag = document.getElementById('appliance_list');
  if (aListTag.style.display === 'none') {
    aListTag.style.display = 'flex';
  } else {
    aListTag.style.display = 'none';
  }
}

function showHideUList() {
  var uListTag = document.getElementById('ustensils_list');
  if (uListTag.style.display === 'none') {
    uListTag.style.display = 'flex';
  } else {
    uListTag.style.display = 'none';
  }
}
