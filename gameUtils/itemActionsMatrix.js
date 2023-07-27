import { BASEMENT_NOTES } from "./gameTextConsts";

const ITEMS_ACTIONS_MATRIX = {
    basementPaperClip: {
        name: "Paper Clip",
        actions: ["Use", "Examine"],
        use:() =>  console.log("%cTODO", "color:greenyellow"),
        examine:() => "A flat wire clip shaped so that it can hold sheets of paper between two of its loops. Maybe it has another use.",
        interactsWith: "basement_locked_locker",
        useageType: "key",
        doorUnlockedText: BASEMENT_NOTES.LOCKER_UNLOCKED,
        pickedUpText: "There's nothing left."

    }
}

export {ITEMS_ACTIONS_MATRIX};