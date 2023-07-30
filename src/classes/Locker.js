import DialogueManager from "./DialogueManager";
import GameStateManager from "./GameStateManager";
import Interaction from "./Interaction";

const gameStateManager = new GameStateManager();

export default class Locker extends Interaction {
    static width = 32;
    static height = 32;

    constructor(position, dialogueIdentifier, level, spriteSheetCoords, ctx, requiresKey, interactionType) {
        super(position, dialogueIdentifier, spriteSheetCoords, requiresKey, interactionType);
        this.position = position;
        this.dialogueIdentifier = dialogueIdentifier; // eg paperClipOnTable
        this.level = level; // eg basement
        this.spriteSheetCoords = spriteSheetCoords;
        this.ctx = ctx;
        this.requiresKey = requiresKey;
        this.width = 32;
        this.height = 32;
    }

    interact() {
        const dialogueManager = new DialogueManager(gameStateManager);
        dialogueManager.handleInteraction(this.dialogueIdentifier, this.level);
    }

    readItem() {
        console.log("Red item called");
    }

    useItem(item, callback) {
        switch (item) {
            case "paperClip":
                this.gameStateManager.set("basementLocker", "unlocked");
                callback();
                break;
        }
    }
}