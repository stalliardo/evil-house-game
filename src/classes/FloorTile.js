import GameStateManager from "./GameStateManager";
import Interaction from "./Interaction";

const gameStateManager = new GameStateManager();

export default class FloorTile extends Interaction {
  static width = 32;
  static height = 32;

  constructor(position, ctx) {
    
    super(position, undefined, undefined, undefined, undefined, undefined, true);
    this.position = position;
    this.ctx = ctx;
    this.width = 32;
    this.height = 32;
  }

  // override the draw method to randomly select one of the floor tile images
  draw(spriteSheet) {

    // I think this might be too computationally heavy. Browser was very laggy.

    const tileWidth = spriteSheet.width / 10; // Width of each tile
    const tileHeight = spriteSheet.height / 10; // Height of each tile
    const scalingFactor = 2; // multipler to enlage tiles on the canvas
    // possible floor tiles 
    // actullay floor tiles should be hard coded per level???

    // const possibleTiles = [
    //     {row: 0, column: 6},
    //     {row: 0, column: 7},
    //     {row: 0, column: 8},
    //     {row: 0, column: 9},
    //     {row: 6, column: 0},
    //     {row: 6, column: 1},
    //     {row: 6, column: 2},
    //     {row: 6, column: 3},
    // ];

    // const randomNumber = Math.floor(Math.random() * 8);
    // const rowColunmIndex = possibleTiles[randomNumber];
    const rowColunmIndex = {row: 0, column: 6}

    this.ctx.drawImage(
        spriteSheet,
        rowColunmIndex.column * tileWidth,
        rowColunmIndex.row * tileHeight,
        tileWidth,
        tileHeight,
        this.position.x,
        this.position.y,
        tileWidth * scalingFactor,
        tileHeight * scalingFactor
    );
}
}