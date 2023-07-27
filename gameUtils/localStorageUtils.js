import { ITEMS_ACTIONS_MATRIX } from "./itemActionsMatrix";

const item = {
    name: 'Letter',
    description: 'A mysterious letter with ancient markings.',
    type: 'letter',
};

export function getInventory() {
    const inventoryJSON = localStorage.getItem('inventory');
    return JSON.parse(inventoryJSON) || [];
}

export function addItemToInventory(item) {
    const inventory = getInventory();
    inventory.push(item);
    saveInventory(inventory);
}

export function saveInventory(inventory) {
    const inventoryJSON = JSON.stringify(inventory);
    localStorage.setItem('inventory', inventoryJSON);
}

export function removeItemFromInventory(itemName) {
    const inventory = getInventory();
    const updatedInventory = inventory.filter((item) => item.name !== itemName);
    saveInventory(updatedInventory);
}
export function getItemFromInventory(itemName) {
    const inventory = getInventory();
    return inventory.find((item) => item.name === itemName);
}

export function getItemViaMatrixName(matrixName) {
    const inventory = getInventory();
    return inventory.find((item) => item.matrixName === matrixName);
}

export function getMatrixDataForItem(matrixName) {
    return ITEMS_ACTIONS_MATRIX[matrixName];
}

export function updateItemInInventory(updatedItem) {
    const inventory = getInventory();

    const updatedInventory = inventory.map((item) =>
        item.name === updatedItem.name ? { ...item, ...updatedItem } : item
    );
    saveInventory(updatedInventory);
}

