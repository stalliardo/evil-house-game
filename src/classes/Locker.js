import DialogueManager from "./DialogueManager";
import GameStateManager from "./GameStateManager";
import Interaction from "./Interaction";

const gameStateManager = new GameStateManager();

export default class Locker extends Interaction {
    static width = 32;
    static height = 32;

    constructor(position, dialogueIdentifier, level, spriteSheetCoords, ctx, requiresKey) {
        super(position, dialogueIdentifier, spriteSheetCoords, requiresKey);
        this.position = position;
        this.dialogueIdentifier = dialogueIdentifier; // eg paperClipOnTable
        this.level = level; // eg basement
        this.spriteSheetCoords = spriteSheetCoords;
        this.ctx = ctx;
        this.requiresKey = requiresKey;
        this.width = 32;
        this.height = 32;
        
    }
    
    // can this also be handled in the parent class?
    interact() {
        console.log("inter called from locker");
        // When the player interacts with the table, call the Dialogue Manager with the dialogue identifier and current level
        const dialogueManager = new DialogueManager(gameStateManager);
        dialogueManager.handleInteraction(this.dialogueIdentifier, this.level);
    }

    takeItem(item) {
        console.log("take called from locker");
    }

    readItem(){
        console.log("Red item called");
    }
      
      useItem(item) {
        console.log("use item cllaed from locked + item = ", item);
        switch(item){
            case "paperClip": 
                console.log("useItem on locked called, this can act as a callback to load the next text item");
                // item used ie key now need to return some addtionaltext
                // now need to set the state of the door to locked and or / looted
                this.gameStateManager.set("locker", "unlocked");
                // now refresh the UI to show the new mssage TODO
                break;
        }
      }

}