document.querySelector('#livesearch').addEventListener('input', filterList);

function filterList() {
  // copie de recettes
  let r = [...recipes];
  const searchInput = document.querySelector('#livesearch');
  const filter = searchInput.value.toLowerCase();
  const listItems = document.querySelectorAll('.recipes_list');

  // filter receipes in (r) by the value in search input (if > 3 characters)

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

  // list ingredients
  const iList = document.getElementById('ingredients_list');
  iList.innerHTML = '';
  for (let i = 0; i < ingredients.length; i++) {
    const d = document.createElement('div');
    d.textContent = ingredients[i];
    d.onclick = function () {
      addIngredientTag(ingredients[i]);
    };

    iList.appendChild(d);
  }

  // list appliance
  const aList = document.getElementById('appliance_list');
  aList.innerHTML = '';
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
  uList.innerHTML = '';
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
  const i = document.createElement('i');
  i.className = 'fa-regular fa-circle-xmark tag-close';
  i.setAttribute('onclick', 'removeTag()'); // removeTag() - removeChild
  d.appendChild(i);
  d.classList.add(cssClass);
  document.getElementById('tagsContainer').appendChild(d);
  filterList();
}

function removeTag() {
  const delTag = document.getElementById('tagsContainer');
  delTag.removeChild(delTag.firstElementChild);

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
