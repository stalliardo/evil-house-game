import GameStateManager from "./GameStateManager";
import Interaction from "./Interaction";


export default class ChangeLevel extends Interaction {
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

  /**
   * 
   * @param {string} levelName This will be the value of the next level. Ie if changing level from the basement the value will be groundFloor
   * @param {function} callback Any callback function required to handle additonal actions. 
   */

  changeLevel(levelName, callback) {
    // switch might not be required, but will see as app grows
    switch (levelName) {
      case "groundFloor":
        this.gameStateManager.set("level", levelName);
        if(callback){
            callback();
        }
        break;
    }
  }
}