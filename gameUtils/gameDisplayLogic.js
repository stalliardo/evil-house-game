import { isItemInInventory, isMatrixNamePresent } from "./localStorageUtils";

export function conditionalText(conditionalData){
    if(typeof conditionalData === "string") {
        return conditionalData;
    } else if(Array.isArray(conditionalData)) {   
       return isItemInInventory(conditionalData[2]) ? conditionalData[0] : conditionalData[1];
    }
}

export function showConditionalButtons(lootedItem){
    return !isMatrixNamePresent(lootedItem);    
}