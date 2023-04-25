// indegriendts select
let arrI = ingredients[i].ingredient;
function removeDuplicates(arrI) {
  return arrI.filter((item, index) => arrI.indexOf(item) === index);
}
let selIngredients = document.createElement('option');
selIngredients.innerHTML = arrI;
selIngredients.value = arrI;
document.getElementById('select_ingredients').appendChild(selIngredients);

// appliance select
let arrA = appliance;
function removeDuplicates(arrA) {
  return arrA.filter((item, index) => arrA.indexOf(item) === index);
}
let selAppliance = document.createElement('option');
selAppliance.innerHTML = arrA;
selAppliance.value = arrA;
document.getElementById('select_appliance').appendChild(selAppliance);

// ustensils select
let arr = ustensils;
function removeDuplicates(arr) {
  return arr.filter((item, index) => arr.indexOf(item) === index);
}
let selUstensils = document.createElement('option');
selUstensils.innerHTML = arr;
selUstensils.value = arr;
document.getElementById('select_ustensils').appendChild(selUstensils);

// let span = document.createElement('span');
// span.innerHTML = [ingredients[i].ingredient];
// span.setAttribute('style', 'display:block;');
// document.getElementById('list').appendChild(span);
