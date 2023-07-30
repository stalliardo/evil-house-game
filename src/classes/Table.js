import DialogueManager from "./DialogueManager";
import GameStateManager from "./GameStateManager";
import Interaction from "./Interaction";

const gameStateManager = new GameStateManager();

export default class Table extends Interaction {
    static width = 32;
    static height = 32;

    constructor(position, dialogueIdentifier, level, spriteSheetCoords, ctx, requiresKey, interactionType) {
        super(position, dialogueIdentifier, spriteSheetCoords, requiresKey, interactionType);
        this.position = position;
        this.dialogueIdentifier = dialogueIdentifier; // eg paperClipOnTable
        this.level = level; // eg basement
        this.spriteSheetCoords = spriteSheetCoords;
        this.ctx = ctx;
        this.width = 32;
        this.height = 32;
        
    }

    // can this also be handled in the parent class?
    interact() {
        // When the player interacts with the table, call the Dialogue Manager with the dialogue identifier and current level
        const dialogueManager = new DialogueManager(gameStateManager);
        dialogueManager.handleInteraction(this.dialogueIdentifier, this.level);
    }

}