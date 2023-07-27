import { isItemInInventory } from "./localStorageUtils";

export function conditionalText(conditionalData){
    // conditionalData will either be a single string or an array
    // The array will contain two conditional strings and the last elelemnt will be the name of the item being checked in the local storage
    
    if(typeof conditionalData === "string") {
        return conditionalData;
    } else if(Array.isArray(conditionalData)) {   
       return isItemInInventory(conditionalData[2]) ? conditionalData[0] : conditionalData[1];
    }
}

export function showConditionalButtons(lootedItem){
    // if the length is 3 then this is a conditional instance

    console.log("looted item = ", lootedItem);

    return !isItemInInventory(lootedItem);

    

    // if(conditionalData.length === 3) {
    //     // if the the item is not in the inventory, show the prompt buttons ie "Take", "Leave"
    //     return !isItemInInventory(conditionalData[2]);
    // }

    return true;
}