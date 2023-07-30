import { BASEMENT_NOTES } from "./gameTextConsts";
import { getItemFromInventory, getItemViaMatrixName } from "./localStorageUtils";

const ITEMS_ACTIONS_MATRIX = {
    basement_paperClip: {
        name: "Paper Clip",
        actions: ["Use", "Examine"],
        examine: () => "A flat wire clip shaped so that it can hold sheets of paper between two of its loops. Maybe it has another use.",
        interactsWith: "basement_lockedLocker",
        useageType: "key",
        lootedText: "You've taken the paper clip",
        doorUnlockedText: BASEMENT_NOTES.LOCKER_UNLOCKED,
        pickedUpText: "There's nothing left.",
        requiresKey: false,
        text: (type, textOptions, matrixName) => { return loadText(type, textOptions, matrixName) }
    },

    basement_lockedLocker: {
        lootedText: "You've taken the basement key",
        doorUnlockedText: "You've unlocked the door",
        pickedUpText: "There's nothing left.",
        requiresKey: true,
        text: (type, textOptions, matrixName) => { return loadText(type, textOptions, matrixName) }
    },

    basementKey: {
        name: "Basement Key",
        useageType: "key",
        lootedText: "You've taken the basement key",
        doorUnlockedText: "You've unlocked the door",
        pickedUpText: "There's nothing left.",
        requiresKey: false,
        text: (type, textOptions, matrixName) => { return loadText(type, textOptions, matrixName) }
    },

    basement_openLocker: {
       
        requiresKey: false,
        text: (type, textOptions, matrixName) => { return loadText(type, textOptions, matrixName) }
    },

}

export { ITEMS_ACTIONS_MATRIX };


//table
const tableTextOptions = [
    "Theres a table here with a clip",
    "Youve picked up the clip",
    "Theres nothing left",
]

//locker
textOptions: [
    "The locker is locked with a pad lock", //text          container locked             
    "Youve used the pick lock ",            //response      
    "Theres a key inside",                  //text          container unlocked
    "Youve taken the key",                 //response
    "Theres; nothing left"                  //text          container looted
]

//door

textOptions: [
    "The door is locked",                   //text          door locked             
    "Youve used the lock ",                 //response      
    "ALLOW PASS THROUGH"                    //action        door unlocked
]

function loadText(type, textOptions, matrixName) {
    switch (type) {
        case "staticObject": {
            return getItemViaMatrixName(matrixName) ? textOptions[1] : textOptions[0];
        }
        case "lockedContainer": {
            const item = getItemFromInventory(matrixName);
            if(!item) { // stage one
                return textOptions[0];
            } else {
                // item been added. Stage 2 check for looted prop
                return item.value === "looted" ? textOptions[2] : textOptions[1]
            }
        }
        case "door": {
            // TODO
            break;
        }
    }
}
