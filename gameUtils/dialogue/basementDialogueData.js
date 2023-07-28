export const BASEMENT_DIALOGUE_DATA = {
    paperClipOnTable: {
        lootableItem: "paperClip",
        question: "There's an old table here covered in junk. There is a paper clip which might come in handy. What will you do? ",
        options: [
            {
                text: "Take the paper clip", action: "takeItem", response: "You take the paper clip and put it in your inventory."
            },
            {
                text: "Leave the paper clip", action: "leaveItem", response: "You decide to leave the paper clip on the table for now."
            }
        ],
        alreadyTakenResponse: "You've already taken the paper clip. There's nothing else of interest here."
    },
    
    lockerLockedWithPadLock: {
        lootableItem: "basementKey",
        keyRequired: "paperClip",

        question: "You can't get into the locker. A small, cheap padlock is stopping you. What will you do? ",
        options: [
            {
                text: "Use paper clip", action: "useItem", response: "You have used the paper clip to unlock the locker."
            },
        ],
        itemOpenedQuestion: "There is a basement key hanging inside. What will you do?",
        itemOpenedOptions: [
            {
                text: "Take the basement key", action: "takeItem", response: "You take the basement key and put it in your inventory."
            },
            {
                text: "Leave the basement key", action: "leaveItem", response: "You decide to leave the basement key for now."
            }
        ],
        alreadyTakenResponse: "You've already taken the basement key. There's nothing else of interest here."
    },

    lockerWithNoteInShirt: {
        question: "You opened the locker. Now, this is interesting. There's an old shirt hanging inside. A piece of paper is hanging out the top of one of the pockets. What will you do?",
        options: [
            {
                text: "Read", action: "readItem", response: "'Dave - I don't know what the hell is going on outside, but whatever it is, it isn't good. I've left you some supplies in a locked box in the kitchen up stairs'"
            },
        ],
    },
}
