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
        question: "When you examine the table, you notice it is a beautifully crafted antique, adorned with intricate carvings. On the table, there's an old journal lying open. It seems like someone was using it recently. What will you do?.",
        
        options: [
            {
                text: "Read", action: "readItem", response: FOYER_TEXT.JOURNAL_ONE
            }
        ],
    },

    paintingOnTable: {
        question: "Another table with an intriguing painting resting upon it. The painting depicts a gathering of '13' cloaked figures arranged in a circle, surrounded by arcane symbols and lit candles. Their faces are obscured, and they seem to be engaged in a ritual, raising their hands in unison as if channeling energy. The overall tone of the painting is eerie. You notice a small inscription discreetly tucked in the corner. What will you do?",
        
        options: [
            {
                text: "Read", action: "readItem", response: FOYER_TEXT.PAINTING_EARTH_ELEMENTAL_CLUE
            },
        ],
    },

    bookshelf: {
        levelName: "foyer",
        question: "An old bookshelf stands here, filled with dusty tomes and ancient scrolls. As you browse through the collection, one book catches your eye: 'Earth's Enchantment.' On the spine, you notice a faded number, but it's difficult to make out the exact page.",
        
        options: [
            {
                text: "Select book", action: "useBookShelf", response: "hello"
            },
        ],
    },

}
