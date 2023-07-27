
import { getItemFromInventory, getItemViaMatrixName } from "../../gameUtils/localStorageUtils";

export default class Boundary {
    static width = 32;
    static height = 32;

    constructor({ position, ctx, colour, spriteSheetCoords = { row: 0, column: 0 }, interactionData = { boundaryType: "" }, id, type, name }) {
        this.position = position;
        this.width = 32;
        this.height = 32;
        this.ctx = ctx;
        this.colour = colour;
        this.interactionData = interactionData;
        this.spriteSheetCoords = spriteSheetCoords;
        this.id = id;
        this.type = type;
        this.name = name;

        this.setInteractionText();
    }

    setInteractionText() {
        if (this.id) {
            const item = getItemFromInventory(this.id);
            if(this.type === "lockedContainer") {
                if (item && item.value === "unlocked") { // item found now hanlde the text
                    this.text = this.interactionData.textOptions[1];
                    this.interactionData.interactionOptions.push("Take");
                } else if(item && item.value === "looted") {
                    this.text = this.interactionData.textOptions[2];
                } 
                else {
                    this.text = this.interactionData.textOptions[0];
                }
            } 
        } else if(this.interactionData.lootables) {
            const item = getItemViaMatrixName(this.interactionData.lootables);

            if(item) {
                this.text = this.interactionData.textOptions[1]
            } else {
                this.text = this.interactionData.textOptions[0]
            }
        } 
        else if(this.interactionData.interactionOptions?.includes("Read")){
            this.text = this.interactionData.textOptions[0];
        }
        return;
    }

    updateText(text) {
        this.interactionData.text = text;
    }

    getDisplayText(){ // ie read pressed
        return this.interactionData.textOptions[1];
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
}