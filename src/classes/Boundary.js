// V1

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

    constructor({ position, ctx, colour, spriteSheetCoords = {row: 0, column: 0}, interactionData = {boundaryType: ""}, }) {
        this.position = position;
        this.width = 32;
        this.height = 32;
        this.ctx = ctx;
        this.colour = colour;
        this.interactionData = interactionData;
        this.spriteSheetCoords = spriteSheetCoords;
    }




    draw(spriteSheet){
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