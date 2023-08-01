export const FOYER_DIALOGUE_DATA = {
    brokenStairs: {
        requiredItems: ["hammer", "nails", "planks"],
        lockName: "basementDoor",
        
        questionWithoutItems: "There is stairs here leading upstairs, but they are damaged and can't currently be used. Maybe they can be repaired.",

        options: [
            {
                text: "Repair stairs", action: "useItem", response: "You have used the planks, hammer and nails to repair the stairs"
            },
        ],
    },

    changeLevelPrompt: {
        question: "Well done. You have found the stairs that will lead you out of here. What will you do?",
        levelName: "foyer",
        options: [
            {
                text: "Use the stairs", action: "changeLevel", response: "You take the paper clip and put it in your inventory."
            },
        ],
    },

}
