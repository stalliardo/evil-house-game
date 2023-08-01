import { FOYER_TEXT } from "../consts";

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

    

    journalOnTable: {
        question: "When you examine the table, you notice it is a beautifully crafted antique, adorned with intricate carvings. On the table, there's a dusty old journal lying open. It seems like someone was using it recently. What will you do?.",
        
        options: [
            {
                text: "Read", action: "readItem", response: FOYER_TEXT.JOURNAL_ONE
            }
        ],
    },

    paintingOnTable: {
        question: "Another table with an intriguing painting resting upon it. As you glance at the painting you notice a small inscription discreetly tucked in the corner. What will you do?",
        
        options: [
            {
                text: "Read", action: "readItem", response: FOYER_TEXT.PAINTING_EARTH_ELEMENTAL_CLUE
            },
        ],
    },

    bookshelf: {
        question: "Another table with an intriguing painting resting upon it. As you glance at the painting you notice a small inscription discreetly tucked in the corner. What will you do?",
        
        options: [
            {
                text: "Read", action: "readItem", response: FOYER_TEXT.PAINTING_EARTH_ELEMENTAL_CLUE
            },
        ],
    },

}
