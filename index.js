'use strict'; 
const STORE = {
  items :[
  {name: "apples", checked: false},
  {name: "oranges", checked: false},
  {name: "milk", checked: true},
  {name: "bread", checked: false}
],
displayUnchecked : false,
checkBox : '.js-display-checked-items',
};


function generateItemElement(item, itemIndex, template) {
  return `
    <li class="js-item-index-element" data-item-index="${itemIndex}">
      <span class="shopping-item js-shopping-item ${item.checked ? "shopping-item__checked" : ''}">${item.name}</span>
      <div class="shopping-item-controls">
        <button class="shopping-item-toggle js-item-toggle">
            <span class="button-label">check</span>
        </button>
        <button class="shopping-item-delete js-item-delete">
            <span class="button-label">delete</span>
        </button>
      </div>
    </li>`;
}


function generateShoppingItemsString(shoppingList) {
  console.log("Generating shopping list element");

  const items = shoppingList.map((item, index) => generateItemElement(item, index));
  
  return items.join("");
}


function renderShoppingList() {
  // render the shopping list in the DOM
  console.log('`renderShoppingList` ran');
  let filterItems = [...STORE.items];
  if(STORE.displayUnchecked == true){
    //console.log("Display check true");
    filterItems = filterItems.filter(item => item.checked == false);
    console.log(filterItems);
  }
  
  const shoppingListItemsString = generateShoppingItemsString(filterItems);
  // insert that HTML into the DOM
  $('.js-shopping-list').html(shoppingListItemsString);
}


function addItemToShoppingList(itemName) {
  console.log(`Adding "${itemName}" to shopping list`);
  STORE.items.push({name: itemName, checked: false});
}

function handleNewItemSubmit() {
  $('#js-shopping-list-form').submit(function(event) {
    event.preventDefault();
    console.log('`handleNewItemSubmit` ran');
    const newItemName = $('.js-shopping-list-entry').val();
    $('.js-shopping-list-entry').val('');
    addItemToShoppingList(newItemName);
    renderShoppingList();
  });
}

function toggleCheckedForListItem(itemIndex) {
  console.log("Toggling checked property for item at index " + itemIndex);
  STORE.items[itemIndex].checked = !STORE.items[itemIndex].checked;
}


function getItemIndexFromElement(item) {
  const itemIndexString = $(item)
    .closest('.js-item-index-element')
    .attr('data-item-index');
  return parseInt(itemIndexString, 10);
}

function handleItemCheckClicked() {
  $('.js-shopping-list').on('click', `.js-item-toggle`, event => {
    console.log('`handleItemCheckClicked` ran');
    const itemIndex = getItemIndexFromElement(event.currentTarget);
    toggleCheckedForListItem(itemIndex);
    renderShoppingList();
  });
}

function removeItemFromShoppingList(itemIndex){
    console.log(`removeItemFromShoppingList ran`);
    STORE.items.splice(itemIndex,1);
}


function handleDeleteItemClicked() {
  // this function will be responsible for when users want to delete a shopping list
  // item
  $('.js-shopping-list').on('click','.js-item-delete', event =>{
   const itemIndex = getItemIndexFromElement(event.currentTarget);
   console.log(itemIndex);
   removeItemFromShoppingList(itemIndex);
   renderShoppingList();
  });  
}
/*
User can press a switch/checkbox to toggle between displaying all 
items or displaying only items that are unchecked
1. Have a check box in main page
2. When checked - display checked items
3. When unchecked - don't 
4. Create a function that would read the event call it function checkedItemsDisplay()
*/
function checkedItemDisplay(){  
  //console.log('.js-display-checked-items');
  //STORE.displayUnchecked = STORE.displayUnchecked == false ? true : false; 
  $('.js-display-checked-items').on('change', function(event){
    STORE.displayUnchecked = STORE.displayUnchecked == false ? true : false;
    renderShoppingList();
 })
}

function searchItem(){
  console.log("search item funtion");
  console.log($('.js-search-btn'));
  $('.js-search-btn').on('click', event => {
    //console.log("got here");
    let item = $('.js-shopping-list-search').val();
    console.log("item value " + item);
    let filteredItemList = STORE.items.filter(itemInStoredList => {
      if(itemInStoredList.name === item)
        return itemInStoredList;
    });
    const shoppingListItemsString = generateShoppingItemsString(filteredItemList);
  // insert that HTML into the DOM
  $('.js-shopping-list').html(shoppingListItemsString);
  })
}

// this function will be our callback when the page loads. it's responsible for
// initially rendering the shopping list, and activating our individual functions
// that handle new item submission and user clicks on the "check" and "delete" buttons
// for individual shopping list items.
function handleShoppingList() {
  renderShoppingList();
  handleNewItemSubmit();
  handleItemCheckClicked();
  handleDeleteItemClicked();
  checkedItemDisplay();
  searchItem();
}

// when the page loads, call `handleShoppingList`
$(handleShoppingList);
 //Search
 //Call search func 
