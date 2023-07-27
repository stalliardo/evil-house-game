import { BASEMENT_NOTES } from "./gameTextConsts";

const ITEMS_ACTIONS_MATRIX = {
    basementPaperClip: {
        actions: ["Use", "Examine"],
        use:() =>  console.log("%cTODO", "color:greenyellow"),
        examine:() => "A flat wire clip shaped so that it can hold sheets of paper between two of its loops. Maybe it has another use.",
        interactsWith: "basement_locked_locker",
        useageType: "key",
        doorUnlockedText: BASEMENT_NOTES.LOCKER_UNLOCKED,
        name: "Paper Clip"
    }
}

export {ITEMS_ACTIONS_MATRIX};