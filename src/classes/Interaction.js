// extendable only (abstarct)

import { BASEMENT_DIALOGUE_DATA } from "../../gameUtils/dialogue/basementDialogueData";
import GameStateManager from "./GameStateManager";

export default class Interaction {
    constructor(position, dialogueIdentifier, spriteSheetCoords, requiresKey = false) {
        this.position = position; // {position.x, position.y}
        this.dialogueIdentifier = dialogueIdentifier;
        this.spriteSheetCoords = spriteSheetCoords;
        this.isInteractable = true;
        this.requiresKey = requiresKey;
        this.gameStateManager = new GameStateManager();
    }

    // Common method for interaction (to be overridden in subclasses)
    interact() {
        console.log("Default interaction");
    }

    draw(spriteSheet) {

        const tileWidth = spriteSheet.width / 10; // Width of each tile
        const tileHeight = spriteSheet.height / 10; // Height of each tile
        const rowIndex = this.spriteSheetCoords.row; // The row index of the tile you want to extract
        const columnIndex = this.spriteSheetCoords.column; // The column index of the tile you want to extract

        const scalingFactor = 2; // multipler to enlage tiles on the canvas

        this.ctx.drawImage(
            spriteSheet,
            columnIndex * tileWidth,
            rowIndex * tileHeight,
            tileWidth,
            tileHeight,
            this.position.x,
            this.position.y,
            tileWidth * scalingFactor,
            tileHeight * scalingFactor
        );
    }


    // will need to override this in locker class as further options are required
    takeItem(item){ 
        this.gameStateManager.addToInventory(item);
    }


}