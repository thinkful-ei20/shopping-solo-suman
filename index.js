'use strict';

const STORE = {
  items :[
  {name: "apples", checked: false},
  {name: "oranges", checked: false},
  {name: "milk", checked: true},
  {name: "bread", checked: false}
],
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
  const shoppingListItemsString = generateShoppingItemsString(STORE.items);
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
  $('.js-display-checked-items').on('change', function(event){
    if($(this).is(':checked')){
      console.log("Got here -- box is checked");
      hideOrShowCheckedItems('checked')
    }
   else {
      console.log("Got here -- box is unchecked");
      hideOrShowCheckedItems('unchecked')
  }
 })
}
function hideOrShowCheckedItems(state){
  if(state === 'checked'){
    renderShoppingList();
  }
  else{    
    let filteredItems = [];
    let str = STORE.items.forEach(item => {
      //console.log(item.checked);
      if(!item.checked){
        filteredItems.push(item);        
      }   
    });
    console.log(filteredItems);  
    const shoppingListItemsString = generateShoppingItemsString(filteredItems);
    $('.js-shopping-list').html(shoppingListItemsString);
      
  }
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
}

// when the page loads, call `handleShoppingList`
$(handleShoppingList);
/*
const STORE = {
  items: [...],
  sortBy: 'alpha'
};

function renderShoppingList() {
  let filteredItems = [ ...STORE.items ];

  if (STORE.sortBy === 'alpha') {
    filteredItems.sort((a, b) => a.name > b.name);
  } else if (STORE.sortBy === 'time') {
    filteredItems.sort((a, b) => a.createdAt > b.createdAt);
  }
  
  [ ..rest of render ]
}

function setSortBy(sortBy) {
  STORE.sortBy = sortBy;
}

function handleChangeSortBy() {
  $('#sort-options').on('change', event => {

    // 1. get info from user action (optional)
    const selectedOption = $(event.target).find('option:selected').val();
    // 2. update store
    setSortBy(selectedOption);
    // 3. render
    renderShoppingList();
  });
}
*/