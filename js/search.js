document.querySelector('#livesearch').addEventListener('input', filterList);

function filterList() {
  // copie de recettes
  let r = [...recipes];
  const searchInput = document.querySelector('#livesearch');
  const filter = searchInput.value.toLowerCase();
  const listItems = document.querySelectorAll('.recipes_list');

  // filter receipes in (r) by the value in search input (if > 3 characters)

  // filter receipes in (r) by existing tags.

  ingredients = [];
  appliances = [];
  ustensils = [];

  // extract ingredients, appliances and ustensils from recipes in (r)
  for (let i = 0; i < r.length; i++) {
    // ingredients
    for (let j = 0; j < r[i].ingredients.length; j++) {
      // show & sort ingredients
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
      // show & sort ustensils
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

  //  // list ingredients
  //  const iList = document.getElementById('ingredients_list');
  //  for (let k = 0; k < ingredients.length; k++) {
  //    const d = document.createElement('div');
  //    const i = document.createElement('i');
  //    i.setAttribute('class', 'fa-regular fa-circle-xmark');

  //    d.onclick = function () {
  //      addIngredientTag(ingredients[k]);
  //    };
  //    d.textContent = ingredients[k];
  //    iList.appendChild(d);
  //    d.appendChild(i);
  //  }

  // list ingredients
  const iList = document.getElementById('ingredients_list');
  for (let i = 0; i < ingredients.length; i++) {
    const d = document.createElement('div');
    d.onclick = function () {
      addIngredientTag(ingredients[i]);
    };
    d.textContent = ingredients[i];
    iList.appendChild(d);
  }

  // list appliance
  const aList = document.getElementById('appliance_list');
  for (let i = 0; i < appliances.length; i++) {
    const d = document.createElement('div');
    d.onclick = function () {
      addApplianceTag(appliances[i]);
    };
    d.textContent = appliances[i];
    aList.appendChild(d);
  }

  // list ustensils
  const uList = document.getElementById('ustensils_list');
  for (let i = 0; i < ustensils.length; i++) {
    const d = document.createElement('div');
    d.onclick = function () {
      addUstensilTag(ustensils[i]);
    };
    d.textContent = ustensils[i];
    uList.appendChild(d);
  }

  displayData(r);
}

function addIngredientTag(str) {
  addTag(str, 'tagIngredient');
}

function addApplianceTag(str) {
  addTag(str, 'tagAppliance');
}

function addUstensilTag(str) {
  addTag(str, 'tagUstensil');
}

function addTag(str, cssClass) {
  const d = document.createElement('div');
  d.textContent = str;
  d.classList.add(cssClass);
  document.getElementById('tagsContainer').appendChild(d);
  filterList();
}

function removeTag() {
  filterList();
}

function showHideIList() {
  var iListTag = document.getElementById('ingredients_list');
  var aListTag = document.getElementById('appliance_list');
  var uListTag = document.getElementById('ustensils_list');
  if (iListTag.style.display !== 'flex') {
    iListTag.style.display = 'flex';
    aListTag.style.display = 'none';
    uListTag.style.display = 'none';
  } else {
    iListTag.style.display = 'none';
  }
}

function showHideAList() {
  var iListTag = document.getElementById('ingredients_list');
  var aListTag = document.getElementById('appliance_list');
  var uListTag = document.getElementById('ustensils_list');
  if (aListTag.style.display !== 'flex') {
    iListTag.style.display = 'none';
    aListTag.style.display = 'flex';
    uListTag.style.display = 'none';
  } else {
    aListTag.style.display = 'none';
  }
}

function showHideUList() {
  var iListTag = document.getElementById('ingredients_list');
  var aListTag = document.getElementById('appliance_list');
  var uListTag = document.getElementById('ustensils_list');
  if (uListTag.style.display !== 'flex') {
    iListTag.style.display = 'none';
    aListTag.style.display = 'none';
    uListTag.style.display = 'flex';
  } else {
    uListTag.style.display = 'none';
  }
}
