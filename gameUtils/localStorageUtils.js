import { ITEMS_ACTIONS_MATRIX } from "./itemActionsMatrix";

// Sample data structure for an inventory item
const item = {
    name: 'Letter',
    description: 'A mysterious letter with ancient markings.',
    type: 'letter',
    // Add more properties as needed
};

// Function to get the entire inventory
export function getInventory() {
    const inventoryJSON = localStorage.getItem('inventory');
    return JSON.parse(inventoryJSON) || [];
}

// Function to add an item to the inventory
export function addItemToInventory(item) {
    const inventory = getInventory();
    inventory.push(item);
    saveInventory(inventory);
}

// Function to save the updated inventory
export function saveInventory(inventory) {
    const inventoryJSON = JSON.stringify(inventory);
    localStorage.setItem('inventory', inventoryJSON);
}

// Function to remove an item from the inventory
export function removeItemFromInventory(itemName) {
    const inventory = getInventory();
    const updatedInventory = inventory.filter((item) => item.name !== itemName);
    saveInventory(updatedInventory);
}
export function isItemInInventory(itemName) {
    const inventory = getInventory(); 
    // return inventory.some((item) => item.name === itemName);
    return inventory.find((item) => item.name === itemName);
  }
  
export function getMatrixDataForItem(matrixName) {
    return ITEMS_ACTIONS_MATRIX[matrixName];
}

// Function to update an item in the inventory
export function updateItemInInventory(updatedItem) {
    const inventory = getInventory();
    
    const updatedInventory = inventory.map((item) =>
      item.name === updatedItem.name ? { ...item, ...updatedItem } : item
    );
    saveInventory(updatedInventory);
  }
  
