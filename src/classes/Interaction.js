// extendable only (abstarct)

import { BASEMENT_DIALOGUE_DATA } from "../../gameUtils/dialogue/basementDialogueData";
import GameStateManager from "./GameStateManager";

export default class Interaction {
    constructor(position, dialogueIdentifier, spriteSheetCoords, requiresKey = false, interactionType, isLeftDoor, hasCollision = true) {
        this.position = position; // {position.x, position.y}
        this.dialogueIdentifier = dialogueIdentifier;
        this.spriteSheetCoords = spriteSheetCoords;
        this.isInteractable = true;
        this.requiresKey = requiresKey;
        this.gameStateManager = new GameStateManager();
        this.interactionType = interactionType;
        this.isLeftDoor = isLeftDoor;
        this.hasCollision = hasCollision;
    }

    // Common method for interaction (to be overridden in subclasses)
    interact() {
        console.log("Default interaction");
    }

    loadDoorImage(){
        // will be based on wheter the door is unlcocked or not
        const doorName = BASEMENT_DIALOGUE_DATA[this.dialogueIdentifier].lockName;
        const isUnlocked = this.gameStateManager.get(doorName) === "unlocked"; // the locked items name ie "locker"
        if (isUnlocked ) {
            this.hasCollision = false;
            return { row: 4, column: 7 }
        } else {
            return {row: 6, column: 6}
        }
    }

    draw(spriteSheet) {
        const tileWidth = spriteSheet.width / 10; // Width of each tile
        const tileHeight = spriteSheet.height / 10; // Height of each tile
        const rowIndex = this.isLeftDoor === undefined ? this.spriteSheetCoords.row : this.loadDoorImage().row;
        const columnIndex = this.isLeftDoor === undefined ? this.spriteSheetCoords.column : this.loadDoorImage().column;

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
    takeItem(item) {
        this.gameStateManager.addToInventory(item);
    }
}