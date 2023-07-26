// V1

// export default class Player {
//     static width = 32;
//     static height = 32;

//     constructor({ position, velocity, ctx }) {
//         this.position = position;
//         this.velocity = velocity;
//         this.width = 32;
//         this.height = 32;
//         this.ctx = ctx;
//     }

//     draw() {
//         this.ctx.fillStyle = "green";
//         this.ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
//     }

//     update() {
//         this.draw();
//         this.position.x += this.velocity.x;
//         this.position.y += this.velocity.y;
//     }
// }


export default class Player {
    static width = 32;
    static height = 32;

    constructor({ position, velocity, ctx, spriteSheetCoords }) {
        this.position = position;
        this.velocity = velocity;
        this.width = 32;
        this.height = 32;
        this.ctx = ctx;
        this.spriteSheetCoords = spriteSheetCoords;
        this.spriteSheet = new Image();
        this.spriteSheet.src = "dungeonCharacters.png"
    }

draw(){
    const tileWidth = this.spriteSheet.width / 7; // Width of each tile
    const tileHeight = this.spriteSheet.height / 4; // Height of each tile
    const rowIndex = this.spriteSheetCoords.row; // The row index of the tile you want to extract
    const columnIndex = this.spriteSheetCoords.column; // The column index of the tile you want to extract

    const scalingFactor = 2; // multipler to enlage tiles on the canvas


    this.ctx.drawImage(
        this.spriteSheet,
        columnIndex * tileWidth, // clipping start x
        rowIndex * tileHeight, // clipping start y
        tileWidth, // clip width
        tileHeight, // clip height
        this.position.x,
        this.position.y,
        tileWidth * scalingFactor,
        tileHeight * scalingFactor
    );
}
    update() {
        this.draw();
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
    }
}


