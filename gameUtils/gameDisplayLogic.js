import { getItemFromInventory, getItemViaMatrixName } from "./localStorageUtils";

export function conditionalText(conditionalData){
    if(typeof conditionalData === "string") {
        return conditionalData;
    } else if(Array.isArray(conditionalData)) {   
       return getItemFromInventory(conditionalData[2]) ? conditionalData[0] : conditionalData[1];
    }
}

export function showConditionalButtons(matrixData, matrixName, lootedItemName){
    if(matrixData.requiresKey){  
        const item = getItemFromInventory(matrixName);
        if(item) {
            return item.value === "unlocked"
        } else {
            return false;
        }
    }
    return !getItemFromInventory(lootedItemName);    
}