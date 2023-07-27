// V1

import { isItemInInventory } from "../../gameUtils/localStorageUtils";

// export default class Boundary {
//     static width = 40;
//     static height = 40;

//     constructor({ position, ctx, colour, interactionData = {boundaryType: ""} }) {
//         this.position = position;
//         this.width = 40;
//         this.height = 40;
//         this.ctx = ctx;
//         this.colour = colour;
//         this.interactionData = interactionData;
//     }

//     draw() {
//         this.ctx.fillStyle = this.colour === undefined ? "rgb(38, 29, 11)" : this.colour;
//         this.ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
//     }
// }

export default class Boundary {
    static width = 32;
    static height = 32;

    constructor({ position, ctx, colour, spriteSheetCoords = { row: 0, column: 0 }, interactionData = { boundaryType: "" }, id, type }) {
        this.position = position;
        this.width = 32;
        this.height = 32;
        this.ctx = ctx;
        this.colour = colour;
        this.interactionData = interactionData;
        this.spriteSheetCoords = spriteSheetCoords;
        this.id = id;
        this.type = type;

        this.setInteractionText();
    }

    // called on instantiation
    setInteractionText() {
        // either the door is locked or not will need to know via the storgae
        // but not all boundaries will need to call this function. So if the id is present call this function

        if (this.id) {
            console.log("ill get the appropriate text from the storage id was: ", this.id);

            const item = isItemInInventory(this.id);


            if(this.type === "lockedContainer") {
                if (item && item.value === "unlocked") { // item found now hanlde the text
                    this.interactionData.text = this.interactionData.textOptions[1];
                    this.interactionData.interactionOptions.push("Take");
                } else if(item && item.value === "looted") {
                    console.log("else calle ewddw");
                    this.interactionData.text = this.interactionData.textOptions[2];
                } 
                
                else {
                    console.log("else called");
                    this.interactionData.text = this.interactionData.textOptions[0];
                }
            }


        }

        return;
    }


    // might need an uodateText method here that can be called when an item has been added to the store

    updateText(text) {
        this.interactionData.text = text;
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