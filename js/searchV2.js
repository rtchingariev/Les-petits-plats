// document.querySelector('#livesearch').addEventListener('input', filterList);
function filterList() {
  // copie de recettes
  let r = [...recipes];
  const searchValue = document
    .getElementById('searchField')
    .value.toLowerCase();
  if (searchValue.length > 2) {
    /*
    r = r.filter((recipe) => {
      return (
        recipe.name.toLowerCase().includes(searchValue)
        || recipe.description.toLowerCase().includes(searchValue))
        || recipe.ingredients.some((ingredient) => {
          return ingredient.ingeredient.toLowerCase().includes(searchValue)
        })
      );
    });
*/
    const _r = [];
    for (let i = 0; i < r.length; i++) {
      // match title (property "name")
      if (r[i].name.toLowerCase().includes(searchValue)) {
        _r.push(r[i]);
      }
      // match description
      else if (r[i].description.toLowerCase().includes(searchValue)) {
        _r.push(r[i]);
      } else {
        // match one ingredient
        for (let j = 0; j < r[i].ingredients.length; j++) {
          // property "ingredient" of each ingredient.
          if (
            r[i].ingredients[j].ingredient.toLowerCase().includes(searchValue)
          ) {
            _r.push(r[i]);
            break;
          }
        }
      }
    }
    // put matching recipes from _r into r.
    r = _r;
  }

  ingredients = [];
  appliances = [];
  ustensils = [];
  ingredientsTag = [];
  appliancesTag = [];
  ustensilsTag = [];

  const listTags = document.getElementById('tagsContainer').children;
  for (let i = 0; i < listTags.length; i++) {
    if (listTags[i].classList.contains('tagIngredient')) {
      ingredientsTag.push(listTags[i].textContent.toLowerCase());
    } else if (listTags[i].classList.contains('tagAppliance')) {
      appliancesTag.push(listTags[i].textContent.toLowerCase());
    } else if (listTags[i].classList.contains('tagUstensil')) {
      ustensilsTag.push(listTags[i].textContent.toLowerCase());
    }
  }
  // filter receipes in (r) by existing tags.
  if (ingredientsTag.length > 0) {
    for (let i = 0; i < ingredientsTag.length; i++) {
      const _r = [];
      for (let j = 0; j < r.length; j++) {
        let recipeContainsIngredientTag = false;
        for (let k = 0; k < r[j].ingredients.length; k++) {
          if (
            r[j].ingredients[k].ingredient.toLowerCase() == ingredientsTag[i]
          ) {
            recipeContainsIngredientTag = true;
            break;
          }
        }
        if (recipeContainsIngredientTag) {
          _r.push(r[j]);
        }
      }
      r = _r;
    }
  }
  if (appliancesTag.length > 0) {
    for (let i = 0; i < appliancesTag.length; i++) {
      const _r = [];
      for (let j = 0; j < r.length; j++) {
        if (r[j].appliance.toLowerCase() == appliancesTag[i]) {
          _r.push(r[j]);
        }
      }
      r = _r;
    }
  }
  if (ustensilsTag.length > 0) {
    for (let i = 0; i < ustensilsTag.length; i++) {
      const _r = [];
      for (let j = 0; j < r.length; j++) {
        let recipeContainsUstensilTag = false;
        for (let k = 0; k < r[j].ustensils.length; k++) {
          if (r[j].ustensils[k].toLowerCase() == ustensilsTag[i]) {
            recipeContainsUstensilTag = true;
            break;
          }
        }
        if (recipeContainsUstensilTag) {
          _r.push(r[j]);
        }
      }
      r = _r;
    }
  }
  // extract ingredients, appliances and ustensils from recipes in (r)
  for (let i = 0; i < r.length; i++) {
    // ingredients
    for (let j = 0; j < r[i].ingredients.length; j++) {
      // show & sort ingredients
      const ingredientSmall = r[i].ingredients[j].ingredient.toLowerCase();
      if (
        !ingredients.some(
          (ingredient) => ingredient.toLowerCase() == ingredientSmall
        ) &&
        !ingredientsTag.includes(ingredientSmall)
      ) {
        ingredients.push(r[i].ingredients[j].ingredient);
      }
    }
    // appliance
    const applianceSmall = r[i].appliance.toLowerCase();
    if (
      !appliances.some(
        (appliance) => appliance.toLowerCase() == applianceSmall
      ) &&
      !appliancesTag.includes(applianceSmall)
    ) {
      appliances.push(r[i].appliance);
    }
    // ustensils
    for (let j = 0; j < r[i].ustensils.length; j++) {
      // show & sort ustensils
      const ustensilsSmall = r[i].ustensils[j].toLowerCase();
      if (
        !ustensils.some(
          (ustensil) => ustensil.toLowerCase() == ustensilsSmall
        ) &&
        !ustensilsTag.includes(ustensilsSmall)
      ) {
        ustensils.push(r[i].ustensils[j]);
      }
    }
  }
  // display ingredients list
  displayIngredientsList(ingredients);

  // display appliance list
  displayAppliancesList(appliances);

  // display ustensils list
  displayUstensilsList(ustensils);

  displayData(r);
}
function addIngredientTag(str) {
  addTag(str, 'tagIngredient');
  hideIList();
}
function addApplianceTag(str) {
  addTag(str, 'tagAppliance');
  hideAList();
}
function addUstensilTag(str) {
  addTag(str, 'tagUstensil');
  hideUList();
}
function addTag(str, cssClass) {
  const d = document.createElement('div');
  d.textContent = str;
  const i = document.createElement('i');
  i.className = 'fa-regular fa-circle-xmark tag-close';
  i.setAttribute('onclick', 'removeTag(this)'); // removeTag() - removeChild
  d.appendChild(i);
  d.classList.add(cssClass);
  document.getElementById('tagsContainer').appendChild(d);
  filterList();
}
function removeTag(elt) {
  const delTag = document.getElementById('tagsContainer');
  delTag.removeChild(elt.parentElement);
  filterList();
}

function showHideIList() {
  var iListTag = document.getElementById('ingredients_list');
  var aListTag = document.getElementById('appliance_list');
  var uListTag = document.getElementById('ustensils_list');
  if (iListTag.style.display !== 'flex') {
    iListTag.style.display = 'flex';
    document.getElementById('ingredientsTitle').style.display = 'none';
    var input = document.getElementById('ingredientsSearch');
    input.style.display = '';
    input.value = '';
    input.focus();
    hideAList();
    hideUList();
  } else {
    hideIList();
  }
}

function hideIList() {
  var iListTag = document.getElementById('ingredients_list');
  iListTag.style.display = 'none';
  document.getElementById('ingredientsTitle').style.display = '';
  document.getElementById('ingredientsSearch').style.display = 'none';
}

function showHideAList() {
  var iListTag = document.getElementById('ingredients_list');
  var aListTag = document.getElementById('appliance_list');
  var uListTag = document.getElementById('ustensils_list');
  if (aListTag.style.display !== 'flex') {
    aListTag.style.display = 'flex';
    document.getElementById('appliencesTitle').style.display = 'none';
    var input = document.getElementById('appliencesSearch');
    input.style.display = '';
    input.value = '';
    input.focus();
    hideIList();
    hideUList();
  } else {
    hideAList();
  }
}

function hideAList() {
  var aListTag = document.getElementById('appliance_list');
  aListTag.style.display = 'none';
  document.getElementById('appliencesTitle').style.display = '';
  document.getElementById('appliencesSearch').style.display = 'none';
}

function showHideUList() {
  var iListTag = document.getElementById('ingredients_list');
  var aListTag = document.getElementById('appliance_list');
  var uListTag = document.getElementById('ustensils_list');
  if (uListTag.style.display !== 'flex') {
    uListTag.style.display = 'flex';
    document.getElementById('ustensilsTitle').style.display = 'none';
    var input = document.getElementById('ustensilsSearch');
    input.style.display = '';
    input.value = '';
    input.focus();
    hideIList();
    hideAList();
  } else {
    hideUList();
  }
}

function hideUList() {
  var uListTag = document.getElementById('ustensils_list');
  uListTag.style.display = 'none';
  document.getElementById('ustensilsTitle').style.display = '';
  document.getElementById('ustensilsSearch').style.display = 'none';
}

// Ingredients input search filter
function filterIngredients() {
  var filterValue = document
    .getElementById('ingredientsSearch')
    .value.toLowerCase();
  var filteredList = [];
  for (var i = 0; i < ingredients.length; i++) {
    if (ingredients[i].toLowerCase().includes(filterValue)) {
      filteredList.push(ingredients[i]);
    }
  }

  displayIngredientsList(filteredList);
}

function displayIngredientsList(list) {
  const iList = document.getElementById('ingredients_list');
  iList.innerHTML = '';
  for (let i = 0; i < list.length; i++) {
    const d = document.createElement('div');
    d.textContent = list[i];
    d.onclick = function (e) {
      addIngredientTag(e.target.textContent);
    };
    iList.appendChild(d);
  }
}

// Appliances input search filter
function filterAppliances() {
  var filterValue = document
    .getElementById('appliencesSearch')
    .value.toLowerCase();
  var filteredList = [];
  for (var i = 0; i < appliances.length; i++) {
    if (appliances[i].toLowerCase().includes(filterValue)) {
      filteredList.push(appliances[i]);
    }
  }

  displayAppliancesList(filteredList);
}

function displayAppliancesList(list) {
  const aList = document.getElementById('appliance_list');
  aList.innerHTML = '';
  for (let i = 0; i < appliances.length; i++) {
    const d = document.createElement('div');
    d.textContent = list[i];
    d.onclick = function (e) {
      addApplianceTag(e.target.textContent);
    };
    aList.appendChild(d);
  }
}

// Ustensils input search filter
function filterUstensils() {
  var filterValue = document
    .getElementById('ustensilsSearch')
    .value.toLowerCase();
  var filteredList = [];
  for (var i = 0; i < ustensils.length; i++) {
    if (ustensils[i].toLowerCase().includes(filterValue)) {
      filteredList.push(ustensils[i]);
    }
  }

  displayUstensilsList(filteredList);
}

function displayUstensilsList(list) {
  const uList = document.getElementById('ustensils_list');
  uList.innerHTML = '';
  for (let i = 0; i < ustensils.length; i++) {
    const d = document.createElement('div');
    d.textContent = list[i];
    d.onclick = function (e) {
      addUstensilTag(e.target.textContent);
    };
    uList.appendChild(d);
  }
}
