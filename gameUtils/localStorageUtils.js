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
    console.log(`${item.name} added successfully`);
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
    console.log("\n\nIs item in inv called");
    const inventory = getInventory(); 
    return inventory.some((item) => item.name === itemName);
  }
  


