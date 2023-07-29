import { BASEMENT_DIALOGUE_DATA } from "../../gameUtils/dialogue/basementDialogueData";
import DialogueManager from "./DialogueManager";
import GameStateManager from "./GameStateManager";
import Interaction from "./Interaction";

const gameStateManager = new GameStateManager();

export default class Door extends Interaction {
    static width = 32;
    static height = 32;

    constructor(position, dialogueIdentifier, level, spriteSheetCoords, ctx, requiresKey, interactionType, isLeftDoor) {


        
        super(position, dialogueIdentifier, spriteSheetCoords, requiresKey, interactionType, isLeftDoor);
        this.position = position;
        this.dialogueIdentifier = dialogueIdentifier; // eg paperClipOnTable
        this.level = level; // eg basement
        this.spriteSheetCoords = spriteSheetCoords;
        this.ctx = ctx;
        this.requiresKey = requiresKey;
        this.width = 32;
        this.height = 32;
    }
          
      useItem(item, callback) {
        switch(item){
            case "basementKey": 
                
                this.gameStateManager.set("basementDoor", "unlocked");
                
                // now what, do i change the ui / ie the image based on the state of the door

                callback();
                break;
        }
      }

}